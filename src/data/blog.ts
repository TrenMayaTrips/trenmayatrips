import heroTrenMaya from "@/assets/hero-tren-maya.jpg";
import destChichenItza from "@/assets/dest-chichen-itza.jpg";
import destBacalar from "@/assets/dest-bacalar.jpg";
import destMerida from "@/assets/dest-merida.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import heroTrenMayaPage from "@/assets/hero-tren-maya-page.jpg";
import destRivieraMaya from "@/assets/dest-riviera-maya.jpg";
import destComalcalco from "@/assets/dest-comalcalco.jpg";
import destChichenItzaDetail from "@/assets/dest-chichen-itza-detail.jpg";
import destValladolid from "@/assets/dest-valladolid.jpg";
import destTulum from "@/assets/dest-tulum.jpg";
import destPalenqueDetail from "@/assets/dest-palenque-detail.jpg";
import destAguaAzul from "@/assets/dest-agua-azul.jpg";
import destCampecheCiudad from "@/assets/dest-campeche-ciudad.jpg";
import destIzamal from "@/assets/dest-izamal.jpg";
import destVillahermosa from "@/assets/dest-villahermosa.jpg";

export interface BlogCategory {
  slug: string;
  label: string;
  emoji: string;
  description: string;
}

export interface BlogContentImage {
  src: string;
  alt: string;
  caption?: string;
  afterBlock: number; // insert after this content block index
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  tags: string[];
  content: string[];
  image: string;
  contentImages?: BlogContentImage[];
}

export const blogCategories: BlogCategory[] = [
  {
    slug: "mundo-maya",
    label: "Descubre el Mundo Maya",
    emoji: "🏛️",
    description: "Historia, arqueología y cultura de la civilización maya",
  },
  {
    slug: "destinos-magicos",
    label: "Destinos Mágicos",
    emoji: "✨",
    description: "Guías de los mejores destinos a lo largo de la ruta",
  },
  {
    slug: "guias-practicas",
    label: "Guías Prácticas",
    emoji: "🗺️",
    description: "Tips, recomendaciones y todo lo que necesitas saber",
  },
  {
    slug: "gastronomia",
    label: "Gastronomía Regional",
    emoji: "🍽️",
    description: "Sabores, recetas y experiencias culinarias del sureste",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-completa-tren-maya-2025",
    title: "Guía completa del Tren Maya 2025: todo lo que necesitas saber",
    excerpt:
      "Desde rutas y estaciones hasta clases de vagones y precios. La guía definitiva para planificar tu viaje en el Tren Maya este año.",
    category: "guias-practicas",
    author: "Ana Lucía Reyes",
    authorRole: "Editora de Viajes",
    publishedAt: "2025-12-15",
    readTime: 12,
    featured: true,
    tags: ["Tren Maya", "Guía", "Planificación", "2025"],
    image: heroTrenMaya,
    contentImages: [
      { src: heroTrenMayaPage, alt: "Tren Maya recorriendo la selva del sureste mexicano", caption: "El Tren Maya conecta cinco estados del sureste mexicano", afterBlock: 0 },
      { src: destValladolid, alt: "Estación de Valladolid, punto de conexión clave", caption: "Valladolid, una de las estaciones más pintorescas de la ruta", afterBlock: 2 },
      { src: destTulum, alt: "Ruinas de Tulum frente al mar Caribe", caption: "Tulum combina arqueología maya con playas del Caribe", afterBlock: 4 },
    ],
    content: [
      "El Tren Maya se ha convertido en la experiencia de viaje más emocionante del sureste mexicano. Con más de 1,554 kilómetros de vía que conectan cinco estados — Quintana Roo, Yucatán, Campeche, Tabasco y Chiapas — este proyecto ferroviario no es solo un medio de transporte: es una puerta de entrada a una de las regiones más ricas en historia, cultura y naturaleza del mundo.",
      "## Rutas y Estaciones Principales\n\nEl Tren Maya opera en un circuito que conecta 34 estaciones distribuidas en siete tramos. Desde la moderna Cancún hasta la mística Palenque, cada parada ofrece una ventana única a la diversidad del sureste mexicano. Las estaciones más importantes incluyen Mérida, Valladolid, Tulum, Campeche y Escárcega.",
      "## Clases de Vagones\n\nExisten tres clases disponibles:\n\n**Xiinbal (Turista):** La opción más accesible, con asientos cómodos y aire acondicionado. Ideal para trayectos cortos.\n\n**Janal (Premium):** Asientos más amplios, servicio de alimentos y bebidas, y conexión WiFi. Perfecta para viajes de medio día.\n\n**P'atal (De Lujo):** La experiencia completa con cabinas privadas, restaurante gourmet, bar panorámico y servicio personalizado. Diseñada para recorridos largos y pernocta.",
      "## Mejores Épocas para Viajar\n\nLa temporada ideal es de noviembre a marzo, cuando las temperaturas son más agradables (22-28°C) y la lluvia es escasa. Sin embargo, la temporada baja (mayo-septiembre) ofrece precios más bajos y destinos menos concurridos. Julio y agosto son populares para familias, así que reserva con anticipación.",
      "## Presupuesto y Costos\n\nUn viaje de 5 días por el Tren Maya puede variar significativamente según la clase elegida y las experiencias incluidas. Como referencia:\n\n- **Presupuesto básico (Xiinbal):** $8,000 - $15,000 MXN por persona\n- **Presupuesto medio (Janal):** $18,000 - $30,000 MXN por persona\n- **Presupuesto premium (P'atal):** $35,000 - $60,000 MXN por persona\n\nEstos rangos incluyen transporte, hospedaje básico y algunas experiencias.",
      "## Consejos Prácticos\n\n1. Reserva tus boletos con al menos 2 semanas de anticipación\n2. Lleva ropa ligera, protector solar y repelente de insectos\n3. Descarga mapas offline — la señal celular es intermitente en algunos tramos\n4. Prueba la comida local en cada parada\n5. Respeta las zonas arqueológicas y el medio ambiente",
    ],
  },
  {
    slug: "chichen-itza-mas-alla-piramide",
    title: "Chichén Itzá: más allá de la pirámide de Kukulcán",
    excerpt:
      "Descubre los rincones menos conocidos de esta maravilla del mundo y vive la experiencia del equinoccio como los antiguos mayas.",
    category: "mundo-maya",
    author: "Dr. Roberto Canul",
    authorRole: "Arqueólogo e Historiador",
    publishedAt: "2025-11-28",
    readTime: 9,
    featured: true,
    tags: ["Chichén Itzá", "Arqueología", "Mayas", "Yucatán"],
    image: destChichenItza,
    contentImages: [
      { src: destChichenItzaDetail, alt: "Detalle arquitectónico de Chichén Itzá", caption: "Los detalles escultóricos de Chichén Itzá revelan la maestría maya", afterBlock: 1 },
      { src: destValladolid, alt: "Valladolid, ciudad colonial cercana a Chichén Itzá", caption: "Valladolid es la puerta de entrada a Chichén Itzá desde el Tren Maya", afterBlock: 4 },
    ],
    content: [
      "Chichén Itzá recibe más de 2.5 millones de visitantes al año, pero la mayoría dedica apenas dos horas a recorrer el sitio, enfocándose casi exclusivamente en la icónica Pirámide de Kukulcán. Sin embargo, esta ciudad maya esconde secretos fascinantes que merecen una exploración mucho más profunda.",
      "## El Observatorio (El Caracol)\n\nUna de las estructuras más impresionantes es El Caracol, un observatorio astronómico cuya torre circular permitía a los astrónomos mayas rastrear los movimientos de Venus con una precisión asombrosa. Las ventanas superiores están alineadas exactamente con las posiciones extremas del planeta.",
      "## El Cenote Sagrado\n\nA 300 metros al norte de la pirámide principal, este cenote de 60 metros de diámetro era considerado una entrada al inframundo maya (Xibalbá). Las expediciones arqueológicas han recuperado miles de objetos ceremoniales, incluyendo jade, oro y cerámica.",
      "## El Juego de Pelota\n\nEl juego de pelota de Chichén Itzá es el más grande de Mesoamérica: 168 metros de largo por 70 de ancho. La acústica del lugar es extraordinaria — un susurro en un extremo puede escucharse claramente en el otro, a más de 150 metros de distancia.",
      "## El Equinoccio: La Serpiente de Luz\n\nDurante los equinoccios de primavera (21 de marzo) y otoño (22 de septiembre), un juego de luces y sombras crea la ilusión de una serpiente descendiendo por la escalinata norte de la pirámide. Este fenómeno dura aproximadamente 45 minutos y atrae a miles de visitantes de todo el mundo.",
      "## Cómo Llegar en Tren Maya\n\nLa estación más cercana es Valladolid, desde donde puedes tomar un transporte de 40 minutos hasta el sitio. Recomendamos llegar a primera hora (8:00 am) para evitar multitudes y el calor intenso del mediodía.",
    ],
  },
  {
    slug: "cenotes-sagrados-yucatan",
    title: "Los 10 cenotes más espectaculares de la Península de Yucatán",
    excerpt:
      "Una selección de los cenotes más impresionantes para nadar, bucear y conectar con la naturaleza en tu ruta por el Tren Maya.",
    category: "destinos-magicos",
    author: "Marina Sánchez",
    authorRole: "Fotógrafa de Naturaleza",
    publishedAt: "2025-11-10",
    readTime: 8,
    featured: false,
    tags: ["Cenotes", "Yucatán", "Naturaleza", "Buceo"],
    image: destRivieraMaya,
    contentImages: [
      { src: destTulum, alt: "Gran Cenote cerca de Tulum", caption: "Los cenotes cerca de Tulum ofrecen aguas cristalinas para snorkel", afterBlock: 2 },
      { src: destBacalar, alt: "Aguas turquesas de la laguna de Bacalar", caption: "Los tonos azules de Bacalar se repiten en sus cenotes cercanos", afterBlock: 3 },
    ],
    content: [
      "La Península de Yucatán alberga más de 6,000 cenotes — piscinas naturales formadas por el colapso de la roca caliza que revelan los ríos subterráneos del acuífero más grande de México. Para los antiguos mayas, estos espejos de agua eran portales sagrados al inframundo.",
      "## 1. Cenote Suytun (Valladolid)\n\nFamoso por su rayo de luz que atraviesa la bóveda a mediodía, creando un efecto mágico sobre la plataforma de piedra central. Mejor entre 11:00 am y 1:00 pm para la foto perfecta.",
      "## 2. Cenote Ik Kil (Chichén Itzá)\n\nUno de los más visitados, con raíces colgantes que descienden 26 metros hasta el agua turquesa. Está a solo 3 km de Chichén Itzá, ideal para refrescarse después de explorar las ruinas.",
      "## 3. Gran Cenote (Tulum)\n\nPerfecto para snorkel y buceo, con formaciones de estalactitas submarinas y agua cristalina. Las tortugas de agua dulce son visitantes frecuentes.",
      "## 4. Cenote Dos Ojos\n\nUno de los sistemas de cuevas sumergidas más largos del mundo. El nombre viene de sus dos aberturas circulares que parecen ojos vistos desde arriba. Imprescindible para buceadores certificados.",
      "## Consejos para Visitarlos\n\n- Usa solo bloqueador solar biodegradable\n- Llega temprano para evitar multitudes\n- Respeta las reglas de cada cenote\n- Lleva zapatos acuáticos para las rocas\n- Muchos cenotes solo aceptan efectivo",
    ],
  },
  {
    slug: "gastronomia-yucateca-imperdible",
    title: "Sabores del sureste: guía de gastronomía yucateca imperdible",
    excerpt:
      "Cochinita pibil, papadzules, salbutes y más. Un recorrido por los platillos que debes probar en cada parada del Tren Maya.",
    category: "gastronomia",
    author: "Chef Alejandra Mex",
    authorRole: "Chef y Crítica Gastronómica",
    publishedAt: "2025-10-22",
    readTime: 10,
    featured: true,
    tags: ["Gastronomía", "Yucatán", "Cocina Maya", "Comida"],
    image: destMerida,
    contentImages: [
      { src: destIzamal, alt: "Mercado local de Izamal con ingredientes frescos", caption: "Los mercados del sureste son el corazón de la gastronomía yucateca", afterBlock: 1 },
      { src: destCampecheCiudad, alt: "Ciudad de Campeche, destino gastronómico", caption: "Campeche ofrece una escena culinaria única en el Golfo de México", afterBlock: 4 },
    ],
    content: [
      "La gastronomía yucateca es reconocida como una de las cocinas regionales más ricas y complejas de México. Su singularidad nace de la fusión entre la tradición culinaria maya milenaria y las influencias europeas, caribeñas y libanesas que se integraron a lo largo de los siglos.",
      "## Cochinita Pibil: El Alma de Yucatán\n\nEste platillo emblemático se prepara con cerdo marinado en achiote y jugo de naranja agria, envuelto en hojas de plátano y cocinado bajo tierra durante horas. El resultado es una carne deshebrada increíblemente tierna con un sabor ahumado único. Los mejores lugares para probarla están en Mérida y Valladolid.",
      "## Papadzules\n\nTortillas rellenas de huevo duro bañadas en una salsa verde de pepita de calabaza y decoradas con aceite de pepita. Es un platillo prehispánico que ha sobrevivido prácticamente sin cambios durante siglos.",
      "## Salbutes y Panuchos\n\nLos salbutes son tortillas fritas infladas cubiertas con pavo, cebolla morada encurtida, tomate y aguacate. Los panuchos son similares pero la tortilla lleva frijol colado dentro antes de freírse. Ambos son perfectos como antojito o entrada.",
      "## Relleno Negro\n\nUno de los platillos más complejos de la cocina yucateca, preparado con una pasta de chiles quemados que le da su característico color oscuro. Se sirve con pavo, carne de cerdo y 'bu't' (masa rellena de carne).",
      "## Dónde Comer en la Ruta del Tren Maya\n\n- **Mérida:** Mercado Lucas de Gálvez, La Chaya Maya\n- **Valladolid:** Hostería del Marqués, mercado municipal\n- **Campeche:** La Pigua, Marganzo\n- **Tulum:** Hartwood, Burrito Amor\n- **Palenque:** El Huachinango, mercado local",
    ],
  },
  {
    slug: "palenque-ciudad-perdida-selva",
    title: "Palenque: la ciudad perdida en la selva de Chiapas",
    excerpt:
      "Explora una de las ciudades mayas más elegantes, rodeada de selva tropical, cascadas y la magia del río Usumacinta.",
    category: "mundo-maya",
    author: "Dr. Roberto Canul",
    authorRole: "Arqueólogo e Historiador",
    publishedAt: "2025-10-05",
    readTime: 7,
    featured: false,
    tags: ["Palenque", "Chiapas", "Arqueología", "Selva"],
    image: destPalenque,
    contentImages: [
      { src: destPalenqueDetail, alt: "Detalle del Templo de las Inscripciones en Palenque", caption: "El Templo de las Inscripciones alberga la tumba de Pakal el Grande", afterBlock: 1 },
      { src: destAguaAzul, alt: "Cascadas de Agua Azul en Chiapas", caption: "Las cascadas de Agua Azul, a una hora de Palenque, son una parada obligatoria", afterBlock: 3 },
    ],
    content: [
      "Palenque es, quizás, el sitio arqueológico más atmosférico de todo el mundo maya. Enclavada en la densa selva tropical de Chiapas, con cascadas y arroyos serpenteando entre sus templos, esta ciudad alcanzó su apogeo bajo el reinado de K'inich Janaab Pakal (615-683 d.C.).",
      "## El Templo de las Inscripciones\n\nEste imponente templo-pirámide alberga la tumba de Pakal el Grande, descubierta en 1952 por el arqueólogo Alberto Ruz Lhuillier. La lápida que cubría el sarcófago es una de las obras maestras del arte maya, representando al gobernante en su descenso al inframundo.",
      "## El Palacio\n\nCon su característica torre de observación de cuatro pisos — única en la arquitectura maya — el Palacio era el centro administrativo y ceremonial de la ciudad. Los bajorrelieves en estuco que decoran sus muros son extraordinariamente detallados.",
      "## Cascadas de Agua Azul y Misol-Há\n\nA una hora de Palenque, estas cascadas son una parada obligatoria. Agua Azul impresiona con sus pozas turquesas escalonadas, mientras que Misol-Há ofrece una caída de 35 metros con una cueva detrás de la cortina de agua.",
      "## Cómo Llegar\n\nLa estación Palenque del Tren Maya conecta directamente con el sitio arqueológico. Recomendamos al menos 2 días completos para explorar tanto las ruinas como las cascadas circundantes.",
    ],
  },
  {
    slug: "que-empacar-viaje-tren-maya",
    title: "¿Qué empacar para tu viaje en el Tren Maya? Lista definitiva",
    excerpt:
      "Desde ropa adecuada hasta gadgets esenciales. Todo lo que necesitas llevar para disfrutar al máximo tu aventura ferroviaria.",
    category: "guias-practicas",
    author: "Ana Lucía Reyes",
    authorRole: "Editora de Viajes",
    publishedAt: "2025-09-18",
    readTime: 6,
    featured: false,
    tags: ["Equipaje", "Tips", "Planificación", "Viaje"],
    image: heroTrenMayaPage,
    contentImages: [
      { src: heroTrenMaya, alt: "Interior del Tren Maya con equipaje", caption: "Prepara tu maleta pensando en comodidad y clima tropical", afterBlock: 1 },
    ],
    content: [
      "Preparar la maleta para un viaje por el Tren Maya requiere pensar en climas tropicales, actividades al aire libre, visitas a zonas arqueológicas y cenas en restaurantes. Aquí te damos la lista definitiva para que no olvides nada.",
      "## Ropa Esencial\n\n- Ropa ligera de algodón o lino (el clima es cálido y húmedo)\n- Un suéter ligero para el aire acondicionado del tren\n- Zapatos cómodos para caminar en ruinas\n- Sandalias o zapatos acuáticos para cenotes\n- Sombrero o gorra de ala ancha\n- Traje de baño (¡los cenotes te esperan!)",
      "## Protección y Salud\n\n- Protector solar biodegradable (SPF 50+)\n- Repelente de insectos\n- Botiquín básico con antidiarreicos y analgésicos\n- Medicamentos personales\n- Gel antibacterial",
      "## Gadgets y Accesorios\n\n- Cámara con lente gran angular\n- Power bank de alta capacidad\n- Audífonos con cancelación de ruido\n- Adaptador de corriente\n- Bolsa impermeable para electrónicos",
      "## Documentos\n\n- Identificación oficial\n- Reservaciones impresas (algunos lugares tienen poca señal)\n- Seguro de viaje\n- Efectivo en pesos mexicanos (muchos cenotes y mercados no aceptan tarjeta)",
    ],
  },
  {
    slug: "bacalar-laguna-siete-colores",
    title: "Bacalar: la laguna de los siete colores que debes conocer",
    excerpt:
      "Todo sobre este paraíso de aguas cristalinas en Quintana Roo: cómo llegar, dónde hospedarte y qué hacer en este destino emergente.",
    category: "destinos-magicos",
    author: "Marina Sánchez",
    authorRole: "Fotógrafa de Naturaleza",
    publishedAt: "2025-09-02",
    readTime: 7,
    featured: false,
    tags: ["Bacalar", "Quintana Roo", "Laguna", "Naturaleza"],
    image: destBacalar,
    contentImages: [
      { src: destRivieraMaya, alt: "Aguas turquesas del Caribe mexicano", caption: "Bacalar rivaliza con las mejores playas del Caribe en belleza natural", afterBlock: 1 },
    ],
    content: [
      "Bacalar es el secreto mejor guardado del Caribe mexicano. Su laguna de 42 kilómetros de largo presenta hasta siete tonalidades de azul y turquesa, gracias a los estromatolitos (formaciones rocosas vivientes de más de 3,500 millones de años) y la variación en la profundidad del agua.",
      "## Qué Hacer en Bacalar\n\n**Navegar en velero:** La mejor forma de experimentar los siete colores es desde un velero al atardecer. Los tours salen del muelle principal y duran entre 2 y 4 horas.\n\n**Canal de los Piratas:** Un estrecho canal de aguas cristalinas rodeado de manglar, perfecto para kayak o paddleboard.\n\n**Cenote Azul:** Un cenote de 90 metros de profundidad conectado a la laguna, ideal para snorkel y clavados.",
      "## Dónde Hospedarse\n\nBacalar ofrece desde hostales eco-friendly hasta boutique hotels frente a la laguna. Las opciones más populares están sobre la costera, con muelles privados y acceso directo al agua. Reserva con anticipación en temporada alta (diciembre-abril).",
      "## Cómo Llegar en Tren Maya\n\nLa estación Bacalar del Tren Maya está a 10 minutos del centro del pueblo. Desde ahí puedes tomar un taxi o bicitaxi hasta tu hospedaje. Es una parada ideal entre Cancún y Campeche.",
    ],
  },
  {
    slug: "chocolate-cacao-ruta-maya",
    title: "La ruta del cacao: del árbol sagrado al chocolate artesanal",
    excerpt:
      "Descubre la historia del cacao en la cultura maya y visita las plantaciones donde aún se produce chocolate de forma tradicional.",
    category: "gastronomia",
    author: "Chef Alejandra Mex",
    authorRole: "Chef y Crítica Gastronómica",
    publishedAt: "2025-08-15",
    readTime: 8,
    featured: false,
    tags: ["Cacao", "Chocolate", "Cultura Maya", "Tabasco"],
    image: destComalcalco,
    contentImages: [
      { src: destVillahermosa, alt: "Plantación de cacao en Tabasco", caption: "Tabasco produce más del 70% del cacao mexicano", afterBlock: 1 },
    ],
    content: [
      "Para los antiguos mayas, el cacao era literalmente el 'alimento de los dioses'. Las semillas servían como moneda, ofrenda ceremonial y base de una bebida espumosa mezclada con chile, vainilla y achiote que solo la nobleza podía consumir.",
      "## La Ruta del Cacao en Tabasco\n\nTabasco es el corazón cacaotero de México, produciendo más del 70% del cacao nacional. La Ruta del Cacao te lleva por plantaciones centenarias donde puedes participar en todo el proceso: desde la cosecha del fruto hasta la elaboración del chocolate.",
      "## Hacienda Cacaotera La Luz\n\nUbicada cerca de Comalcalco, esta hacienda ofrece tours guiados donde aprendes sobre las variedades criollo y trinitario, y puedes crear tu propia tableta de chocolate. El aroma del cacao tostándose es inolvidable.",
      "## Cómo Conectar con el Tren Maya\n\nDesde la estación Villahermosa o Tenosique, puedes organizar excursiones de medio día a las plantaciones de cacao. Es una experiencia perfecta para combinar con la visita a las ruinas de Comalcalco, la única ciudad maya construida con ladrillos de barro cocido.",
    ],
  },
];
