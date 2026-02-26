import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tren-maya.jpg";
import { useParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const { ref, offset } = useParallax(0.35);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tren Maya cruzando la selva de la Península de Yucatán con pirámides mayas al fondo"
          className="w-full h-full object-cover will-change-transform"
          loading="eager"
          style={{ transform: `translateY(${offset}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4"
        >
          Explora el Mundo Maya
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
        >
          Experiencias únicas conectadas por{" "}
          <span className="text-gold italic">tren</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Recorre la Península de Yucatán y el sureste de México a bordo del Tren Maya. 
          Cultura, naturaleza y aventura en un solo viaje.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/destinos"
            className="px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-gold-light transition-colors text-sm md:text-base"
          >
            Explorar destinos
          </Link>
          <Link
            to="/experiencias"
            className="px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/10 transition-colors text-sm md:text-base"
          >
            Ver experiencias
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/40"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
