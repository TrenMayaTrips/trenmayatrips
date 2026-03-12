import { Link } from "react-router-dom";
import { Train, ArrowRight, MapPin, Compass } from "lucide-react";

/* ─── Contextual data mapping ──────────────────────────────────────── */

interface ContextData {
  destination: string;
  station: string;
  routeSlug: string;
  routeLabel: string;
  travelTime: string;
  price: string;
  experienceCategory: string;
  experienceLabel: string;
  packagePrice: string;
}

const contextMap: Record<string, ContextData> = {
  "chichen-itza-mas-alla-piramide": {
    destination: "Chichén Itzá",
    station: "Valladolid",
    routeSlug: "cancun-merida",
    routeLabel: "Cancún → Valladolid",
    travelTime: "2h 15min desde Cancún",
    price: "$890 MXN",
    experienceCategory: "arqueologia",
    experienceLabel: "experiencias arqueológicas",
    packagePrice: "$4,500 MXN",
  },
  "cenotes-sagrados-yucatan": {
    destination: "los Cenotes de Yucatán",
    station: "Valladolid",
    routeSlug: "cancun-merida",
    routeLabel: "Mérida → Valladolid",
    travelTime: "1h 30min desde Mérida",
    price: "$750 MXN",
    experienceCategory: "naturaleza",
    experienceLabel: "experiencias de naturaleza",
    packagePrice: "$3,800 MXN",
  },
  "gastronomia-yucateca-imperdible": {
    destination: "Mérida Gastronómica",
    station: "Mérida",
    routeSlug: "cancun-merida",
    routeLabel: "Cancún → Mérida",
    travelTime: "4h desde Cancún",
    price: "$1,200 MXN",
    experienceCategory: "gastronomia",
    experienceLabel: "experiencias gastronómicas",
    packagePrice: "$5,200 MXN",
  },
  "palenque-ciudad-perdida-selva": {
    destination: "Palenque",
    station: "Palenque",
    routeSlug: "escarcega-chetumal",
    routeLabel: "Escárcega → Palenque",
    travelTime: "3h desde Escárcega",
    price: "$980 MXN",
    experienceCategory: "arqueologia",
    experienceLabel: "experiencias arqueológicas",
    packagePrice: "$4,800 MXN",
  },
  "bacalar-laguna-siete-colores": {
    destination: "Bacalar",
    station: "Bacalar",
    routeSlug: "cancun-merida",
    routeLabel: "Cancún → Bacalar",
    travelTime: "5h desde Cancún",
    price: "$1,100 MXN",
    experienceCategory: "naturaleza",
    experienceLabel: "experiencias de naturaleza",
    packagePrice: "$3,500 MXN",
  },
  "chocolate-cacao-ruta-maya": {
    destination: "la Ruta del Cacao",
    station: "Villahermosa",
    routeSlug: "escarcega-chetumal",
    routeLabel: "Villahermosa → Comalcalco",
    travelTime: "1h desde Villahermosa",
    price: "$650 MXN",
    experienceCategory: "gastronomia",
    experienceLabel: "experiencias gastronómicas",
    packagePrice: "$2,800 MXN",
  },
  "pueblos-magicos-ruta-tren-maya": {
    destination: "los Pueblos Mágicos",
    station: "Izamal",
    routeSlug: "cancun-merida",
    routeLabel: "Mérida → Izamal",
    travelTime: "1h desde Mérida",
    price: "$550 MXN",
    experienceCategory: "cultura",
    experienceLabel: "experiencias culturales",
    packagePrice: "$3,200 MXN",
  },
};

const defaultContext: ContextData = {
  destination: "el Sureste de México",
  station: "Cancún",
  routeSlug: "cancun-merida",
  routeLabel: "Cancún → Mérida",
  travelTime: "4h desde Cancún",
  price: "$890 MXN",
  experienceCategory: "arqueologia",
  experienceLabel: "experiencias únicas",
  packagePrice: "$4,500 MXN",
};

export function getArticleContext(slug: string): ContextData {
  return contextMap[slug] || defaultContext;
}

/* ─── 1. CTA: Tren Maya Route (after "Cómo Llegar" section) ───────── */

interface InlineRouteCTAProps {
  ctx: ContextData;
}

export const InlineRouteCTA = ({ ctx }: InlineRouteCTAProps) => (
  <div className="my-8 rounded-xl bg-arena border-l-4 border-gold p-5 md:p-6">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Train size={20} className="text-gold" />
      </div>
      <div className="min-w-0">
        <p className="font-heading text-base font-bold text-foreground leading-snug">
          Toma el Tren Maya hasta {ctx.station}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Desde <strong className="text-primary">{ctx.price}</strong> · {ctx.travelTime}
        </p>
        <Link
          to={`/tren-maya/rutas/${ctx.routeSlug}`}
          className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-lg text-sm hover:bg-accent/90 transition-colors"
        >
          Ver ruta y horarios <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </div>
);

/* ─── 2. CTA: Experience Callout (mid-article) ────────────────────── */

interface InlineExperienceCTAProps {
  ctx: ContextData;
}

export const InlineExperienceCTA = ({ ctx }: InlineExperienceCTAProps) => (
  <div className="my-8 rounded-xl bg-card border-2 border-primary/30 p-5 md:p-6">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Compass size={20} className="text-primary" />
      </div>
      <div className="min-w-0">
        <p className="font-heading text-base font-bold text-foreground leading-snug">
          ¿Te interesa explorar {ctx.destination} con guía experto?
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Conoce nuestras {ctx.experienceLabel} con transporte y guía incluidos.
        </p>
        <Link
          to={`/experiencias/${ctx.experienceCategory}`}
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Ver experiencias disponibles <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </div>
);

/* ─── 3. CTA: Full-width Itinerary Banner (post-article) ──────────── */

interface PostArticleCTAProps {
  ctx: ContextData;
}

export const PostArticleCTA = ({ ctx }: PostArticleCTAProps) => (
  <div className="mt-10 rounded-xl bg-gradient-to-r from-[hsl(160,30%,26%)] to-[hsl(160,30%,18%)] p-6 md:p-8 text-white">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} className="text-gold" />
          <span className="text-xs font-medium text-gold uppercase tracking-wider">Planifica tu viaje</span>
        </div>
        <h3 className="font-heading text-lg md:text-xl font-bold leading-snug">
          Planifica tu viaje a {ctx.destination}
        </h3>
        <p className="text-sm text-white/70 mt-1">
          Boletos de tren + hotel + experiencias desde <strong className="text-gold">{ctx.packagePrice}</strong>
        </p>
      </div>
      <Link
        to="/itinerarios"
        className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-obsidiana font-semibold rounded-lg text-sm hover:bg-gold/90 transition-colors"
      >
        Armar mi itinerario <ArrowRight size={14} />
      </Link>
    </div>
  </div>
);
