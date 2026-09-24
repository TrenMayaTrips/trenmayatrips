# 01 · Mapa de sitio normalizado

**Fuentes:** los 7 mapas de sitio de octubre de 2024 (`referencias/mapas-de-sitio/`), cruzados con la base verificada `tmt-production` (julio de 2026). Donde difieren, el diseño usa lo que existe en la base y la diferencia queda anotada. Los códigos T01–T21 remiten a `02-plantillas.md`.

**URLs.** Rutas actuales verificadas en el sitio en vivo: `/`, `/tren-maya`, `/blog`, `/destinos` y `/rutas/cancun-tulum`. El resto se extrae de `src/App.tsx` en la fase 1 del runbook. El sitio nuevo conserva las URLs actuales tal cual; cualquier cambio de URL necesita una redirección 301.

## Árbol de páginas

- **Inicio** — T01
- **Experiencias** — T03
  - **Cultural y patrimonio** — T04
    - Subcategorías (T04, variante subcategoría): Zonas arqueológicas, Museos y galerías, Artesanías tradicionales, Ceremonias mayas, Danzas y tradiciones
  - **Aventura y naturaleza** — T04
    - Subcategorías: Cenotes y ríos subterráneos, Snorkel y buceo, Senderismo en selva, Observación de aves, Deportes acuáticos
  - **Gastronómico** — T04
    - Subcategorías: Clases de cocina maya, Tours de mercados, Catas de bebidas tradicionales, Experiencias en haciendas, Cocina callejera auténtica
  - **Bienestar y relajación** — T04
    - Subcategorías: Spas y temazcales, Retiros de yoga, Terapias holísticas, Ceremonias de sanación
  - *Solo en el mapa de 2024, no en la base:* Fotografía y arte, Familiar, Lujo y exclusividad (decisión pendiente)
  - **Cada experiencia** (12 en la base) — T02
- **Destinos** — T05
  - **Por estado:** Quintana Roo, Yucatán, Campeche, Tabasco, Chiapas — T06
  - **Cada destino** (16 en la base) — T07
  - **Por tipo** (mapa de 2024): Playas y costas, Ciudades coloniales, Naturaleza y aventura, Rutas temáticas — secciones de T05
- **El Tren Maya** — T08
  - **Rutas** (5 en la base: Cancún–Mérida, Cancún–Tulum, Mérida–Palenque, Mérida–Campeche, Tulum–Bacalar) — T09
  - **Estaciones** (34 en la base; 10 con página propia: Cancún, Playa del Carmen, Tulum, Bacalar, Valladolid, Chichén Itzá, Izamal, Mérida, Campeche, Palenque) — T10
  - **Clases de servicio:** Xiinbal, Janal, P'atal — T11
  - Horarios, conexiones, preguntas frecuentes, políticas y accesibilidad — secciones de T08 y artículos de T18
- **Planifica tu viaje**
  - **Planificador de rutas** — T12
  - **Paquetes** — T13 (filtros por duración, por tipo y personalizados)
    - **Cada paquete** (5 en la base) — T14
  - Servicios (hospedaje, transportación, tours y guías) y ofertas (temporada baja, reserva anticipada, grupos) — secciones de T13 mientras no tengan contenido propio
  - **Reservar / cotización** — T15
- **Blog** — T16
  - Categorías en la base: Descubre el Mundo Maya, Destinos Mágicos, Guías Prácticas, Gastronomía Regional
  - **Cada artículo** (9 en la base) — T17
- **Centro de ayuda** — T18. Absorbe la antigua Guía práctica: antes de viajar, reservaciones, el Tren Maya, guías por destino, experiencias y tours, servicios, sostenibilidad y cultura, soporte.
- **Nosotros** — T19
- **Contacto** — T20
- **Legales** — T21

**Fuera de Framer por ahora** (se diseñan en la fase de código): Mi cuenta (reservaciones e itinerarios guardados), panel de administración y checkout nativo.

## Plan de contenido de 2024 (referencia, no bloquea el diseño)

El mapa de destinos de 2024 contempla muchos más destinos que los 16 de la base. Las plantillas T06 y T07 deben escalar a este volumen sin rediseño.

| Estado | Zonas arqueológicas | Destinos turísticos | Pueblos mágicos |
|---|---|---|---|
| Chiapas | Palenque, Yaxchilán, Bonampak, Toniná, Chinkultic | Palenque, San Cristóbal de las Casas, Cascadas de Agua Azul, Cañón del Sumidero, Chiapa de Corzo | Palenque, Chiapa de Corzo, Comitán |
| Tabasco | Comalcalco, La Venta, Pomoná, Moral-Reforma | Villahermosa, Paraíso, Frontera, Pantanos de Centla, Tapijulapa | Villa Tapijulapa, Frontera, Teapa |
| Campeche | Edzná, Calakmul, Becán, Xpuhil, Balamkú | Ciudad de Campeche, Champotón, Ciudad del Carmen, Palizada | Palizada, Isla Aguada, Candelaria |
| Yucatán | Chichén Itzá, Uxmal, Mayapán, Ek Balam, Dzibilchaltún | Mérida, Puerto Progreso, Celestún, Ruta Puuc, Reserva de Ría Lagartos | Valladolid, Izamal, Sisal, Maní |
| Quintana Roo | Tulum, Cobá, Muyil, Kohunlich, Dzibanché | Cancún, Riviera Maya, Playa del Carmen, Tulum, Bacalar, Mahahual, Holbox, Costa Maya | Tulum, Bacalar, Cozumel, Isla Mujeres |

**Por tipo de destino** (mapa de 2024):

- **Playas y costas:** Caribe Mexicano, Golfo de México, Riviera Maya, Costa Esmeralda
- **Ciudades coloniales:** Mérida, Campeche, San Cristóbal, Valladolid
- **Naturaleza y aventura:** reservas de la biosfera, cenotes, selvas, manglares, ríos y lagunas
- **Rutas temáticas:** Ruta de los Cenotes, Ruta Puuc, Ruta del Cacao, Ruta del Jaguar, Ruta de las Haciendas
