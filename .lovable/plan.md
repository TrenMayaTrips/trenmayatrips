

## Incorporar litografias de Catherwood como elemento visual distintivo

Las litografias de Frederick Catherwood (siglo XIX) son el complemento perfecto para la identidad maya del sitio. Su paleta sepia/jade natural armoniza con los colores del proyecto y aportan una capa de autenticidad historica que ninguna foto moderna puede replicar.

### Estrategia: "Tesoros escondidos"

Las litografias no deben competir con la fotografia moderna del sitio. Se usan como acentos decorativos en secciones donde aportan profundidad narrativa -- aparecen como vinettas, fondos sutiles o ilustraciones laterales que evocan la historia de la exploracion maya.

### Donde colocarlas

**1. CTA Final del Home (CTAFinalSection.tsx)**
- Actualmente es un bloque jade plano con texto centrado
- Transformar en layout de dos columnas: texto/botones a la izquierda, litografia a la derecha
- La litografia aparece con opacidad reducida (~70%), un tratamiento sepia/duotone via CSS, y un borde estilo estela
- Imagen: Las Monjas de Chichen Itza (la mas arquitectonica y monumental)
- En movil la litografia pasa a fondo sutil detras del texto

**2. Newsletter Section (NewsletterSection.tsx)**
- Agregar una litografia como vineta decorativa debajo del formulario
- Estilo: centrada, pequena (~200px alto), con opacidad baja y blend-mode multiply para que se funda con el fondo arena
- Imagen: El idolo roto de Copan (composicion horizontal, evocadora)
- Enmarcada con borde doble estilo EstelaCard

**3. Footer (Footer.tsx)**
- Agregar una franja decorativa arriba del footer con una litografia panoramica a ancho completo
- Estilo: altura fija (~180px), objeto cover, opacidad al 15-20%, como textura de fondo
- Imagen: Palenque Palace Courtyard (horizontal, atmos ferica)
- Se funde con el fondo jade-dark del footer via gradient overlay

**4. Seccion de Testimonios (TestimoniosSection.tsx)**
- Agregar una litografia como elemento decorativo lateral (posicion absoluta) en desktop
- Solo visible en pantallas grandes, a un lado, recortada y con opacidad baja
- Imagen: Izamal Jaguar (la mas misteriosa y evocadora)

**5. Paginas interiores -- CTA de destinos y paquetes**
- En los CTAs finales de DestinoDetalle y PaqueteDetalle, usar litografias como fondo sutil alternativo al MayaPattern
- Rotacion aleatoria entre las 6 imagenes para variedad

### Tratamiento visual consistente

Todas las litografias reciben el mismo tratamiento CSS:
- `mix-blend-mode: multiply` o `luminosity` segun fondo claro/oscuro
- `filter: sepia(30%) contrast(0.9)` para unificar tonos
- Opacidad controlada (15-70% segun contexto)
- Mascara de degradado en los bordes para fusion suave con el entorno
- Clase utilitaria reutilizable `.catherwood-lithograph` en index.css

### Archivos a crear/modificar

| Archivo | Accion |
|---|---|
| `src/assets/litografias/` | Copiar las 6 imagenes subidas a esta carpeta |
| `src/data/litografias.ts` | Crear -- array con metadata de cada litografia (titulo, autor, sitio, imagen) |
| `src/index.css` | Agregar clase utilitaria `.catherwood-lithograph` con los filtros CSS |
| `src/components/home/CTAFinalSection.tsx` | Redisenar con layout 2 columnas + litografia lateral |
| `src/components/home/NewsletterSection.tsx` | Agregar vineta decorativa de litografia |
| `src/components/home/TestimoniosSection.tsx` | Agregar litografia decorativa lateral en desktop |
| `src/components/layout/Footer.tsx` | Agregar franja decorativa con litografia panoramica |
| `src/pages/DestinoDetalle.tsx` | Usar litografia como fondo sutil en CTA final |
| `src/pages/PaqueteDetalle.tsx` | Usar litografia como fondo sutil en CTA final |

### Detalles de las imagenes

1. **Palenque Palace** -- horizontal, arquitectura entre selva. Para footer y fondos.
2. **Ruinas de Sabachtsche** -- vertical, greca Puuc detallada. Para vinetas.
3. **Idolo de Copan** -- vertical, estela monumental. Para vinetas y laterales.
4. **Idolo Roto de Copan** -- horizontal, atmosferica con agua. Para newsletter.
5. **Las Monjas, Chichen Itza** -- horizontal, fachada monumental. Para CTA principal.
6. **Izamal Jaguar** -- horizontal, misteriosa y oscura. Para testimonios.

