import { Link } from "react-router-dom";
import { ArrowRight, Train } from "lucide-react";

/** Mapping from blog post tags/keywords to contextual CTA data */
const ctaMap: Record<string, { destination: string; route: string; routeLabel: string; price: string }> = {
  "chichen-itza-mas-alla-piramide": { destination: "Chichén Itzá", route: "Cancún → Valladolid", routeLabel: "Ruta Cancún–Valladolid", price: "$890 MXN" },
  "cenotes-sagrados-yucatan": { destination: "los Cenotes de Yucatán", route: "Mérida → Valladolid", routeLabel: "Ruta Mérida–Valladolid", price: "$750 MXN" },
  "gastronomia-yucateca-imperdible": { destination: "Mérida", route: "Cancún → Mérida", routeLabel: "Ruta Cancún–Mérida", price: "$1,200 MXN" },
  "palenque-ciudad-perdida-selva": { destination: "Palenque", route: "Escárcega → Palenque", routeLabel: "Ruta Escárcega–Palenque", price: "$980 MXN" },
  "bacalar-laguna-siete-colores": { destination: "Bacalar", route: "Cancún → Bacalar", routeLabel: "Ruta Cancún–Bacalar", price: "$1,100 MXN" },
  "chocolate-cacao-ruta-maya": { destination: "la Ruta del Cacao", route: "Villahermosa → Comalcalco", routeLabel: "Ruta del Cacao", price: "$650 MXN" },
  "pueblos-magicos-ruta-tren-maya": { destination: "los Pueblos Mágicos", route: "Mérida → Izamal", routeLabel: "Ruta de Pueblos Mágicos", price: "$550 MXN" },
};

const defaultCta = { destination: "el Sureste de México", route: "Múltiples rutas", routeLabel: "Explorar rutas", price: "$890 MXN" };

interface ArticleSidebarCTAProps {
  postSlug: string;
}

const ArticleSidebarCTA = ({ postSlug }: ArticleSidebarCTAProps) => {
  const cta = ctaMap[postSlug] || defaultCta;

  return (
    <div className="rounded-xl bg-jade-dark p-5 text-primary-foreground">
      <div className="flex items-center gap-2 mb-3">
        <Train size={18} className="text-gold" />
        <span className="text-xs font-medium text-gold uppercase tracking-wider">Tren Maya</span>
      </div>
      <h3 className="font-heading text-base font-bold leading-snug mb-1">
        ¿Quieres visitar {cta.destination}?
      </h3>
      <p className="text-sm text-primary-foreground/70 mb-1">{cta.route}</p>
      <p className="text-sm text-primary-foreground/80 mb-4">
        Viaja en el Tren Maya desde <strong className="text-gold">{cta.price}</strong>
      </p>
      <Link
        to="/itinerarios"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg text-sm hover:bg-accent/90 transition-colors"
      >
        Reservar ahora <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default ArticleSidebarCTA;
