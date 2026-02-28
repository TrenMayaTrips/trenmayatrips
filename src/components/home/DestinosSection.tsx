import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import destChichenItza from "@/assets/dest-chichen-itza.jpg";
import destRivieraMaya from "@/assets/dest-riviera-maya.jpg";
import destPalenque from "@/assets/dest-palenque.jpg";
import destCalakmul from "@/assets/dest-calakmul-campeche.jpg";
import GrecaDivider from "@/components/maya/GrecaDivider";

const destinations = [
  {
    name: "Chichén Itzá y Valladolid",
    slug: "chichen-itza",
    region: "Yucatán",
    duration: "2 días",
    rating: 4.9,
    tag: "Más popular",
    image: destChichenItza,
    alt: "Pirámide de Kukulcán en Chichén Itzá al atardecer",
  },
  {
    name: "Riviera Maya y Tulum",
    slug: "tulum",
    region: "Quintana Roo",
    duration: "3 días",
    rating: 4.9,
    tag: "Imperdible",
    image: destRivieraMaya,
    alt: "Ruinas de Tulum sobre acantilado con mar turquesa",
  },
  {
    name: "Palenque y Agua Azul",
    slug: "palenque",
    region: "Chiapas",
    duration: "2 días",
    rating: 4.8,
    tag: "Aventura",
    image: destPalenque,
    alt: "Ruinas de Palenque emergiendo de la selva con neblina",
  },
  {
    name: "Calakmul y Campeche",
    slug: "calakmul",
    region: "Campeche",
    duration: "3 días",
    rating: 4.7,
    tag: "Cultural",
    image: destCalakmul,
    alt: "Ciudad amurallada de Campeche con fachadas coloridas",
  },
];

const DestinosSection = () => {
  return (
    <section id="destinos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-label">Destinos</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Descubre el sureste mexicano
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Cinco estados, miles de años de historia Maya y paisajes que solo el sureste de México puede ofrecer.
          </p>
          <GrecaDivider variant="jade" size="sm" className="mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/destinos/${dest.slug}`}
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all block h-full"
              >
                <div className="h-48 md:h-56 relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
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
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Ver destino <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/destinos" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-jade-light transition-colors underline underline-offset-4">
            Ver todos los destinos <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinosSection;
