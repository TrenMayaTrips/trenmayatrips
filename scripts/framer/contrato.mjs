// Contrato de datos Supabase → CMS de Framer.
//
// Supabase (tmt-production) es la fuente de verdad. Este archivo define, para cada
// colección de Framer, de qué tabla sale, qué campos tiene y cómo se transforma cada
// valor. Lo usan sincronizar.mjs (escribe en Framer) y verificar.mjs (solo compara).
//
// Para agregar un campo nuevo que pida el diseño:
//   1. Crear la columna en Supabase con una migración revisada (supabase/migrations/).
//   2. Agregar el campo aquí, en la colección que corresponda.
//   3. Correr `npm run framer:verificar` y después `npm run framer:sincronizar`.
// Ver docs/framer/flujo-diseno-datos.md.

export const ESTADOS = ["Quintana Roo", "Yucatán", "Campeche", "Tabasco", "Chiapas"];
const ESTADO_POR_CLAVE = {
  "quintana-roo": "Quintana Roo", quintana_roo: "Quintana Roo", yucatan: "Yucatán",
  campeche: "Campeche", tabasco: "Tabasco", chiapas: "Chiapas",
};
const SLUG_ESTADO = (clave) => (clave ? String(clave).replace(/_/g, "-") : null);

// Colecciones que columnas excluidas nunca deben tocar (04-cms-colecciones.md).
export const COLUMNAS_EXCLUIDAS = ["net_price", "wellet_code", "provider_id", "seo_title", "seo_description", "created_at", "updated_at"];

// Imágenes de transición: se usan solo si la fila de Supabase no trae imagen.
// Cuando las fotos vivan en Supabase Storage, estas tablas dejan de usarse solas.
const A = "src/assets/";
const RESPALDO = {
  experiences: {
    "amanecer-maya-uxmal": "uxmal", "coba-tulum-cenote": "coba", "ek-balam-valladolid": "ekbalam",
    "catamaran-isla-mujeres": "catamaran", "calakmul-biosfera": "calakmul", "ruta-del-cacao": "cacao",
    "palenque-agua-azul": "palenque", "temazcal-selva": "temazcal", "snorkel-arrecife": "snorkel", "bacalar-laguna": "bacalar",
  },
  destinations: {
    cancun: "dest-cancun.jpg", tulum: "dest-tulum.jpg", bacalar: "dest-bacalar.jpg", "playa-del-carmen": "dest-playa-del-carmen.jpg",
    merida: "dest-merida.jpg", valladolid: "dest-valladolid.jpg", "chichen-itza": "dest-chichen-itza-detail.jpg",
    izamal: "dest-izamal.jpg", "campeche-ciudad": "dest-campeche-ciudad.jpg", calakmul: "dest-calakmul.jpg", edzna: "dest-edzna.jpg",
    villahermosa: "dest-villahermosa.jpg", comalcalco: "dest-comalcalco.jpg", palenque: "dest-palenque-detail.jpg",
    "san-cristobal": "dest-san-cristobal.jpg", "cascadas-agua-azul": "dest-agua-azul.jpg",
  },
  stations: {
    cancun: "dest-cancun.jpg", "playa-del-carmen": "dest-playa-del-carmen.jpg", tulum: "dest-tulum.jpg", bacalar: "dest-bacalar.jpg",
    valladolid: "dest-valladolid.jpg", "chichen-itza": "dest-chichen-itza.jpg", izamal: "dest-izamal.jpg", merida: "dest-merida.jpg",
    campeche: "dest-campeche-ciudad.jpg", palenque: "dest-palenque.jpg",
  },
  routes: {
    "cancun-merida": "dest-cancun.jpg", "cancun-tulum": "dest-tulum.jpg", "merida-palenque": "dest-palenque.jpg",
    "merida-campeche": "dest-campeche-ciudad.jpg", "tulum-bacalar": "dest-bacalar.jpg",
  },
  packages: {
    "ruta-grandeza-maya": "dest-chichen-itza.jpg", "cultura-gastronomia-entretenimiento": "dest-merida.jpg",
    "aventura-naturaleza-5-estados": "dest-agua-azul.jpg", "mundo-maya-classico-4-dias": "dest-cancun.jpg",
    "gastronomia-autentica-yucatan": "dest-merida.jpg",
  },
  blog_posts: {
    "guia-completa-tren-maya-2025": "hero-tren-maya.jpg", "chichen-itza-mas-alla-piramide": "dest-chichen-itza.jpg",
    "cenotes-sagrados-yucatan": "dest-riviera-maya.jpg", "gastronomia-yucateca-imperdible": "dest-merida.jpg",
    "palenque-ciudad-perdida-selva": "dest-palenque.jpg", "que-empacar-viaje-tren-maya": "hero-tren-maya-page.jpg",
    "bacalar-laguna-siete-colores": "dest-bacalar.jpg", "chocolate-cacao-ruta-maya": "dest-comalcalco.jpg",
    "pueblos-magicos-ruta-tren-maya": "dest-san-cristobal.jpg",
  },
};
// Devuelve { url } si Supabase trae imagen, { archivo } si hay respaldo en el repo, o null.
const imagen = (url, archivo) => (url ? { url } : archivo ? { archivo: A + archivo } : null);
const galeria = (lista, i, respaldo) => imagen((lista || [])[i], respaldo);

// ---------- Texto con formato (HTML que Framer convierte a Formatted Text) ----------
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
export const parrafos = (t) => (t ? String(t).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${inline(p)}</p>`).join("") || null : null);
export const vinetas = (items) => {
  const v = (items || []).filter((i) => i !== null && i !== undefined && i !== "");
  return v.length ? `<ul>${v.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>` : null;
};
export const preguntas = (items, q = "question", a = "answer") =>
  (items || []).map((i) => `<h4>${inline(i[q])}</h4><p>${inline(i[a])}</p>`).join("") || null;
export const markdown = (bloques) => {
  const out = [];
  for (const bloque of bloques || []) for (const trozo of String(bloque).split(/\n\s*\n/)) {
    const lineas = trozo.split("\n").filter((l) => l.trim());
    if (!lineas.length) continue;
    const h = lineas[0].match(/^(#{1,6})\s+(.*)/);
    if (h && lineas.length === 1) { const n = Math.min(Math.max(h[1].length, 2), 4); out.push(`<h${n}>${inline(h[2])}</h${n}>`); }
    else if (lineas.every((l) => /^\d+\.\s/.test(l))) out.push(`<ol>${lineas.map((l) => `<li>${inline(l.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`);
    else if (lineas.every((l) => /^[-*]\s/.test(l))) out.push(`<ul>${lineas.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`);
    else out.push(`<p>${lineas.map(inline).join("<br>")}</p>`);
  }
  return out.join("") || null;
};
const unir = (v) => (Array.isArray(v) ? v.join(", ") : v ?? null);
const hslAHex = (s) => {
  const m = /hsl\(\s*([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\s*\)/.exec(s || "");
  if (!m) return s || null;
  const h = +m[1] / 360, sat = +m[2] / 100, l = +m[3] / 100;
  const q = l < 0.5 ? l * (1 + sat) : l + sat - l * sat, p = 2 * l - q;
  const c = (t) => { t = (t + 1) % 1; const v = t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; return Math.round(v * 255).toString(16).padStart(2, "0").toUpperCase(); };
  return `#${c(h + 1 / 3)}${c(h)}${c(h - 1 / 3)}`;
};
const NOMBRE_CLASE = { xiinbal: "Xiinbal", janal: "Janal", patal: "P'atal" };
const COMPARATIVA = { comida: "Comida", lounge: "Lounge", espacio: "Espacio", pantalla: "Pantalla", atencionVIP: "Atención VIP" };
const valorComparativa = (v) => { v = String(v); if (v === "❌") return "No"; if (v.startsWith("✅")) { const r = v.slice(1).trim(); return r ? `Sí, ${r}` : "Sí"; } return v; };

// ---------- Campos ----------
// f(clave, nombre, tipo, valor, extra). Tipos: string, text (multilínea), richtext, number, boolean,
// image, color, date, option (extra.cases), ref (extra.coleccion; valor = slug destino), refs (varios slugs).
const f = (clave, nombre, tipo, valor, extra = {}) => ({ clave, nombre, tipo, valor, ...extra });
const galerias = (tabla, col = "gallery", respaldo) => [1, 2, 3, 4].map((i) =>
  f(`galeria${i}`, `Galería ${i}`, "image", (r) => galeria(r[col], i - 1, respaldo ? respaldo(r, i) : null)));
const estadoVinculado = (col = "state") => f("estado_ref", "Estado vinculado", "ref", (r) => SLUG_ESTADO(r[col]), { coleccion: "Estados" });

// Cada colección: nombre en Framer, tabla, filtro de publicación y orden.
// `derivados` recibe todas las tablas leídas (para relaciones) y devuelve funciones auxiliares.
export const COLECCIONES = [
  {
    nombre: "Estados", tabla: "states_info", publicado: () => true,
    campos: [
      f("nombre", "Nombre", "string", (r) => r.name),
      f("capital", "Capital", "string", (r) => r.capital),
      f("frase", "Frase", "string", (r) => r.tagline),
      f("color", "Color", "color", (r) => hslAHex(r.color)),
      f("imagen", "Imagen", "image", (r) => imagen(r.featured_image)),
    ],
  },
  {
    nombre: "Estaciones", tabla: "stations",
    campos: [
      f("nombre", "Nombre", "string", (r) => r.name),
      f("nombre_completo", "Nombre completo", "string", (r) => r.full_name),
      f("subtitulo", "Subtítulo", "text", (r) => r.subtitle),
      f("estado", "Estado", "option", (r) => r.state_label, { cases: ESTADOS }),
      f("km", "Kilómetro", "number", (r) => r.km),
      f("tipo", "Tipo", "option", (r) => ({ principal: "principal", estacion: "estación", paradero: "paradero" })[r.type] || r.type, { cases: ["principal", "estación", "paradero"] }),
      f("imagen", "Imagen", "image", (r) => imagen(r.image, RESPALDO.stations[r.slug])),
      f("horario", "Horario", "string", (r) => r.schedule),
      f("estacionamiento", "Estacionamiento", "string", (r) => r.parking),
      f("accesibilidad", "Accesibilidad", "string", (r) => r.accessibility),
      f("destacado", "Lo destacado", "richtext", (r) => vinetas(r.highlights)),
      f("servicios", "Servicios", "richtext", (r) => vinetas((r.services || []).map((x) => x.name))),
      f("conexiones", "Conexiones", "richtext", (r) => vinetas((r.connections || []).map((x) => `${x.destination} (${(x.direction || "").trim()}): ${x.time} · ${x.price}`))),
      f("cercanos", "Destinos cercanos", "richtext", (r) => vinetas((r.nearby_destinations || []).map((x) => [x.name, x.type, x.access].filter(Boolean).join(" · ")))),
      f("transporte", "Transporte local", "richtext", (r) => vinetas((r.transport || []).map((x) => `${x.method}: ${x.detail}`))),
      f("consejos", "Consejos", "richtext", (r) => vinetas(r.tips)),
      f("pagina", "Tiene página propia", "boolean", (r) => !!r.has_detail_page),
      estadoVinculado(),
    ],
  },
  {
    nombre: "Categorías", tabla: "experience_categories",
    campos: [
      f("nombre", "Nombre", "string", (r) => r.name),
      f("icono", "Ícono", "string", (r) => r.icon),
      f("descripcion", "Descripción", "text", (r) => r.description),
      f("hero_titular", "Titular del hero", "string", (r) => r.hero_headline),
      f("hero_texto", "Texto del hero", "text", (r) => r.hero_description),
      f("imagen", "Imagen", "image", (r) => imagen(r.featured_image)),
      f("faq_cultural", "Información cultural", "richtext", (r) => preguntas(r.faq_cultural)),
      f("faq_tips", "Tips del experto", "richtext", (r) => preguntas(r.faq_tips)),
    ],
  },
  {
    nombre: "Subcategorías", tabla: "experience_subcategories",
    campos: [
      f("nombre", "Nombre", "string", (r) => r.name),
      f("categoria", "Categoría", "ref", (r, d) => d.slug.experience_categories[r.category_id], { coleccion: "Categorías" }),
      f("icono", "Ícono", "string", (r) => r.icon),
      f("descripcion", "Descripción", "text", (r) => r.description),
      f("hero_texto", "Texto del hero", "text", (r) => r.hero_description),
      f("imagen", "Imagen", "image", (r) => imagen(r.featured_image)),
    ],
  },
  {
    nombre: "Destinos", tabla: "destinations",
    campos: [
      f("nombre", "Nombre", "string", (r) => r.name),
      f("estado", "Estado", "option", (r) => r.state_label, { cases: ESTADOS }),
      f("tipo", "Tipo", "option", (r) => ({ arqueologia: "arqueología" })[r.type] || r.type, { cases: ["ciudad", "arqueología", "naturaleza", "playa", "pueblo"] }),
      f("frase", "Frase", "string", (r) => r.tagline),
      f("descripcion", "Descripción", "richtext", (r) => parrafos(r.description)),
      f("imperdibles", "Imperdibles", "richtext", (r) => vinetas(r.highlights)),
      // Mientras nearest_station_id esté vacío se usa el nombre (nearest_station_name); ver
      // docs/framer/propuesta-relaciones.md. Cuando la columna esté llena, este respaldo sobra.
      f("estacion", "Estación más cercana", "ref", (r, d) => d.slug.stations[r.nearest_station_id]
        || d.estacionPorNombre[r.nearest_station_name] || null, { coleccion: "Estaciones" }),
      f("traslado", "Tiempo de traslado", "string", (r) => r.travel_time),
      f("meses", "Mejores meses", "string", (r) => r.best_months),
      f("imagen", "Imagen principal", "image", (r) => imagen(r.featured_image, RESPALDO.destinations[r.slug])),
      ...galerias("destinations"),
      estadoVinculado(),
    ],
  },
  {
    nombre: "Experiencias", tabla: "experiences",
    campos: [
      f("titulo", "Título", "string", (r) => r.title),
      f("resumen", "Resumen", "text", (r) => r.description),
      f("descripcion", "Descripción", "richtext", (r) => parrafos(r.long_description)),
      f("categoria", "Categoría", "ref", (r, d) => d.slug.experience_categories[r.category_id], { coleccion: "Categorías" }),
      f("destino", "Destino", "ref", (r, d) => d.slug.destinations[r.destination_id] || null, { coleccion: "Destinos" }),
      f("estado", "Estado", "option", (r) => r.state_label, { cases: ESTADOS }),
      f("estacion", "Estación más cercana", "string", (r, d) => {
        const dest = d.porId.destinations[r.destination_id];
        return dest ? (d.porId.stations[dest.nearest_station_id]?.name || dest.nearest_station_name || null) : null;
      }),
      f("duracion", "Duración", "string", (r) => r.duration),
      f("precio", "Precio desde (MXN)", "number", (r) => r.price),
      f("grupo", "Grupo", "string", (r) => r.group_size),
      f("idiomas", "Idiomas", "string", (r) => unir(r.languages)),
      f("calificacion", "Calificación", "number", (r) => r.rating),
      f("resenas", "Número de reseñas", "number", (r) => r.reviews_count),
      f("incluye", "Incluye", "richtext", (r) => vinetas(r.includes)),
      f("no_incluye", "No incluye", "richtext", (r) => vinetas(r.not_includes)),
      f("recomendaciones", "Recomendaciones", "richtext", (r) => vinetas(r.recommendations)),
      f("itinerario", "Itinerario", "richtext", (r) => vinetas((r.itinerary || []).map((i) => `${i.time} — ${i.activity}`))),
      f("imagen", "Imagen principal", "image", (r) => {
        const g = RESPALDO.experiences[r.slug];
        return imagen(r.featured_image || (r.gallery || [])[0], g ? `gallery/${g}-1.jpg` : null);
      }),
      ...galerias("experiences", "gallery", (r, i) => { const g = RESPALDO.experiences[r.slug]; return g && i <= 2 ? `gallery/${g}-${i}.jpg` : null; }),
      f("destacada", "Destacada", "boolean", (r) => !!r.is_featured),
      estadoVinculado(),
      f("subcategorias", "Subcategorías", "refs", (r, d) => (d.subcategoriasDe[r.id] || []), { coleccion: "Subcategorías" }),
    ],
  },
  {
    nombre: "Rutas", tabla: "routes",
    campos: [
      f("origen", "Origen", "string", (r) => r.origin),
      f("destino", "Destino", "string", (r) => r.destination),
      f("duracion", "Duración", "string", (r) => r.duration),
      f("paradas", "Paradas", "number", (r) => r.stops),
      f("salidas", "Salidas diarias", "number", (r) => r.daily_departures),
      f("insignia", "Insignia", "string", (r) => r.badge),
      f("precios", "Precios por clase", "richtext", (r) => vinetas(Object.entries(r.prices || {}).sort((a, b) => a[1] - b[1]).map(([k, v]) => `${NOMBRE_CLASE[k] || k}: $${Number(v).toLocaleString("en-US")} MXN`))),
      f("horarios", "Horarios", "richtext", (r) => vinetas(r.schedules)),
      f("descripcion", "Descripción", "richtext", (r) => parrafos(r.description)),
      f("recorrido", "Recorrido", "richtext", (r) => vinetas((r.timeline || []).map((t) => `${t.time} — ${t.name}${t.highlights?.length ? ` (${t.highlights.join(", ")})` : ""}`))),
      f("imagen", "Imagen", "image", (r) => imagen(r.hero_image, RESPALDO.routes[r.slug])),
      f("estados", "Estados que atraviesa", "string", (r) => (r.states_traversed || []).map((s) => ESTADO_POR_CLAVE[s] || s).join(", ")),
      f("paisajes", "Paisajes destacados", "text", (r) => r.scenic_highlights),
      f("consejos", "Consejos", "richtext", (r) => preguntas(r.tips, "title", "description")),
    ],
  },
  {
    nombre: "Paquetes", tabla: "packages",
    campos: [
      f("titulo", "Título", "string", (r) => r.title),
      f("descripcion", "Descripción", "richtext", (r) => parrafos(r.description)),
      f("dias", "Días", "number", (r) => r.duration_days),
      f("precio", "Precio desde (MXN)", "number", (r) => r.price),
      f("tipo", "Tipo", "option", (r) => ({ gastronomico: "gastronómico" })[r.type] || r.type, { cases: ["cultural", "aventura", "gastronómico", "mixto"] }),
      f("dificultad", "Dificultad", "option", (r) => r.difficulty, { cases: ["fácil", "moderado", "desafiante"] }),
      f("grupo", "Grupo", "string", (r) => r.group_size),
      f("ideal", "Ideal para", "string", (r) => r.best_for),
      f("estados", "Estados", "string", (r) => unir(r.states)),
      f("imperdibles", "Imperdibles", "richtext", (r) => vinetas(r.highlights)),
      f("incluye", "Incluye", "richtext", (r) => vinetas(r.includes)),
      f("no_incluye", "No incluye", "richtext", (r) => vinetas(r.excludes)),
      f("itinerario", "Itinerario", "richtext", (r) => (r.itinerary || []).map((i) => `<h4>Día ${esc(i.day)} · ${inline(i.title)}</h4><p>${inline(i.description)}</p>`).join("") || null),
      f("temporada", "Mejor temporada", "richtext", (r) => vinetas(Object.entries(r.seasonal_rating || {}).map(([k, v]) => `${k}: ${v}`))),
      f("calificacion", "Calificación", "number", (r) => r.rating),
      f("resenas", "Número de reseñas", "number", (r) => r.reviews_count),
      f("imagen", "Imagen principal", "image", (r) => imagen(r.featured_image, RESPALDO.packages[r.slug])),
      ...galerias("packages"),
      f("destacado", "Destacado", "boolean", (r) => !!r.is_featured),
    ],
  },
  {
    nombre: "Clases de servicio", tabla: "wagon_classes",
    campos: [
      f("nombre", "Nombre", "string", (r) => r.name),
      f("significado", "Significado", "string", (r) => r.meaning_full || r.meaning),
      f("tipo", "Tipo", "string", (r) => r.type),
      f("precio", "Precio base (MXN)", "number", (r) => r.price_base),
      f("asientos", "Asientos", "number", (r) => r.seats),
      f("configuracion", "Configuración", "string", (r) => r.config),
      f("ancho", "Ancho de asiento", "string", (r) => r.seat_width),
      f("color", "Color", "string", (r) => r.color_token),
      f("descripcion", "Descripción", "richtext", (r) => parrafos(r.description)),
      f("imagen", "Imagen", "image", (r) => imagen(r.hero_image, `tren-${r.slug}-interior.jpg`)),
      ...[1, 2, 3, 4].map((i) => f(`galeria${i}`, `Galería ${i}`, "image", (r) =>
        galeria(r.gallery_images, i - 1, i === 1 ? `tren-${r.slug}-interior.jpg` : i === 2 ? `vagon-${r.slug}.jpg` : null))),
      f("amenidades", "Amenidades", "richtext", (r) => vinetas((r.amenities || []).map((a) => `${a.name}: ${a.detail}`))),
      f("comparativa", "Comparativa", "richtext", (r) => vinetas(Object.entries(r.comparison || {}).map(([k, v]) => `${COMPARATIVA[k] || k}: ${valorComparativa(v)}`))),
      f("faqs", "Preguntas frecuentes", "richtext", (r) => preguntas(r.faqs, "q", "a")),
    ],
  },
  {
    nombre: "Blog", tabla: "blog_posts", orden: (a, b) => String(b.published_at || "").localeCompare(String(a.published_at || "")),
    campos: [
      f("titulo", "Título", "string", (r) => r.title),
      f("extracto", "Extracto", "text", (r) => r.excerpt),
      f("categoria", "Categoría", "option", (r, d) => d.etiquetaBlog[r.category_slug] || null, { cases: "blog_categories" }),
      f("autor", "Autor", "string", (r) => r.author_name),
      f("rol", "Rol del autor", "string", (r) => r.author_role),
      f("fecha", "Fecha", "date", (r) => r.published_at),
      f("minutos", "Minutos de lectura", "number", (r) => r.read_time),
      f("destacado", "Destacado", "boolean", (r) => !!r.featured),
      f("etiquetas", "Etiquetas", "string", (r) => unir(r.tags)),
      f("contenido", "Contenido", "richtext", (r) => markdown(r.content)),
      f("imagen", "Imagen principal", "image", (r) => imagen(r.featured_image, RESPALDO.blog_posts[r.slug])),
    ],
  },
];

// Tablas que se leen además de las de cada colección (para relaciones).
export const TABLAS_EXTRA = ["blog_categories", "experience_subcategory_links"];

// Arma el paquete listo para Framer a partir de las tablas leídas de Supabase.
export function construir(tablas) {
  const porId = {}, slug = {};
  for (const [t, filas] of Object.entries(tablas)) {
    porId[t] = Object.fromEntries((filas || []).filter((r) => r.id).map((r) => [r.id, r]));
    slug[t] = Object.fromEntries((filas || []).filter((r) => r.id && r.slug).map((r) => [r.id, r.slug]));
  }
  const subcategoriasDe = {};
  for (const l of tablas.experience_subcategory_links || []) {
    const s = slug.experience_subcategories[l.subcategory_id];
    if (s) (subcategoriasDe[l.experience_id] ||= []).push(s);
  }
  const categoriasBlog = [...(tablas.blog_categories || [])].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const etiquetaBlog = Object.fromEntries(categoriasBlog.map((c) => [c.slug, c.label]));
  const estacionPorNombre = Object.fromEntries((tablas.stations || []).map((s) => [s.name, s.slug]));
  const d = { porId, slug, subcategoriasDe, etiquetaBlog, estacionPorNombre };

  return COLECCIONES.map((c) => {
    const filas = (tablas[c.tabla] || []).filter(c.publicado || ((r) => (r.status ?? "published") === "published"));
    filas.sort(c.orden || ((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
    const campos = c.campos.map(({ valor, ...campo }) =>
      campo.cases === "blog_categories" ? { ...campo, cases: categoriasBlog.map((x) => x.label) } : campo);
    const filasFramer = filas.map((r) => ({
      slug: r.slug || SLUG_ESTADO(r.state) || r.id,
      valores: Object.fromEntries(c.campos.map((campo) => {
        const v = campo.valor(r, d);
        return [campo.clave, v === undefined || v === "" ? null : v];
      })),
    }));
    return { nombre: c.nombre, tabla: c.tabla, campos, filas: filasFramer };
  });
}
