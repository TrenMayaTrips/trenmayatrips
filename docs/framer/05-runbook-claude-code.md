# 05 · Runbook para Claude Code

**Para:** Claude Code, conectado al repo de TMT y al proyecto de Framer `TMT — Diseño 2026`.

**Cómo se ejecuta:** fase por fase. Al terminar cada fase, detente, resume lo que hiciste y espera la aprobación de Joel antes de seguir.

## Reglas para el agente

**Antes de empezar**
- Lee primero `CLAUDE.md` y `docs/framer/00-LEEME.md`.

**En Framer**
- Todo cambio ocurre en la rama que Framer crea para el agente.
- Nunca publiques el sitio de Framer ni le conectes un dominio.

**Supabase (solo lectura)**
- No escribas, no migres y no toques políticas.
- Lee los datos con la URL y la llave publicable del `.env` del repo, vía REST: `/rest/v1/<tabla>?select=...&status=eq.published`. Las políticas RLS ya permiten la lectura pública del catálogo.
- Si el MCP de Supabase está configurado, úsalo solo en modo de lectura.

**Contenido**
- Nunca copies a Framer las columnas excluidas en `04-cms-colecciones.md` ni las tablas con datos personales.
- No inventes contenido. Lo que falte se marca `PENDIENTE`.
- Español de México y solo los 5 estados de la ruta.

**Repo**
- Trabaja en la rama `docs/framer-pack`. Nada va directo a `main`.

---

## Fase 0 · Preparación en el repo

1. Crea la rama `docs/framer-pack` a partir de `main`.
2. Descomprime el paquete en `docs/framer/`. Joel te dará la ruta del archivo zip.
3. Agrega al final de `CLAUDE.md` el bloque "Iniciativa activa" que está en `00-LEEME.md`.
4. Haz commit con el mensaje `docs: paquete de traspaso a Framer`.
5. Instala el puente con Framer ejecutando `npx @framer/agent setup`. Después, Joel ejecuta `/framer` y autoriza el proyecto `TMT — Diseño 2026` desde el navegador.

**Parada 0:** confirma la rama, el commit y que la conexión con Framer está activa.

## Fase 1 · Inventario en el repo, sin tocar Framer

1. **Rutas reales.** Extrae todas las rutas de `src/App.tsx`, y de `public/sitemap.xml` si existe.
   - Asigna a cada ruta su plantilla (T01 a T21) según `01-mapa-de-sitio.md`.
   - Guarda la tabla en `docs/framer/rutas-actuales.md`.
   - Señala las rutas que no encajen en ninguna plantilla.
2. **Imágenes.** Localiza las imágenes del repo (`src/assets`, `public`) y relaciónalas con los slugs de experiencias, destinos, paquetes, rutas, estaciones y artículos.
   - Guarda la relación en `docs/framer/imagenes-disponibles.md`.
   - Pon al final los slugs que no tienen imagen.
3. **Contenido escrito en el código.** Lista el contenido de catálogo que todavía viva en archivos TypeScript y no en Supabase. Es el insumo para la migración de datos pendiente.

**Parada 1:** reporta las tres listas y las discrepancias con el mapa de sitio.

## Fase 2 · Cimientos en Framer

1. Crea los estilos de color con los nombres y valores de la paleta de `03-sistema-de-diseno.md`.
2. Crea los estilos de texto de la escala tipográfica, con Playfair Display y DM Sans y con sus valores de escritorio y teléfono.
3. Confirma los tamaños de diseño: 1200, 810 y 390.

**Parada 2:** lista de estilos creados.

## Fase 3 · CMS con contenido real

1. **Crea las 10 colecciones** con los campos exactos de `04-cms-colecciones.md`, en este orden para que las referencias funcionen:
   1. Estados
   2. Estaciones
   3. Categorías
   4. Subcategorías
   5. Destinos
   6. Experiencias
   7. Rutas
   8. Paquetes
   9. Clases de servicio
   10. Blog
2. **Importa las filas publicadas desde Supabase** aplicando las reglas de importación:
   - aplica las exclusiones;
   - convierte listas y JSON a Formatted Text;
   - toma las imágenes según el inventario de la fase 1.
3. **Verifica los conteos.** Compara las filas importadas con las filas publicadas en Supabase. Como referencia, la base completa tiene 5 estados, 34 estaciones, 4 categorías, 19 subcategorías, 16 destinos, 12 experiencias, 5 rutas, 5 paquetes, 3 clases de servicio y 9 artículos. Si alguna tabla tiene filas no publicadas, repórtalo.

**Parada 3:** tabla de conteos importados contra esperados.

## Fase 4 · Esqueleto de páginas

1. **Crea una página por plantilla**, de T01 a T21.
   - Como páginas de colección del CMS: T02, T04 (categoría y subcategoría), T06, T07, T09, T10, T11, T14 y T17.
   - Como páginas estáticas: todas las demás.
2. **Arma las secciones.** En cada página, crea las secciones en el orden de `02-plantillas.md` como marcos con nombre, por ejemplo `T02 / Panel de reserva`.
   - Trabaja en baja fidelidad: estructura, jerarquía y contenido real conectado al CMS.
   - Usa los estilos de la fase 2.
3. **No apliques la capa de identidad maya ni efectos de movimiento.** Eso es trabajo del diseñador.
4. **Marca cada página** con un aviso visible: `Esqueleto — diseño pendiente`.
5. **Construye los componentes compartidos** (lista al final de `02-plantillas.md`) como componentes básicos de Framer, para que el diseñador los refine una sola vez.

**Parada 4:** lista de páginas y componentes creados.

## Fase 5 · Reporte

1. Crea `docs/framer/reporte-esqueleto.md` con:
   - qué se creó en Framer;
   - los conteos del CMS;
   - los slugs sin imagen;
   - las discrepancias entre el mapa de sitio, la base y las rutas reales;
   - las preguntas abiertas para Joel.
2. Haz commit en `docs/framer-pack` y sube la rama. Si la CLI de GitHub está disponible, abre un pull request hacia `main` para revisión.

**Parada final.**

---

## Después del runbook (para Joel y el diseñador)

- **Orden de diseño:** T01 Home y T02 Detalle de experiencia primero. Después P2, P3 y P4.
- **Revisión de cada plantilla terminada:**
  - contra `02-plantillas.md`: secciones y objetivo;
  - contra `03-sistema-de-diseno.md`: contraste, capa de identidad y movimiento.
- **Paso a código:** cuando una plantilla se aprueba, queda lista para la fase de código. Claude Code la leerá directamente del proyecto de Framer para implementarla en el repo, con las mismas URLs y leyendo el contenido de Supabase.
