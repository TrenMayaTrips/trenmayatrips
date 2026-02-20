

## Pagina de detalle de paquete (`/paquetes/:slug`)

Actualmente la pagina `/paquetes` muestra todos los paquetes en un grid con informacion expandible inline, pero no existe una pagina dedicada para ver cada paquete a detalle. Crearemos una pagina interior siguiendo el mismo patron que `DestinoDetalle.tsx`.

### Estructura de la pagina

1. **Hero parallax** con imagen del paquete, breadcrumb, badge de tipo, titulo, precio y rating
2. **Descripcion** general del paquete
3. **Metricas clave** en grid: duracion, grupo, dificultad, rating, estados
4. **Itinerario dia a dia** con timeline vertical estilo piramide escalonada (cada dia es un "escalon")
5. **Incluye / No incluye** en dos columnas con iconos Check/X
6. **Highlights** (destinos incluidos) en chips con EstelaCard
7. **Rating estacional** si el paquete lo tiene (grafico simple o indicadores)
8. **CTA final** con boton de cotizacion por WhatsApp
9. **Paquetes relacionados** del mismo tipo

### Identidad visual maya

- `GrecaDivider` entre secciones principales
- `MayaPattern` de fondo en secciones alternas
- `EstelaCard` en las tarjetas de itinerario y en la seccion de incluye/no incluye
- Timeline del itinerario con estetica de piramide escalonada (linea vertical jade con puntos numericos)

### Cambios tecnicos

| Archivo | Accion |
|---|---|
| `src/pages/PaqueteDetalle.tsx` | Crear -- pagina de detalle completa |
| `src/App.tsx` | Agregar ruta `/paquetes/:slug` |
| `src/pages/Packages.tsx` | Agregar `Link` al titulo/imagen de cada card apuntando a `/paquetes/:slug` |
| `src/components/layout/Header.tsx` | Agregar submenus de paquetes populares en navegacion |

### Flujo de datos

Se reutiliza el archivo `src/data/packages.ts` existente (slug, itinerary, includes, excludes, seasonalRating, etc.) y `src/data/package-images.ts` para las imagenes. No se requiere backend ni tablas nuevas.

