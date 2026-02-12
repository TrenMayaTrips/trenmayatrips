export interface Station {
  name: string;
  state: string;
  stateKey: string;
  km: number;
  highlights: string[];
  isMain?: boolean;
}

export const stations: Station[] = [
  { name: "Palenque", state: "Chiapas", stateKey: "chiapas", km: 0, highlights: ["Zona arqueológica", "Cascadas de Agua Azul"], isMain: true },
  { name: "Boca del Cerro", state: "Tabasco", stateKey: "tabasco", km: 60, highlights: ["Presa Netzahualcóyotl"] },
  { name: "Tenosique", state: "Tabasco", stateKey: "tabasco", km: 120, highlights: ["Pomoná", "Pantanos de Centla"] },
  { name: "Balancán", state: "Tabasco", stateKey: "tabasco", km: 180, highlights: ["Moral-Reforma"] },
  { name: "Escárcega", state: "Campeche", stateKey: "campeche", km: 340, highlights: ["Punto de conexión"], isMain: true },
  { name: "Calakmul", state: "Campeche", stateKey: "campeche", km: 430, highlights: ["Reserva de la Biosfera", "Zona arqueológica"], isMain: true },
  { name: "Xpujil", state: "Campeche", stateKey: "campeche", km: 460, highlights: ["Becán", "Chicanná"] },
  { name: "Bacalar", state: "Quintana Roo", stateKey: "quintana-roo", km: 560, highlights: ["Laguna de 7 colores", "Fuerte San Felipe"], isMain: true },
  { name: "Chetumal", state: "Quintana Roo", stateKey: "quintana-roo", km: 600, highlights: ["Capital del estado", "Museo de la Cultura Maya"] },
  { name: "Felipe Carrillo Puerto", state: "Quintana Roo", stateKey: "quintana-roo", km: 700, highlights: ["Centro ceremonial Maya"] },
  { name: "Tulum", state: "Quintana Roo", stateKey: "quintana-roo", km: 780, highlights: ["Zona arqueológica", "Playas", "Cenotes"], isMain: true },
  { name: "Playa del Carmen", state: "Quintana Roo", stateKey: "quintana-roo", km: 840, highlights: ["Quinta Avenida", "Ferry a Cozumel"] },
  { name: "Puerto Morelos", state: "Quintana Roo", stateKey: "quintana-roo", km: 870, highlights: ["Arrecife de coral", "Ruta de los Cenotes"] },
  { name: "Cancún Aeropuerto", state: "Quintana Roo", stateKey: "quintana-roo", km: 900, highlights: ["Conexión aérea internacional"], isMain: true },
  { name: "Cancún", state: "Quintana Roo", stateKey: "quintana-roo", km: 920, highlights: ["Zona Hotelera", "Isla Mujeres"] },
  { name: "Izamal", state: "Yucatán", stateKey: "yucatan", km: 1050, highlights: ["Pueblo Mágico amarillo", "Convento franciscano"], isMain: true },
  { name: "Chichén Itzá", state: "Yucatán", stateKey: "yucatan", km: 1100, highlights: ["Maravilla del Mundo", "Cenote Sagrado"], isMain: true },
  { name: "Valladolid", state: "Yucatán", stateKey: "yucatan", km: 1140, highlights: ["Pueblo Mágico", "Cenote Zací"] },
  { name: "Mérida", state: "Yucatán", stateKey: "yucatan", km: 1250, highlights: ["Capital cultural", "Paseo de Montejo"], isMain: true },
  { name: "Campeche", state: "Campeche", stateKey: "campeche", km: 1400, highlights: ["Patrimonio UNESCO", "Murallas coloniales"], isMain: true },
  { name: "Edzná", state: "Campeche", stateKey: "campeche", km: 1450, highlights: ["Zona arqueológica", "Edificio de los Cinco Pisos"] },
];

export const trenMayaStats = {
  totalKm: 1554,
  stations: 34,
  states: 5,
  wagonTypes: 3,
};

export const wagonClasses = [
  {
    name: "Xiinbal",
    meaning: "Caminar en maya",
    type: "Clase económica",
    description: "Ideal para viajeros que buscan comodidad a un precio accesible. Asientos reclinables con vista panorámica.",
    amenities: ["Asientos reclinables", "Vista panorámica", "Servicio de snacks y bebidas", "Sanitarios", "Aire acondicionado"],
  },
  {
    name: "Janal",
    meaning: "Comer en maya",
    type: "Clase intermedia",
    description: "La mejor relación calidad-precio con amenidades mejoradas y servicio de alimentos a bordo.",
    amenities: ["Asientos premium reclinables", "Servicio de alimentos", "Bar a bordo", "Wi-Fi", "Enchufes USB", "Aire acondicionado"],
  },
  {
    name: "P'atal",
    meaning: "Quedarse en maya",
    type: "Clase premium",
    description: "La experiencia de lujo definitiva sobre rieles. Servicio personalizado y amenidades de primera clase.",
    amenities: ["Cabina de lujo", "Gastronomía gourmet", "Servicio personalizado", "Entretenimiento a bordo", "Amenidades completas", "Acceso VIP en estaciones"],
  },
];
