import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palmtree, Landmark, UtensilsCrossed, Sparkles, ArrowRight } from "lucide-react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";

const experiences = [
  {
    icon: Landmark,
    title: "Patrimonio maya",
    slug: "cultura-patrimonio",
    description: "Visita zonas arqueológicas como Chichén Itzá, Palenque, Uxmal y Calakmul con guías certificados.",
  },
  {
    icon: Palmtree,
    title: "Cenotes y naturaleza",
    slug: "naturaleza-aventura",
    description: "Nada en cenotes sagrados, explora la selva y descubre la Reserva de Sian Ka'an.",
  },
  {
    icon: UtensilsCrossed,
    title: "Gastronomía regional",
    slug: "gastronomia",
    description: "Cochinita pibil, papadzules, chocolate de Tabasco y sabores auténticos del sureste.",
  },
  {
    icon: Sparkles,
    title: "Bienestar y temazcal",
    slug: "bienestar",
    description: "Rituales de sanación, temazcales tradicionales y retiros de bienestar en la selva.",
  },
];

const ExperienciasSection = () => {
  return (
    <section id="experiencias" className="py-16 md:py-24 bg-secondary relative">
      <MayaPattern variant="pop" opacity={0.03} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-label">Experiencias</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Vive el Mundo Maya
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Cada parada del Tren Maya te conecta con experiencias únicas de cultura, aventura y tradición.
          </p>
          <GrecaDivider variant="gold" size="sm" className="mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/experiencias/${exp.slug}`}
                className="block bg-card p-6 md:p-8 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-center group h-full"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <exp.icon size={26} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                  Explorar <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/experiencias" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-jade-light transition-colors underline underline-offset-4">
            Ver todas las experiencias <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienciasSection;
