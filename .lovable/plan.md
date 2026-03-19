

## Funcionalidades a implementar antes de la migracion a HubSpot

Basado en el analisis del sitio y tus prioridades, estas son las funcionalidades que recomiendo implementar, organizadas por impacto.

---

### 1. Newsletter funcional

El formulario actual no hace nada. Conectarlo a la base de datos para capturar suscriptores.

**Cambios:**
- Crear tabla `newsletter_subscribers` (email, created_at) con RLS insert-only
- Crear Edge Function `subscribe-newsletter` con validacion y deduplicacion
- Actualizar `NewsletterSection.tsx` con estados de carga, exito y error
- Los emails quedan listos para sincronizar con HubSpot despues de la migracion

---

### 2. Pagina "Sobre nosotros"

Pagina institucional con historia, mision, valores y equipo.

**Archivos:**
- Crear `src/pages/SobreNosotros.tsx` con secciones: hero, historia/mision, valores (con iconografia maya), equipo
- Agregar ruta `/nosotros` en `App.tsx`
- Actualizar link en Footer (actualmente apunta a `#`)

---

### 3. Pagina "Sostenibilidad"

Compromiso ambiental y con comunidades mayas.

**Archivos:**
- Crear `src/pages/Sostenibilidad.tsx` con secciones: hero, compromisos ambientales, trabajo con comunidades, acciones concretas
- Agregar ruta `/sostenibilidad` en `App.tsx`
- Actualizar link en Footer

---

### 4. Pagina 404 con branding maya

La pagina actual es generica y sin navegacion. Redisenarla con la identidad del sitio.

**Cambios en `src/pages/NotFound.tsx`:**
- Integrar PageLayout (header + footer)
- Diseno con motivos mayas (glifo decorativo, greca)
- Sugerencias de destinos populares
- Boton de regreso al inicio
- Textos en espanol

---

### 5. Paginas legales

Obligatorio para sitios comerciales en Mexico.

**Archivos:**
- Crear `src/pages/AvisoPrivacidad.tsx` con contenido LFPDPPP
- Crear `src/pages/TerminosCondiciones.tsx`
- Agregar rutas `/aviso-de-privacidad` y `/terminos-y-condiciones` en `App.tsx`
- Agregar links en el Footer (seccion inferior)

---

### 6. SEO y meta tags dinamicos

Mejorar la presencia en buscadores y redes sociales.

**Cambios:**
- Crear componente `src/components/seo/SEOHead.tsx` usando `document.title` y meta tags dinamicos via `useEffect`
- Integrar en todas las paginas de detalle (destinos, experiencias, paquetes, blog, vagones)
- Datos: titulo, descripcion, imagen OG, URL canonica
- Agregar datos estructurados JSON-LD basicos (Organization, TouristTrip)

---

### 7. Scroll to top en navegacion

Actualmente al cambiar de pagina el scroll no se resetea.

**Cambios:**
- Crear `src/components/layout/ScrollToTop.tsx` usando `useLocation` + `useEffect`
- Montarlo dentro del `BrowserRouter` en `App.tsx`

---

### 8. Planificador del Home conectado

Los botones del planificador no hacen nada. Conectar el ultimo paso para abrir WhatsApp con el resumen.

**Cambios en `PlanificadorSection.tsx`:**
- Guardar selecciones en estado (destino, fechas, viajeros)
- En "Solicitar cotizacion", abrir WhatsApp con mensaje pre-llenado incluyendo las selecciones
- Alternativa: redirigir a `/itinerarios` con parametros pre-seleccionados

---

### 9. Links muertos en Footer

Actualizar los links que actualmente apuntan a `#`.

**Cambios en `Footer.tsx`:**
- "Nosotros" → `/nosotros`
- "Sostenibilidad" → `/sostenibilidad`
- "Trabaja con nosotros" → abrir mailto o formulario de contacto
- Agregar links legales en la barra inferior

---

### Resumen de archivos

| Archivo | Accion |
|---|---|
| `supabase/migrations/` | Nueva migracion para `newsletter_subscribers` |
| `supabase/functions/subscribe-newsletter/index.ts` | Crear Edge Function |
| `src/components/home/NewsletterSection.tsx` | Conectar formulario |
| `src/pages/SobreNosotros.tsx` | Crear pagina |
| `src/pages/Sostenibilidad.tsx` | Crear pagina |
| `src/pages/AvisoPrivacidad.tsx` | Crear pagina |
| `src/pages/TerminosCondiciones.tsx` | Crear pagina |
| `src/pages/NotFound.tsx` | Redisenar con branding |
| `src/components/seo/SEOHead.tsx` | Crear componente |
| `src/components/layout/ScrollToTop.tsx` | Crear componente |
| `src/components/home/PlanificadorSection.tsx` | Conectar con WhatsApp |
| `src/components/layout/Footer.tsx` | Corregir links, agregar legales |
| `src/App.tsx` | Agregar 4 rutas nuevas + ScrollToTop |
| Multiples paginas de detalle | Integrar SEOHead |

### Orden de implementacion sugerido

1. ScrollToTop + 404 (rapido, mejora inmediata en UX)
2. Newsletter funcional (captura de leads desde ya)
3. Planificador conectado (conversion)
4. Paginas institucionales (Nosotros, Sostenibilidad)
5. Paginas legales
6. SEO y meta tags
7. Footer actualizado (depende de que existan las paginas)
