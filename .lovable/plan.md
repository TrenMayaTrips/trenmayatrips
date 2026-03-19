

## Header mobile: Logo centrado + icono de búsqueda

### Cambios en `src/components/layout/Header.tsx`

En la vista mobile (`isMobile`), el header actualmente solo muestra el logo alineado a la izquierda con el resto del espacio vacío. Se reestructurará así:

**Layout mobile (3 columnas con flexbox):**
- **Izquierda**: Espacio vacío (o spacer invisible para balancear)
- **Centro**: Logo centrado
- **Derecha**: Icono de búsqueda (`Search` de lucide-react)

El icono de búsqueda abrirá un overlay/modal de búsqueda simple donde el usuario puede escribir y se filtran destinos, experiencias y rutas del sitio. Se implementará como un panel que se desliza desde arriba o un dialog.

**Desktop** permanece igual (logo izquierda + nav + Reservar).

### Nuevo componente: `src/components/layout/SearchOverlay.tsx`

Un overlay a pantalla completa (o casi) con:
- Input de texto con autofocus
- Búsqueda local (sin backend) filtrando sobre los datos existentes en `src/data/destinations.ts`, `src/data/experiences.ts` y `src/data/routes.ts`
- Resultados agrupados por categoría (Destinos, Experiencias, Rutas)
- Cada resultado es un Link que navega y cierra el overlay
- Botón de cerrar (X)

### Resumen de archivos a modificar/crear

1. **`src/components/layout/Header.tsx`** — Reestructurar mobile: logo centrado, icono Search a la derecha, estado para abrir overlay
2. **`src/components/layout/SearchOverlay.tsx`** — Nuevo: panel de búsqueda con filtrado local sobre datos existentes

### Detalles técnicos

- Mobile header usa `justify-between` con 3 hijos: spacer `w-10`, logo, botón Search `w-10`
- Se reduce la altura mobile a `h-14` para ser más compacto
- El SearchOverlay usa `AnimatePresence` + `motion.div` para animación de entrada/salida
- Búsqueda case-insensitive sobre `name`/`title` de destinos, experiencias y rutas
- Desktop header no cambia

