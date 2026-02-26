import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MayaPattern from "@/components/maya/MayaPattern";

const CTAFinalSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-jade-dark to-primary relative overflow-hidden">
      <MayaPattern variant="greca" opacity={0.06} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            El Mundo Maya te{" "}
            <span className="text-gold italic">espera</span>
          </h2>
          <p className="mt-5 text-primary-foreground/70 text-base md:text-lg max-w-xl mx-auto">
            Solicita tu cotización y diseñamos el circuito perfecto por la ruta del Tren Maya. Plazas limitadas por temporada.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/paquetes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-gold-light transition-colors text-base"
            >
              Ver paquetes
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/10 transition-colors text-base"
            >
              Hablar con un asesor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
