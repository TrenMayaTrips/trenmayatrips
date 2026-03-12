// Enriched itinerary data with descriptions, icons, and durations
// Icons map to lucide icon names for type safety

export type ItineraryIcon = "bus" | "hiking" | "landmark" | "utensils" | "hotel" | "sunrise" | "waves" | "camera" | "music" | "anchor" | "leaf" | "sparkles" | "coffee" | "shopping" | "flag" | "compass" | "fish" | "palette" | "heart";

export interface EnrichedItineraryItem {
  time: string;
  activity: string;
  description?: string;
  icon?: ItineraryIcon;
  duration?: string;
  day?: number;
}

// Auto-detect icon from activity keywords
export function detectIcon(activity: string): ItineraryIcon {
  const lower = activity.toLowerCase();
  if (lower.includes("recogida") || lower.includes("salida") || lower.includes("traslado") || lower.includes("regreso") || lower.includes("llegada") || lower.includes("check-in")) return "bus";
  if (lower.includes("senderismo") || lower.includes("sendero") || lower.includes("caminata")) return "hiking";
  if (lower.includes("arqueológica") || lower.includes("pirámide") || lower.includes("zona") || lower.includes("templo") || lower.includes("museo") || lower.includes("fuerte") || lower.includes("hacienda") || lower.includes("pueblo") || lower.includes("valladolid")) return "landmark";
  if (lower.includes("comida") || lower.includes("buffet") || lower.includes("almuerzo") || lower.includes("cena") || lower.includes("desayuno") || lower.includes("degustación")) return "utensils";
  if (lower.includes("hospedaje") || lower.includes("hotel") || lower.includes("lodge") || lower.includes("check-in eco")) return "hotel";
  if (lower.includes("amanecer") || lower.includes("atardecer")) return "sunrise";
  if (lower.includes("cenote") || lower.includes("nado") || lower.includes("playa") || lower.includes("cascada") || lower.includes("laguna") || lower.includes("baño") || lower.includes("río")) return "waves";
  if (lower.includes("snorkel") || lower.includes("arrecife") || lower.includes("coral") || lower.includes("tortuga")) return "fish";
  if (lower.includes("navegación") || lower.includes("velero") || lower.includes("zarpe") || lower.includes("catamarán") || lower.includes("canal")) return "anchor";
  if (lower.includes("fauna") || lower.includes("observación") || lower.includes("biosfera") || lower.includes("selva") || lower.includes("reserva")) return "leaf";
  if (lower.includes("temazcal") || lower.includes("ceremonia") || lower.includes("yoga") || lower.includes("meditación") || lower.includes("ritual") || lower.includes("sanación") || lower.includes("reflexión")) return "sparkles";
  if (lower.includes("taller") || lower.includes("cacao") || lower.includes("chocolate")) return "palette";
  if (lower.includes("fiesta") || lower.includes("música")) return "music";
  if (lower.includes("compras") || lower.includes("tiempo libre")) return "shopping";
  if (lower.includes("comunidad") || lower.includes("local")) return "heart";
  if (lower.includes("briefing") || lower.includes("seguridad") || lower.includes("equipo")) return "compass";
  return "flag";
}

// Detect day from time string (e.g., "Día 1 - 06:00")
export function detectDay(time: string): number | undefined {
  const match = time.match(/Día\s*(\d+)/i);
  return match ? parseInt(match[1]) : undefined;
}

// Clean time string removing day prefix
export function cleanTime(time: string): string {
  return time.replace(/Día\s*\d+\s*[-–]\s*/i, "").trim();
}

// Enriched descriptions per experience
export const enrichedItineraries: Record<string, Record<number, { description?: string; duration?: string }>> = {
  "amanecer-maya-uxmal": {
    0: { description: "Un vehículo climatizado te recoge directamente en la puerta de tu hotel.", duration: "~1h 15min" },
    1: { description: "Accede antes que cualquier otro visitante a una de las joyas del mundo Maya.", duration: "~15min" },
    2: { description: "Contempla cómo los primeros rayos del sol iluminan la Pirámide del Adivino. Un momento mágico e irrepetible.", duration: "~1h 30min" },
    3: { description: "Tu arqueólogo certificado te revela los secretos del Cuadrángulo de las Monjas y el Palacio del Gobernador.", duration: "~2h" },
    4: { description: "Disfruta de papadzules, huevos motuleños y café de olla en una hacienda restaurada del siglo XVIII.", duration: "~1h" },
    5: { description: "Explora el Arco de Kabáh y los palacios decorados con máscaras de Chaac, el dios de la lluvia.", duration: "~2h" },
    6: { description: "Regreso cómodo con aire acondicionado y tiempo para descansar.", duration: "~1h 15min" },
  },
  "coba-tulum-cenote": {
    0: { description: "Recogida puerta a puerta en hoteles de Playa del Carmen, Cancún y Riviera Maya.", duration: "~1h 30min" },
    1: { description: "Explora la pirámide Nohoch Mul (42m), la más alta de la Península de Yucatán. Opción de recorrer en bicicleta.", duration: "~2h" },
    2: { description: "Sumérgete en aguas cristalinas rodeado de estalactitas y raíces de selva. Una catedral natural subterránea.", duration: "~1h 30min" },
    3: { description: "Saborea cochinita pibil, sopa de lima y otros platillos regionales preparados con recetas ancestrales.", duration: "~1h 30min" },
    4: { description: "Recorrido panorámico por carretera con paradas fotográficas.", duration: "~30min" },
    5: { description: "Camina entre templos con vista al mar turquesa del Caribe. Tu guía te narra la historia del dios descendente.", duration: "~2h" },
    6: { description: "Relájate en la playa de Tulum, una de las más fotografiadas de México.", duration: "~1h" },
    7: { description: "Regreso con aire acondicionado. Posibilidad de hacer parada en Playa del Carmen.", duration: "~1h 30min" },
  },
  "ek-balam-valladolid": {
    0: { description: "Transporte privado con aire acondicionado desde tu hotel.", duration: "~2h" },
    1: { description: "Sube a la Acrópolis y admira el friso de estuco mejor conservado del mundo Maya. Una obra maestra de 2,000 años.", duration: "~2h" },
    2: { description: "Desciende en tirolesa o escalera hacia aguas turquesa rodeadas de selva virgen.", duration: "~1h 30min" },
    3: { description: "Comida gourmet en hacienda restaurada con degustación de mezcal artesanal y miel melipona.", duration: "~2h" },
    4: { description: "Pasea por el encantador centro colonial, visita el Convento de San Bernardino y la Calzada de los Frailes.", duration: "~2h" },
    5: { description: "Explora tiendas de artesanías, bordados y joyería de ámbar en el centro de Valladolid.", duration: "~1h" },
    6: { description: "Regreso con fotos y recuerdos de un día inolvidable.", duration: "~2h" },
  },
  "catamaran-isla-mujeres": {
    0: { description: "Registro en la marina con bienvenida y chaleco salvavidas.", duration: "~30min" },
    1: { description: "El catamarán zarpa con DJ a bordo, barra libre de bebidas nacionales y el viento del Caribe.", duration: "~1h" },
    2: { description: "Sumérgete en el arrecife Manchones para nadar con peces tropicales, rayas y tortugas marinas.", duration: "~1h" },
    3: { description: "Navegación relajada con música y cócteles mientras llegas a la isla.", duration: "~30min" },
    4: { description: "Disfruta de un buffet con mariscos frescos, ensaladas y postres tropicales.", duration: "~1h" },
    5: { description: "Explora Punta Sur, las tiendas del centro o simplemente relájate en Playa Norte, una de las mejores del mundo.", duration: "~2h" },
    6: { description: "El regreso es una fiesta flotante con música, baile y el atardecer caribeño de fondo.", duration: "~1h" },
    7: { description: "Desembarco en Marina Cancún. ¡Hasta la próxima aventura!", duration: "~30min" },
  },
  "calakmul-biosfera": {
    0: { description: "Salida temprana en vehículo 4x4 rumbo a la selva más extensa de México.", duration: "~4h" },
    1: { description: "Ingreso a la Reserva de la Biosfera, uno de los ecosistemas más biodiversos del continente.", duration: "~30min" },
    2: { description: "Recorre senderos selva adentro con un guía naturalista certificado. Posibilidad de avistar monos araña, tucanes y jaguares.", duration: "~3h" },
    3: { description: "Asciende la Gran Pirámide (Estructura II, 45m) y contempla un mar de selva hasta el horizonte. Más de 6,000 estructuras te rodean.", duration: "~3h" },
    4: { description: "Alojamiento en eco-lodge de selva con cena de ingredientes locales preparada por la comunidad.", duration: "~noche" },
    5: { description: "Escucha el despertar de la selva: monos aulladores, aves tropicales y la bruma matutina entre los árboles.", duration: "~2h" },
    6: { description: "Conoce las tradiciones y modo de vida de los guardianes de la selva. Artesanías y miel de abeja melipona.", duration: "~4h" },
    7: { description: "Regreso con parada panorámica y tiempo para procesar una experiencia transformadora.", duration: "~4h" },
  },
  "ruta-del-cacao": {
    0: { description: "Transporte climatizado con charla introductoria sobre la historia del cacao en Mesoamérica.", duration: "~1h" },
    1: { description: "Explora la única pirámide Maya construida con ladrillo cocido. Tu guía te revela por qué Comalcalco es única.", duration: "~2h" },
    2: { description: "Camina entre árboles de cacao centenarios y aprende sobre el cultivo orgánico y la fermentación artesanal.", duration: "~1h" },
    3: { description: "Pon las manos en la masa: tuesta, muele y prepara tu propio chocolate desde el grano de cacao fresco.", duration: "~1h" },
    4: { description: "Prueba variedades de chocolate artesanal: amargo, con especias, con chile y el tradicional pozol.", duration: "~30min" },
    5: { description: "Saborea platillos típicos tabasqueños: pejelagarto asado, tamales de chipilín y plátanos fritos.", duration: "~1h" },
    6: { description: "Regreso con tu chocolate artesanal hecho a mano como souvenir.", duration: "~1h" },
  },
  "palenque-agua-azul": {
    0: { description: "Salida temprana para aprovechar el frescor de la mañana en la selva chiapaneca.", duration: "~1h 30min" },
    1: { description: "Más de 500 cascadas escalonadas de agua turquesa en medio de la selva. Tiempo para nadar y fotografiar.", duration: "~2h 30min" },
    2: { description: "Una cascada de 35m que cae en una gruta accesible. Camina detrás de la cortina de agua.", duration: "~1h" },
    3: { description: "Platillos chiapanecos preparados con ingredientes frescos de la región: tamales, mole y café de altura.", duration: "~1h 30min" },
    4: { description: "Recorre el Templo de las Inscripciones, el Palacio y la tumba de Pakal el Grande. Una de las ciudades más elegantes del mundo Maya.", duration: "~2h 30min" },
    5: { description: "Piezas originales que complementan tu visita: jade, estuco y el famoso sarcófago de Pakal en réplica.", duration: "~1h" },
    6: { description: "Regreso con la satisfacción de haber vivido dos maravillas naturales y culturales en un solo día.", duration: "~30min" },
  },
  "temazcal-selva": {
    0: { description: "Saluda al sol con posturas de yoga adaptadas para todos los niveles, en una plataforma rodeada de naturaleza.", duration: "~1h" },
    1: { description: "Ejercicios de respiración y mindfulness para preparar cuerpo y mente para el temazcal.", duration: "~30min" },
    2: { description: "El guía espiritual enciende las piedras volcánicas y bendice el espacio con copal e hierbas sagradas.", duration: "~30min" },
    3: { description: "Cuatro fases que representan los elementos: tierra, agua, fuego y aire. Cantos, hierbas y vapor purificador.", duration: "~1h 30min" },
    4: { description: "Enfría tu cuerpo en las aguas frescas de un río cristalino rodeado de vegetación tropical.", duration: "~30min" },
    5: { description: "Frutas frescas, granola casera, pan artesanal y bebidas naturales de la región.", duration: "~1h" },
    6: { description: "Momento de compartir sensaciones y agradecer. Sales renovado, con una perspectiva diferente.", duration: "~30min" },
  },
  "snorkel-arrecife": {
    0: { description: "Registro en el muelle con bienvenida del capitán y entrega de equipo profesional de snorkel.", duration: "~30min" },
    1: { description: "Instrucciones de seguridad, técnicas de respiración y uso correcto del equipo.", duration: "~30min" },
    2: { description: "Aguas poco profundas ideales para principiantes. Peces ángel, damiselas y abanicos de mar.", duration: "~1h" },
    3: { description: "Formaciones coralinas espectaculares con estrellas de mar, erizos y anémonas de colores vibrantes.", duration: "~1h" },
    4: { description: "El punto estrella: nada junto a tortugas marinas verdes en su hábitat natural. Momento inolvidable.", duration: "~1h" },
    5: { description: "Mariscos frescos, ceviche y cócteles de frutas tropicales con los pies en la arena.", duration: "~1h 30min" },
    6: { description: "Regreso tranquilo al muelle con tiempo para secar y cambiarte.", duration: "~30min" },
  },
  "bacalar-laguna": {
    0: { description: "Encuentro en el muelle principal con tu capitán y guía local.", duration: "~30min" },
    1: { description: "Deslízate por aguas que cambian de turquesa a índigo. Tu guía explica el fenómeno de los estromatolitos.", duration: "~1h" },
    2: { description: "Navega por un canal estrecho rodeado de manglares donde antiguamente se escondían los piratas.", duration: "~1h" },
    3: { description: "Sumérgete en un cenote de 90m de profundidad con agua cristalina y tonos azul eléctrico.", duration: "~1h 30min" },
    4: { description: "Ceviche fresco, pescado tikin xic y bebidas naturales con vista a la laguna.", duration: "~1h 30min" },
    5: { description: "Conoce la historia de los piratas del Caribe y las batallas que defendieron esta frontera.", duration: "~1h" },
    6: { description: "Contempla cómo la laguna se tiñe de dorado y rosa mientras el sol se oculta. Pura magia.", duration: "~1h" },
    7: { description: "Final del recorrido en el muelle principal.", duration: "~30min" },
  },
};
