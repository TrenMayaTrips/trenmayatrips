/**
 * Maps each experience state to the nearest Tren Maya station
 * and travel times from major origin cities.
 */

export interface TrainConnection {
  stationName: string;
  stationSlug: string;
  travelTimes: { from: string; duration: string; routeSlug: string }[];
}

/** State → primary Tren Maya station */
const stateStationMap: Record<string, TrainConnection> = {
  "quintana-roo": {
    stationName: "Cancún",
    stationSlug: "cancun",
    travelTimes: [
      { from: "Mérida", duration: "4h 30min", routeSlug: "cancun-merida" },
      { from: "Tulum", duration: "3h 15min", routeSlug: "cancun-tulum" },
    ],
  },
  yucatan: {
    stationName: "Mérida-Teya",
    stationSlug: "merida-teya",
    travelTimes: [
      { from: "Cancún", duration: "4h 30min", routeSlug: "cancun-merida" },
      { from: "Campeche", duration: "2h 30min", routeSlug: "merida-campeche" },
    ],
  },
  campeche: {
    stationName: "San Francisco de Campeche",
    stationSlug: "san-francisco-de-campeche",
    travelTimes: [
      { from: "Mérida", duration: "2h 30min", routeSlug: "merida-campeche" },
      { from: "Cancún", duration: "7h (vía Mérida)", routeSlug: "cancun-merida" },
    ],
  },
  tabasco: {
    stationName: "Tenosique",
    stationSlug: "tenosique",
    travelTimes: [
      { from: "Palenque", duration: "1h 30min", routeSlug: "merida-palenque" },
      { from: "Mérida", duration: "6h 30min", routeSlug: "merida-palenque" },
    ],
  },
  chiapas: {
    stationName: "Palenque",
    stationSlug: "palenque",
    travelTimes: [
      { from: "Mérida", duration: "8h", routeSlug: "merida-palenque" },
      { from: "Campeche", duration: "5h 30min", routeSlug: "merida-palenque" },
    ],
  },
};

// Slug-specific overrides for experiences near a different station than the state default
const experienceOverrides: Record<string, TrainConnection> = {
  "calakmul-biosfera": {
    stationName: "Calakmul / Escárcega",
    stationSlug: "escarcega",
    travelTimes: [
      { from: "Campeche", duration: "3h 30min", routeSlug: "merida-palenque" },
      { from: "Mérida", duration: "6h (vía Campeche)", routeSlug: "merida-campeche" },
      { from: "Cancún", duration: "8h (vía Mérida)", routeSlug: "cancun-merida" },
    ],
  },
  "bacalar-laguna": {
    stationName: "Bacalar",
    stationSlug: "bacalar",
    travelTimes: [
      { from: "Tulum", duration: "2h 45min", routeSlug: "tulum-bacalar" },
      { from: "Cancún", duration: "6h (vía Tulum)", routeSlug: "cancun-tulum" },
    ],
  },
  "snorkel-arrecife": {
    stationName: "Playa del Carmen",
    stationSlug: "playa-del-carmen",
    travelTimes: [
      { from: "Cancún", duration: "1h 10min", routeSlug: "cancun-tulum" },
      { from: "Tulum", duration: "2h", routeSlug: "cancun-tulum" },
    ],
  },
  "coba-tulum-cenote": {
    stationName: "Tulum",
    stationSlug: "tulum",
    travelTimes: [
      { from: "Cancún", duration: "3h 15min", routeSlug: "cancun-tulum" },
      { from: "Playa del Carmen", duration: "2h", routeSlug: "cancun-tulum" },
    ],
  },
  "catamaran-isla-mujeres": {
    stationName: "Cancún",
    stationSlug: "cancun",
    travelTimes: [
      { from: "Playa del Carmen", duration: "1h 10min", routeSlug: "cancun-tulum" },
      { from: "Mérida", duration: "4h 30min", routeSlug: "cancun-merida" },
    ],
  },
};

export function getTrainConnection(slug: string, stateKey: string): TrainConnection {
  return experienceOverrides[slug] || stateStationMap[stateKey] || stateStationMap["quintana-roo"];
}
