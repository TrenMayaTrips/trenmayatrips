# Paquete de traspaso a Framer · Tren Maya Trips

Este paquete reúne todo lo que TMT ya tiene definido (mapa de sitio, plantillas, sistema de diseño y contenido real) para arrancar el diseño en Framer sin partir de un lienzo en blanco.

La regla de fondo: **en Framer se diseña, en código se vive.** Framer es la herramienta de diseño. El sitio de producción se reconstruye después en código, leyendo todo de Supabase y conservando las URLs actuales. Nada de lo que se haga en Framer se publica como sitio de producción.

## Cómo se usa

1. **Joel:** crea en Framer un proyecto vacío llamado `TMT — Diseño 2026`.
2. **Claude Code** (app de escritorio, pestaña Code, con el repo abierto): descomprime este paquete en `docs/framer/` dentro de una rama nueva llamada `docs/framer-pack` y haz commit.
3. **Conexión con Framer:** en Claude Code ejecuta `npx @framer/agent setup` y después el comando `/framer` para conectar el proyecto. La autorización se da desde el navegador.
4. **Arranque:** pídele a Claude Code: *"Ejecuta docs/framer/05-runbook-claude-code.md fase por fase. Detente al final de cada fase y repórtame."*
5. **Diseño:** con el esqueleto listo, Joel y el diseñador diseñan a mano en Framer. Se empieza por las dos plantillas P1: Home y Detalle de experiencia.

Sobre el plan de Framer: empieza con el gratuito. Si colaborar con tu diseñador o trabajar con ramas requiere plan de pago, contrátalo mensual y solo mientras dure la fase de diseño.

## Contenido del paquete

| Archivo | Qué contiene |
|---|---|
| `01-mapa-de-sitio.md` | Árbol de páginas normalizado a partir de los 7 mapas de 2024, cruzado con la base, con la plantilla que usa cada página |
| `02-plantillas.md` | Las 21 plantillas: objetivo, datos, instancia de diseño y secciones en orden |
| `03-sistema-de-diseno.md` | Paleta, contraste, tipografía, capa de identidad maya, movimiento, fotografía y lo que dejamos atrás |
| `04-cms-colecciones.md` | 10 colecciones del CMS de Framer que reflejan las tablas de Supabase, para diseñar con contenido real |
| `05-runbook-claude-code.md` | Instrucciones para que Claude Code arme el esqueleto en Framer, fase por fase |
| `referencias/` | Mockups originales, mapas de sitio, mockups de interiores (HTML) y el brief de elevación del home |

## Reglas del proyecto (para personas y agentes)

- Framer es herramienta de diseño: nunca se publica con dominio propio ni se usa como producción.
- La fuente de verdad del contenido es Supabase (`tmt-production`). La copia en el CMS de Framer es una muestra para diseñar y no se mantiene sincronizada.
- Solo los 5 estados de la ruta: Quintana Roo, Yucatán, Campeche, Tabasco y Chiapas.
- Todo el diseño va en español (es-MX). La base ya tiene campos en inglés para una versión futura; contempla el selector de idioma en la navegación.
- Se diseña solo lo que pueda reproducirse en código. Los efectos nativos de Framer sí, porque corren sobre la librería open source `motion`. Los componentes de terceros del marketplace, no.
- No se inventa contenido. Lo que falte se marca `PENDIENTE` de forma visible.
- Los precios netos (`net_price`), los códigos de Wellet y los datos de proveedores nunca salen de Supabase.
- Solo reseñas reales y con fuente. Nada de testimonios de relleno.

## Decisiones pendientes detectadas al armar el paquete

Ninguna bloquea el arranque del diseño, pero todas deben resolverse antes de la fase de código.

1. **Categorías de experiencia.** El mapa de 2024 define 7 categorías y la base tiene 4. Faltan Fotografía y arte, Familiar, y Lujo y exclusividad. ¿Siguen en el plan? El diseño arranca con las 4 de la base.
2. **Experiencias y subcategorías.** La tabla `experiences` solo se relaciona con la categoría, no con la subcategoría. Las páginas de subcategoría necesitan esa relación.
3. **Fotografía.** Ninguna experiencia tiene `featured_image` en la base. Las fotos tendrán que venir de los archivos del repo o de una biblioteca fotográfica nueva. Es el factor que más va a pesar en la calidad del diseño (ver `03-sistema-de-diseno.md`).
4. **Categorías del blog.** El mapa de 2024 lista 5 y la base tiene 4 (Descubre el Mundo Maya, Destinos Mágicos, Guías Prácticas y Gastronomía Regional). Se diseña con las de la base.
5. **"Mejor precio garantizado".** La propuesta de valor del home lo promete. Requiere una política publicada que lo respalde.
6. **Frontend de destino.** La propuesta es Next.js sobre Vercel. Se formaliza en un registro de decisión de arquitectura (ADR) antes de la fase de código.

## Texto para agregar a CLAUDE.md

La fase 0 del runbook lo agrega al final de `CLAUDE.md`:

```markdown
## Iniciativa activa: rediseño en Framer → reconstrucción en código
- Framer es la herramienta de diseño (proyecto "TMT — Diseño 2026"); nunca se publica como producción.
- Paquete de traspaso y especificaciones en `docs/framer/` (mapa, plantillas, sistema de diseño, CMS, runbook).
- Con el diseño aprobado, el frontend se reconstruye de cero (destino propuesto: Next.js en Vercel, pendiente de ADR),
  con las mismas URLs actuales y leyendo todo el contenido de tmt-production.
- El sitio actual sigue en producción sin cambios hasta el cutover.
```
