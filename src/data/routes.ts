import destCancun from "@/assets/dest-cancun.jpg";
import destMerida from "@/assets/dest-merida.jpg";
import destTulum from "@/assets/dest-tulum.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import destCampeche from "@/assets/dest-campeche-ciudad.jpg";
import destBacalar from "@/assets/dest-bacalar.jpg";

export interface RouteStop {
  name: string;
  time: string;
  highlights: string[];
  isOrigin?: boolean;
  isDestination?: boolean;
  stationSlug?: string;
}

export interface RouteTip {
  icon: string;
  title: string;
  description: string;
}

export interface Route {
  slug: string;
  origin: string;
  destination: string;
  duration: string;
  durationMinutes: number;
  stops: number;
  dailyDepartures: number;
  badge: string;
  badgeEmoji: string;
  prices: {
    xiinbal: number;
    janal: number;
    patal: number;
  };
  schedules: string[];
  timeline: RouteStop[];
  description: string;
  heroImage: string;
  statesTraversed: string[];
  scenicHighlights: string;
  tips: RouteTip[];
}

export const routes: Route[] = [
  {
    slug: "cancun-merida",
    origin: "Cancún",
    destination: "Mérida",
    duration: "4h 30min",
    durationMinutes: 270,
    stops: 6,
    dailyDepartures: 3,
    badge: "Más popular",
    badgeEmoji: "⭐",
    prices: { xiinbal: 890, janal: 1490, patal: 2490 },
    schedules: ["6:00 AM", "10:00 AM", "3:00 PM"],
    description: "La ruta más popular del Tren Maya. Cruza Quintana Roo y Yucatán conectando el Caribe con la cultura maya.",
    timeline: [
      { name: "Cancún Aeropuerto", time: "6:00 AM", highlights: ["Origen", "Terminal principal"], isOrigin: true },
      { name: "Puerto Morelos", time: "6:35 AM", highlights: ["Arrecife", "Cenotes"] },
      { name: "Playa del Carmen", time: "7:10 AM", highlights: ["Ferry a Cozumel", "Quinta Avenida"] },
      { name: "Valladolid", time: "8:15 AM", highlights: ["🏅 Pueblo Mágico", "Chichén Itzá 40min"] },
      { name: "Izamal", time: "8:50 AM", highlights: ["🏅 Pueblo Mágico", "Ciudad Amarilla"] },
      { name: "Mérida", time: "10:30 AM", highlights: ["Capital de Yucatán", "Hub principal"], isDestination: true },
    ],
    heroImage: destCancun,
    statesTraversed: ["quintana-roo", "yucatan"],
    scenicHighlights: "Selva baja, cenotes y haciendas henequeneras. El tramo Valladolid–Izamal ofrece vistas espectaculares de la campiña yucateca.",
    tips: [
      { icon: "seat", title: "Mejor asiento", description: "Ventanilla izquierda para ver los cenotes entre Puerto Morelos y Playa del Carmen." },
      { icon: "schedule", title: "Horario recomendado", description: "La salida de las 6:00 AM llega temprano a Mérida para disfrutar el día completo." },
      { icon: "pack", title: "Qué llevar", description: "Ropa ligera, bloqueador solar y una chamarra ligera por el aire acondicionado del tren." },
      { icon: "transport", title: "Al llegar a Mérida", description: "Taxis y colectivos disponibles en la estación. El centro histórico está a 15 minutos." },
    ],
  },
  {
    slug: "cancun-tulum",
    origin: "Cancún",
    destination: "Tulum",
    duration: "3h 15min",
    durationMinutes: 195,
    stops: 4,
    dailyDepartures: 4,
    badge: "Costa",
    badgeEmoji: "🏖️",
    prices: { xiinbal: 650, janal: 1090, patal: 1890 },
    schedules: ["6:30 AM", "9:00 AM", "1:00 PM", "5:00 PM"],
    description: "Recorre la costa caribeña desde Cancún hasta las ruinas mayas frente al mar en Tulum.",
    timeline: [
      { name: "Cancún Aeropuerto", time: "6:30 AM", highlights: ["Origen"], isOrigin: true },
      { name: "Puerto Morelos", time: "7:05 AM", highlights: ["Arrecife de coral"] },
      { name: "Playa del Carmen", time: "7:40 AM", highlights: ["Riviera Maya"] },
      { name: "Tulum", time: "9:45 AM", highlights: ["Zona arqueológica", "Playas"], isDestination: true },
    ],
    heroImage: destTulum,
    statesTraversed: ["quintana-roo"],
    scenicHighlights: "Toda la costa caribeña: manglares, playas de arena blanca y el azul turquesa del Caribe mexicano visible desde las ventanillas.",
    tips: [
      { icon: "seat", title: "Mejor asiento", description: "Ventanilla derecha para las mejores vistas del mar Caribe." },
      { icon: "schedule", title: "Horario recomendado", description: "La salida de las 9:00 AM es ideal para llegar a Tulum al mediodía y disfrutar la playa." },
      { icon: "pack", title: "Qué llevar", description: "Traje de baño, bloqueador biodegradable y zapatos cómodos para las ruinas." },
      { icon: "transport", title: "Al llegar a Tulum", description: "Taxis colectivos y bicicletas de renta disponibles. La zona arqueológica está a 10 min." },
    ],
  },
  {
    slug: "merida-palenque",
    origin: "Mérida",
    destination: "Palenque",
    duration: "8h",
    durationMinutes: 480,
    stops: 9,
    dailyDepartures: 2,
    badge: "Arqueológica",
    badgeEmoji: "🏛️",
    prices: { xiinbal: 1690, janal: 2490, patal: 3890 },
    schedules: ["6:00 AM", "2:00 PM"],
    description: "La travesía más larga y espectacular. Cruza la península completa pasando por Campeche y la selva chiapaneca.",
    timeline: [
      { name: "Mérida-Teya", time: "6:00 AM", highlights: ["Origen", "Capital cultural"], isOrigin: true },
      { name: "Maxcanú", time: "6:40 AM", highlights: ["Ruta Puuc"] },
      { name: "Calkiní", time: "7:20 AM", highlights: ["Artesanías"] },
      { name: "San Francisco de Campeche", time: "8:30 AM", highlights: ["⭐ UNESCO", "Murallas coloniales"] },
      { name: "Edzná", time: "9:15 AM", highlights: ["Zona arqueológica"] },
      { name: "Escárcega", time: "10:30 AM", highlights: ["Conexión de tramos"] },
      { name: "Candelaria", time: "11:15 AM", highlights: [] },
      { name: "Tenosique", time: "12:30 PM", highlights: ["Pomoná"] },
      { name: "Palenque", time: "2:00 PM", highlights: ["Zona arqueológica", "Cascadas"], isDestination: true },
    ],
    heroImage: destPalenque,
    statesTraversed: ["yucatan", "campeche", "chiapas"],
    scenicHighlights: "La ruta más variada: de la planicie yucateca a las murallas coloniales de Campeche, luego selva tropical densa con posibilidad de avistar monos aulladores y tucanes.",
    tips: [
      { icon: "seat", title: "Mejor asiento", description: "Ventanilla derecha en el tramo Escárcega–Palenque para la mejor vista de la selva." },
      { icon: "schedule", title: "Horario recomendado", description: "Considera hacer escala en Campeche con la salida de las 6:00 AM. 8 horas seguidas es largo." },
      { icon: "pack", title: "Qué llevar", description: "Comida extra si viajas en Xiinbal. Repelente de insectos para Palenque. Ropa de cambio." },
      { icon: "transport", title: "Al llegar a Palenque", description: "Colectivos al pueblo (10 min) y a la zona arqueológica (15 min). Taxis disponibles 24/7." },
    ],
  },
  {
    slug: "merida-campeche",
    origin: "Mérida",
    destination: "Campeche",
    duration: "2h 30min",
    durationMinutes: 150,
    stops: 3,
    dailyDepartures: 3,
    badge: "Colonial",
    badgeEmoji: "🏰",
    prices: { xiinbal: 520, janal: 890, patal: 1490 },
    schedules: ["7:00 AM", "12:00 PM", "5:00 PM"],
    description: "Conecta dos capitales culturales. De la blanca Mérida a la amurallada Campeche, Patrimonio UNESCO.",
    timeline: [
      { name: "Mérida-Teya", time: "7:00 AM", highlights: ["Origen"], isOrigin: true },
      { name: "Maxcanú", time: "7:40 AM", highlights: ["Ruta Puuc"] },
      { name: "Calkiní", time: "8:20 AM", highlights: ["Artesanías"] },
      { name: "San Francisco de Campeche", time: "9:30 AM", highlights: ["⭐ UNESCO"], isDestination: true },
    ],
    heroImage: destCampeche,
    statesTraversed: ["yucatan", "campeche"],
    scenicHighlights: "Transición de la planicie blanca yucateca a los campos verdes campechanos. Haciendas abandonadas y pueblos con arquitectura colonial visible desde el tren.",
    tips: [
      { icon: "seat", title: "Mejor asiento", description: "Cualquier lado ofrece buenas vistas. El tramo es corto y agradable." },
      { icon: "schedule", title: "Horario recomendado", description: "Toma el tren de las 7:00 AM para llegar temprano y recorrer el centro amurallado a pie." },
      { icon: "pack", title: "Qué llevar", description: "Cámara fotográfica. Las fachadas coloridas de Campeche son muy fotogénicas." },
      { icon: "transport", title: "Al llegar a Campeche", description: "El centro amurallado está a 10 minutos a pie de la estación. Puedes regresar el mismo día." },
    ],
  },
  {
    slug: "tulum-bacalar",
    origin: "Tulum",
    destination: "Bacalar",
    duration: "2h 45min",
    stops: 3,
    dailyDepartures: 2,
    badge: "Naturaleza",
    badgeEmoji: "🌿",
    prices: { xiinbal: 480, janal: 790, patal: 1290 },
    schedules: ["8:00 AM", "3:00 PM"],
    description: "De las ruinas frente al mar a la Laguna de los Siete Colores. La ruta más escénica del Caribe maya.",
    timeline: [
      { name: "Tulum", time: "8:00 AM", highlights: ["Origen", "Zona arqueológica"], isOrigin: true },
      { name: "Felipe Carrillo Puerto", time: "9:00 AM", highlights: ["Centro ceremonial maya"] },
      { name: "Limones-Chacchoben", time: "9:40 AM", highlights: ["Zona arqueológica"] },
      { name: "Bacalar", time: "10:45 AM", highlights: ["Laguna de 7 colores"], isDestination: true },
    ],
    heroImage: destBacalar,
    statesTraversed: ["quintana-roo"],
    scenicHighlights: "Selva baja y sabana tropical. Al acercarse a Bacalar, los destellos azul turquesa de la laguna aparecen entre la vegetación — un momento mágico.",
    tips: [
      { icon: "seat", title: "Mejor asiento", description: "Ventanilla izquierda para las primeras vistas de la laguna al llegar a Bacalar." },
      { icon: "schedule", title: "Horario recomendado", description: "La salida de las 8:00 AM te da el día completo en Bacalar para disfrutar la laguna." },
      { icon: "pack", title: "Qué llevar", description: "Traje de baño, bloqueador biodegradable (obligatorio en la laguna) y ropa ligera." },
      { icon: "transport", title: "Al llegar a Bacalar", description: "Taxis y mototaxis al centro y a los balnearios de la laguna. Todo está cerca." },
    ],
  },
];

// All unique station names for the route finder dropdowns
export const allStationNames = [
  "Cancún", "Puerto Morelos", "Playa del Carmen", "Tulum", "Felipe Carrillo Puerto",
  "Bacalar", "Limones-Chacchoben", "Chetumal", "Valladolid", "Chichén Itzá", "Izamal",
  "Mérida", "Maxcanú", "Calkiní", "San Francisco de Campeche", "Edzná", "Escárcega",
  "Calakmul", "Xpujil", "Tenosique", "Palenque",
];

export function findRoute(origin: string, destination: string): Route | undefined {
  return routes.find(
    (r) =>
      (r.origin === origin && r.destination === destination) ||
      (r.origin === destination && r.destination === origin)
  );
}
