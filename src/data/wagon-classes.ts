import trenXiinbalInterior from "@/assets/tren-xiinbal-interior.jpg";
import trenJanalInterior from "@/assets/tren-janal-interior.jpg";
import trenPatalInterior from "@/assets/tren-patal-interior.jpg";
import vagonXiinbal from "@/assets/vagon-xiinbal.jpg";
import vagonJanal from "@/assets/vagon-janal.jpg";
import vagonPatal from "@/assets/vagon-patal.jpg";

export interface WagonAmenity {
  icon: string;
  name: string;
  detail: string;
}

export interface WagonFAQ {
  q: string;
  a: string;
}

export interface WagonClass {
  slug: string;
  name: string;
  meaning: string;
  meaningFull: string;
  type: string;
  typeShort: string;
  priceBase: number;
  seats: number;
  config: string;
  seatWidth: string;
  colorToken: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  isFeatured?: boolean;
  badge?: string;
  amenities: WagonAmenity[];
  comparison: {
    comida: string;
    pantalla: string;
    espacio: string;
    lounge: string;
    atencionVIP: string;
  };
  faqs: WagonFAQ[];
}

export const wagonClassesDetailed: WagonClass[] = [
  {
    slug: "xiinbal",
    name: "Xiinbal",
    meaning: "Caminar",
    meaningFull: "'Caminar' en lengua maya · Viaja cómodo a precio accesible",
    type: "Turista / Económica",
    typeShort: "Turista",
    priceBase: 890,
    seats: 68,
    config: "2+2",
    seatWidth: "80cm",
    colorToken: "primary",
    description: "Ideal para viajeros que buscan comodidad a un precio accesible. Asientos reclinables con vista panorámica y aire acondicionado en todo el trayecto.",
    heroImage: trenXiinbalInterior,
    galleryImages: [trenXiinbalInterior, vagonXiinbal],
    amenities: [
      { icon: "🪑", name: "Asientos reclinables", detail: "Configuración 2+2 con reposacabeza ajustable" },
      { icon: "❄", name: "Climatización", detail: "Aire acondicionado en todo el vagón" },
      { icon: "🪟", name: "Ventanas panorámicas", detail: "Vistas al paisaje peninsular durante todo el recorrido" },
      { icon: "🧳", name: "Equipaje", detail: "Portaequipaje superior + espacio bajo asiento" },
      { icon: "🚻", name: "Sanitarios", detail: "Baños limpios en cada vagón" },
      { icon: "📶", name: "Conectividad", detail: "Wi-Fi limitado · USB para carga" },
    ],
    comparison: {
      comida: "❌",
      pantalla: "❌",
      espacio: "80cm",
      lounge: "❌",
      atencionVIP: "❌",
    },
    faqs: [
      { q: "¿Xiinbal tiene aire acondicionado?", a: "Sí, todos los vagones Xiinbal cuentan con aire acondicionado central regulado para mantener una temperatura agradable durante todo el trayecto." },
      { q: "¿Puedo comprar comida a bordo en Xiinbal?", a: "Sí, hay servicio de snacks y bebidas disponible para compra. Los vendedores pasan regularmente con opciones de botanas y refrescos." },
      { q: "¿Cuánto equipaje puedo llevar?", a: "Una maleta de mano en el portaequipaje superior y una pieza documentada en la bodega del tren. Hasta 25 kg por pieza." },
      { q: "¿Los niños pagan boleto completo?", a: "Menores de 3 años viajan gratis en el regazo de un adulto. De 3 a 11 años pagan tarifa infantil (50% del precio adulto)." },
      { q: "¿Vale la pena subir a Janal para viajes largos?", a: "Para rutas de más de 3 horas, Janal ofrece comida incluida y más espacio, lo cual puede hacer la diferencia en comodidad. Para trayectos cortos, Xiinbal es excelente opción." },
    ],
  },
  {
    slug: "janal",
    name: "Janal",
    meaning: "Comer",
    meaningFull: "'Comer' en lengua maya · La experiencia completa a bordo",
    type: "Premium / Intermedia",
    typeShort: "Premium",
    priceBase: 1490,
    seats: 52,
    config: "2+2",
    seatWidth: "95cm",
    colorToken: "accent",
    description: "La mejor relación calidad-precio con amenidades mejoradas. Incluye snack box regional, pantalla individual y el espacio que necesitas para disfrutar el viaje.",
    heroImage: trenJanalInterior,
    galleryImages: [trenJanalInterior, vagonJanal],
    isFeatured: true,
    badge: "⭐ Más popular",
    amenities: [
      { icon: "🪑", name: "Asientos premium", detail: "Reclinables con reposacabeza y reposapies ajustables" },
      { icon: "🍽", name: "Comida incluida", detail: "Snack box regional: cochinita pibil, panuchos, empanadas de queso bola. Incluye bebida" },
      { icon: "🖥", name: "Entretenimiento", detail: "Pantalla individual con contenido regional y documentales" },
      { icon: "📶", name: "Conectividad", detail: "Wi-Fi de alta velocidad · USB-C · Enchufe 110V" },
      { icon: "❄", name: "Climatización", detail: "Aire acondicionado individual regulable" },
      { icon: "🧳", name: "Equipaje", detail: "Portaequipaje superior + espacio bajo asiento + bodega" },
    ],
    comparison: {
      comida: "✅ Snack box",
      pantalla: "✅",
      espacio: "95cm",
      lounge: "❌",
      atencionVIP: "❌",
    },
    faqs: [
      { q: "¿Qué tipo de comida sirven?", a: "Snack box con opciones regionales: cochinita pibil, panuchos, empanadas de queso bola. Incluye bebida. Opciones vegetarianas disponibles bajo pedido previo." },
      { q: "¿Puedo elegir mi asiento?", a: "Sí, al momento de la reserva puedes seleccionar tu asiento en el mapa interactivo. Los asientos de ventana son los más solicitados." },
      { q: "¿Hay enchufes en cada asiento?", a: "Sí, cada asiento cuenta con puerto USB-C y enchufe estándar 110V para que mantengas tus dispositivos cargados durante todo el viaje." },
      { q: "¿Los niños pagan boleto Janal?", a: "Menores de 3 años viajan gratis. De 3 a 11 años pagan tarifa infantil (50%). Incluyen su propio snack box infantil." },
      { q: "¿Vale la pena vs Xiinbal para viajes cortos?", a: "Para rutas de menos de 2 horas, Xiinbal es suficiente. Para trayectos de 3 horas o más, Janal vale la pena por la comida incluida, el espacio extra y la pantalla de entretenimiento." },
    ],
  },
  {
    slug: "patal",
    name: "P'atal",
    meaning: "Quedarse",
    meaningFull: "'Quedarse' en lengua maya · Lujo y exclusividad sobre rieles",
    type: "Lujo / Restaurante",
    typeShort: "Lujo",
    priceBase: 2490,
    seats: 32,
    config: "VIP",
    seatWidth: "110cm",
    colorToken: "destructive",
    description: "La experiencia de lujo definitiva sobre rieles. Gastronomía gourmet de autor, servicio personalizado, bar premium y acceso VIP en todas las estaciones.",
    heroImage: trenPatalInterior,
    galleryImages: [trenPatalInterior, vagonPatal],
    amenities: [
      { icon: "🪑", name: "Asientos VIP", detail: "Reclinables de cuero con reposapies eléctrico, máximo confort" },
      { icon: "🍽", name: "Gastronomía gourmet", detail: "Menú de autor con platillos regionales, maridaje incluido" },
      { icon: "🍸", name: "Bar premium", detail: "Barra con coctelería de autor y bebidas premium ilimitadas" },
      { icon: "🖥", name: "Entretenimiento", detail: "Pantalla HD individual con catálogo premium" },
      { icon: "📶", name: "Conectividad", detail: "Wi-Fi de alta velocidad · USB-C · Enchufe 110V" },
      { icon: "👤", name: "Atención personalizada", detail: "Un asistente dedicado por cada 8 pasajeros" },
      { icon: "🏢", name: "Lounge VIP", detail: "Acceso exclusivo a sala de espera premium en estaciones principales" },
      { icon: "🧳", name: "Equipaje premium", detail: "Equipaje prioritario + espacio amplio + bodega preferente" },
    ],
    comparison: {
      comida: "✅ Gourmet",
      pantalla: "✅ HD",
      espacio: "110cm",
      lounge: "✅",
      atencionVIP: "✅",
    },
    faqs: [
      { q: "¿Qué incluye el menú gourmet?", a: "Un menú de 3 tiempos con platillos de autor inspirados en la gastronomía regional: entrada, plato fuerte y postre. Incluye maridaje con vinos seleccionados y coctelería premium." },
      { q: "¿El bar premium tiene costo adicional?", a: "No, todas las bebidas del bar premium están incluidas en tu boleto P'atal. Esto incluye coctelería de autor, vinos, cervezas artesanales y bebidas sin alcohol." },
      { q: "¿Qué incluye el acceso VIP en estaciones?", a: "Sala de espera exclusiva con climatización, snacks, bebidas, Wi-Fi de alta velocidad, sanitarios privados y atención preferente para embarque." },
      { q: "¿Puedo hacer upgrade de Janal a P'atal?", a: "Sí, sujeto a disponibilidad. Puedes solicitar el upgrade hasta 24 horas antes de tu viaje. Pagas solo la diferencia de tarifa." },
      { q: "¿Hay servicio especial para celebraciones?", a: "Sí, con previo aviso podemos preparar detalles especiales para cumpleaños, aniversarios o propuestas. Incluye pastel, decoración y brindis con espumoso." },
    ],
  },
];

export function findWagonBySlug(slug: string): WagonClass | undefined {
  return wagonClassesDetailed.find((w) => w.slug === slug);
}
