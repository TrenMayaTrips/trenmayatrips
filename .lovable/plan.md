
## Enriquecer las paginas de detalle de rutas

Las paginas de ruta actuales (`/tren-maya/rutas/:slug`) tienen la informacion basica bien cubierta (timeline, precios, horarios, FAQs), pero les falta contenido visual y contextual que ayude al viajero a imaginar el recorrido y tomar una decision. Vamos a agregar varias secciones nuevas.

---

### Nuevas secciones a agregar

**1. Hero visual con imagen de fondo**
- Reemplazar el hero actual (gradiente plano) por un `ParallaxHero` con una imagen representativa de la ruta (origen o destino)
- Mantener el breadcrumb, badge, titulo y stats encima

**2. Destinos en la ruta**
- Grid de cards con foto de cada destino que se puede visitar desde las paradas de la ruta
- Cada card muestra nombre, tagline, tipo (playa/arqueologia/pueblo), tiempo desde la estacion
- Clic lleva a `/destinos/:slug`
- Se cruzan los datos de `destinations.ts` con los estados que toca la ruta

**3. Experiencias recomendadas**
- Seccion con experiencias filtradas por los estados que cruza la ruta
- Maximo 4-6 cards con foto, titulo, precio y duracion
- Reutiliza el patron de `DestinoExperiencias`

**4. Mapa visual del tramo**
- Mini-mapa SVG mostrando solo el tramo de esta ruta destacado sobre la silueta de la peninsula
- Reutiliza coordenadas de `TrenMayaRouteMap` pero resaltando solo las paradas de esta ruta

**5. Consejos practicos**
- Seccion con tips especificos por ruta en `EstelaCard`:
  - Mejor asiento (ventanilla derecha/izquierda segun paisaje)
  - Que llevar
  - Conexiones de transporte al llegar
  - Mejor horario de salida

**6. Rutas relacionadas**
- Al final, antes del CTA, mostrar 2-3 rutas que conectan con el origen o destino de la ruta actual
- Cards horizontales con badge, duracion y precio desde

---

### Cambios tecnicos

| Archivo | Accion |
|---|---|
| `src/data/routes.ts` | Agregar campos: `heroImage`, `statesTraversed`, `tips` (array de consejos practicos), y `scenicHighlights` (texto descriptivo del paisaje) |
| `src/pages/RutaDetalle.tsx` | Reestructurar con las 6 secciones nuevas, usar `ParallaxHero`, agregar seccion de destinos, experiencias, mapa, tips y rutas relacionadas |
| `src/components/routes/RutaDestinos.tsx` | Crear -- grid de destinos accesibles desde la ruta |
| `src/components/routes/RutaMiniMap.tsx` | Crear -- mapa SVG mini que destaca solo el tramo de la ruta |
| `src/components/routes/RutaTips.tsx` | Crear -- grid de consejos practicos con iconos |

### Identidad visual maya

- `GrecaDivider` entre cada seccion principal
- `MayaPattern` sutil en fondo de la seccion de tips
- `EstelaCard` para las cards de consejos y para el contenedor del mapa
- Timeline existente se mantiene pero con iconos de destino en las paradas principales

### Flujo de datos

Todo se resuelve con datos existentes en `src/data/`:
- `destinations.ts` + `destination-images.ts` para las cards de destinos
- `experiences.ts` para las experiencias filtradas por estado
- `stations.ts` para las coordenadas del mapa
- Los nuevos campos (`tips`, `statesTraversed`, `heroImage`) se agregan directamente en `routes.ts`

No se requiere backend ni tablas nuevas.
