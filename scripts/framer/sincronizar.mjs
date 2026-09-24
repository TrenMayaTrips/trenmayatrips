#!/usr/bin/env node
// Sincroniza Supabase → CMS de Framer según scripts/framer/contrato.mjs.
//
//   npm run framer:verificar     Solo compara y reporta diferencias. No cambia nada.
//   npm run framer:sincronizar   Aplica en Framer: crea campos y filas faltantes y actualiza valores.
//
// Opciones (después de `--`):
//   --imagenes            Vuelve a subir imágenes aunque Framer ya tenga una.
//   --eliminar-huerfanos  Borra de Framer las filas que ya no existen o no están publicadas en Supabase.
//   --coleccion=Nombre    Solo esa colección (se puede repetir).
//
// Requisitos: .env con VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY (lectura pública)
// y el proyecto de Framer autorizado en esta máquina (`npx @framer/agent project auth <url>`).
// FRAMER_PROJECT_ID permite apuntar a otro proyecto.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { COLECCIONES, TABLAS_EXTRA, construir } from "./contrato.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PROYECTO = process.env.FRAMER_PROJECT_ID || "F4CoLSg2aQqcIC74XpbX";
const args = process.argv.slice(2);
const APLICAR = args.includes("--aplicar");
const opciones = {
  aplicar: APLICAR,
  imagenes: args.includes("--imagenes"),
  eliminarHuerfanos: args.includes("--eliminar-huerfanos"),
  solo: args.filter((a) => a.startsWith("--coleccion=")).map((a) => a.split("=")[1]),
};

function leerEnv() {
  const env = { ...process.env };
  const archivo = path.join(RAIZ, ".env");
  if (fs.existsSync(archivo)) for (const linea of fs.readFileSync(archivo, "utf8").split("\n")) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !env[m[1]]) env[m[1]] = m[2];
  }
  return env;
}

async function leerSupabase() {
  const env = leerEnv();
  const url = env.VITE_SUPABASE_URL, llave = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !llave) throw new Error("Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en .env");
  const tablas = {}, avisos = [];
  for (const t of [...new Set([...COLECCIONES.map((c) => c.tabla), ...TABLAS_EXTRA])]) {
    const r = await fetch(`${url}/rest/v1/${t}?select=*`, { headers: { apikey: llave, Authorization: `Bearer ${llave}` } });
    if (r.status === 404 && TABLAS_EXTRA.includes(t)) { tablas[t] = []; avisos.push(`La tabla ${t} todavía no existe en Supabase; se omite.`); continue; }
    if (!r.ok) throw new Error(`Supabase respondió ${r.status} al leer ${t}: ${(await r.text()).slice(0, 200)}`);
    tablas[t] = await r.json();
  }
  return { tablas, avisos };
}

function framer(argumentos, entrada) {
  const r = spawnSync("npx", ["-y", "@framer/agent@latest", ...argumentos], { cwd: RAIZ, input: entrada, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`@framer/agent ${argumentos[0]} falló:\n${r.stderr || r.stdout}`);
  return r.stdout;
}

function sesion() {
  const lista = JSON.parse(framer(["session", "list"]).trim() || "[]");
  const existente = lista.find((s) => s.projectId === PROYECTO);
  if (existente) return existente.id;
  return framer(["session", "new", PROYECTO]).trim().split("\n").pop().trim();
}

// Código que corre dentro de la sesión de Framer. Recibe el paquete por archivo.
const MOTOR = String.raw`
const fs = require("fs");
const { paquete, opciones, raiz } = JSON.parse(fs.readFileSync(__ENTRADA__, "utf8"));
const q = (v) => JSON.stringify(String(v));
const norm = (t) => String(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const texto = (bloques) => { let s = ""; const walk = (n) => { if (Array.isArray(n)) n.forEach(walk); else if (n && typeof n === "object") { if (typeof n.attributes?.text === "string") s += n.attributes.text; walk(n.children); } }; walk(bloques); return s; };
const desHtml = (h) => String(h).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const plano = (t) => String(t ?? "").replace(/\s+/g, "");
const reporte = { colecciones: [], errores: [] };
let uid = 0;
const nuevoId = (p) => p + "-" + Date.now().toString(36) + "-" + (uid++);

async function aplicar(dsl, etiqueta) {
  if (!dsl.length) return {};
  const res = await framer.agent.applyChanges(dsl.join(" "), {});
  if (res.parseErrors || res.errors) reporte.errores.push({ etiqueta, detalle: JSON.stringify(res.parseErrors || res.errors).slice(0, 1500) });
  return res.renamedIds || {};
}

// Índice de todas las colecciones de Framer: nombre -> { id, slugVar, porSlug }
const indice = {};
async function indexar() {
  for (const c of await framer.agent.getNodesOfTypes({ types: ["CollectionNode"] })) {
    const s = await framer.agent.serialize({ id: c.id, depth: 0 });
    const slugVar = (s.variables || []).find((v) => v.name === "Slug");
    const nodo = await framer.agent.getNode({ id: c.id });
    const porSlug = {};
    for (const it of nodo.children || []) porSlug[it.attributes?.[slugVar?.key]] = it;
    indice[s.name] = { id: c.id, vars: s.variables || [], slugVar, porSlug };
  }
}
await indexar();

const imagenes = {};
async function subir(img) {
  const clave = img.url || img.archivo;
  if (imagenes[clave]) return imagenes[clave];
  const entrada = img.url ? img.url : { bytes: fs.readFileSync(raiz + "/" + img.archivo), mimeType: img.archivo.endsWith(".png") ? "image/png" : "image/jpeg" };
  const asset = await framer.uploadImage({ image: entrada, name: clave.split("/").pop(), resolution: "full" });
  return (imagenes[clave] = asset.url);
}

function declaracion(id, campo, scope) {
  const base = "name=" + q(campo.nombre) + " scope=" + q(scope);
  switch (campo.tipo) {
    case "string": return "+Variable " + id + " " + base + ' type="string";';
    case "text": return "+Variable " + id + " " + base + ' type="string" displayTextArea="true";';
    case "color": return "+Variable " + id + " " + base + ' type="color" initialValue="#FFFFFF";';
    case "richtext": case "number": case "boolean": case "image": return "+Variable " + id + " " + base + " type=" + q(campo.tipo) + ";";
    case "date": return "+DateVariable " + id + " " + base + ";";
    case "option": return "+OptionVariable " + id + " " + base + " " + campo.cases.map((c, i) => "cases." + i + "=" + q(c)).join(" ") + " initialValue=" + q(campo.cases[0]) + ";";
    case "ref": return "+CollectionReferenceVariable " + id + " " + base + ' type="single" collection=' + q(campo.coleccion) + ";";
    case "refs": return "+CollectionReferenceVariable " + id + " " + base + ' type="multi" collection=' + q(campo.coleccion) + ";";
  }
  throw new Error("Tipo desconocido " + campo.tipo);
}
const TIPO_FRAMER = { string: ["string"], text: ["string"], richtext: ["richtext"], number: ["number"], boolean: ["boolean"], image: ["image"], color: ["color"], date: ["date"], option: ["option", "enum"], ref: ["collectionreference", "single"], refs: ["multicollectionreference", "multi"] };

for (const col of paquete) {
  if (opciones.solo.length && !opciones.solo.includes(col.nombre)) continue;
  const r = { coleccion: col.nombre, filasSupabase: col.filas.length, camposNuevos: [], camposConflicto: [], filasNuevas: [], filasCambiadas: {}, huerfanas: [], imagenesSubidas: 0 };
  reporte.colecciones.push(r);
  let info = indice[col.nombre];

  // 1. Colección y campos
  if (!info) {
    r.camposNuevos = col.campos.map((c) => c.nombre);
    if (!opciones.aplicar) { r.coleccionNueva = true; col.filas.forEach((f) => r.filasNuevas.push(f.slug)); continue; }
    const cid = nuevoId("col");
    const ids = await aplicar(["+CollectionNode " + cid + " name=" + q(col.nombre) + ";", ...col.campos.map((c, i) => declaracion(cid + "-v" + i, c, cid))], col.nombre + ": crear colección");
    await indexar(); info = indice[col.nombre];
  } else {
    const faltan = col.campos.filter((c) => !info.vars.some((v) => v.name === c.nombre || norm(v.name) === norm(c.nombre)));
    r.camposNuevos = faltan.map((c) => c.nombre);
    for (const c of col.campos) {
      const v = info.vars.find((x) => x.name === c.nombre || norm(x.name) === norm(c.nombre));
      if (v && !TIPO_FRAMER[c.tipo].includes(v.type) && !TIPO_FRAMER[c.tipo].includes(v.node === "CollectionReferenceVariable" ? v.type : "")) r.camposConflicto.push(c.nombre + " (Framer: " + v.type + ", contrato: " + c.tipo + ")");
    }
    if (faltan.length && opciones.aplicar) {
      await aplicar(faltan.map((c, i) => declaracion(nuevoId("v"), c, info.id)), col.nombre + ": campos nuevos");
      await indexar(); info = indice[col.nombre];
    }
  }
  if (!info) continue;
  // Framer cambia nombres a mayúsculas a la inglesa: se regresan al nombre del contrato.
  const renombres = [];
  for (const c of col.campos) { const v = info.vars.find((x) => x.name !== c.nombre && norm(x.name) === norm(c.nombre)); if (v) renombres.push("SET " + v.id + " name=" + q(c.nombre) + ";"); }
  if (renombres.length && opciones.aplicar) { await aplicar(renombres, col.nombre + ": nombres"); await indexar(); info = indice[col.nombre]; }
  const varDe = (c) => info.vars.find((x) => x.name === c.nombre) || info.vars.find((x) => norm(x.name) === norm(c.nombre));

  // 2. Filas
  const dsl = [];
  const vistos = new Set();
  for (const [n, fila] of col.filas.entries()) {
    vistos.add(fila.slug);
    const actual = info.porSlug[fila.slug];
    const a = actual?.attributes || {};
    const sets = [], cambios = [];
    for (const c of col.campos) {
      const v = varDe(c);
      if (!v) continue;
      const deseado = fila.valores[c.clave];
      const tiene = a[v.key];
      const k = "$control__" + v.id;
      if (c.tipo === "image") {
        if (deseado && (!tiene || opciones.imagenes)) { cambios.push(c.nombre); if (opciones.aplicar) { sets.push(k + "=" + q(await subir(deseado))); r.imagenesSubidas++; } }
        continue;
      }
      if (c.tipo === "ref" || c.tipo === "refs") {
        const destino = indice[c.coleccion];
        const slugs = c.tipo === "ref" ? (deseado ? [deseado] : []) : (deseado || []);
        const ids = slugs.map((s) => destino?.porSlug[s]?.id).filter(Boolean);
        if (ids.length !== slugs.length) reporte.errores.push({ etiqueta: col.nombre + "/" + fila.slug, detalle: c.nombre + ": no encuentro en Framer " + slugs.join(", ") });
        const valor = c.tipo === "ref" ? (ids[0] || null) : ids;
        const tieneVal = c.tipo === "ref" ? (tiene || null) : JSON.parse(typeof tiene === "string" && tiene.startsWith("[") ? tiene : JSON.stringify(tiene || []));
        if (JSON.stringify(valor) !== JSON.stringify(tieneVal)) { cambios.push(c.nombre); sets.push(k + "=" + (valor === null ? '""' : q(c.tipo === "ref" ? valor : JSON.stringify(valor)))); }
        continue;
      }
      if (c.tipo === "richtext") {
        const quiere = deseado ? plano(desHtml(deseado)) : "";
        const hay = tiene ? plano(texto(tiene)) : "";
        if (quiere !== hay) { cambios.push(c.nombre); sets.push(k + "=" + q(deseado || "")); }
        continue;
      }
      if (c.tipo === "date") {
        if (!String(tiene || "").startsWith(String(deseado || "∅"))) { cambios.push(c.nombre); if (deseado) sets.push(k + "=" + q(deseado)); }
        continue;
      }
      const quiere = deseado === null || deseado === undefined ? (c.tipo === "boolean" ? "false" : "") : String(deseado);
      const hay = tiene === null || tiene === undefined ? (c.tipo === "boolean" ? "false" : "") : String(tiene);
      if (quiere !== hay) { cambios.push(c.nombre); if (quiere !== "" || hay !== "") sets.push(k + "=" + q(quiere)); }
    }
    const slugSet = "$control__" + info.slugVar.id + "=" + q(fila.slug);
    if (!actual) {
      r.filasNuevas.push(fila.slug);
      if (opciones.aplicar) { const iid = nuevoId("it"); dsl.push("+CollectionItemNode " + iid + " parent=" + q(info.id) + " index=" + q(n) + ";"); dsl.push("SET " + iid + " " + [slugSet, ...sets].join(" ") + ";"); }
    } else if (cambios.length) {
      r.filasCambiadas[fila.slug] = cambios;
      if (opciones.aplicar && sets.length) dsl.push("SET " + actual.id + " " + sets.join(" ") + ";");
    }
  }
  for (const [slug, it] of Object.entries(info.porSlug)) if (!vistos.has(slug)) {
    r.huerfanas.push(slug);
    if (opciones.aplicar && opciones.eliminarHuerfanos) dsl.push("DEL " + it.id + ";");
  }
  for (let i = 0; i < dsl.length; i += 60) await aplicar(dsl.slice(i, i + 60), col.nombre + ": filas");
  await indexar();
}
console.log("__REPORTE__" + JSON.stringify(reporte));
`;

function imprimir(reporte, avisos) {
  let diferencias = 0;
  console.log(APLICAR ? "\nSincronización Supabase → Framer\n" : "\nVerificación Supabase → Framer (sin cambios)\n");
  for (const a of avisos) console.log(`ℹ️  ${a}`);
  for (const c of reporte.colecciones) {
    const cambiadas = Object.keys(c.filasCambiadas).length;
    const n = c.camposNuevos.length + c.camposConflicto.length + c.filasNuevas.length + cambiadas + c.huerfanas.length;
    diferencias += n;
    console.log(`${n ? "•" : "✓"} ${c.coleccion}: ${c.filasSupabase} filas en Supabase${n ? "" : ", al día"}`);
    if (c.camposNuevos.length) console.log(`    campos ${APLICAR ? "creados" : "faltantes"}: ${c.camposNuevos.join(", ")}`);
    if (c.camposConflicto.length) console.log(`    ⚠️ tipo distinto (no se toca): ${c.camposConflicto.join("; ")}`);
    if (c.filasNuevas.length) console.log(`    filas ${APLICAR ? "creadas" : "faltantes"}: ${c.filasNuevas.join(", ")}`);
    for (const [slug, campos] of Object.entries(c.filasCambiadas)) console.log(`    ${APLICAR ? "actualizada" : "difiere"} ${slug}: ${campos.join(", ")}`);
    if (c.huerfanas.length) console.log(`    ${APLICAR && opciones.eliminarHuerfanos ? "eliminadas" : "solo en Framer (no están publicadas en Supabase)"}: ${c.huerfanas.join(", ")}`);
    if (c.imagenesSubidas) console.log(`    imágenes subidas: ${c.imagenesSubidas}`);
  }
  for (const e of reporte.errores) console.log(`❌ ${e.etiqueta}: ${e.detalle}`);
  console.log(`\n${diferencias ? `${diferencias} diferencias${APLICAR ? " atendidas" : ". Corre npm run framer:sincronizar para aplicarlas."}` : "Todo coincide."}`);
  return reporte.errores.length ? 1 : 0;
}

const { tablas, avisos } = await leerSupabase();
const paquete = construir(tablas);
const entrada = path.join(os.tmpdir(), `tmt-framer-${process.pid}.json`);
fs.writeFileSync(entrada, JSON.stringify({ paquete, opciones, raiz: RAIZ }));
try {
  const salida = framer(["exec", "-s", sesion()], MOTOR.replace("__ENTRADA__", JSON.stringify(entrada)));
  const linea = salida.split("\n").find((l) => l.startsWith("__REPORTE__"));
  if (!linea) throw new Error(`Framer no devolvió reporte:\n${salida.slice(-3000)}`);
  process.exitCode = imprimir(JSON.parse(linea.slice("__REPORTE__".length)), avisos);
} finally {
  fs.rmSync(entrada, { force: true });
}
