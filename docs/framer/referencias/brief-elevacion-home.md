# Brief de elevación visual — Home · Tren Maya Trips

## Contexto
Tren Maya Trips (TMT) es un operador turístico digital de la ruta del Tren Maya (5 estados: Quintana Roo, Yucatán, Campeche, Tabasco, Chiapas). El sitio está en producción, en español (es-MX), con tráfico orgánico real. Objetivo comercial del home: reservar experiencias individuales y llevar a cotización de paquetes/circuitos.

## El encargo
Genera **2–3 direcciones de elevación visual del home** — no un rediseño de marca ni un cambio de arquitectura. El sitio actual es correcto pero genérico; queremos que se sienta inconfundiblemente del Mundo Maya, con sofisticación editorial. **Elevar, no reinventar.**

## Sistema de diseño existente (base obligatoria)
- **Paleta**: fondo crema `#FAFAF7` · arena `#F5F0E8` / arena oscura `#E8DFD0` · jade `#2D6A4F` (oscuro `#1B4332`, claro `#40916C`) · oro `#D4A843` (claro `#E8C974`) · terracota `#BC4749` · carbón `#2B2D42` · gris `#6B7280`
- **Tipografía**: Playfair Display (títulos, acentos serif) + DM Sans (cuerpo, UI)
- **Detalles**: radios 12px, sombras suaves, mucho aire
- El sitio actual ya usa CTAs oro y acentos serif: consolidar, no contradecir

## La capa que falta — identidad maya (corazón del encargo)
Estos elementos están definidos como identidad de TMT pero **no existen aún en ninguna implementación**. Explorar cómo integrarlos con sutileza:
- **Greca escalonada** como sistema: divisores de sección, bordes, patrón de repetición
- **Estera Pop (petate)** como textura de fondos o tarjetas
- **Estelas y códices**: numeración de secciones, glifos como acentos gráficos
- **Litografías de Frederick Catherwood** como marcas de agua / texturas de fondo en secciones clave
- **Regla de tono**: museo + revista de viajes premium. Sofisticación editorial, jamás souvenir ni kitsch. Si un elemento grita, se baja la opacidad o se elimina.

## Estructura objetivo del home (del mockup oficial, en orden)
1. Barra utilitaria: Call Center · WhatsApp · Idioma
2. Nav: Experiencias, Destinos, Tren Maya, Paquetes, Planifica tu viaje + botón **Reservar** (siempre visible)
3. Hero: "Explora el Mundo Maya: experiencias únicas conectadas por tren" + carrusel de destinos + **pills de los 5 estados** como navegación primaria
4. Franja de propuestas de valor (5 ítems: tren con una reserva · itinerario perfecto · viaje asistido · guías locales certificados · mejor precio garantizado)
5. **Experiencias Top**: tabs de categoría (Aventura, Cultura, Gastronomía, Bienestar) + filtro por estado + cards con estado, título, precio "Desde $X p/p"
6. **Planificador de rutas**: mapa de la península con la ruta del tren (pieza distintiva)
7. **Paquetes destacados**: cards con CTA doble "Personalizar ruta" / "Ver detalles"
8. Por qué elegir TMT: experiencia local · todo en uno (tren + experiencias + hospedaje) · servicio personalizado
9. Reviews (Tripadvisor)
10. Inspiración y recursos (blog)
11. Newsletter
12. Footer completo (contacto, certificaciones, enlaces)

## Restricciones duras
- Conversión primero: "Reservar" y CTAs oro siempre protagonistas; nada que compita con ellos
- Mobile-first; contraste accesible (texto sobre fotos siempre legible)
- Performance: texturas ligeras (SVG/CSS), sin librerías pesadas
- No cambiar URLs, nombres de secciones ni contenido — solo la piel y la jerarquía visual
- es-MX en todos los textos

## Entregables pedidos
- **Dirección A — Elevación sobria**: el sistema actual llevado a su mejor versión (tipografía, aire, fotografía) + identidad maya en dosis mínimas
- **Dirección B — Identidad maya protagonista**: grecas como sistema estructural, Catherwood en fondos, numeración con glifos
- **Dirección C — Libre**: la propuesta del diseñador
- Por cada dirección: hero + 2 secciones (Experiencias Top y Planificador), en desktop y mobile

## Cómo usar este brief en Claude Design
1. Primero haz **web capture** del sitio actual (extrae paleta, tipografía y layout reales como punto de partida)
2. Sube este brief + las imágenes de los mockups como referencia
3. Pide las direcciones A/B/C — direcciones exploratorias, no pantallas finales
4. La dirección elegida se implementará después vía Claude Code, sección por sección, en el repo real
