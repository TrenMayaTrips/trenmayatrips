import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Star, Users } from "lucide-react";
import { experiences } from "@/data/experiences";
import { experienceGallery } from "@/data/experience-gallery";
import MayaPattern from "@/components/maya/MayaPattern";
import EstelaCard from "@/components/maya/EstelaCard";

interface DestinoExperienciasProps {
  stateName: string;
  stateSlug: string;
}

const DestinoExperiencias = ({ stateName, stateSlug }: DestinoExperienciasProps) => {
  const stateExperiences = experiences.filter((e) => e.state === stateSlug);

  if (stateExperiences.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-secondary/30 border-y border-border relative">
      <MayaPattern variant="pop" opacity={0.03} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">
            Vive la experiencia
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Experiencias en {stateName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {stateExperiences.map((exp, i) => {
            const gallery = experienceGallery[exp.slug];
            const thumb = gallery?.[0];

            return (
              <motion.div
                key={exp.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/experiencias/${exp.slug}`}>
                  <EstelaCard className="overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
                    {thumb && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={thumb}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary/90 text-primary-foreground text-[10px] font-semibold rounded-full">
                          {exp.category === "aventura" ? "🏔️ Aventura" : exp.category === "cultural" ? "🏛️ Cultural" : exp.category === "gastronomico" ? "🍫 Gastronómico" : "🧘 Bienestar"}
                        </span>
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-heading font-bold text-foreground text-sm leading-tight mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                        {exp.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-accent" /> {exp.rating}
                        </span>
                        <span className="flex items-center gap-1 ml-auto font-semibold text-primary">
                          ${exp.price.toLocaleString()} MXN
                        </span>
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

export default DestinoExperiencias;
