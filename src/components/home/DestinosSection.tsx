import { motion } from "framer-motion";
import { MapPin, Clock, Star } from "lucide-react";

const destinations = [
  {
    name: "Barranca del Cobre",
    region: "Chihuahua · Sinaloa",
    duration: "3 días",
    rating: 4.9,
    tag: "Más popular",
  },
  {
    name: "Ruta Tequila Express",
    region: "Jalisco",
    duration: "1 día",
    rating: 4.8,
    tag: "Experiencia única",
  },
  {
    name: "Riviera Maya Colonial",
    region: "Yucatán · Quintana Roo",
    duration: "4 días",
    rating: 4.9,
    tag: "Nuevo",
  },
  {
    name: "Ruta de la Plata",
    region: "Zacatecas · Guanajuato",
    duration: "2 días",
    rating: 4.7,
    tag: "Cultural",
  },
];

const DestinosSection = () => {
  return (
    <section id="destinos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Destinos</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Rutas que inspiran
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Cada ruta es una puerta a paisajes, sabores y tradiciones que solo México puede ofrecer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="h-48 md:h-56 bg-gradient-to-br from-primary/20 to-jade-light/30 relative">
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/90 backdrop-blur-sm text-xs font-medium rounded-full text-foreground">
                  {dest.tag}
                </span>
              </div>

              <div className="p-4 md:p-5">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span>{dest.region}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gold">
                    <Star size={14} fill="currentColor" />
                    <span className="font-medium">{dest.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#rutas" className="text-sm font-medium text-primary hover:text-jade-light transition-colors underline underline-offset-4">
            Ver todas las rutas →
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinosSection;
