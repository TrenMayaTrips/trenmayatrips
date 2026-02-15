import destValladolid from "@/assets/dest-valladolid.jpg";
import destCancun from "@/assets/dest-cancun.jpg";
import destMerida from "@/assets/dest-merida.jpg";
import destTulum from "@/assets/dest-tulum.jpg";
import destChichenItza from "@/assets/dest-chichen-itza.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import destCampeche from "@/assets/dest-campeche-ciudad.jpg";
import destBacalar from "@/assets/dest-bacalar.jpg";
import destIzamal from "@/assets/dest-izamal.jpg";
import destPlayaDelCarmen from "@/assets/dest-playa-del-carmen.jpg";

export interface StationService {
  icon: string;
  name: string;
}

export interface StationConnection {
  direction: string;
  destination: string;
  time: string;
  price: string;
  stationSlug?: string;
}

export interface NearbyDestination {
  name: string;
  badge?: string;
  access: string;
  type: string;
}

export interface TransportOption {
  icon: string;
  method: string;
  detail: string;
}

export interface StationDetail {
  slug: string;
  name: string;
  fullName: string;
  subtitle: string;
  state: string;
  stateBadge: string;
  km: number;
  type: "principal" | "estacion" | "paradero";
  image: string;
  schedule: string;
  parking: string;
  accessibility: string;
  services: StationService[];
  connections: StationConnection[];
  nearbyDestinations: NearbyDestination[];
  transport: TransportOption[];
  tips: string[];
}

export const stationDetails: StationDetail[] = [
  {
    slug: "cancun",
    name: "Cancún Aeropuerto",
    fullName: "Estación Cancún Aeropuerto",
    subtitle: "Terminal principal del Caribe mexicano y hub de conexiones internacionales",
    state: "Quintana Roo",
    stateBadge: "QUINTANA ROO",
    km: 920,
    type: "principal",
    image: destCancun,
    schedule: "5:00 AM – 11:00 PM",
    parking: "Sí · $50 MXN/día",
    accessibility: "Rampas · Elevador · Asistencia",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Restaurante" },
      { icon: "🏧", name: "ATM" },
      { icon: "🚕", name: "Taxi" },
      { icon: "🛒", name: "Tienda" },
    ],
    connections: [
      { direction: "→ Sur", destination: "Playa del Carmen", time: "1h 10min", price: "$320 MXN", stationSlug: "playa-del-carmen" },
      { direction: "→ Sur", destination: "Tulum", time: "3h 15min", price: "$650 MXN", stationSlug: "tulum" },
      { direction: "→ Oeste", destination: "Mérida", time: "4h 30min", price: "$890 MXN", stationSlug: "merida" },
      { direction: "→ Sur", destination: "Valladolid", time: "2h 15min", price: "$560 MXN", stationSlug: "valladolid" },
    ],
    nearbyDestinations: [
      { name: "Zona Hotelera", badge: "🏖 Playa", access: "🚕 20 min", type: "Resort" },
      { name: "Isla Mujeres", badge: "🏝 Isla", access: "⛴ 25 min", type: "Isla" },
      { name: "Puerto Morelos", access: "🚗 30 min", type: "Pueblo costero" },
      { name: "Ruta de los Cenotes", access: "🚗 40 min", type: "Naturaleza" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi / Transfer", detail: "Servicio disponible 24h. Tarifa a Zona Hotelera: $350–500 MXN" },
      { icon: "🚌", method: "ADO", detail: "Terminal en el aeropuerto. Conexiones a toda la península" },
      { icon: "✈", method: "Aeropuerto", detail: "Estación integrada al Aeropuerto Internacional de Cancún" },
    ],
    tips: [
      "Estación integrada al aeropuerto, ideal para llegar directo del vuelo al tren",
      "El restaurante ofrece desayunos desde las 5:30 AM",
      "Hay lockers para guardar equipaje por $80 MXN/día",
      "Los taxis a Zona Hotelera tardan 20–30 min según tráfico",
    ],
  },
  {
    slug: "playa-del-carmen",
    name: "Playa del Carmen",
    fullName: "Estación Playa del Carmen",
    subtitle: "Hub de la Riviera Maya con conexión al ferry de Cozumel",
    state: "Quintana Roo",
    stateBadge: "QUINTANA ROO",
    km: 850,
    type: "estacion",
    image: destPlayaDelCarmen,
    schedule: "5:30 AM – 10:00 PM",
    parking: "Sí · $40 MXN/día",
    accessibility: "Rampas · Elevador",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🏧", name: "ATM" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Norte", destination: "Cancún", time: "1h 10min", price: "$320 MXN", stationSlug: "cancun" },
      { direction: "→ Sur", destination: "Tulum", time: "1h 30min", price: "$280 MXN", stationSlug: "tulum" },
      { direction: "→ Oeste", destination: "Mérida", time: "3h 30min", price: "$780 MXN", stationSlug: "merida" },
    ],
    nearbyDestinations: [
      { name: "Quinta Avenida", badge: "🛍 Compras", access: "🚶 10 min", type: "Centro" },
      { name: "Cozumel", badge: "🏝 Isla", access: "⛴ 45 min", type: "Isla" },
      { name: "Xcaret", access: "🚗 15 min", type: "Parque temático" },
      { name: "Cenote Azul", access: "🚗 20 min", type: "Naturaleza" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "Taxis disponibles afuera de la estación. Al centro: $50 MXN" },
      { icon: "🚌", method: "Colectivo", detail: "Colectivos al centro y Quinta Avenida por $15 MXN" },
      { icon: "⛴", method: "Ferry", detail: "Terminal de ferry a Cozumel a 15 min caminando" },
    ],
    tips: [
      "La Quinta Avenida está a 10 min caminando de la estación",
      "Compra tu boleto del ferry a Cozumel con anticipación en temporada alta",
      "Hay colectivos económicos al centro desde la salida de la estación",
      "La cafetería cierra a las 8 PM",
    ],
  },
  {
    slug: "tulum",
    name: "Tulum",
    fullName: "Estación Tulum",
    subtitle: "Ruinas frente al mar, cenotes cristalinos y la esencia del Caribe maya",
    state: "Quintana Roo",
    stateBadge: "QUINTANA ROO",
    km: 790,
    type: "principal",
    image: destTulum,
    schedule: "5:30 AM – 10:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas · Elevador",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🏧", name: "ATM" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Norte", destination: "Cancún", time: "3h 15min", price: "$650 MXN", stationSlug: "cancun" },
      { direction: "→ Norte", destination: "Playa del Carmen", time: "1h 30min", price: "$280 MXN", stationSlug: "playa-del-carmen" },
      { direction: "→ Sur", destination: "Bacalar", time: "2h 45min", price: "$480 MXN", stationSlug: "bacalar" },
    ],
    nearbyDestinations: [
      { name: "Zona arqueológica", badge: "🏛 Ruinas", access: "🚗 15 min", type: "Zona arqueológica" },
      { name: "Gran Cenote", access: "🚗 10 min", type: "Naturaleza" },
      { name: "Laguna de Kaan Luum", access: "🚗 20 min", type: "Naturaleza" },
      { name: "Sian Ka'an", badge: "⭐ UNESCO", access: "🚗 30 min", type: "Reserva natural" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "A la zona arqueológica: $100 MXN. Al pueblo: $60 MXN" },
      { icon: "🚲", method: "Bicicleta", detail: "Renta de bicicletas en la estación desde $150 MXN/día" },
      { icon: "✈", method: "Aeropuerto", detail: "Aeropuerto Internacional de Tulum a 15 min" },
    ],
    tips: [
      "Llega temprano a la zona arqueológica para evitar multitudes (8 AM)",
      "Renta bicicleta en la estación para recorrer la zona de playa",
      "Los cenotes cercanos son más tranquilos entre semana",
      "Hay servicio de guarda equipaje en la estación",
    ],
  },
  {
    slug: "valladolid",
    name: "Valladolid",
    fullName: "Estación Valladolid",
    subtitle: "Puerta de entrada a Chichén Itzá y el oriente yucateco",
    state: "Yucatán",
    stateBadge: "YUCATÁN",
    km: 1060,
    type: "estacion",
    image: destValladolid,
    schedule: "5:30 AM – 10:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas · Elevador",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🏧", name: "ATM" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Este", destination: "Cancún", time: "2h 15min", price: "$560 MXN", stationSlug: "cancun" },
      { direction: "→ Oeste", destination: "Mérida", time: "2h 10min", price: "$490 MXN", stationSlug: "merida" },
      { direction: "→ Sur", destination: "Tulum", time: "1h 45min", price: "$420 MXN", stationSlug: "tulum" },
    ],
    nearbyDestinations: [
      { name: "Chichén Itzá", badge: "⭐ UNESCO", access: "🚗 40 min", type: "Zona arqueológica" },
      { name: "Valladolid centro", badge: "🏅 Pueblo Mágico", access: "🚶 5 min", type: "Colonial" },
      { name: "Ek Balam", access: "🚗 30 min", type: "Zona arqueológica" },
      { name: "Cenote Suytún", access: "🚗 15 min", type: "Naturaleza" },
    ],
    transport: [
      { icon: "🚗", method: "En auto", detail: "10 min desde centro Valladolid. Estacionamiento gratuito, 200 vehículos" },
      { icon: "🚕", method: "Taxi / Transfer", detail: "Desde hoteles de la zona. Tarifa aprox $80–120 MXN" },
      { icon: "🚌", method: "Transporte público", detail: "Colectivos desde el centro, $15 MXN" },
      { icon: "✈", method: "Desde aeropuerto", detail: "2h por carretera o tren desde estación Cancún" },
    ],
    tips: [
      "Llega 30 min antes de la salida para compra de boletos",
      "La cafetería cierra a las 8 PM",
      "Hay taxis colectivos a Chichén Itzá por $50 MXN",
      "El centro de Valladolid está a 10 min caminando",
    ],
  },
  {
    slug: "izamal",
    name: "Izamal",
    fullName: "Estación Izamal",
    subtitle: "La Ciudad Amarilla, joya colonial del Yucatán profundo",
    state: "Yucatán",
    stateBadge: "YUCATÁN",
    km: 1160,
    type: "estacion",
    image: destIzamal,
    schedule: "6:00 AM – 9:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Este", destination: "Valladolid", time: "1h", price: "$280 MXN", stationSlug: "valladolid" },
      { direction: "→ Oeste", destination: "Mérida", time: "50min", price: "$220 MXN", stationSlug: "merida" },
      { direction: "→ Este", destination: "Cancún", time: "3h", price: "$690 MXN", stationSlug: "cancun" },
    ],
    nearbyDestinations: [
      { name: "Convento de San Antonio", badge: "🏛 Colonial", access: "🚶 5 min", type: "Patrimonio" },
      { name: "Pirámide Kinich Kakmó", access: "🚶 10 min", type: "Zona arqueológica" },
      { name: "Centro artesanal", badge: "🏅 Pueblo Mágico", access: "🚶 5 min", type: "Compras" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "Al centro: $30 MXN. Taxis disponibles en la estación" },
      { icon: "🚶", method: "Caminando", detail: "El centro está a 10 min a pie" },
    ],
    tips: [
      "Todo el pueblo se recorre a pie, no necesitas transporte",
      "Los mejores tacos de cochinita están en el mercado municipal",
      "Visita al atardecer para ver la ciudad amarilla con la luz dorada",
      "El convento franciscano es el segundo atrio más grande del mundo",
    ],
  },
  {
    slug: "merida",
    name: "Mérida-Teya",
    fullName: "Estación Mérida-Teya",
    subtitle: "Capital cultural de Yucatán y hub principal de la red ferroviaria",
    state: "Yucatán",
    stateBadge: "YUCATÁN",
    km: 1230,
    type: "principal",
    image: destMerida,
    schedule: "5:00 AM – 11:00 PM",
    parking: "Sí · $40 MXN/día",
    accessibility: "Rampas · Elevador · Asistencia",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Restaurante" },
      { icon: "🏧", name: "ATM" },
      { icon: "🚕", name: "Taxi" },
      { icon: "🛒", name: "Tienda" },
    ],
    connections: [
      { direction: "→ Este", destination: "Cancún", time: "4h 30min", price: "$890 MXN", stationSlug: "cancun" },
      { direction: "→ Este", destination: "Valladolid", time: "2h 10min", price: "$490 MXN", stationSlug: "valladolid" },
      { direction: "→ Sur", destination: "Campeche", time: "2h 30min", price: "$520 MXN", stationSlug: "campeche" },
      { direction: "→ Sur", destination: "Palenque", time: "8h", price: "$1,690 MXN", stationSlug: "palenque" },
    ],
    nearbyDestinations: [
      { name: "Paseo de Montejo", badge: "🏛 Emblemático", access: "🚗 15 min", type: "Avenida histórica" },
      { name: "Centro histórico", badge: "🏅 Colonial", access: "🚗 20 min", type: "Centro" },
      { name: "Uxmal", badge: "⭐ UNESCO", access: "🚗 1h", type: "Zona arqueológica" },
      { name: "Celestún", access: "🚗 1h 30min", type: "Reserva natural" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi / Transfer", detail: "Al centro histórico: $150–200 MXN (20 min)" },
      { icon: "🚌", method: "Transporte público", detail: "Autobuses urbanos desde la estación, $12 MXN" },
      { icon: "✈", method: "Aeropuerto", detail: "Aeropuerto Internacional de Mérida a 25 min en auto" },
    ],
    tips: [
      "La estación Teya está a las afueras de Mérida, planifica tu transporte al centro",
      "Los domingos hay mercado de artesanías frente a la catedral",
      "Prueba la sopa de lima y los papadzules en el centro",
      "Reserva tour a Uxmal con anticipación, especialmente en temporada alta",
    ],
  },
  {
    slug: "campeche",
    name: "San Francisco de Campeche",
    fullName: "Estación San Francisco de Campeche",
    subtitle: "Ciudad amurallada, Patrimonio de la Humanidad por la UNESCO",
    state: "Campeche",
    stateBadge: "CAMPECHE",
    km: 1420,
    type: "principal",
    image: destCampeche,
    schedule: "5:30 AM – 10:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas · Elevador",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🏧", name: "ATM" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Norte", destination: "Mérida", time: "2h 30min", price: "$520 MXN", stationSlug: "merida" },
      { direction: "→ Sur", destination: "Palenque", time: "5h 30min", price: "$1,190 MXN", stationSlug: "palenque" },
      { direction: "→ Sur", destination: "Edzná", time: "45min", price: "$180 MXN" },
    ],
    nearbyDestinations: [
      { name: "Murallas coloniales", badge: "⭐ UNESCO", access: "🚶 10 min", type: "Patrimonio" },
      { name: "Edzná", badge: "🏛 Ruinas", access: "🚗 50 min", type: "Zona arqueológica" },
      { name: "Malecón", access: "🚶 15 min", type: "Paseo" },
      { name: "Calakmul", access: "🚗 3h", type: "Reserva natural" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "Al centro histórico: $60–80 MXN" },
      { icon: "🚌", method: "Transporte público", detail: "Autobuses urbanos, $10 MXN" },
    ],
    tips: [
      "El centro histórico amurallado se recorre perfectamente a pie",
      "Los atardeceres desde el malecón son espectaculares",
      "Prueba el pan de cazón, platillo emblemático de Campeche",
      "Visita el fuerte de San Miguel para una vista panorámica",
    ],
  },
  {
    slug: "palenque",
    name: "Palenque",
    fullName: "Estación Palenque",
    subtitle: "Joya arqueológica de Chiapas rodeada de selva tropical y cascadas",
    state: "Chiapas",
    stateBadge: "CHIAPAS",
    km: 0,
    type: "principal",
    image: destPalenque,
    schedule: "5:30 AM – 9:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "🅿", name: "Parking" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Norte", destination: "Campeche", time: "5h 30min", price: "$1,190 MXN", stationSlug: "campeche" },
      { direction: "→ Norte", destination: "Mérida", time: "8h", price: "$1,690 MXN", stationSlug: "merida" },
    ],
    nearbyDestinations: [
      { name: "Zona arqueológica", badge: "⭐ UNESCO", access: "🚗 10 min", type: "Zona arqueológica" },
      { name: "Cascadas de Agua Azul", access: "🚗 1h 30min", type: "Naturaleza" },
      { name: "Cascadas de Misol-Há", access: "🚗 40 min", type: "Naturaleza" },
      { name: "Selva Lacandona", access: "🚗 2h", type: "Ecoturismo" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "A la zona arqueológica: $80 MXN. Al pueblo: $50 MXN" },
      { icon: "🚌", method: "Colectivo", detail: "Colectivos a la zona arqueológica por $30 MXN" },
    ],
    tips: [
      "Visita la zona arqueológica temprano (8 AM) para evitar el calor",
      "Lleva repelente de mosquitos, la selva es húmeda",
      "Las cascadas de Agua Azul son más impresionantes en temporada de lluvias",
      "Contrata guía local para entender la historia de los glifos mayas",
    ],
  },
  {
    slug: "bacalar",
    name: "Bacalar",
    fullName: "Estación Bacalar",
    subtitle: "La Laguna de los Siete Colores, el secreto mejor guardado del Caribe",
    state: "Quintana Roo",
    stateBadge: "QUINTANA ROO",
    km: 620,
    type: "estacion",
    image: destBacalar,
    schedule: "6:00 AM – 9:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Norte", destination: "Tulum", time: "2h 45min", price: "$480 MXN", stationSlug: "tulum" },
      { direction: "→ Sur", destination: "Chetumal", time: "40min", price: "$120 MXN" },
    ],
    nearbyDestinations: [
      { name: "Laguna de Bacalar", badge: "🌊 7 colores", access: "🚶 10 min", type: "Naturaleza" },
      { name: "Fuerte de San Felipe", badge: "🏛 Histórico", access: "🚶 15 min", type: "Museo" },
      { name: "Cenote Azul", access: "🚗 10 min", type: "Naturaleza" },
      { name: "Canal de los Piratas", access: "🚣 30 min", type: "Paseo" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "Al pueblo: $40 MXN. A la laguna: $50 MXN" },
      { icon: "🚲", method: "Bicicleta", detail: "Renta disponible cerca de la estación, $100 MXN/día" },
    ],
    tips: [
      "Los mejores colores de la laguna se ven entre 10 AM y 2 PM con sol",
      "Renta kayak para explorar los canales por tu cuenta",
      "El pueblo es pequeño y se recorre perfectamente en bicicleta",
      "Prueba las empanadas de cazón en el mercado local",
    ],
  },
  {
    slug: "chichen-itza",
    name: "Chichén Itzá",
    fullName: "Estación Chichén Itzá",
    subtitle: "Acceso directo a la Maravilla del Mundo y el Cenote Sagrado",
    state: "Yucatán",
    stateBadge: "YUCATÁN",
    km: 1110,
    type: "estacion",
    image: destChichenItza,
    schedule: "6:00 AM – 9:00 PM",
    parking: "Sí · Gratuito",
    accessibility: "Rampas",
    services: [
      { icon: "🎫", name: "Taquilla" },
      { icon: "🚻", name: "Baños" },
      { icon: "📶", name: "Wi-Fi" },
      { icon: "🍽", name: "Cafetería" },
      { icon: "🚕", name: "Taxi" },
    ],
    connections: [
      { direction: "→ Este", destination: "Valladolid", time: "30min", price: "$150 MXN", stationSlug: "valladolid" },
      { direction: "→ Oeste", destination: "Mérida", time: "1h 40min", price: "$380 MXN", stationSlug: "merida" },
      { direction: "→ Este", destination: "Cancún", time: "2h 45min", price: "$650 MXN", stationSlug: "cancun" },
    ],
    nearbyDestinations: [
      { name: "Chichén Itzá", badge: "⭐ Maravilla del Mundo", access: "🚶 10 min", type: "Zona arqueológica" },
      { name: "Cenote Sagrado", access: "🚶 15 min", type: "Naturaleza" },
      { name: "Cenote Ik Kil", access: "🚗 5 min", type: "Naturaleza" },
      { name: "Grutas de Balankanché", access: "🚗 10 min", type: "Cuevas" },
    ],
    transport: [
      { icon: "🚕", method: "Taxi", detail: "A la entrada de la zona arqueológica: $40 MXN" },
      { icon: "🚌", method: "Colectivo", detail: "A Valladolid: $30 MXN, salidas frecuentes" },
    ],
    tips: [
      "Llega a las 8 AM cuando abre la zona arqueológica para evitar multitudes",
      "El espectáculo de luz y sonido nocturno es imperdible",
      "Contrata guía certificado en la entrada para entender la astronomía maya",
      "Cenote Ik Kil está a 5 min y es perfecto para refrescarse después del recorrido",
    ],
  },
];

export function findStationBySlug(slug: string): StationDetail | undefined {
  return stationDetails.find((s) => s.slug === slug);
}

export function getAllStationSlugs(): string[] {
  return stationDetails.map((s) => s.slug);
}
