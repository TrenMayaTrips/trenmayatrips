# Reporte del esqueleto en Framer

**Proyecto:** `TMT — Diseño 2026` · **Fecha:** 24 de septiembre de 2026 · **Runbook:** `05-runbook-claude-code.md`, fases 0 a 5.

Todo se hizo en la versión principal del proyecto de Framer, sin ramas (ver la sección "En Framer" del runbook). No se publicó nada ni se conectó ningún dominio. Supabase solo se leyó.

## 1. Qué se creó en Framer

### Estilos (fase 2)

- **12 colores** con los valores de `03-sistema-de-diseno.md`: Crema, Arena, Arena oscura, Jade, Jade oscuro, Jade claro, Oro, Oro claro, Terracota, Carbón, Pizarra y Blanco.
- **10 estilos de texto** con Playfair Display y DM Sans: Display, Título 1 a 4, Cuerpo grande, Cuerpo, Pequeño, Etiqueta y Precio. Tienen tamaño de escritorio (1200 px o más) y de teléfono (menos de 1200 px). La tableta usa la escala de teléfono porque el documento no da valores intermedios. El espaciado entre letras quedó en 0.
- **Tamaños de diseño:** 1200, 810 y 390 en todas las páginas y en la plantilla global.

### CMS (fase 3)

10 colecciones con los campos de `04-cms-colecciones.md` y las filas publicadas de `tmt-production`. Los conteos están en la sección 2.

### Páginas (fase 4)

22 páginas, una por plantilla; T04 tiene dos, categoría y subcategoría. Todas llevan el aviso "Esqueleto — diseño pendiente" y sus secciones van en el orden de `02-plantillas.md`, con nombres como `T02 / Galería`.

| Plantilla | URL en Framer | Tipo |
|---|---|---|
| T01 Home | `/` | Estática |
| T02 Detalle de experiencia | `/experiencias/:Experiencias` | CMS |
| T03 Hub de experiencias | `/experiencias` | Estática |
| T04 Categoría | `/experiencias/categoria/:Categorías` | CMS |
| T04 Subcategoría | `/experiencias/subcategoria/:Subcategorías` | CMS |
| T05 Hub de destinos | `/destinos` | Estática |
| T06 Estado | `/destinos/estado/:Estados` | CMS |
| T07 Destino | `/destinos/:Destinos` | CMS |
| T08 El Tren Maya | `/tren-maya` | Estática |
| T09 Ruta | `/tren-maya/rutas/:Rutas` | CMS |
| T10 Estación | `/tren-maya/estaciones/:Estaciones` | CMS |
| T11 Clase de servicio | `/tren-maya/clases/:Clases de servicio` | CMS |
| T12 Planificador de rutas | `/itinerarios` | Estática |
| T13 Hub de paquetes | `/paquetes` | Estática |
| T14 Paquete | `/paquetes/:Paquetes` | CMS |
| T15 Reservar / cotización | `/cotizacion` | Estática |
| T16 Blog | `/blog` | Estática |
| T17 Artículo | `/blog/:Blog` | CMS |
| T18 Centro de ayuda | `/ayuda` | Estática |
| T19 Nosotros | `/nosotros` | Estática |
| T20 Contacto | `/contacto` | Estática |
| T21 Legales | `/aviso-de-privacidad` | Estática |

**Plantilla global "Principal":** barra utilitaria y navegación con el botón Reservar siempre visible, newsletter, footer y botón flotante de WhatsApp. Se aplica a las 22 páginas.

### Componentes compartidos (fase 4)

| Grupo | Componentes |
|---|---|
| Tarjetas | Tarjeta de experiencia, de destino, de paquete y de artículo |
| Navegación del catálogo | Selector de estados, Filtros, Migas de pan |
| Venta | Galería, Panel de reserva (variantes Disponible, Cargando y Sin fechas), Botón, Botón secundario |
| Información | Ficha técnica, Itinerario, Pregunta frecuente (Cerrada y Abierta), Reseña |
| Mapa | Mapa de la ruta (espacio reservado para la pieza memorable) |
| Globales | Navegación (Desktop, Tablet y Phone), Footer, Newsletter, Botón de WhatsApp, Aviso de esqueleto |

Es baja fidelidad: estructura, jerarquía y contenido real. No se aplicaron la capa de identidad maya ni los efectos de movimiento.

## 2. Conteos del CMS

| Colección | Importadas | Publicadas en Supabase | Campos |
|---|---|---|---|
| Estados | 5 | 5 | 5 |
| Estaciones | 34 | 34 | 17 |
| Categorías | 4 | 4 | 8 |
| Subcategorías | 19 | 19 | 6 |
| Destinos | 16 | 16 | 14 |
| Experiencias | 12 | 12 | 23 |
| Rutas | 5 | 5 | 14 |
| Paquetes | 5 | 5 | 22 |
| Clases de servicio | 3 | 3 | 17 |
| Blog | 9 | 9 | 11 |

- Todas las filas de la base están publicadas.
- Cada campo de cada fila se comparó con la base, sin diferencias.
- No se importaron las columnas excluidas ni las tablas con datos personales.

## 3. Slugs sin imagen

La base no tiene ninguna imagen cargada. Las 84 imágenes del CMS salen del repo (ver `imagenes-disponibles.md`). Sin foto quedaron:

- **Experiencias:** `cenotes-homun` y `cochinita-pibil-workshop`. Las otras 10 solo tienen dos fotos de galería.
- **Estados:** los 5.
- **Categorías:** las 4.
- **Subcategorías:** las 19.
- **Estaciones:** 24, todas sin página propia.
- **Blog:** los 16 espacios de foto dentro de los artículos.
- **Fotos reutilizadas:** paquetes, rutas y artículos tienen foto, pero es una foto de destino reutilizada.
- **Resolución:** solo los héroes miden 1920 px. Las demás miden 1024 px o menos.

## 4. Discrepancias entre el mapa de sitio, la base y las rutas reales

1. **Rutas del tren.** El mapa de sitio da `/rutas/cancun-tulum` como URL verificada. El código usa `/tren-maya/rutas/:slug`.
2. **Categoría y experiencia comparten URL.** En el sitio, `/experiencias/:slug` sirve a las dos. Framer no lo permite, así que allí están en rutas separadas. El código debe conservar las URLs actuales.
3. **Páginas sin ruta actual.** T06 Estado, T15 Cotización y T18 Centro de ayuda no existen en el sitio. `/sostenibilidad`, la 404 y `/itinerarios/:code` no tienen plantilla propia.
4. **Enlaces rotos en el sitio actual.** Tres de las cuatro tarjetas de categoría del home apuntan a slugs que no existen (`cultura-patrimonio`, `naturaleza-aventura` y `gastronomia`). El enlace a `/aviso-privacidad` también está roto; la ruta real es `/aviso-de-privacidad`.
5. **Sin sitemap.** No hay `sitemap.xml`, a pesar de que el sitio tiene tráfico orgánico.
6. **Relaciones que faltan en la base.** Las experiencias no tienen `destination_id` y no se relacionan con subcategorías, rutas ni estaciones. Cinco destinos no tienen estación ligada: `cancun`, `campeche-ciudad`, `edzna`, `villahermosa` y `comalcalco`.
7. **Categorías.** El mapa de 2024 tiene 7 categorías de experiencias y 5 del blog; la base tiene 4 y 4.
8. **Contenido escrito en el código.** Hay reseñas y testimonios sin fuente, cifras como "500+ viajeros" y "4.8/5", precios de las clases en el home y preguntas frecuentes (ver `contenido-en-codigo.md`).
9. **Supabase en pausa.** Durante la fase 1 el proyecto estaba en pausa y el catálogo del sitio en producción no cargaba. Si está en el plan gratuito, puede volver a pausarse.

## 5. Límites de Framer encontrados

- **Filtro por estado.** Framer no puede filtrar un campo de opción (Estado) comparándolo con el nombre de otro registro. Por eso en T06 las listas de destinos, experiencias y estaciones salen vacías, con un aviso. La de paquetes sí funciona.
- **Idioma de las fechas.** La fecha del artículo se muestra en inglés; hay que revisar el idioma del sitio en la configuración de Framer.
- **Nombres de campos.** Framer pone los nombres de campos y controles en mayúsculas a la inglesa. Los del CMS se corrigieron; algunos controles de componentes siguen así, como "Estación Más Cercana".
- **Cifras tabulares.** DM Sans no las incluye, así que el estilo Precio no puede usarlas.

## 6. Preguntas abiertas para Joel

1. **Filtro por estado:** ¿agregamos al CMS de Framer una referencia al estado en Destinos, Experiencias y Estaciones para que T06 funcione, o se resuelve solo en código?
2. **Relaciones faltantes:** ¿quién completa en Supabase el destino de cada experiencia, la subcategoría de cada experiencia y las estaciones de los 5 destinos?
3. **Calificaciones:** experiencias y paquetes muestran calificación y número de reseñas, pero la base no tiene reseñas. ¿De dónde salen? ¿Se muestran?
4. **Fotografía:** ¿sesión propia, fotos de operadores con cesión de derechos o banco con licencia? Faltan fotos principales para las 12 experiencias y para estados, categorías y subcategorías.
5. **Mejor precio garantizado:** ¿existe la política publicada que lo respalde?
6. **Categorías:** ¿siguen en el plan Fotografía y arte, Familiar, y Lujo y exclusividad?
7. **URLs nuevas:** ¿qué URL llevan T06 Estado, T15 Cotización y T18 Centro de ayuda? ¿`/sostenibilidad` se absorbe en el centro de ayuda con una redirección 301?
8. **Contenido pendiente:** titulares de los héroes, textos de Nosotros, datos de contacto (teléfono, correo, horario y oficina), certificaciones y ofertas.
9. **Supabase:** ¿pasamos `tmt-production` a un plan que no se pause?
10. **Frontend de destino:** falta formalizar la propuesta de Next.js en un registro de decisión de arquitectura (ADR) antes de la fase de código.

## 7. Siguiente paso

Con el esqueleto listo, Joel y el diseñador empiezan con las plantillas P1: T01 Home y T02 Detalle de experiencia. Mientras el diseñador trabaje una página, el agente no la modifica sin autorización de Joel.
