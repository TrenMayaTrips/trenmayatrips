import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MayaPattern from "@/components/maya/MayaPattern";
import { ctaMayaTemple } from "@/data/litografias";

const CTAFinalSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-jade-dark to-primary relative overflow-hidden">
      <MayaPattern variant="greca" opacity={0.06} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              El Mundo Maya te{" "}
              <span className="text-gold italic">espera</span>
            </h2>
            <p className="mt-5 text-primary-foreground/70 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Solicita tu cotización y diseñamos el circuito perfecto por la ruta del Tren Maya. Plazas limitadas por temporada.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#reservar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-gold-light transition-colors text-base"
              >
                Reservar ahora
                <ArrowRight size={18} />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/10 transition-colors text-base"
              >
                Hablar con un asesor
              </a>
            </div>
          </motion.div>

          {/* Lithograph — desktop: side column, mobile: subtle background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-primary-foreground/15">
              <div className="absolute inset-[3px] border border-primary-foreground/10 rounded-lg z-10 pointer-events-none" />
              <img
                src={ctaMayaTemple}
                alt="Las Monjas, Chichén Itzá — Litografía de Frederick Catherwood, 1844"
                className="w-full h-auto cathewood-lithograph-dark opacity-70"
                style={{ filter: "sepia(20%) contrast(0.85) brightness(0.8)", mixBlendMode: "luminosity" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/30" />
              <p className="absolute bottom-3 right-4 text-[10px] text-primary-foreground/40 italic z-10">
                F. Catherwood, 1844
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: lithograph as subtle bg */}
      <div className="absolute inset-0 lg:hidden pointer-events-none">
        <img
          src={ctaMayaTemple}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-10 catherwood-mask"
          style={{ filter: "sepia(30%) contrast(0.8)", mixBlendMode: "luminosity" }}
        />
      </div>
    </section>
  );
};

export default CTAFinalSection;
