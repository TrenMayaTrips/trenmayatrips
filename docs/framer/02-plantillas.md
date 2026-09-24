# 02 · Plantillas

Se diseñan plantillas, no páginas. Cada plantilla se diseña con una instancia real de la base y escala al resto a través del CMS. En total son 21 plantillas, cada una en los tres tamaños de Framer: escritorio (1200), tableta (810) y teléfono (390).

**Prioridades**
- **P1** — lo primero, porque es lo que más vende: Home y Detalle de experiencia.
- **P2** — el catálogo.
- **P3** — el tren y la planeación del viaje.
- **P4** — contenido y soporte.

**Elementos globales** en todas las plantillas: barra utilitaria (centro de llamadas, WhatsApp e idioma), navegación con el botón Reservar siempre visible, botón flotante de WhatsApp, newsletter y footer (contacto, certificaciones, enlaces rápidos y legales).

Las secciones se listan en el orden en que aparecen en la página. El orden es parte de la especificación; la forma visual de cada sección es libre para el diseño.

---

## T01 · Home — P1

**Objetivo:** orientar e inspirar en segundos y llevar a una de dos acciones: reservar una experiencia o pedir cotización de un circuito.
**Datos:** Experiencias (destacadas), Estados, Paquetes, Rutas y Blog.
**Referencias:** `referencias/mockups/01-home.jpg` y `referencias/brief-elevacion-home.md`, con las direcciones A, B y C.

**Pregunta de diseño.** ¿Cuál es el momento memorable? El candidato natural es la línea del tren trazándose sobre la península y conectando los 5 estados, porque es lo que ningún competidor puede mostrar. Una sola pieza memorable; todo lo demás, sobrio.

**Secciones**
1. Barra utilitaria y navegación.
2. Hero: titular y acceso por los 5 estados.
3. Propuesta de valor: tren con una reserva, itinerario a la medida, viaje asistido, guías locales certificados y mejor precio garantizado (este último requiere política publicada).
4. Experiencias top: pestañas por categoría, filtro por estado y tarjetas con estado, título, duración, precio desde y estación más cercana.
5. Planificador de rutas: mapa de la ruta y rutas sugeridas con la acción "Personalizar ruta".
6. Paquetes destacados, con dos acciones: "Personalizar ruta" y "Ver detalles".
7. Por qué TMT: experiencia local; todo en uno (tren, experiencias y hospedaje); servicio personalizado.
8. Reseñas reales con fuente (Tripadvisor o Google).
9. Inspiración: artículos del blog.
10. Newsletter y footer.

## T02 · Detalle de experiencia — P1

**Objetivo:** convertir. Es la página de reserva directa con Wellet y la que más dinero mueve.
**Datos:** Experiencias, con su Categoría y su Destino.
**Instancia:** `amanecer-maya-uxmal`.
**Referencia:** `referencias/mockups/05-detalle-amanecer-maya-uxmal.jpg`.

**Secciones**
1. Encabezado: título, migas de pan, ubicación, estación de tren más cercana, calificación con número de reseñas e insignias (por ejemplo: acceso temprano, patrimonio UNESCO).
2. Galería.
3. Navegación interna: Resumen, Descripción, Qué incluye, Recomendaciones y Preguntas frecuentes.
4. Columna principal:
   - destacados;
   - ficha técnica (duración, horario, grupo, idiomas, nivel de actividad y mejor temporada);
   - por qué elegir esta experiencia;
   - itinerario por horario;
   - incluye / no incluye;
   - recomendaciones (qué llevar y consideraciones).
5. Panel de reserva:
   - Posición: fijo en la columna lateral en escritorio; en teléfono, barra inferior con precio y botón.
   - Contenido: precio desde, participantes, fecha, resumen y botón.
   - El interior lo pone el widget de Wellet. Se diseña el contenedor y sus estados (cargando, disponible, sin fechas), no el widget.
6. Cómo llegar en tren: estación más cercana y enlace a la ruta. *No está en el mockup y se agrega a propósito, porque es la promesa de marca: experiencias conectadas por tren.*
7. Preguntas frecuentes.
8. Reseñas reales.
9. Experiencias relacionadas.
10. Newsletter y footer.

## T03 · Hub de experiencias — P2

**Objetivo:** ayudar a elegir una categoría o a encontrar una experiencia concreta.
**Datos:** Categorías y Experiencias.
**Referencia:** `referencias/mockups/02-experiencias-hub.jpg`.

**Secciones**
1. Hero.
2. Categorías: cuatro tarjetas con descripción.
3. Filtros: por categoría, por estado, por rango de precio y búsqueda.
4. Listado de experiencias.
5. Mapa de experiencias sobre la península.
6. Del blog.
7. Newsletter y footer.

## T04 · Categoría y subcategoría — P2

**Objetivo:** profundizar en un tipo de experiencia y llevar al detalle.
**Datos:** Categorías, Subcategorías y Experiencias.
**Instancias:** `cultural-patrimonio` (categoría) y `zonas-arqueologicas` (subcategoría).
**Referencias:** `referencias/mockups/03-categoria-cultural-y-patrimonio.jpg` y `04-subcategoria-zonas-arqueologicas.jpg`.

**Secciones (categoría)**
1. Hero con titular y descripción propios de la categoría.
2. Migas de pan.
3. Subcategorías.
4. Filtros: por interés, por estado, por duración y búsqueda.
5. Listado de experiencias.
6. Mapa cultural.
7. Garantías: autenticidad, guías certificados, apoyo a comunidades y turismo responsable.
8. Reseñas reales, newsletter y footer.

**Variante subcategoría.** Agrega un bloque de información cultural y tips del experto (códigos de conducta, vestimenta, fotografía responsable, mejores horarios y equipo recomendado) y un bloque de preguntas frecuentes. Los datos vienen de `faq_cultural` y `faq_tips` de la categoría.

## T05 · Hub de destinos — P2

**Objetivo:** explorar por estado o por tipo de destino.
**Datos:** Estados y Destinos.

**Secciones**
1. Hero.
2. Mapa de la península con los 5 estados como entrada principal.
3. Explorar por tipo: playas y costas, ciudades coloniales, naturaleza y aventura, rutas temáticas.
4. Destinos destacados.
5. Cómo moverse en tren entre destinos.
6. Newsletter y footer.

## T06 · Estado — P2

**Instancia:** `quintana-roo`.
**Referencia:** `referencias/mockups-interiores.html`, página 08.

**Secciones**
1. Hero: nombre, frase y capital.
2. Destinos del estado.
3. Experiencias en el estado.
4. Paquetes que pasan por el estado.
5. Estaciones del tren en el estado.
6. Newsletter y footer.

## T07 · Destino — P2

**Instancia:** `bacalar`.
**Referencia:** `mockups-interiores.html`, página 09.

**Secciones**
1. Hero con la frase del destino.
2. Sobre el destino: descripción, lo imperdible y mejores meses.
3. Experiencias en el destino.
4. Cómo llegar en tren: estación más cercana y tiempo de traslado.
5. Dónde hospedarse. No hay datos en la base; se marca PENDIENTE (hoteles aliados).
6. Galería.
7. Newsletter y footer.

## T08 · El Tren Maya — P3

**Referencia:** `mockups-interiores.html`, página 01.

**Secciones**
1. Hero.
2. Mapa de rutas y estaciones: la misma pieza del home, en versión completa.
3. Clases de servicio: Xiinbal, Janal y P'atal.
4. Rutas populares.
5. Horarios y frecuencias.
6. Preguntas frecuentes.
7. Llamada final a planear el viaje.

## T09 · Ruta — P3

**Instancia:** `cancun-tulum` (URL actual: `/rutas/cancun-tulum`).

**Secciones**
1. Hero: origen y destino, duración, número de paradas y salidas diarias.
2. Precios por clase de servicio.
3. Horarios.
4. Recorrido parada por parada. Es una secuencia real, así que aquí caben los numerales mayas.
5. Estados que atraviesa y paisajes destacados.
6. Consejos.
7. Experiencias en el destino y en el camino.
8. Newsletter y footer.

## T10 · Estación — P3

**Instancia:** `merida`, una de las 10 estaciones con página propia y nodo de tres rutas.

**Secciones**
1. Hero: nombre completo, subtítulo, estado y kilómetro.
2. Servicios, estacionamiento y accesibilidad.
3. Conexiones y transporte local.
4. Destinos cercanos.
5. Consejos.
6. Experiencias cerca de la estación.

## T11 · Clase de servicio — P3

**Instancia:** `xiinbal`.

**Secciones**
1. Hero: nombre y su significado en maya.
2. Descripción, configuración de asientos y precio base.
3. Amenidades.
4. Comparativa de las tres clases.
5. Galería.
6. Preguntas frecuentes.

## T12 · Planificador de rutas — P3

**Objetivo:** que el viajero arme su propio itinerario y lo convierta en cotización.
**Datos:** la lógica vive en código (tabla `saved_itineraries` y función `save-itinerary`).

En Framer se diseñan los estados clave, no la lógica:
1. Vacío: elegir tipo de viaje y duración.
2. Con destinos elegidos sobre el mapa.
3. Itinerario armado, con hospedaje y costo estimado.
4. Guardado y compartido con código corto.
5. Paso a cotización.

## T13 · Hub de paquetes — P3

**Referencia:** `mockups-interiores.html`, página 02.

**Secciones**
1. Hero.
2. Filtros: por duración, por tipo y personalizados.
3. Listado de paquetes.
4. Servicios: hospedaje, transportación, tours y guías.
5. Ofertas: temporada baja, reserva anticipada y grupos.
6. "¿No encuentras lo que buscas?", con salida a cotización.

## T14 · Paquete — P3

**Instancia:** `ruta-grandeza-maya`.
**Referencia:** `mockups-interiores.html`, página 03.

**Secciones**
1. Hero: título, duración, tipo, dificultad y estados.
2. Resumen: transporte, hospedaje, experiencias y alimentos.
3. Itinerario día por día. Es una secuencia real, así que aquí caben los numerales mayas.
4. Mapa del recorrido.
5. Incluye / no incluye.
6. Mejor temporada.
7. Precio y acciones: pago con link de Wellet o cotización personalizada.
8. Reseñas y paquetes relacionados.

## T15 · Reservar / cotización — P3

**Objetivo:** capturar la intención de compra sin fricción.
**Referencia:** `mockups-interiores.html`, página 04.

**Secciones**
1. Búsqueda rápida.
2. Cotización personalizada: formulario que alimenta HubSpot.
3. Chat con asesor por WhatsApp.
4. Garantías y confianza.

## T16 · Blog — P4

**Referencia:** `mockups-interiores.html`, página 05.

**Secciones**
1. Artículos destacados.
2. Categorías.
3. Artículos recientes.
4. Newsletter.

**Espacios de anuncio.** El blog monetiza con AdSense en tres posiciones. Se diseñan como espacios reservados de tamaño fijo, para que el anuncio nunca mueva el contenido.

## T17 · Artículo — P4

**Instancia:** `cenotes-sagrados-yucatan`.
**Referencia:** `mockups-interiores.html`, página 06.

**Secciones**
1. Encabezado: categoría, título, autor, fecha y tiempo de lectura.
2. Imagen principal.
3. Cuerpo con imágenes, con una medida de línea de 75 caracteres como máximo.
4. Llamada dentro del artículo a experiencias relacionadas (del tipo "¿Quieres visitar estos cenotes?").
5. Espacios de anuncio reservados.
6. Etiquetas, artículos relacionados, newsletter y footer.

## T18 · Centro de ayuda — P4

**Referencias:** `mockups-interiores.html`, página 12, y el mapa 05 (Guía práctica), cuyo contenido se absorbe aquí.

**Secciones**
1. Buscador: "¿En qué podemos ayudarte?"
2. Temas: planificación, el Tren Maya, guías por destino, experiencias, servicios, sostenibilidad, soporte y emergencias.
3. Artículos más consultados.
4. Contacto directo.

## T19 · Nosotros — P4

**Secciones:** misión, visión, valores, equipo, y certificaciones y alianzas.

## T20 · Contacto — P4

**Secciones:** formulario (función `send-contact`), teléfono, correo, WhatsApp, horario de atención y oficina.

## T21 · Legales — P4

**Formato:** índice y texto, pensado para lectura larga y cómoda.

---

## Componentes compartidos

Se construyen una vez, como componentes de Framer con variantes, y se reutilizan en todas las plantillas:

- **Tarjetas:** de experiencia, de destino, de paquete y de artículo.
- **Navegación del catálogo:** selector de los 5 estados, filtros y migas de pan.
- **Venta:** galería y panel de reserva (contenedor de Wellet).
- **Información:** ficha técnica, itinerario (por horario y por día), preguntas frecuentes en acordeón y reseña.
- **Mapa de la ruta del tren.** Es la pieza más distintiva del sistema y se reutiliza en home, tren, rutas y planificador.
- **Globales:** navegación, footer, newsletter y botón de WhatsApp.
