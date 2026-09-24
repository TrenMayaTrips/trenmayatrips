# Contenido de catálogo que vive en el código

**Fase 1 del runbook.** Contenido que hoy está escrito en archivos TypeScript y no en Supabase. Es el insumo para la migración de datos pendiente. Regla de `CLAUDE.md`: nunca hardcodear contenido de catálogo en componentes.

## A. Archivos de datos que ya nadie usa (copias viejas)

Ningún archivo del sitio los importa; las páginas ya leen estas tablas de Supabase con los hooks de `src/hooks/`. Quedaron de la etapa de Lovable.

| Archivo | Contenido | Tabla equivalente |
|---|---|---|
| `src/data/experiences.ts` | 10 experiencias | `experiences` |
| `src/data/destinations.ts` | 5 estados + 16 destinos | `states_info`, `destinations` |
| `src/data/packages.ts` | 5 paquetes | `packages` |
| `src/data/routes.ts` | 5 rutas | `routes` |
| `src/data/stations.ts` | 34 estaciones | `stations` |
| `src/data/station-details.ts` | Detalle de 10 estaciones | `stations` |
| `src/data/wagon-classes.ts` | 3 clases de servicio | `wagon_classes` |
| `src/data/blog.ts` | 4 categorías + 9 artículos | `blog_posts`, `blog_categories` |

**Acción sugerida:** confirmar que la base tiene todo y borrarlos en la fase de código. No son fuente para el CMS de Framer.

## B. Contenido que solo existe en el código y se muestra en el sitio

Esto sí falta en Supabase y hay que migrarlo o eliminarlo.

| Archivo | Qué contiene | Dónde se ve | Destino sugerido |
|---|---|---|---|
| `src/data/experience-categories.ts` | Textos de las 4 categorías y 19 subcategorías (titulares, descripciones) y la lista `guarantees` | Solo `guarantees` se usa, en categorías y subcategorías | Garantías → contenido global; textos de categoría → confirmar que la base los tiene |
| `src/data/experience-itinerary.ts` | Descripciones y duraciones extra por paso del itinerario, para 9 experiencias | Pestaña Itinerario de T02 | Columna `itinerary` de `experiences` |
| `src/data/experience-train-connections.ts` | Estación más cercana por estado y 5 excepciones por experiencia | Bloque "Conexión con el Tren Maya" de T02 | Relación experiencia → estación en la base |
| `src/data/experience-reviews.ts` | Reseñas, desglose de calificación y distribución de estrellas | Sección de reseñas de T02 | **Ver alerta 1** |
| `src/data/authors.ts` | 5 perfiles de autor del blog | Caja de autor en T17 | Tabla `blog_authors` (ya existe) |
| `src/data/destination-gallery.ts` | Regla para armar la galería de un destino con fotos de experiencias del estado | Galería de T07 | Galería propia por destino en la base |
| `src/data/*-images.ts` y respaldos en `src/hooks/` | Imagen por slug | Todo el sitio | Columnas `featured_image` / `hero_image` en la base |

## C. Contenido escrito dentro de componentes

| Archivo | Qué contiene | Problema |
|---|---|---|
| `src/components/home/ExperienciasSection.tsx` | 4 tarjetas de categoría | Slugs distintos a los de categoría (ver `rutas-actuales.md`) |
| `src/components/home/DestinosSection.tsx` | 4 destinos destacados | Debería salir de la base |
| `src/components/home/RutasSection.tsx` | 4 rutas destacadas | Los nombres no coinciden con la ruta enlazada |
| `src/components/home/VagonesSection.tsx` | 3 clases con precio "Desde $800 / $1,500 / $3,200 MXN" | Precios fijos en código; pueden desfasarse de `wagon_classes` |
| `src/components/home/PlanificadorSection.tsx` | Destinos y periodos del planificador | |
| `src/components/home/TestimoniosSection.tsx` | 3 testimonios con nombre | **Ver alerta 1** |
| `src/components/contacto/MiniTestimonials.tsx` | 3 testimonios | **Ver alerta 1** |
| `src/components/contacto/TrustIndicators.tsx` | "500+ viajeros satisfechos", "4.8/5 en Google Reviews", "Respuesta promedio: 4 horas" | **Ver alerta 2** |
| `src/components/contacto/ContactFAQ.tsx` | Preguntas frecuentes por categoría | Es contenido de T18 Centro de ayuda |
| `src/pages/SobreNosotros.tsx` | Valores | Página institucional; puede quedarse en código |
| `src/pages/Sostenibilidad.tsx` | Compromisos | Página institucional; puede quedarse en código |
| `src/pages/NotFound.tsx` | Destinos populares | |
| `src/pages/Itinerarios.tsx`, `ItinerarioCompartido.tsx` | Tipos de viaje, duraciones, opciones de hospedaje | Opciones de la herramienta; pueden quedarse en código |

## Alertas

1. **Reseñas y testimonios sin fuente.** `experience-reviews.ts` tiene un juego de reseñas por defecto que se muestra en **todas** las experiencias. Solo `calakmul-biosfera` y `catamaran-isla-mujeres` tienen algo propio, y ninguna reseña indica de dónde viene. Los testimonios del home y de contacto tampoco tienen fuente. La regla del `00-LEEME.md` es "solo reseñas reales y con fuente". Nada de esto se copia al CMS de Framer.
2. **Cifras de confianza sin respaldo.** "500+ viajeros", "4.8/5 en Google Reviews" y el enlace `https://g.page/r/trenmayatrips/review` no se pudieron verificar desde el repo. Hay que confirmarlas o quitarlas.
