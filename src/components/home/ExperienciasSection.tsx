import { motion } from "framer-motion";
import { Utensils, Wine, Mountain, Music } from "lucide-react";

const experiences = [
  {
    icon: Utensils,
    title: "Gastronomía a bordo",
    description: "Menús degustación con chefs reconocidos que celebran la cocina regional mexicana.",
  },
  {
    icon: Wine,
    title: "Cata de vinos y mezcal",
    description: "Degusta las mejores etiquetas mexicanas mientras el paisaje se transforma.",
  },
  {
    icon: Mountain,
    title: "Excursiones en parada",
    description: "Caminatas, cabalgatas y recorridos culturales en cada destino de la ruta.",
  },
  {
    icon: Music,
    title: "Cultura viva",
    description: "Música en vivo, artesanías locales y encuentros con comunidades originarias.",
  },
];

const ExperienciasSection = () => {
  return (
    <section id="experiencias" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Experiencias</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Más que un viaje en tren
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Cada momento a bordo está diseñado para que vivas México con todos los sentidos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-6 md:p-8 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <exp.icon size={26} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienciasSection;
