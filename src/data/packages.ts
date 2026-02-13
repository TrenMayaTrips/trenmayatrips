export interface Package {
  slug: string;
  title: string;
  description: string;
  duration: number; // days
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  type: "cultural" | "aventura" | "gastronomico" | "mixto";
  states: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; description: string }[];
  groupSize: string;
  bestFor: string;
  maxAltitude?: number;
  difficulty: "fácil" | "moderado" | "desafiante";
  seasonalRating?: Record<string, number>; // season -> rating
}

export const packageTypes: Record<string, string> = {
  cultural: "Cultural y patrimonio",
  aventura: "Aventura y naturaleza",
  gastronomico: "Gastronómico",
  mixto: "Circuito completo",
};

export const packages: Package[] = [
  {
    slug: "ruta-grandeza-maya",
    title: "Ruta de la grandeza maya",
    description:
      "Recorre la historia de la civilización Maya en orden cronológico visitando sus sitios arqueológicos más espectaculares a lo largo de los 5 estados.",
    duration: 7,
    price: 18990,
    currency: "MXN",
    rating: 4.9,
    reviews: 156,
    type: "cultural",
    states: ["Campeche", "Chiapas", "Yucatán", "Quintana Roo"],
    highlights: [
      "Calakmul (Preclásico)",
      "Palenque (Clásico Temprano)",
      "Edzná (Clásico Tardío)",
      "Uxmal (Clásico Tardío)",
      "Chichén Itzá (Posclásico)",
      "Cobá y Tulum (Posclásico Tardío)",
    ],
    includes: [
      "6 noches de hospedaje (mix de hoteles 4-5 estrellas)",
      "Transporte privado con aire acondicionado",
      "Guía arqueólogo certificado en español",
      "Entradas a todas las zonas arqueológicas",
      "2 comidas diarias (desayuno y almuerzo)",
      "Seguro de viaje",
    ],
    excludes: [
      "Vuelos internacionales",
      "Cenas (recomendamos gastronomía local)",
      "Propinas y gastos personales",
      "Bebidas alcohólicas no incluidas",
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Campeche",
        description:
          "Bienvenida en Campeche. Recorrido por la ciudad amurallada. Hospedaje en hotel boutique del centro histórico.",
      },
      {
        day: 2,
        title: "Calakmul (Preclásico)",
        description:
          "Visita a Calakmul, una de las ciudades más grandes del mundo Maya. Exploración de pirámides y stelae en la selva.",
      },
      {
        day: 3,
        title: "Palenque (Clásico Temprano)",
        description:
          "Traslado a Chiapas. Recorrido por Palenque, ciudad de la selva con arquitectura única. Visita a las Cascadas de Agua Azul.",
      },
      {
        day: 4,
        title: "Edzná y Uxmal (Clásico Tardío)",
        description:
          "Viaje a Yucatán. Visita a Edzná con sus estructuras escalonadas. Por la tarde, Uxmal y la Ruta Puuc.",
      },
      {
        day: 5,
        title: "Chichén Itzá (Posclásico)",
        description:
          "Amanecer en Chichén Itzá. Recorrido completo del sitio. Visita a cenote sagrado. Tarde en Valladolid.",
      },
      {
        day: 6,
        title: "Cobá (Posclásico Temprano)",
        description:
          "Exploración de Cobá con sus noxocol y canales. Tarde libre para descanso o actividades opcionales en Tulum.",
      },
      {
        day: 7,
        title: "Tulum y despedida",
        description:
          "Última mañana en Tulum, la ciudad amurallada frente al Caribe. Almuerzo de despedida y traslado a punto de salida.",
      },
    ],
    groupSize: "4-12 personas",
    bestFor: "Viajeros apasionados por arqueología e historia Maya",
    maxAltitude: 150,
    difficulty: "moderado",
    seasonalRating: {
      "Enero-Marzo": 4.9,
      "Abril-Mayo": 4.7,
      "Junio-Septiembre": 4.5,
      "Octubre-Diciembre": 4.8,
    },
  },
  {
    slug: "cultura-gastronomia-entretenimiento",
    title: "Cultura, gastronomía y entretenimiento",
    description:
      "Vive la esencia de la Península de Yucatán y el Caribe Mexicano combinando experiencias culturales con sabores auténticos y playas paradisiacas.",
    duration: 7,
    price: 16490,
    currency: "MXN",
    rating: 4.8,
    reviews: 203,
    type: "mixto",
    states: ["Yucatán", "Quintana Roo"],
    highlights: [
      "Mérida (capital cultural)",
      "Chichén Itzá",
      "Cenotes",
      "Riviera Maya",
      "Tulum",
      "Playa del Carmen",
    ],
    includes: [
      "6 noches de hospedaje en hoteles 4-5 estrellas",
      "Transporte privado",
      "Guía local especializado",
      "4 experiencias gastronómicas incluidas (clases de cocina, tours de mercado)",
      "Acceso a 3 cenotes",
      "Cena de bienvenida y cena de despedida",
      "Seguro de viaje",
    ],
    excludes: [
      "Vuelos internacionales",
      "Bebidas alcohólicas premium",
      "Actividades acuáticas opcionales (snorkel, buceo)",
      "Propinas",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mérida - bienvenida cultural",
        description:
          "Llegada a Mérida. Tour a pie por el Centro Histórico. Visita a hacienda henequenera. Cena en casa tradicional yucateca.",
      },
      {
        day: 2,
        title: "Gastronomía yucateca",
        description:
          "Clase de cocina con chef local. Mercado tradicional. Elaboración de panuchos y papadzules. Almuerzo con lo preparado.",
      },
      {
        day: 3,
        title: "Chichén Itzá y cenotes",
        description:
          "Viaje a Chichén Itzá. Recorrido arqueológico. Nado en cenote subterráneo de aguas cristalinas.",
      },
      {
        day: 4,
        title: "Riviera Maya - playa y relax",
        description:
          "Traslado a Riviera Maya. Tarde libre en playa. Cena romántica frente al mar.",
      },
      {
        day: 5,
        title: "Tulum arqueológica",
        description:
          "Visita a Tulum, la única zona arqueológica frente al Caribe. Nado en cenote privado. Tour por tiendas de artesanía local.",
      },
      {
        day: 6,
        title: "Playa del Carmen - entretenimiento",
        description:
          "Mañana libre en Playa del Carmen. Tarde opcional en Xcaret. Espectáculo folclórico de lujo.",
      },
      {
        day: 7,
        title: "Despedida y regreso",
        description:
          "Última mañana libre. Almuerzo de despedida. Traslado a aeropuerto.",
      },
    ],
    groupSize: "4-15 personas",
    bestFor: "Parejas y familias que buscan equilibrio entre cultura, gastronomía y playa",
    difficulty: "fácil",
    seasonalRating: {
      "Enero-Marzo": 4.9,
      "Abril-Mayo": 4.8,
      "Junio-Septiembre": 4.4,
      "Octubre-Diciembre": 4.8,
    },
  },
  {
    slug: "aventura-naturaleza-5-estados",
    title: "Aventura en la naturaleza: los 5 estados",
    description:
      "Recorre la biodiversidad del sureste explorando selvas, cenotes, ríos subterráneos y reservas de biosfera.",
    duration: 9,
    price: 24990,
    currency: "MXN",
    rating: 4.9,
    reviews: 98,
    type: "aventura",
    states: ["Quintana Roo", "Yucatán", "Campeche", "Tabasco", "Chiapas"],
    highlights: [
      "Cenote Ik Kil",
      "Río Usumacinta",
      "Pantanos de Centla",
      "Reserva Biósfera Calakmul",
      "Cascadas de Agua Azul",
      "Snorkel en Arrecife Mesoamericano",
    ],
    includes: [
      "8 noches de hospedaje eco-lodge y hoteles",
      "Transporte privado 4x4 para terrenos difíciles",
      "Guía naturalista certificado",
      "Equipo de snorkel y nado",
      "Kayak en ríos y cenotes",
      "Senderismo en selva con arqueólogo",
      "8 comidas (desayuno y almuerzo)",
      "Seguro de viaje",
    ],
    excludes: [
      "Vuelos",
      "Cenas",
      "Actividades premium (inmersiones de buceo)",
      "Equipamiento personal",
    ],
    itinerary: [
      {
        day: 1,
        title: "Quintana Roo - Cenotes",
        description: "Llegada. Nado en cenote Ik Kil. Exploración subterránea.",
      },
      {
        day: 2,
        title: "Reserva de Tulum - snorkel",
        description:
          "Snorkel en arrecife mesoamericano. Exploración de parque marino.",
      },
      {
        day: 3,
        title: "Campeche - Calakmul",
        description:
          "Viaje a Campeche. Noche en eco-lodge en Calakmul. Senderismo nocturno.",
      },
      {
        day: 4,
        title: "Biosfera Calakmul",
        description:
          "Trekking en selva. Avistamiento de fauna. Cenote subterráneo.",
      },
      {
        day: 5,
        title: "Tabasco - pantanos",
        description:
          "Kayak en Pantanos de Centla. Observación de aves y caimanes.",
      },
      {
        day: 6,
        title: "Tabasco - ruta del cacao",
        description:
          "Senderismo en plantaciones de cacao. Visita a cascada en Puyacatengo.",
      },
      {
        day: 7,
        title: "Chiapas - Agua Azul",
        description:
          "Traslado a Chiapas. Cascadas de Agua Azul. Nado y fotografía.",
      },
      {
        day: 8,
        title: "Chiapas - Sumidero",
        description:
          "Navegación en Cañón del Sumidero. Caminata en miradores. Avistamiento de fauna.",
      },
      {
        day: 9,
        title: "Regreso",
        description: "Última mañana en naturaleza. Traslado a punto de salida.",
      },
    ],
    groupSize: "4-10 personas",
    bestFor: "Aventureros y amantes de la naturaleza con experiencia en outdoor",
    maxAltitude: 250,
    difficulty: "desafiante",
    seasonalRating: {
      "Enero-Marzo": 4.8,
      "Abril-Mayo": 4.6,
      "Junio-Septiembre": 4.3,
      "Octubre-Diciembre": 4.9,
    },
  },
  {
    slug: "mundo-maya-classico-4-dias",
    title: "Mundo Maya clásico - 4 días",
    description:
      "Una introducción perfecta a la civilización Maya con los sitios más icónicos en una duración compacta.",
    duration: 4,
    price: 8990,
    currency: "MXN",
    rating: 4.7,
    reviews: 312,
    type: "cultural",
    states: ["Yucatán", "Quintana Roo"],
    highlights: [
      "Chichén Itzá",
      "Cenote",
      "Tulum",
      "Cobá",
    ],
    includes: [
      "3 noches de hospedaje",
      "Transporte privado",
      "Guía arqueólogo",
      "Entradas a zonas arqueológicas",
      "Comidas incluidas",
      "Seguro de viaje",
    ],
    excludes: ["Vuelos", "Bebidas premium", "Propinas"],
    itinerary: [
      {
        day: 1,
        title: "Chichén Itzá",
        description: "Amanecer y recorrido completo en Chichén Itzá.",
      },
      {
        day: 2,
        title: "Cenotes y cenote sagrado",
        description: "Nado en cenote. Visita a sitios de nado tradicionales.",
      },
      {
        day: 3,
        title: "Tulum",
        description: "Tulum frente al Caribe. Nado en cenote privado.",
      },
      {
        day: 4,
        title: "Cobá",
        description: "Cobá y sus estructuras. Regreso.",
      },
    ],
    groupSize: "4-20 personas",
    bestFor: "Viajeros con tiempo limitado pero apasionados por la arqueología",
    difficulty: "fácil",
  },
  {
    slug: "gastronomia-autentica-yucatan",
    title: "Gastronomía auténtica de Yucatán",
    description:
      "Sumérgete en los sabores únicos de la cocina yucateca con clases, tours de mercado y cenas en casas locales.",
    duration: 5,
    price: 10490,
    currency: "MXN",
    rating: 4.9,
    reviews: 145,
    type: "gastronomico",
    states: ["Yucatán"],
    highlights: [
      "Cochinita Pibil",
      "Panuchos",
      "Papadzules",
      "Mercado de Mérida",
      "Haciendas Gastronómicas",
    ],
    includes: [
      "4 noches de hospedaje",
      "Transporte en Mérida",
      "3 clases de cocina",
      "Tours de mercado local",
      "2 cenas en casas tradicionales",
      "Cata de bebidas mayas",
      "Todas las comidas",
    ],
    excludes: ["Vuelos", "Bebidas alcohólicas premium", "Propinas"],
    itinerary: [
      {
        day: 1,
        title: "Mérida - bienvenida",
        description: "Llegada. Tour histórico. Cena en casa yucateca.",
      },
      {
        day: 2,
        title: "Mercados y cocina",
        description: "Tour de mercado. Clase de cocina. Almuerzo con lo preparado.",
      },
      {
        day: 3,
        title: "Hacienda gastronómica",
        description: "Día en hacienda histórica. Cata de bebidas. Cena",
      },
      {
        day: 4,
        title: "Técnicas tradicionales",
        description: "Clase de panuchos y papadzules. Visita a productor de queso.",
      },
      {
        day: 5,
        title: "Despedida",
        description: "Libre. Traslado a aeropuerto.",
      },
    ],
    groupSize: "4-8 personas",
    bestFor: "Foodies y amantes de la cocina local auténtica",
    difficulty: "fácil",
  },
];
