import { Link } from "react-router-dom";
import { ArrowRight, Train } from "lucide-react";

const ctaMap: Record<string, { destination: string; price: string }> = {
  "chichen-itza-mas-alla-piramide": { destination: "Chichén Itzá", price: "$890 MXN" },
  "cenotes-sagrados-yucatan": { destination: "los Cenotes", price: "$750 MXN" },
  "gastronomia-yucateca-imperdible": { destination: "Mérida", price: "$1,200 MXN" },
  "palenque-ciudad-perdida-selva": { destination: "Palenque", price: "$980 MXN" },
  "bacalar-laguna-siete-colores": { destination: "Bacalar", price: "$1,100 MXN" },
};

const defaultCta = { destination: "el Sureste", price: "$890 MXN" };

interface MobileStickyBookingProps {
  postSlug: string;
}

/** Mobile-only sticky booking bar shown at bottom of article pages */
const MobileStickyBooking = ({ postSlug }: MobileStickyBookingProps) => {
  const cta = ctaMap[postSlug] || defaultCta;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 md:hidden">
      <div className="mx-3 flex items-center justify-between gap-3 rounded-xl bg-jade-dark px-4 py-3 shadow-lg">
        <div className="min-w-0">
          <p className="text-xs text-white/70 truncate flex items-center gap-1">
            <Train size={12} className="text-gold flex-shrink-0" />
            Desde {cta.price}
          </p>
          <p className="text-sm font-semibold text-white truncate">
            Visita {cta.destination}
          </p>
        </div>
        <Link
          to="/itinerarios"
          className="flex-shrink-0 flex items-center gap-1 px-4 py-2 bg-gold text-obsidiana font-semibold rounded-lg text-sm hover:bg-gold/90 transition-colors"
        >
          Reservar <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyBooking;
