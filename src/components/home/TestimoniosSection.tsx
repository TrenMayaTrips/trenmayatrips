import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    location: "Ciudad de México",
    text: "Una experiencia inolvidable. El servicio a bordo es impecable y los paisajes de la Barranca del Cobre te dejan sin palabras.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    location: "Guadalajara",
    text: "El Tequila Express superó todas nuestras expectativas. La degustación, la música y la hospitalidad fueron excepcionales.",
    rating: 5,
  },
  {
    name: "Ana Rodríguez",
    location: "Monterrey",
    text: "Viajamos en Suite Presidencial y fue como estar en un hotel de cinco estrellas sobre rieles. Absolutamente recomendable.",
    rating: 5,
  },
];

const TestimoniosSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Testimonios</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Lo que dicen nuestros viajeros
          </h2>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-center min-w-[300px] md:min-w-0 bg-card p-6 md:p-8 rounded-xl border border-border"
            >
              <Quote size={24} className="text-accent/40 mb-3" />
              <p className="text-foreground/80 text-sm leading-relaxed mb-5">{t.text}</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
