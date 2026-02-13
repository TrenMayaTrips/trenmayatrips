export interface Station {
  name: string;
  state: string;
  stateKey: string;
  km: number;
  type: "principal" | "estacion" | "paradero";
  highlights: string[];
}

export const stations: Station[] = [
  // Tramo 1: Palenque – Escárcega
  { name: "Palenque", state: "Chiapas", stateKey: "chiapas", km: 0, type: "principal", highlights: ["Zona arqueológica", "Cascadas de Agua Azul"] },
  { name: "Boca del Cerro", state: "Chiapas", stateKey: "chiapas", km: 40, type: "paradero", highlights: ["Presa Netzahualcóyotl"] },
  { name: "Tenosique", state: "Tabasco", stateKey: "tabasco", km: 100, type: "estacion", highlights: ["Pomoná", "Pantanos de Centla"] },
  { name: "El Triunfo", state: "Tabasco", stateKey: "tabasco", km: 160, type: "paradero", highlights: [] },
  { name: "Candelaria", state: "Campeche", stateKey: "campeche", km: 220, type: "paradero", highlights: [] },
  { name: "Escárcega", state: "Campeche", stateKey: "campeche", km: 300, type: "principal", highlights: ["Punto de conexión de tramos"] },

  // Tramo 2: Escárcega – Calakmul (ramal sur)
  { name: "Centenario", state: "Campeche", stateKey: "campeche", km: 320, type: "paradero", highlights: [] },
  { name: "Calakmul", state: "Campeche", stateKey: "campeche", km: 430, type: "estacion", highlights: ["Reserva de la Biosfera", "Zona arqueológica"] },
  { name: "Xpujil", state: "Campeche", stateKey: "campeche", km: 460, type: "estacion", highlights: ["Becán", "Chicanná"] },
  { name: "Nicolás Bravo", state: "Quintana Roo", stateKey: "quintana-roo", km: 510, type: "paradero", highlights: [] },
  { name: "Chetumal", state: "Quintana Roo", stateKey: "quintana-roo", km: 580, type: "principal", highlights: ["Capital del estado", "Museo de la Cultura Maya"] },

  // Tramo 3: Chetumal – Cancún (costa caribe)
  { name: "Bacalar", state: "Quintana Roo", stateKey: "quintana-roo", km: 620, type: "estacion", highlights: ["Laguna de 7 colores", "Fuerte San Felipe"] },
  { name: "Limones-Chacchoben", state: "Quintana Roo", stateKey: "quintana-roo", km: 660, type: "paradero", highlights: ["Zona arqueológica Chacchoben"] },
  { name: "Felipe Carrillo Puerto", state: "Quintana Roo", stateKey: "quintana-roo", km: 720, type: "estacion", highlights: ["Centro ceremonial maya"] },
  { name: "Tulum Aeropuerto", state: "Quintana Roo", stateKey: "quintana-roo", km: 780, type: "estacion", highlights: ["Aeropuerto Internacional"] },
  { name: "Tulum", state: "Quintana Roo", stateKey: "quintana-roo", km: 790, type: "principal", highlights: ["Zona arqueológica", "Playas", "Cenotes"] },
  { name: "Playa del Carmen", state: "Quintana Roo", stateKey: "quintana-roo", km: 850, type: "estacion", highlights: ["Quinta Avenida", "Ferry a Cozumel"] },
  { name: "Puerto Morelos", state: "Quintana Roo", stateKey: "quintana-roo", km: 880, type: "estacion", highlights: ["Arrecife de coral", "Ruta de los Cenotes"] },
  { name: "Cancún", state: "Quintana Roo", stateKey: "quintana-roo", km: 920, type: "principal", highlights: ["Zona Hotelera", "Isla Mujeres"] },

  // Tramo 4: Cancún – Mérida (interior peninsular)
  { name: "Leona Vicario", state: "Quintana Roo", stateKey: "quintana-roo", km: 960, type: "paradero", highlights: [] },
  { name: "Nuevo Xcán", state: "Quintana Roo", stateKey: "quintana-roo", km: 1000, type: "paradero", highlights: [] },
  { name: "Valladolid", state: "Yucatán", stateKey: "yucatan", km: 1060, type: "estacion", highlights: ["Pueblo Mágico", "Cenote Zací"] },
  { name: "Chichén Itzá", state: "Yucatán", stateKey: "yucatan", km: 1110, type: "estacion", highlights: ["Maravilla del Mundo", "Cenote Sagrado"] },
  { name: "Izamal", state: "Yucatán", stateKey: "yucatan", km: 1160, type: "estacion", highlights: ["Pueblo Mágico amarillo", "Convento franciscano"] },
  { name: "Tixkokob", state: "Yucatán", stateKey: "yucatan", km: 1190, type: "paradero", highlights: [] },
  { name: "Mérida-Teya", state: "Yucatán", stateKey: "yucatan", km: 1230, type: "principal", highlights: ["Capital cultural", "Paseo de Montejo"] },

  // Tramo 5: Mérida – Campeche – Escárcega (costa poniente)
  { name: "Umán", state: "Yucatán", stateKey: "yucatan", km: 1260, type: "paradero", highlights: [] },
  { name: "Maxcanú", state: "Yucatán", stateKey: "yucatan", km: 1300, type: "paradero", highlights: [] },
  { name: "Calkiní", state: "Campeche", stateKey: "campeche", km: 1340, type: "estacion", highlights: [] },
  { name: "Hecelchakán", state: "Campeche", stateKey: "campeche", km: 1365, type: "paradero", highlights: [] },
  { name: "Tenabo", state: "Campeche", stateKey: "campeche", km: 1390, type: "paradero", highlights: [] },
  { name: "San Francisco de Campeche", state: "Campeche", stateKey: "campeche", km: 1420, type: "principal", highlights: ["Patrimonio UNESCO", "Murallas coloniales"] },
  { name: "Edzná", state: "Campeche", stateKey: "campeche", km: 1470, type: "estacion", highlights: ["Zona arqueológica", "Edificio de los Cinco Pisos"] },
  { name: "Carrillo Puerto", state: "Campeche", stateKey: "campeche", km: 1510, type: "paradero", highlights: [] },
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
