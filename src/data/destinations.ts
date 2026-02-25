export interface Destination {
  slug: string;
  name: string;
  state: string;
  type: "ciudad" | "arqueologia" | "naturaleza" | "playa" | "pueblo";
  tagline: string;
  description: string;
  highlights: string[];
  nearestStation: string;
  travelTime: string;
  bestMonths: string;
  emoji: string;
  videoUrl?: string;
}

export interface StateInfo {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  capital: string;
  tagline: string;
  destinationCount?: number;
}

export const states: StateInfo[] = [
  { slug: "quintana-roo", name: "Quintana Roo", emoji: "🏖️", color: "hsl(190, 70%, 45%)", capital: "Chetumal", tagline: "Caribe, cenotes y la Riviera Maya" },
  { slug: "yucatan", name: "Yucatán", emoji: "🏛️", color: "hsl(45, 80%, 50%)", capital: "Mérida", tagline: "Cuna de la civilización maya" },
  { slug: "campeche", name: "Campeche", emoji: "🏰", color: "hsl(15, 70%, 55%)", capital: "Campeche", tagline: "Murallas coloniales y selva profunda" },
  { slug: "tabasco", name: "Tabasco", emoji: "🌿", color: "hsl(140, 60%, 40%)", capital: "Villahermosa", tagline: "Ríos, cacao y cultura olmeca" },
  { slug: "chiapas", name: "Chiapas", emoji: "⛰️", color: "hsl(260, 50%, 50%)", capital: "Tuxtla Gutiérrez", tagline: "Selva, cascadas y pueblos mágicos" },
];

export const destinations: Destination[] = [
  // Quintana Roo
  {
    slug: "cancun",
    name: "Cancún",
    state: "quintana-roo",
    type: "playa",
    tagline: "Donde comienza la aventura",
    description: "Punto de partida icónico del Tren Maya, con playas de arena blanca, zona hotelera de clase mundial y vibrante vida nocturna. La estación Cancún conecta con el aeropuerto internacional más transitado del sureste.",
    highlights: ["Zona Hotelera", "Isla Mujeres", "Playa Delfines", "Museo Subacuático MUSA"],
    nearestStation: "Cancún Aeropuerto",
    travelTime: "Estación de inicio",
    bestMonths: "Nov – Abr",
    emoji: "🏖️",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
  {
    slug: "tulum",
    name: "Tulum",
    state: "quintana-roo",
    type: "arqueologia",
    tagline: "Ruinas frente al Caribe",
    description: "La única ciudad maya construida frente al mar. Tulum combina arqueología con playas paradisíacas, cenotes cristalinos y una escena gastronómica y artística que la convierte en uno de los destinos más deseados del mundo.",
    highlights: ["Zona Arqueológica", "Gran Cenote", "Playa Paraíso", "Cenote Dos Ojos"],
    nearestStation: "Tulum",
    travelTime: "Estación directa",
    bestMonths: "Nov – Mar",
    emoji: "🏛️",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
  {
    slug: "bacalar",
    name: "Bacalar",
    state: "quintana-roo",
    type: "naturaleza",
    tagline: "La Laguna de los Siete Colores",
    description: "Un paraíso de aguas cristalinas con siete tonalidades de azul, estromatolitos milenarios y una tranquilidad que contrasta con el ritmo del Caribe. Ideal para veleros, kayak y desconexión total.",
    highlights: ["Laguna de 7 Colores", "Canal de los Piratas", "Cenote Azul", "Fuerte de San Felipe"],
    nearestStation: "Bacalar",
    travelTime: "Estación directa",
    bestMonths: "Oct – May",
    emoji: "💎",
  },
  {
    slug: "playa-del-carmen",
    name: "Playa del Carmen",
    state: "quintana-roo",
    type: "playa",
    tagline: "Cosmopolita y caribeña",
    description: "El corazón de la Riviera Maya, con la famosa Quinta Avenida, ferry a Cozumel, parques eco-arqueológicos y una oferta gastronómica internacional sin igual.",
    highlights: ["Quinta Avenida", "Xcaret", "Xel-Há", "Cozumel"],
    nearestStation: "Playa del Carmen",
    travelTime: "Estación directa",
    bestMonths: "Nov – Abr",
    emoji: "🌴",
  },
  // Yucatán
  {
    slug: "merida",
    name: "Mérida",
    state: "yucatan",
    type: "ciudad",
    tagline: "La Ciudad Blanca",
    description: "Capital cultural del sureste mexicano, Mérida deslumbra con su arquitectura colonial, mercados vibrantes, museos de primer nivel y la mejor gastronomía yucateca. Fue nombrada Capital Americana de la Cultura.",
    highlights: ["Paseo de Montejo", "Mercado Lucas de Gálvez", "Gran Museo del Mundo Maya", "Barrio de Santa Ana"],
    nearestStation: "Mérida",
    travelTime: "Estación directa",
    bestMonths: "Nov – Mar",
    emoji: "🏛️",
  },
  {
    slug: "valladolid",
    name: "Valladolid",
    state: "yucatan",
    type: "pueblo",
    tagline: "Pueblo Mágico colonial",
    description: "Pueblo Mágico con calles empedradas de colores, cenotes a pasos del centro, conventos históricos y una gastronomía que rivaliza con Mérida. Punto estratégico entre Chichén Itzá y la costa caribeña.",
    highlights: ["Cenote Zací", "Convento de San Bernardino", "Cenote Suytun", "Calzada de los Frailes"],
    nearestStation: "Valladolid",
    travelTime: "Estación directa",
    bestMonths: "Nov – Abr",
    emoji: "🎨",
  },
  {
    slug: "chichen-itza",
    name: "Chichén Itzá",
    state: "yucatan",
    type: "arqueologia",
    tagline: "Maravilla del Mundo",
    description: "Una de las Siete Maravillas del Mundo Moderno. La Pirámide de Kukulcán, el Observatorio, el Juego de Pelota y el Cenote Sagrado son testimonio del genio de la civilización maya.",
    highlights: ["Pirámide de Kukulcán", "El Caracol", "Juego de Pelota", "Cenote Sagrado"],
    nearestStation: "Valladolid",
    travelTime: "40 min desde estación",
    bestMonths: "Sep – Mar",
    emoji: "⭐",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
  {
    slug: "izamal",
    name: "Izamal",
    state: "yucatan",
    type: "pueblo",
    tagline: "La Ciudad Amarilla",
    description: "Pueblo Mágico completamente pintado de amarillo ocre, donde conviven pirámides mayas y un imponente convento franciscano. El contraste del amarillo con el cielo azul es fotogénico de día y mágico de noche.",
    highlights: ["Convento de San Antonio", "Pirámide Kinich Kakmó", "Centro Artesanal", "Calesas"],
    nearestStation: "Izamal",
    travelTime: "Estación directa",
    bestMonths: "Oct – Abr",
    emoji: "💛",
  },
  // Campeche
  {
    slug: "campeche-ciudad",
    name: "Campeche",
    state: "campeche",
    type: "ciudad",
    tagline: "Patrimonio de la Humanidad",
    description: "Ciudad amurallada declarada Patrimonio de la Humanidad por la UNESCO. Sus fachadas coloridas, baluartes coloniales, malecón y gastronomía marina la convierten en una joya poco explorada del sureste.",
    highlights: ["Centro Histórico Amurallado", "Fuerte de San Miguel", "Malecón", "Calle 59"],
    nearestStation: "Campeche",
    travelTime: "Estación directa",
    bestMonths: "Nov – Abr",
    emoji: "🏰",
  },
  {
    slug: "calakmul",
    name: "Calakmul",
    state: "campeche",
    type: "arqueologia",
    tagline: "El reino perdido en la selva",
    description: "La rival de Tikal, escondida en la Reserva de la Biósfera más grande de México. Subir a la Estructura II (45m) ofrece una vista de 360° sobre un mar de selva virgen. Jaguares, tucanes y monos aulladores habitan el entorno.",
    highlights: ["Estructura II", "Reserva de la Biósfera", "Fauna silvestre", "Estelas mayas"],
    nearestStation: "Escárcega",
    travelTime: "2.5 hrs desde estación",
    bestMonths: "Nov – May",
    emoji: "🌳",
  },
  {
    slug: "edzna",
    name: "Edzná",
    state: "campeche",
    type: "arqueologia",
    tagline: "La Casa de los Itzáes",
    description: "Sitio arqueológico con un sofisticado sistema hidráulico de canales y una imponente acrópolis. El espectáculo de luz y sonido nocturno es una experiencia inolvidable.",
    highlights: ["Edificio de los Cinco Pisos", "Gran Acrópolis", "Sistema hidráulico", "Luz y sonido"],
    nearestStation: "Campeche",
    travelTime: "1 hr desde estación",
    bestMonths: "Nov – Abr",
    emoji: "🏛️",
  },
  // Tabasco
  {
    slug: "villahermosa",
    name: "Villahermosa",
    state: "tabasco",
    type: "ciudad",
    tagline: "Puerta al mundo olmeca",
    description: "Capital de Tabasco con el impresionante Parque-Museo La Venta, donde cabezas olmecas colosales se exhiben entre la selva. La ciudad es también puerta de entrada a la Ruta del Cacao y los ríos de Tabasco.",
    highlights: ["Parque-Museo La Venta", "Museo Regional de Antropología", "Ruta del Cacao", "Yumká"],
    nearestStation: "Villahermosa",
    travelTime: "Estación directa",
    bestMonths: "Nov – Abr",
    emoji: "🗿",
  },
  {
    slug: "comalcalco",
    name: "Comalcalco",
    state: "tabasco",
    type: "arqueologia",
    tagline: "Pirámides de ladrillo y cacao",
    description: "La única ciudad maya construida con ladrillos de barro cocido en lugar de piedra. Rodeada de plantaciones de cacao, ofrece una combinación única de arqueología y gastronomía del chocolate.",
    highlights: ["Zona arqueológica de ladrillo", "Hacienda La Luz", "Ruta del Cacao", "Chocolate artesanal"],
    nearestStation: "Villahermosa",
    travelTime: "1 hr desde estación",
    bestMonths: "Nov – Abr",
    emoji: "🍫",
  },
  // Chiapas
  {
    slug: "palenque",
    name: "Palenque",
    state: "chiapas",
    type: "arqueologia",
    tagline: "La ciudad perdida en la selva",
    description: "Enclavada en selva tropical, Palenque es quizás el sitio maya más atmosférico. La tumba de Pakal, el Palacio con su torre única y las cascadas circundantes crean una experiencia que trasciende la arqueología.",
    highlights: ["Templo de las Inscripciones", "El Palacio", "Cascadas de Agua Azul", "Misol-Há"],
    nearestStation: "Palenque",
    travelTime: "Estación directa",
    bestMonths: "Nov – Abr",
    emoji: "🌿",
    videoUrl: "https://www.youtube.com/watch?v=xKBSfMCFhiY",
  },
  {
    slug: "san-cristobal",
    name: "San Cristóbal de las Casas",
    state: "chiapas",
    type: "pueblo",
    tagline: "Pueblo Mágico en las montañas",
    description: "A 2,200 metros de altitud, esta ciudad colonial ofrece clima fresco, mercados indígenas, iglesias barrocas, café de altura y una atmósfera bohemia única. Los pueblos tzotziles circundantes mantienen tradiciones vivas.",
    highlights: ["Catedral de San Cristóbal", "Na Bolom", "Mercado de Santo Domingo", "San Juan Chamula"],
    nearestStation: "Palenque",
    travelTime: "5 hrs desde estación",
    bestMonths: "Oct – May",
    emoji: "☕",
  },
  {
    slug: "cascadas-agua-azul",
    name: "Cascadas de Agua Azul",
    state: "chiapas",
    type: "naturaleza",
    tagline: "Escaleras de agua turquesa",
    description: "Una serie de cascadas escalonadas de agua turquesa que descienden por la selva lacandona. Las pozas naturales invitan a nadar rodeados de vegetación exuberante y el sonido constante del agua.",
    highlights: ["Cascadas escalonadas", "Pozas naturales", "Selva lacandona", "Senderos interpretativos"],
    nearestStation: "Palenque",
    travelTime: "1.5 hrs desde estación",
    bestMonths: "Nov – May",
    emoji: "💧",
  },
];

export const destinationTypes = {
  ciudad: "🏙️ Ciudad",
  arqueologia: "🏛️ Arqueología",
  naturaleza: "🌿 Naturaleza",
  playa: "🏖️ Playa",
  pueblo: "🎨 Pueblo Mágico",
};
