import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { destinations, destinationTypes } from "@/data/destinations";
import { destinationImageMap } from "@/data/destination-images";
import EstelaCard from "@/components/maya/EstelaCard";

interface RutaDestinosProps {
  statesTraversed: string[];
}

const RutaDestinos = ({ statesTraversed }: RutaDestinosProps) => {
  const routeDestinations = destinations.filter((d) =>
    statesTraversed.includes(d.state)
  );

  if (routeDestinations.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">
            Explora en el camino
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Destinos en esta ruta
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {routeDestinations.map((dest, i) => {
            const img = destinationImageMap[dest.slug];
            return (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/destinos/${dest.slug}`}>
                  <EstelaCard className="overflow-hidden hover:shadow-lg transition-all group h-full">
                    <div className="relative h-32 sm:h-36 overflow-hidden">
                      {img && (
                        <img
                          src={img}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                      <span className="absolute top-2 right-2 text-[10px] bg-primary/90 text-primary-foreground px-1.5 py-0.5 rounded-full font-semibold">
                        {destinationTypes[dest.type]}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-heading font-bold text-foreground text-sm leading-tight">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {dest.tagline}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
                        <MapPin size={10} className="text-primary" />
                        <span>{dest.travelTime}</span>
                      </div>
                    </div>
                  </EstelaCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RutaDestinos;
