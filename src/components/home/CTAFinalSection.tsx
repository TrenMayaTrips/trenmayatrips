import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
            <Button variant="cta" size="lg" asChild>
              <Link to="/paquetes">
                Ver paquetes
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="ctaOutline" size="lg" asChild>
              <Link to="/contacto">Hablar con un asesor</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
