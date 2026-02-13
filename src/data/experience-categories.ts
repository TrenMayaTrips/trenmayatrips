// Category and subcategory hierarchy for the Experiencias section
// Maps to the 4-level architecture: Landing > Category > Subcategory > Detail

export interface Subcategory {
  slug: string;
  name: string;
  icon: string;
  description: string;
  heroDescription: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  heroHeadline: string;
  heroDescription: string;
  /** Maps to the `category` field in experiences.ts */
  experienceCategory: string;
  subcategories: Subcategory[];
  faqCultural: { question: string; answer: string }[];
  faqTips: { question: string; answer: string }[];
}

export const categories: Category[] = [
  {
    slug: "cultural-patrimonio",
    name: "Cultural y patrimonio",
    icon: "🏛️",
    description: "Arqueología, museos, arte y tradiciones vivas del mundo maya",
    heroHeadline: "Patrimonio cultural maya",
    heroDescription:
      "Explora milenios de sabiduría ancestral a través de experiencias auténticas y transformadoras",
    experienceCategory: "cultural",
    subcategories: [
      {
        slug: "zonas-arqueologicas",
        name: "Zonas arqueológicas",
        icon: "🏛️",
        description: "Explora las majestuosas ciudades mayas y descubre los secretos de una civilización milenaria",
        heroDescription:
          "Explora las majestuosas ciudades mayas y descubre los secretos de una de las civilizaciones más fascinantes",
      },
      {
        slug: "museos-galerias",
        name: "Museos y galerías",
        icon: "🎨",
        description: "Arte contemporáneo y prehispánico en los principales museos de la península",
        heroDescription:
          "Descubre la riqueza artística y cultural del mundo maya en museos y galerías especializadas",
      },
      {
        slug: "artesanias-tradicionales",
        name: "Artesanías tradicionales",
        icon: "🧵",
        description: "Textiles, cerámica y oficios ancestrales de las comunidades mayas",
        heroDescription:
          "Conoce a los artesanos mayas y participa en talleres de oficios ancestrales transmitidos por generaciones",
      },
      {
        slug: "ceremonias-mayas",
        name: "Ceremonias mayas",
        icon: "🔥",
        description: "Rituales y ceremonias sagradas con guías espirituales indígenas",
        heroDescription:
          "Participa en rituales ancestrales conducidos por guías espirituales de las comunidades mayas",
      },
      {
        slug: "danzas-tradiciones",
        name: "Danzas y tradiciones",
        icon: "🎶",
        description: "Festivales, danzas folclóricas y celebraciones culturales",
        heroDescription:
          "Vive la riqueza de las danzas folclóricas y las tradiciones festivas del sureste mexicano",
      },
    ],
    faqCultural: [
      {
        question: "¿Cuáles son los códigos de conducta en zonas arqueológicas?",
        answer:
          "Se debe respetar las áreas restringidas, no subir a las estructuras señaladas, no tocar los relieves y mantener un volumen de voz moderado.",
      },
      {
        question: "¿Hay vestimenta apropiada para visitas culturales?",
        answer:
          "Ropa cómoda y ligera, zapatos cerrados para caminar, sombrero y protector solar. En ceremonias, evita colores llamativos.",
      },
      {
        question: "¿Cómo respetar los rituales durante las visitas?",
        answer:
          "Sigue las indicaciones del guía espiritual, pide permiso antes de fotografiar y participa con mente abierta y respetuosa.",
      },
      {
        question: "¿Cuáles son las normas de fotografía en sitios culturales?",
        answer:
          "La fotografía personal está permitida sin flash ni tripié en la mayoría de los sitios. El uso de drone requiere permiso del INAH.",
      },
    ],
    faqTips: [
      {
        question: "¿Cuáles son los mejores horarios para visitar?",
        answer:
          "Temprano en la mañana (antes de las 9 AM) o después de las 3 PM para evitar el calor intenso y las multitudes.",
      },
      {
        question: "¿Qué equipamiento llevar?",
        answer:
          "Agua, bloqueador solar, repelente de insectos, sombrero, cámara y zapatos cómodos para caminar en terreno irregular.",
      },
      {
        question: "¿Cómo prepararse para las visitas?",
        answer:
          "Investiga un poco sobre la historia del sitio antes de visitarlo. Hidratarse bien y cenar temprano la noche anterior si la visita es temprana.",
      },
      {
        question: "¿Hay consideraciones culturales especiales?",
        answer:
          "Respeta las comunidades locales, consume productos y artesanías locales, y evita regatear excesivamente con los artesanos.",
      },
    ],
  },
  {
    slug: "aventura-naturaleza",
    name: "Aventura y naturaleza",
    icon: "🌿",
    description: "Cenotes, selvas, arrecifes y deportes acuáticos en el sureste mexicano",
    heroHeadline: "Aventura y naturaleza",
    heroDescription:
      "Sumérgete en cenotes sagrados, explora selvas milenarias y descubre la biodiversidad del sureste mexicano",
    experienceCategory: "aventura",
    subcategories: [
      {
        slug: "cenotes-rios-subterraneos",
        name: "Cenotes y ríos subterráneos",
        icon: "💧",
        description: "Nada en cenotes sagrados y explora ríos subterráneos cristalinos",
        heroDescription:
          "Descubre los cenotes sagrados de la península y navega ríos subterráneos de aguas cristalinas",
      },
      {
        slug: "snorkel-buceo",
        name: "Snorkel y buceo",
        icon: "🤿",
        description: "Explora el segundo arrecife más grande del mundo",
        heroDescription:
          "Sumérgete en el Gran Arrecife Mesoamericano y nada entre tortugas, rayas y peces tropicales",
      },
      {
        slug: "senderismo-selva",
        name: "Senderismo en selva",
        icon: "🌳",
        description: "Rutas de trekking en las reservas naturales del sureste",
        heroDescription:
          "Recorre senderos en la selva tropical y descubre la flora y fauna endémica de la región",
      },
      {
        slug: "observacion-aves",
        name: "Observación de aves",
        icon: "🦜",
        description: "Avistamiento de aves tropicales y migratorias en reservas naturales",
        heroDescription:
          "Observa tucanes, flamencos, quetzales y cientos de especies en los mejores puntos de la península",
      },
      {
        slug: "deportes-acuaticos",
        name: "Deportes acuáticos",
        icon: "🚤",
        description: "Kayak, paddleboard, vela y más en el Caribe mexicano",
        heroDescription:
          "Navega el Caribe mexicano en catamarán, kayak o paddleboard con los mejores guías acuáticos",
      },
    ],
    faqCultural: [
      {
        question: "¿Es seguro nadar en cenotes?",
        answer:
          "Sí, todos nuestros cenotes cuentan con guías certificados y equipo de seguridad. Se requiere usar bloqueador solar biodegradable.",
      },
      {
        question: "¿Se necesita experiencia previa para el snorkel?",
        answer:
          "No, nuestros guías proporcionan instrucciones básicas. Para buceo se requiere certificación o curso introductorio incluido.",
      },
      {
        question: "¿Hay restricciones de edad para las actividades?",
        answer:
          "La mayoría de las actividades son para mayores de 6 años. El buceo requiere mínimo 12 años. Cada experiencia indica sus restricciones.",
      },
      {
        question: "¿Qué productos de cuidado personal están permitidos?",
        answer:
          "Solo bloqueador solar y repelente biodegradables. Proporcionamos opciones en la mayoría de las experiencias acuáticas.",
      },
    ],
    faqTips: [
      {
        question: "¿Cuál es la mejor temporada para estas actividades?",
        answer:
          "De noviembre a abril para snorkel y buceo. Los cenotes se pueden visitar todo el año. Temporada de aves migratorias: octubre a marzo.",
      },
      {
        question: "¿Qué llevar a las actividades de naturaleza?",
        answer:
          "Traje de baño, zapatos acuáticos, ropa ligera de manga larga, repelente biodegradable, cámara acuática y binoculares.",
      },
      {
        question: "¿Cómo llegar a los puntos de actividades?",
        answer:
          "Todas nuestras experiencias incluyen transporte desde los principales hoteles y ciudades de la ruta del Tren Maya.",
      },
      {
        question: "¿Hay opciones para familias con niños pequeños?",
        answer:
          "Sí, ofrecemos actividades familiares con nivel de dificultad bajo. Consulta las experiencias marcadas como 'familiar'.",
      },
    ],
  },
  {
    slug: "gastronomico",
    name: "Gastronómico",
    icon: "🍽️",
    description: "Cocina maya, mercados, cacao y sabores auténticos del sureste",
    heroHeadline: "Experiencias gastronómicas",
    heroDescription:
      "Descubre los sabores ancestrales del mundo maya, desde la cochinita pibil hasta el chocolate de Tabasco",
    experienceCategory: "gastronomico",
    subcategories: [
      {
        slug: "clases-cocina-maya",
        name: "Clases de cocina maya",
        icon: "👩‍🍳",
        description: "Aprende a preparar platillos tradicionales con cocineras locales",
        heroDescription:
          "Aprende los secretos de la cocina maya con cocineras tradicionales en experiencias inmersivas",
      },
      {
        slug: "tours-mercados",
        name: "Tours de mercados",
        icon: "🧺",
        description: "Recorre mercados locales y descubre ingredientes únicos",
        heroDescription:
          "Explora los vibrantes mercados del sureste mexicano y conoce los ingredientes que dan vida a la cocina maya",
      },
      {
        slug: "catas-bebidas",
        name: "Catas de bebidas tradicionales",
        icon: "🍫",
        description: "Mezcal, cacao, xtabentún y bebidas ceremoniales",
        heroDescription:
          "Degusta mezcal artesanal, chocolate de cacao criollo y las bebidas ceremoniales del mundo maya",
      },
      {
        slug: "experiencias-haciendas",
        name: "Experiencias en haciendas",
        icon: "🏡",
        description: "Gastronomía y cultura en haciendas henequeneras restauradas",
        heroDescription:
          "Vive la gastronomía yucateca en haciendas históricas rodeadas de historia y naturaleza",
      },
      {
        slug: "cocina-callejera",
        name: "Cocina callejera auténtica",
        icon: "🌮",
        description: "Tours gastronómicos por las calles y fondas del sureste",
        heroDescription:
          "Recorre las mejores fondas, taquerías y puestos callejeros con guías gastronómicos locales",
      },
    ],
    faqCultural: [
      {
        question: "¿Las experiencias gastronómicas incluyen opciones vegetarianas?",
        answer:
          "Sí, la cocina maya tiene una gran variedad de platillos vegetarianos. Avísanos al reservar para adaptar el menú.",
      },
      {
        question: "¿Puedo participar si tengo alergias alimentarias?",
        answer:
          "Por supuesto. Comunica tus alergias al momento de reservar y nuestros cocineros adaptarán la experiencia.",
      },
      {
        question: "¿Se puede comprar los ingredientes para llevar?",
        answer:
          "En los tours de mercados y haciendas podrás comprar especias, chocolate, miel y otros productos artesanales.",
      },
      {
        question: "¿Qué nivel de cocina se requiere para las clases?",
        answer:
          "Ninguno. Las clases están diseñadas para todos los niveles, desde principiantes hasta cocineros experimentados.",
      },
    ],
    faqTips: [
      {
        question: "¿Cuáles son los platillos imperdibles de la región?",
        answer:
          "Cochinita pibil, papadzules, panuchos, salbutes, poc chuc, relleno negro, queso relleno y chocolomo.",
      },
      {
        question: "¿Cuánto dura una clase de cocina?",
        answer:
          "Las clases duran entre 3 y 5 horas, incluyendo la preparación, cocción y degustación de los platillos.",
      },
      {
        question: "¿Los tours gastronómicos incluyen bebidas?",
        answer:
          "Sí, todos incluyen degustación de aguas frescas, chocolate y en algunos casos mezcal o xtabentún.",
      },
      {
        question: "¿Cuál es el mejor horario para los tours de mercados?",
        answer:
          "Temprano en la mañana (7-9 AM) cuando los ingredientes están más frescos y hay mayor actividad.",
      },
    ],
  },
  {
    slug: "bienestar",
    name: "Bienestar y relajación",
    icon: "🧘",
    description: "Temazcales, yoga, retiros de sanación y terapias holísticas",
    heroHeadline: "Bienestar y relajación",
    heroDescription:
      "Reconecta con tu esencia a través de rituales ancestrales, temazcales y retiros de bienestar en la selva",
    experienceCategory: "bienestar",
    subcategories: [
      {
        slug: "spas-temazcales",
        name: "Spas y temazcales",
        icon: "♨️",
        description: "Temazcales tradicionales y spas con tratamientos mayas",
        heroDescription:
          "Purifica cuerpo y mente en temazcales ancestrales y spas inspirados en la tradición maya",
      },
      {
        slug: "retiros-yoga",
        name: "Retiros de yoga",
        icon: "🧘",
        description: "Yoga al amanecer, meditación y mindfulness en la selva",
        heroDescription:
          "Practica yoga y meditación en entornos naturales privilegiados de la península de Yucatán",
      },
      {
        slug: "terapias-holisticas",
        name: "Terapias holísticas",
        icon: "🌿",
        description: "Medicina tradicional maya, herbolaria y sanación energética",
        heroDescription:
          "Experimenta la sabiduría de la medicina maya con terapias holísticas y tratamientos naturales",
      },
      {
        slug: "ceremonias-sanacion",
        name: "Ceremonias de sanación",
        icon: "✨",
        description: "Rituales de purificación y ceremonia del fuego sagrado",
        heroDescription:
          "Participa en ceremonias de sanación dirigidas por guías espirituales de las comunidades mayas",
      },
    ],
    faqCultural: [
      {
        question: "¿Qué es un temazcal?",
        answer:
          "Es un baño de vapor ceremonial de origen prehispánico. Se utiliza para purificación física, mental y espiritual con hierbas medicinales.",
      },
      {
        question: "¿Necesito experiencia previa en yoga?",
        answer:
          "No, ofrecemos sesiones para todos los niveles. Los instructores adaptan la práctica a las capacidades de cada participante.",
      },
      {
        question: "¿Las ceremonias de sanación son religiosas?",
        answer:
          "Son rituales espirituales de la tradición maya, no vinculados a ninguna religión. Se viven con respeto y mente abierta.",
      },
      {
        question: "¿Hay contraindicaciones para el temazcal?",
        answer:
          "No es recomendable para embarazadas, personas con problemas cardíacos o hipertensión. Consulta con tu médico si tienes dudas.",
      },
    ],
    faqTips: [
      {
        question: "¿Qué llevar a un retiro de bienestar?",
        answer:
          "Ropa cómoda, traje de baño, toalla, botella de agua reutilizable y mente abierta. Evita joyas y metales para el temazcal.",
      },
      {
        question: "¿Cuánto duran los retiros?",
        answer:
          "Ofrecemos desde sesiones de medio día hasta retiros de 3-5 días con hospedaje en eco-lodges.",
      },
      {
        question: "¿Puedo combinar bienestar con otras experiencias?",
        answer:
          "Sí, muchos viajeros combinan un temazcal o yoga con visitas arqueológicas o experiencias gastronómicas.",
      },
      {
        question: "¿Los retiros incluyen alimentación?",
        answer:
          "Sí, los retiros de más de un día incluyen alimentación orgánica y vegetariana con ingredientes locales.",
      },
    ],
  },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find((s) => s.slug === subcategorySlug);
};

export const guarantees = [
  { icon: "✅", title: "Autenticidad garantizada", description: "Experiencias verificadas con comunidades locales" },
  { icon: "🎓", title: "Guías certificados", description: "Profesionales con certificación oficial" },
  { icon: "🤝", title: "Apoyo a comunidades", description: "Parte de tu pago beneficia directamente a las comunidades" },
  { icon: "🌱", title: "Turismo responsable", description: "Prácticas sostenibles y respetuosas con el medio ambiente" },
];
