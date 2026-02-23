import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import EstelaCard from "@/components/maya/EstelaCard";
import izamalJaguar from "@/assets/litografias/izamal-jaguar.jpg";

const testimonials = [
  {
    name: "Laura Fernández",
    location: "Ciudad de México",
    text: "El circuito por Chichén Itzá, Uxmal y los cenotes fue mágico. El Tren Maya hace que todo sea cómodo y sin estrés. ¡Volveremos!",
    rating: 5,
  },
  {
    name: "Roberto Sánchez",
    location: "Monterrey",
    text: "Palenque nos dejó sin palabras. La combinación de zona arqueológica, cascadas de Agua Azul y el viaje en tren clase Janal fue perfecta.",
    rating: 5,
  },
  {
    name: "Patricia Morales",
    location: "Los Ángeles, CA",
    text: "Bacalar es un paraíso y el servicio de Tren Maya Trips fue excepcional. Guías locales increíbles y la cochinita pibil, ¡de otro nivel!",
    rating: 5,
  },
];

const TestimoniosSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Catherwood lithograph background */}
      <div
        className="catherwood-lithograph catherwood-lithograph--light"
        style={{ backgroundImage: `url(${izamalJaguar})` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Testimonios</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Lo que dicen nuestros viajeros
          </h2>
          <GrecaDivider variant="terracotta" size="sm" className="mt-6 max-w-xs mx-auto" />
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-center min-w-[300px] md:min-w-0"
            >
              <EstelaCard variant="jade" className="h-full">
                <div className="p-6 md:p-8">
                  <Quote size={24} className="text-accent/40 mb-3" />
                  <p className="text-foreground/80 text-sm leading-relaxed mb-5">{t.text}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </EstelaCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
