import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const vagones = [
  {
    name: "Clase Turista",
    tagline: "Confort accesible",
    features: ["Asientos reclinables", "Vista panorámica", "Servicio de snacks", "Wi-Fi básico"],
    price: "Desde $2,500 MXN",
  },
  {
    name: "Clase Primera",
    tagline: "Elegancia y confort",
    features: ["Asientos premium", "Comida incluida", "Bar a bordo", "Wi-Fi premium", "Amenidades"],
    price: "Desde $5,800 MXN",
    featured: true,
  },
  {
    name: "Suite Presidencial",
    tagline: "Lujo sin límites",
    features: ["Cabina privada", "Chef personal", "Spa a bordo", "Mayordomo", "Champagne ilimitado"],
    price: "Desde $15,000 MXN",
  },
];

const VagonesSection = () => {
  const [active, setActive] = useState(1);

  return (
    <section id="vagones" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Vagones</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Elige tu estilo de viaje
          </h2>
        </div>

        {/* Mobile: swipeable cards */}
        <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
          {vagones.map((v, i) => (
            <VagonCard key={v.name} vagon={v} index={i} isFeatured={v.featured} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {vagones.map((v, i) => (
            <VagonCard key={v.name} vagon={v} index={i} isFeatured={v.featured} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VagonCard = ({ vagon, index, isFeatured }: { vagon: typeof vagones[0]; index: number; isFeatured?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`snap-center min-w-[280px] md:min-w-0 flex flex-col rounded-xl border overflow-hidden transition-all ${
      isFeatured
        ? "border-accent shadow-lg ring-1 ring-accent/20"
        : "border-border hover:shadow-md"
    }`}
  >
    {/* Image placeholder */}
    <div className={`h-44 md:h-52 ${isFeatured ? "bg-gradient-to-br from-accent/20 to-gold-light/30" : "bg-gradient-to-br from-secondary to-muted"}`}>
      {isFeatured && (
        <div className="m-3 inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
          Más elegido
        </div>
      )}
    </div>

    <div className="flex flex-col flex-1 p-5 md:p-6 bg-card">
      <p className="text-xs text-accent font-medium uppercase tracking-wider">{vagon.tagline}</p>
      <h3 className="font-heading text-xl font-bold text-foreground mt-1">{vagon.name}</h3>

      <ul className="mt-4 space-y-2 flex-1">
        {vagon.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check size={14} className="text-primary shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-border">
        <p className="font-heading text-lg font-bold text-foreground">{vagon.price}</p>
        <a
          href="#reservar"
          className={`mt-3 block text-center py-2.5 rounded-md text-sm font-semibold transition-colors ${
            isFeatured
              ? "bg-accent text-accent-foreground hover:bg-gold-light"
              : "bg-primary text-primary-foreground hover:bg-jade-light"
          }`}
        >
          Seleccionar
        </a>
      </div>
    </div>
  </motion.div>
);

export default VagonesSection;
