

## Navegación mobile: eliminar hamburger, mejorar bottom nav con drawer "Más"

### Resumen

Eliminar el menú hamburguesa del header en mobile y reorganizar el BottomNav a 5 ítems: **Inicio, Explorar, Reservar, Blog, Más**. El ítem "Más" abre un Sheet/Drawer desde abajo con las secciones restantes (Tren Maya, Vagones, Contacto, Nosotros, etc.).

### Cambios

**1. `src/components/layout/Header.tsx`**
- Eliminar el bloque mobile: botón hamburguesa (líneas 143-153), menú desplegable completo (líneas 156-225), y los estados `isOpen`/`mobileExpanded` que ya no se usan en mobile.
- Mantener solo el logo en mobile (el teléfono ya está accesible via "Más" o WhatsApp FAB).
- Desktop queda intacto.

**2. `src/components/layout/BottomNav.tsx`**
- Cambiar los 5 ítems a:
  - 🏠 Inicio → `/`
  - 🧭 Explorar → `/destinos` (abre directamente la página de destinos como hub de exploración)
  - 📅 Reservar → `/itinerarios`
  - 📝 Blog → `/blog`
  - ⋯ Más → abre un Sheet con navegación completa
- El ítem "Más" no navega, sino que abre un `Sheet` (shadcn) desde abajo con:
  - Tren Maya (con sub-links a clases y rutas)
  - Contacto
  - Nosotros
  - Sostenibilidad
  - Botón de WhatsApp/Teléfono
  - Botón "Reservar ahora" destacado
- El Sheet usa la misma estética del sitio (fondo card, tipografía existente).
- El comportamiento de show/hide con scroll se mantiene igual.

### Detalle técnico

- Se usa el componente `Sheet` de shadcn (ya instalado) con `side="bottom"`.
- El estado del sheet se maneja localmente en BottomNav con `useState<boolean>`.
- El ítem "Más" muestra un icono `MoreHorizontal` de lucide.
- Al navegar desde el sheet, se cierra automáticamente.
- Se añade el icono `Compass` para Explorar y `Newspaper` para Blog.

### Archivos a modificar
- `src/components/layout/Header.tsx` — limpiar mobile menu
- `src/components/layout/BottomNav.tsx` — nuevos ítems + Sheet "Más"

