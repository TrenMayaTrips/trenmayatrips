# 04 · Colecciones del CMS de Framer

Estas 10 colecciones sirven para diseñar con contenido real. Son una **copia de muestra** de `tmt-production`: no se sincronizan y no son la fuente de verdad, que sigue siendo Supabase. Los tipos de campo usan los nombres de la interfaz de Framer, que está en inglés.

> **Actualización del 24-sep-2026.** La definición vigente de cada campo es `scripts/framer/contrato.mjs`; este documento es la referencia de diseño. El CMS de Framer ya no es una muestra: es una copia sincronizada de Supabase. Ver `flujo-diseno-datos.md`. Se agregaron tres campos:
> - **Estado vinculado** (Reference → Estados) en Experiencias, Destinos y Estaciones. Se deriva de la columna `state` y permite filtrar por estado, porque Framer no filtra campos Option contra otro registro.
> - **Subcategorías** (Multi Reference → Subcategorías) en Experiencias. Sale de la tabla nueva `experience_subcategory_links`.
> - **Destinos** (Multi Reference → Destinos) en Experiencias. Sale de la tabla nueva `experience_destination_links`; "Destino" sigue siendo el principal.

## Reglas de importación

- **Qué filas.** Solo las que tienen `status = published`. La tabla `states_info` no tiene estado; se importa completa.
- **Qué nunca se importa.** `net_price`, `wellet_code`, `provider_id`, `seo_title`, `seo_description`, los campos `_en`, `created_at`, `updated_at` y `sort_order`. Este último solo se usa para ordenar.
- **Tablas que no se tocan.** `contact_messages`, `newsletter_subscribers`, `saved_itineraries` y `user_roles` contienen datos personales o de sistema y no salen de Supabase.
- **Listas y campos JSON.** Las listas (incluye, destacados, etiquetas…) y los campos JSON (itinerarios, horarios, precios, amenidades, preguntas frecuentes…) se convierten a Formatted Text legible, con viñetas o subtítulos. Es suficiente para diseñar.
- **Galerías.** Hasta cuatro campos Image (Galería 1 a 4).
- **Imágenes.**
  1. Si la columna trae imagen, se usa esa.
  2. Si está vacía, se busca en el repo la imagen que corresponda al slug (fase 1 del runbook).
  3. Si tampoco hay, el campo queda vacío y el diseño muestra `FOTO PENDIENTE`.

---

## 1. Experiencias ← `experiences` · instancia `amanecer-maya-uxmal`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Título | `title` | Plain Text |
| Slug | `slug` | Slug |
| Resumen | `description` | Plain Text |
| Descripción | `long_description` | Formatted Text |
| Categoría | `category_id` | Reference → Categorías |
| Destino | `destination_id` | Reference → Destinos |
| Estado | `state_label` | Option (5 estados) |
| Estación más cercana | estación del destino (`nearest_station_id`) | Plain Text (derivado) |
| Duración | `duration` | Plain Text |
| Precio desde (MXN) | `price` | Number |
| Grupo | `group_size` | Plain Text |
| Idiomas | `languages` | Plain Text |
| Calificación | `rating` | Number |
| Número de reseñas | `reviews_count` | Number |
| Incluye | `includes` | Formatted Text |
| No incluye | `not_includes` | Formatted Text |
| Recomendaciones | `recommendations` | Formatted Text |
| Itinerario | `itinerary` | Formatted Text |
| Imagen principal | `featured_image` | Image |
| Galería 1 a 4 | `gallery` | Image |
| Destacada | `is_featured` | Toggle |
| Estado vinculado | `state` | Reference → Estados (derivado) |
| Subcategorías | `experience_subcategory_links` | Multi Reference → Subcategorías |
| Destinos | `experience_destination_links` | Multi Reference → Destinos |

## 2. Categorías ← `experience_categories` · instancia `cultural-patrimonio`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Nombre | `name` | Plain Text |
| Slug | `slug` | Slug |
| Ícono | `icon` | Plain Text |
| Descripción | `description` | Plain Text |
| Titular del hero | `hero_headline` | Plain Text |
| Texto del hero | `hero_description` | Plain Text |
| Imagen | `featured_image` | Image |
| Información cultural | `faq_cultural` | Formatted Text |
| Tips del experto | `faq_tips` | Formatted Text |

## 3. Subcategorías ← `experience_subcategories` · instancia `zonas-arqueologicas`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Nombre | `name` | Plain Text |
| Slug | `slug` | Slug |
| Categoría | `category_id` | Reference → Categorías |
| Ícono | `icon` | Plain Text |
| Descripción | `description` | Plain Text |
| Texto del hero | `hero_description` | Plain Text |
| Imagen | `featured_image` | Image |

## 4. Destinos ← `destinations` · instancia `bacalar`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Nombre | `name` | Plain Text |
| Slug | `slug` | Slug |
| Estado | `state_label` | Option (5 estados) |
| Tipo | `type` | Option: ciudad, arqueología, naturaleza, playa, pueblo |
| Frase | `tagline` | Plain Text |
| Descripción | `description` | Formatted Text |
| Imperdibles | `highlights` | Formatted Text |
| Estación más cercana | `nearest_station_id` | Reference → Estaciones |
| Tiempo de traslado | `travel_time` | Plain Text |
| Mejores meses | `best_months` | Plain Text |
| Imagen principal | `featured_image` | Image |
| Galería 1 a 4 | `gallery` | Image |
| Estado vinculado | `state` | Reference → Estados (derivado) |

## 5. Estados ← `states_info` · instancia `quintana-roo`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Nombre | `name` | Plain Text |
| Slug | `slug` | Slug |
| Capital | `capital` | Plain Text |
| Frase | `tagline` | Plain Text |
| Color | `color` | Color |
| Imagen | `featured_image` | Image |

## 6. Estaciones ← `stations` · instancia `merida`

Se importan las 34, porque alimentan el mapa y los recorridos. Solo las 10 con `has_detail_page` tienen página propia.

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Nombre | `name` | Plain Text |
| Slug | `slug` | Slug |
| Nombre completo | `full_name` | Plain Text |
| Subtítulo | `subtitle` | Plain Text |
| Estado | `state_label` | Option (5 estados) |
| Kilómetro | `km` | Number |
| Tipo | `type` | Option: principal, estación, paradero |
| Imagen | `image` | Image |
| Horario | `schedule` | Plain Text |
| Estacionamiento | `parking` | Plain Text |
| Accesibilidad | `accessibility` | Plain Text |
| Lo destacado | `highlights` | Formatted Text |
| Servicios | `services` | Formatted Text |
| Conexiones | `connections` | Formatted Text |
| Destinos cercanos | `nearby_destinations` | Formatted Text |
| Transporte local | `transport` | Formatted Text |
| Consejos | `tips` | Formatted Text |
| Tiene página propia | `has_detail_page` | Toggle |
| Estado vinculado | `state` | Reference → Estados (derivado) |

## 7. Rutas ← `routes` · instancia `cancun-tulum`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Origen | `origin` | Plain Text |
| Destino | `destination` | Plain Text |
| Slug | `slug` | Slug |
| Duración | `duration` | Plain Text |
| Paradas | `stops` | Number |
| Salidas diarias | `daily_departures` | Number |
| Insignia | `badge` | Plain Text |
| Precios por clase | `prices` | Formatted Text |
| Horarios | `schedules` | Formatted Text |
| Descripción | `description` | Formatted Text |
| Recorrido | `timeline` | Formatted Text |
| Imagen | `hero_image` | Image |
| Estados que atraviesa | `states_traversed` | Plain Text |
| Paisajes destacados | `scenic_highlights` | Plain Text |
| Consejos | `tips` | Formatted Text |

## 8. Paquetes ← `packages` · instancia `ruta-grandeza-maya`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Título | `title` | Plain Text |
| Slug | `slug` | Slug |
| Descripción | `description` | Formatted Text |
| Días | `duration_days` | Number |
| Precio desde (MXN) | `price` | Number |
| Tipo | `type` | Option: cultural, aventura, gastronómico, mixto |
| Dificultad | `difficulty` | Option: fácil, moderado, desafiante |
| Grupo | `group_size` | Plain Text |
| Ideal para | `best_for` | Plain Text |
| Estados | `states` | Plain Text |
| Imperdibles | `highlights` | Formatted Text |
| Incluye | `includes` | Formatted Text |
| No incluye | `excludes` | Formatted Text |
| Itinerario | `itinerary` | Formatted Text |
| Mejor temporada | `seasonal_rating` | Formatted Text |
| Calificación | `rating` | Number |
| Número de reseñas | `reviews_count` | Number |
| Imagen principal | `featured_image` | Image |
| Galería 1 a 4 | `gallery` | Image |
| Destacado | `is_featured` | Toggle |

## 9. Clases de servicio ← `wagon_classes` · instancia `xiinbal`

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Nombre | `name` | Plain Text |
| Slug | `slug` | Slug |
| Significado | `meaning` y `meaning_full` | Plain Text |
| Tipo | `type` | Plain Text |
| Precio base (MXN) | `price_base` | Number |
| Asientos | `seats` | Number |
| Configuración | `config` | Plain Text |
| Ancho de asiento | `seat_width` | Plain Text |
| Color | `color_token` | Plain Text |
| Descripción | `description` | Formatted Text |
| Imagen | `hero_image` | Image |
| Galería 1 a 4 | `gallery_images` | Image |
| Amenidades | `amenities` | Formatted Text |
| Comparativa | `comparison` | Formatted Text |
| Preguntas frecuentes | `faqs` | Formatted Text |

## 10. Blog ← `blog_posts` (más autor y categoría) · instancia `cenotes-sagrados-yucatan`

Autores y categorías no ocupan colecciones propias; se aplanan dentro del artículo para no pasar de 10 colecciones.

| Campo en Framer | Columna | Tipo |
|---|---|---|
| Título | `title` | Plain Text |
| Slug | `slug` | Slug |
| Extracto | `excerpt` | Plain Text |
| Categoría | `label` de `blog_categories` | Option (4 categorías) |
| Autor | `author_name` | Plain Text |
| Rol del autor | `author_role` | Plain Text |
| Fecha | `published_at` | Date |
| Minutos de lectura | `read_time` | Number |
| Destacado | `featured` | Toggle |
| Etiquetas | `tags` | Plain Text |
| Contenido | `content` | Formatted Text |
| Imagen principal | `featured_image` | Image |
