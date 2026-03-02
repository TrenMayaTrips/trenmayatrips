import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palmtree, Landmark, UtensilsCrossed, Sparkles, ArrowRight } from "lucide-react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";

import imgChichenDetail from "@/assets/dest-chichen-itza-detail.jpg";
import imgBacalar from "@/assets/dest-bacalar.jpg";
import imgCampeche from "@/assets/dest-campeche-ciudad.jpg";
import imgSanCristobal from "@/assets/dest-san-cristobal.jpg";

const experiences = [
  {
    icon: Landmark,
    title: "Patrimonio maya",
    slug: "cultura-patrimonio",
    description: "Visita zonas arqueológicas como Chichén Itzá, Palenque, Uxmal y Calakmul con guías certificados.",
    image: imgChichenDetail,
    alt: "Detalle de glifos tallados en piedra en Chichén Itzá",
  },
  {
    icon: Palmtree,
    title: "Cenotes y naturaleza",
    slug: "naturaleza-aventura",
    description: "Nada en cenotes sagrados, explora la selva y descubre la Reserva de Sian Ka'an.",
    image: imgBacalar,
    alt: "Laguna de siete colores en Bacalar rodeada de vegetación",
  },
  {
    icon: UtensilsCrossed,
    title: "Gastronomía regional",
    slug: "gastronomia",
    description: "Cochinita pibil, papadzules, chocolate de Tabasco y sabores auténticos del sureste.",
    image: imgCampeche,
    alt: "Fachadas coloridas del centro histórico de Campeche",
  },
  {
    icon: Sparkles,
    title: "Bienestar y temazcal",
    slug: "bienestar",
    description: "Rituales de sanación, temazcales tradicionales y retiros de bienestar en la selva.",
    image: imgSanCristobal,
    alt: "Vista de San Cristóbal de las Casas entre montañas y neblina",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all block h-full"
              >
                <div className="h-44 md:h-52 relative overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center">
                    <exp.icon size={20} className="text-primary" />
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Explorar <ArrowRight size={12} />
                  </span>
                </div>
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
