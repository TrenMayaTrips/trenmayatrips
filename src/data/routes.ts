export interface RouteStop {
  name: string;
  time: string;
  highlights: string[];
  isOrigin?: boolean;
  isDestination?: boolean;
  stationSlug?: string;
}

export interface Route {
  slug: string;
  origin: string;
  destination: string;
  duration: string;
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
}

export const routes: Route[] = [
  {
    slug: "cancun-merida",
    origin: "Cancún",
    destination: "Mérida",
    duration: "4h 30min",
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
  },
  {
    slug: "cancun-tulum",
    origin: "Cancún",
    destination: "Tulum",
    duration: "3h 15min",
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
  },
  {
    slug: "merida-palenque",
    origin: "Mérida",
    destination: "Palenque",
    duration: "8h",
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
  },
  {
    slug: "merida-campeche",
    origin: "Mérida",
    destination: "Campeche",
    duration: "2h 30min",
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
