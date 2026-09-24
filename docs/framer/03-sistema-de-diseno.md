# 03 · Sistema de diseño

Este documento fija lo que no se negocia (tokens, contraste y reglas) y deja libre lo que es trabajo del diseñador: composición, ritmo y carácter. La base sale de los mockups de interiores de TMT. La dirección es inspiracional, no prescriptiva.

## Principio rector

Museo más revista de viajes premium: sofisticación editorial, nunca souvenir. Cada página tiene una sola pieza memorable y todo lo demás se mantiene disciplinado. Si un elemento grita, se le baja la opacidad o se quita.

## Paleta

| Token | Hex | Rol |
|---|---|---|
| Crema | `#FAFAF7` | Fondo base |
| Arena | `#F5F0E8` | Superficies secundarias |
| Arena oscura | `#E8DFD0` | Bordes y divisores |
| Jade | `#2D6A4F` | Color protagonista: navegación activa, enlaces y estados seleccionados |
| Jade oscuro | `#1B4332` | Fondos oscuros, footer y texto de máximo contraste |
| Jade claro | `#40916C` | Acentos grandes e íconos, nunca texto pequeño |
| Oro | `#D4A843` | Acción principal (relleno de botón) con texto carbón |
| Oro claro | `#E8C974` | Detalles sobre fondos oscuros |
| Terracota | `#BC4749` | Uso puntual: alertas, disponibilidad limitada y ofertas |
| Carbón | `#2B2D42` | Texto principal |
| Pizarra | `#6B7280` | Texto secundario |
| Blanco | `#FFFFFF` | Tarjetas y texto sobre jade o terracota |

**Nota de dirección.** La combinación de fondo crema, serif de alto contraste y acento terracota es hoy uno de los looks más genéricos de la web. Para no caer ahí, el jade lleva el protagonismo, el oro se reserva para la acción principal y la terracota se usa poco. El jade, además, era el material más preciado del mundo maya: el color tiene raíz.

**Exploración opcional: azul maya.** Es el pigmento emblemático del mundo maya, una mezcla de índigo y arcilla paligorskita presente en murales como los de Bonampak. Es candidato a acento del sistema del tren (líneas de ruta y estaciones). Si se usa en texto o botones hay que validar el contraste: los tonos medios de azul no llegan a 4.5:1 con blanco.

## Contraste (WCAG 2.1)

Valores calculados sobre la paleta:

| Combinación | Contraste | Uso permitido |
|---|---|---|
| Carbón sobre crema | 12.9:1 | Cualquier texto |
| Jade sobre crema | 6.1:1 | Cualquier texto |
| Terracota sobre crema | 4.9:1 | Cualquier texto |
| Pizarra sobre crema | 4.6:1 | Texto secundario |
| Pizarra sobre arena | 4.3:1 | Solo texto grande (18 px o más) |
| Jade claro sobre crema | 3.7:1 | Solo texto grande e íconos |
| **Oro sobre crema** | **2.1:1** | **Nunca como texto** |
| Carbón sobre oro | 6.1:1 | Texto de botones oro |
| **Blanco sobre oro** | **2.2:1** | **Nunca** |
| Blanco sobre jade | 6.4:1 | Cualquier texto |
| Blanco sobre jade oscuro | 11.1:1 | Cualquier texto |
| Oro sobre jade oscuro | 5.0:1 | Cualquier texto |
| Blanco sobre terracota | 5.1:1 | Cualquier texto |

**Texto sobre fotografía:** siempre con un velo o una zona de color sólido que garantice al menos 4.5:1.

## Tipografía

**Base:** Playfair Display para titulares y DM Sans para texto e interfaz.

**Margen de exploración:** el diseñador puede proponer otro tipo display con más carácter, siempre que se mantenga la estructura de serif en titulares y sans en texto. Playfair es muy frecuente en la web, así que si el diseño se siente genérico, la tipografía es la primera palanca.

**Escala propuesta** (estilos de texto de Framer; el diseñador puede ajustarla):

| Estilo | Familia y peso | Escritorio | Teléfono | Interlineado |
|---|---|---|---|---|
| Display | Playfair Display 500 | 72 | 44 | 1.05 |
| Título 1 | Playfair Display 500 | 48 | 36 | 1.1 |
| Título 2 | Playfair Display 500 | 36 | 28 | 1.15 |
| Título 3 | Playfair Display 500 | 24 | 21 | 1.25 |
| Título 4 | DM Sans 600 | 18 | 17 | 1.35 |
| Cuerpo grande | DM Sans 400 | 18 | 17 | 1.65 |
| Cuerpo | DM Sans 400 | 16 | 16 | 1.6 |
| Pequeño | DM Sans 400 | 14 | 14 | 1.5 |
| Etiqueta | DM Sans 500 | 13 | 13 | 1.4 |
| Precio | DM Sans 600, cifras tabulares | 22 | 20 | 1.2 |

**Reglas**
- **Mayúsculas:** en español, mayúscula solo al inicio y en nombres propios. Nada de Title Case a la inglesa, y nada de etiquetas en mayúsculas sostenidas.
- **Titulares:** no se resalta una sola palabra con itálica o color. El titular completo es el elemento de diseño.
- **Medida de línea:** 75 caracteres como máximo en texto corrido.

## Espaciado, radios y sombras

- **Espaciado:** unidad base de 8 px (4 px para ajustes finos). Las secciones llevan aire generoso: entre 96 y 128 px en escritorio y 64 px en teléfono.
- **Radios con jerarquía,** no uno solo para todo:
  - 4 px en controles pequeños (etiquetas y campos);
  - 12 px en tarjetas y paneles;
  - 0 en fotografía editorial a sangre.
- **Sombras** solo en lo que flota: panel de reserva fijo, navegación al hacer scroll y menús. Las tarjetas se separan con espacio y un borde arena oscura, no repitiendo la misma sombra.
- **Tamaños de diseño:** escritorio 1200, tableta 810 y teléfono 390.

## Capa de identidad maya

Cada elemento se usa por lo que significa, no como adorno:

| Elemento | Qué significa | Dónde se usa | Límite |
|---|---|---|---|
| Greca escalonada | Motivo arquitectónico mesoamericano, muy presente en las fachadas Puuc como las de Uxmal | Divisor estructural entre secciones mayores y remate de bordes | Nunca como relleno de fondo |
| Estera Pop (petate) | El petate (*pop*) era símbolo de autoridad y de consejo | Textura donde TMT respalda al viajero: garantías, certificaciones y panel de reserva | Siempre sutil |
| Estela | Monumento que registraba fechas y hechos de gobernantes | Ficha técnica en formato vertical: datos clave de experiencias y rutas | Solo para datos verdaderos |
| Códice | Libro plegado de lectura secuencial | Itinerarios día por día y artículos largos | Solo en contenido de lectura en secuencia |
| Numerales mayas (barra y punto) | El sistema de numeración vigesimal maya | Solo secuencias reales: paradas de una ruta, días de un paquete y pasos de la reserva | Nunca como decoración ni en listas sin orden |
| Litografías de Frederick Catherwood (1844) | Registro visual de las ciudades mayas en el siglo XIX; dominio público | Texturas a baja opacidad y momentos editoriales a sangre en contenido arqueológico | Usar escaneos de alta resolución de acervos institucionales |

**Exactitud cultural:** cada glifo o motivo se verifica contra una fuente de referencia. No se inventan pseudoglifos.

## Movimiento

- **Un solo momento orquestado por página.** En el home, el candidato es la línea del tren trazándose sobre la península.
- **El resto del movimiento responde a acciones** del usuario: abrir, expandir, confirmar.
- **Sin efectos repetidos:** nada de aparición deslizada en cada sección ni de efecto hover en cada tarjeta.
- **Accesibilidad:** se respeta la preferencia de "reducir movimiento" del sistema.
- **Solo efectos nativos de Framer,** que se traducen directo a la librería `motion` en código.

## Fotografía

Es el factor que más pesa en el resultado final, y hoy es el punto más débil: ninguna experiencia tiene imagen principal en la base.

**Reglas**
- **Lugares reales** de los 5 estados. Nunca stock de playas de otras partes del mundo.
- **Escala humana y luz natural.**
- **Texto alternativo** descriptivo en cada foto.
- **Mientras no haya foto con derechos,** se usa un marcador visible: `FOTO PENDIENTE — slug`.

**Fuentes posibles:** fotos de operadores aliados con cesión de derechos, una sesión propia, bancos de imágenes con licencia y las litografías de Catherwood.

## Lo que dejamos atrás

Del sitio actual y de los mockups de 2024:

- **Etiqueta en mayúsculas espaciadas** sobre el titular ("EXPLORA EL MUNDO MAYA").
- **Una sola palabra del titular en itálica y color** ("conectadas por *tren*").
- **Title Case a la inglesa** en títulos ("Tipos de Vagón").
- **Tarjetas idénticas** con la misma sombra en todo el sitio.
- **Testimonios de relleno** (la reseña de "Jennifer M" copiada cinco veces).
- **Flechas pegadas** al texto de los botones.

## Palabras de la interfaz

Las acciones dicen exactamente qué pasa y se llaman igual en todo el sitio:

- Reservar
- Pedir cotización
- Ver experiencia
- Personalizar ruta
- Guardar itinerario

El tono es claro y conversacional, de tú, en español de México.
