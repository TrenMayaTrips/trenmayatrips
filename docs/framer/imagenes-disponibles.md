# Imágenes disponibles en el repo

**Fase 1 del runbook.** Relación entre las imágenes de `src/assets` y los slugs del catálogo, tomada de los mapas de imágenes del código (`src/data/*-images.ts`, `src/data/experience-gallery.ts` y los respaldos locales de `src/hooks/use*.ts`). `public/` solo tiene `logo-tmt.png`, `favicon.ico` y `placeholder.svg`.

**Cruce con Supabase (23-sep-2026).** Todos los slugs de este documento se confirmaron contra `tmt-production`. **La base no tiene ninguna imagen cargada:** `featured_image`, `hero_image`, `image`, `gallery` y `gallery_images` están vacíos en todas las tablas, y los 16 `content_images` del blog tienen `src` vacío (solo traen texto alternativo y pie de foto). Todas las imágenes del CMS saldrán del repo o quedarán como `FOTO PENDIENTE`.

## Calidad de las imágenes

| Grupo | Archivos | Tamaño |
|---|---|---|
| Héroes de página | `hero-*.jpg`, `cta-destinos.jpg` | 1920×1080 |
| Destinos | `dest-*.jpg` (16) | 1024×576 |
| Galerías de experiencias | `gallery/*.jpg` (20) | 1024×768 |
| Destinos del home, clases de servicio | `dest-chichen-itza.jpg`, `dest-palenque.jpg`, `dest-riviera-maya.jpg`, `dest-calakmul-campeche.jpg`, `vagon-*.jpg` | 800×640 |
| Interiores del tren | `tren-*-interior.jpg` | 800×512 |

Solo los héroes llegan a resolución de pantalla completa. Las demás sirven para tarjetas; para héroes de detalle a 1200 px se verán suaves. Esto confirma la decisión pendiente 3 del `00-LEEME.md`.

## Experiencias (T02)

| Slug | Imagen principal | Galería |
|---|---|---|
| `amanecer-maya-uxmal` | — | `gallery/uxmal-1.jpg`, `gallery/uxmal-2.jpg` |
| `coba-tulum-cenote` | — | `gallery/coba-1.jpg`, `gallery/coba-2.jpg` |
| `ek-balam-valladolid` | — | `gallery/ekbalam-1.jpg`, `gallery/ekbalam-2.jpg` |
| `catamaran-isla-mujeres` | — | `gallery/catamaran-1.jpg`, `gallery/catamaran-2.jpg` |
| `calakmul-biosfera` | — | `gallery/calakmul-1.jpg`, `gallery/calakmul-2.jpg` |
| `ruta-del-cacao` | — | `gallery/cacao-1.jpg`, `gallery/cacao-2.jpg` |
| `palenque-agua-azul` | — | `gallery/palenque-1.jpg`, `gallery/palenque-2.jpg` |
| `temazcal-selva` | — | `gallery/temazcal-1.jpg`, `gallery/temazcal-2.jpg` |
| `snorkel-arrecife` | — | `gallery/snorkel-1.jpg`, `gallery/snorkel-2.jpg` |
| `bacalar-laguna` | — | `gallery/bacalar-1.jpg`, `gallery/bacalar-2.jpg` |
| `cenotes-homun` | — | — |
| `cochinita-pibil-workshop` | — | — |

Ninguna experiencia tiene imagen principal propia; la primera foto de la galería puede hacer ese papel. La base tiene 12 experiencias; `cenotes-homun` y `cochinita-pibil-workshop` (ambas en Yucatán) no existen en el código y no tienen ninguna foto.

## Destinos (T07)

| Slug | Estado | Imagen |
|---|---|---|
| `cancun` | Quintana Roo | `dest-cancun.jpg` |
| `tulum` | Quintana Roo | `dest-tulum.jpg` |
| `bacalar` | Quintana Roo | `dest-bacalar.jpg` |
| `playa-del-carmen` | Quintana Roo | `dest-playa-del-carmen.jpg` |
| `merida` | Yucatán | `dest-merida.jpg` |
| `valladolid` | Yucatán | `dest-valladolid.jpg` |
| `chichen-itza` | Yucatán | `dest-chichen-itza-detail.jpg` |
| `izamal` | Yucatán | `dest-izamal.jpg` |
| `campeche-ciudad` | Campeche | `dest-campeche-ciudad.jpg` |
| `calakmul` | Campeche | `dest-calakmul.jpg` |
| `edzna` | Campeche | `dest-edzna.jpg` |
| `villahermosa` | Tabasco | `dest-villahermosa.jpg` |
| `comalcalco` | Tabasco | `dest-comalcalco.jpg` |
| `palenque` | Chiapas | `dest-palenque-detail.jpg` |
| `san-cristobal` | Chiapas | `dest-san-cristobal.jpg` |
| `cascadas-agua-azul` | Chiapas | `dest-agua-azul.jpg` |

Galería de destino: el código la arma con la imagen del destino más las galerías de experiencias del mismo estado (`destination-gallery.ts`). No son fotos del destino en sí.

## Paquetes (T14)

| Slug | Imagen | Observación |
|---|---|---|
| `ruta-grandeza-maya` | `dest-chichen-itza.jpg` | Reutiliza foto de destino |
| `cultura-gastronomia-entretenimiento` | `dest-merida.jpg` | Reutiliza foto de destino |
| `aventura-naturaleza-5-estados` | `dest-agua-azul.jpg` | Reutiliza foto de destino |
| `mundo-maya-classico-4-dias` | `dest-cancun.jpg` | Reutiliza foto de destino. Ojo: el slug dice "classico" |
| `gastronomia-autentica-yucatan` | `dest-merida.jpg` | Misma imagen que otro paquete |

## Rutas del tren (T09)

| Slug | Imagen |
|---|---|
| `cancun-merida` | `dest-cancun.jpg` |
| `cancun-tulum` | `dest-tulum.jpg` |
| `merida-palenque` | `dest-palenque.jpg` |
| `merida-campeche` | `dest-campeche-ciudad.jpg` |
| `tulum-bacalar` | `dest-bacalar.jpg` |

## Estaciones (T10)

| Slug | Imagen |
|---|---|
| `cancun` | `dest-cancun.jpg` |
| `playa-del-carmen` | `dest-playa-del-carmen.jpg` |
| `tulum` | `dest-tulum.jpg` |
| `bacalar` | `dest-bacalar.jpg` |
| `valladolid` | `dest-valladolid.jpg` |
| `chichen-itza` | `dest-chichen-itza.jpg` |
| `izamal` | `dest-izamal.jpg` |
| `merida` | `dest-merida.jpg` |
| `campeche` | `dest-campeche-ciudad.jpg` |
| `palenque` | `dest-palenque.jpg` |

## Clases de servicio (T11)

| Slug | Imagen principal | Galería |
|---|---|---|
| `xiinbal` | `tren-xiinbal-interior.jpg` | `tren-xiinbal-interior.jpg`, `vagon-xiinbal.jpg` |
| `janal` | `tren-janal-interior.jpg` | `tren-janal-interior.jpg`, `vagon-janal.jpg` |
| `patal` | `tren-patal-interior.jpg` | `tren-patal-interior.jpg`, `vagon-patal.jpg` |

## Artículos del blog (T17)

| Slug | Imagen |
|---|---|
| `guia-completa-tren-maya-2025` | `hero-tren-maya.jpg` |
| `chichen-itza-mas-alla-piramide` | `dest-chichen-itza.jpg` |
| `cenotes-sagrados-yucatan` | `dest-riviera-maya.jpg` |
| `gastronomia-yucateca-imperdible` | `dest-merida.jpg` |
| `palenque-ciudad-perdida-selva` | `dest-palenque.jpg` |
| `que-empacar-viaje-tren-maya` | `hero-tren-maya-page.jpg` |
| `bacalar-laguna-siete-colores` | `dest-bacalar.jpg` |
| `chocolate-cacao-ruta-maya` | `dest-comalcalco.jpg` |
| `pueblos-magicos-ruta-tren-maya` | `dest-san-cristobal.jpg` |

Todas son fotos de destino reutilizadas; ningún artículo tiene foto propia.

## Imágenes de página (no ligadas a un slug)

| Archivo | Dónde se usa |
|---|---|
| `hero-tren-maya.jpg` | Héroe del home, Contacto, Nosotros |
| `hero-tren-maya-page.jpg` | Héroe de `/tren-maya` |
| `hero-experiencias.jpg` | Héroe de experiencias, categorías, subcategorías y sostenibilidad |
| `hero-destinos.jpg`, `cta-destinos.jpg` | `/destinos` |
| `hero-paquetes.jpg` | `/paquetes` |
| `hero-blog.jpg` | `/blog` |
| `maya-pattern-bg.jpg` | Textura del footer (200×200) |
| `logo-tmt.png` | Header y footer |

---

## Slugs sin imagen

- **Experiencias:** `cenotes-homun` y `cochinita-pibil-workshop` no tienen ninguna foto. Las otras 10 solo tienen galería de 2 fotos, sin imagen principal.
- **Blog (fotos dentro del artículo):** los 16 espacios de `content_images` de los 9 artículos están vacíos.
- **Estados (T06):** `quintana-roo`, `yucatan`, `campeche`, `tabasco`, `chiapas`. Ninguno tiene imagen.
- **Categorías (T04):** `cultural-patrimonio`, `aventura-naturaleza`, `gastronomico`, `bienestar`. Todas usan el héroe genérico `hero-experiencias.jpg`.
- **Subcategorías (T04):** las 19. Ninguna tiene imagen.
- **Estaciones (T10):** 24 de 34 sin imagen. Ninguna de ellas tiene página propia (`has_detail_page = false`), así que solo afectan a listas y al mapa: `boca-del-cerro`, `tenosique`, `el-triunfo`, `candelaria`, `escarcega`, `centenario`, `calakmul`, `xpujil`, `nicolas-bravo`, `chetumal`, `limones-chacchoben`, `felipe-carrillo-puerto`, `tulum-aeropuerto`, `puerto-morelos`, `leona-vicario`, `nuevo-xcan`, `tixkokob`, `uman`, `maxcanu`, `calkini`, `hecelchakan`, `tenabo`, `edzna`, `carrillo-puerto-campeche`. Las 10 estaciones con página sí tienen imagen.
- **Paquetes, artículos y rutas:** tienen imagen, pero todas son fotos de destino reutilizadas, no fotos propias.
