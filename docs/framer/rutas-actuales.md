# Rutas actuales del sitio

**Fase 1 del runbook.** Extraído de `src/App.tsx` (rama `main`, commit `8099f6c`). No existe `public/sitemap.xml` y `robots.txt` no declara ninguno. Plantillas según `01-mapa-de-sitio.md` y `02-plantillas.md`.

## Tabla de rutas

| Ruta | Página (`src/pages`) | Plantilla | Notas |
|---|---|---|---|
| `/` | `Index` | T01 Home | |
| `/experiencias` | `Experiencias` | T03 Hub de experiencias | |
| `/experiencias/:slugOrCategory` | `ExperienciaCategoria` | T04 Categoría **o** T02 Detalle de experiencia | La misma URL sirve dos plantillas: si el slug es de categoría, muestra T04; si es de experiencia, muestra `ExperienciaDetalle` (T02). |
| `/experiencias/:categorySlug/:subcategorySlug` | `ExperienciaSubcategoria` | T04 (variante subcategoría) | |
| `/destinos` | `Destinos` | T05 Hub de destinos | Los 5 estados se eligen como filtro dentro de esta página. |
| `/destinos/:slug` | `DestinoDetalle` | T07 Destino | Si el slug no existe, redirige a `/destinos`. |
| `/tren-maya` | `TrenMaya` | T08 El Tren Maya | |
| `/tren-maya/rutas/:slug` | `RutaDetalle` | T09 Ruta | |
| `/tren-maya/estaciones/:slug` | `EstacionDetalle` | T10 Estación | |
| `/tren-maya/clases/:slug` | `VagonDetalle` | T11 Clase de servicio | |
| `/itinerarios` | `Itinerarios` | T12 Planificador de rutas | Usa la función `save-itinerary`. |
| `/itinerarios/:code` | `ItinerarioCompartido` | T12 (estado 4: itinerario compartido) | |
| `/paquetes` | `Packages` | T13 Hub de paquetes | |
| `/paquetes/:slug` | `PaqueteDetalle` | T14 Paquete | |
| `/blog` | `Blog` | T16 Blog | |
| `/blog/:slug` | `BlogArticle` | T17 Artículo | |
| `/nosotros` | `SobreNosotros` | T19 Nosotros | |
| `/contacto` | `Contacto` | T20 Contacto | Usa la función `send-contact`. |
| `/aviso-de-privacidad` | `AvisoPrivacidad` | T21 Legales | |
| `/terminos-y-condiciones` | `TerminosCondiciones` | T21 Legales | |
| `/sostenibilidad` | `Sostenibilidad` | **Sin plantilla** | Ver abajo. |
| `/login` | `Login` | **Sin plantilla** | Fuera de Framer (Mi cuenta / admin). |
| `/.lovable/oauth/consent` | `OAuthConsent` | **Sin plantilla** | Ruta técnica de Lovable. No es página pública. |
| `*` | `NotFound` | **Sin plantilla** | Página 404. |

## Rutas que no encajan en ninguna plantilla

1. **`/sostenibilidad`.** Página propia en el sitio actual. El mapa de sitio manda "sostenibilidad y cultura" como tema dentro de T18 Centro de ayuda. Si se absorbe ahí, la URL actual necesita redirección 301. Otra opción: mantenerla como página estática con la plantilla de T19.
2. **`*` (404).** No hay plantilla de error. Conviene diseñarla (el sitio actual lista destinos populares en ella).
3. **`/login` y `/.lovable/oauth/consent`.** Fuera del alcance de Framer, como indica el mapa de sitio.

## Plantillas sin ruta actual

| Plantilla | Situación |
|---|---|
| T06 Estado | No hay URL por estado. Hoy los estados son un filtro dentro de `/destinos`. Crear `/destinos/<estado>` chocaría con `/destinos/:slug` si algún destino compartiera slug con un estado (en `src/data/destinations.ts`, `campeche` es estado y el destino es `campeche-ciudad`, así que hoy no chocan). |
| T15 Reservar / cotización | No hay página. Hoy la cotización se pide por WhatsApp desde `PaqueteDetalle` y por el formulario de `/contacto`. |
| T18 Centro de ayuda | No hay página. Las preguntas frecuentes viven dentro de `/contacto` (`ContactFAQ`). |

## Discrepancias con `01-mapa-de-sitio.md`

1. **Rutas del tren.** El mapa dice que `/rutas/cancun-tulum` es una URL verificada en el sitio en vivo. En el código, las rutas viven en `/tren-maya/rutas/:slug`, y `/rutas/...` cae en la página 404. Hay que confirmar cuál es la URL que Google tiene indexada antes de la fase de código.
2. **Paquetes.** En el mapa, Paquetes cuelga de "Planifica tu viaje"; en el código es `/paquetes`, en la raíz. Es solo una diferencia de navegación, no de URL.
3. **Clases de servicio.** El mapa las pone bajo El Tren Maya y el código lo confirma (`/tren-maya/clases/:slug`). El slug de P'atal es `patal`, sin apóstrofo.

## Hallazgos de SEO y enlaces

- **No hay sitemap.** Ni `public/sitemap.xml` ni referencia en `robots.txt`. Con tráfico orgánico real, conviene generarlo en la fase de código.
- **Enlace roto.** `src/components/contacto/TrustIndicators.tsx` enlaza a `/aviso-privacidad`; la ruta real es `/aviso-de-privacidad`.
- **Slugs de categoría en el home.** `src/components/home/ExperienciasSection.tsx` enlaza a `/experiencias/cultura-patrimonio`, `/experiencias/naturaleza-aventura`, `/experiencias/gastronomia` y `/experiencias/bienestar`. Los slugs de categoría del código son `cultural-patrimonio`, `aventura-naturaleza`, `gastronomico` y `bienestar`. No se pudo confirmar contra Supabase (ver reporte de la fase 1); si la base usa los mismos que el código, tres de las cuatro tarjetas del home no encuentran su categoría y redirigen a `/experiencias`.
- **Rutas del home.** `src/components/home/RutasSection.tsx` pone nombres propios que no coinciden con la ruta a la que enlazan; por ejemplo, "Ruta Puuc" enlaza a `cancun-merida` y "Selva y Cacao" a `merida-campeche`.
