import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTAFinalSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-jade-dark to-primary relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2038.59l2.83-2.83%201.41%201.41L1.41%2040H0v-1.41zM0%201.4l2.83%202.83%201.41-1.41L1.41%200H0v1.41zM38.59%2040l-2.83-2.83%201.41-1.41L40%2038.59V40h-1.41zM40%201.41l-2.83%202.83-1.41-1.41L38.59%200H40v1.41zM20%2018.6l2.83-2.83%201.41%201.41L21.41%2020l2.83%202.83-1.41%201.41L20%2021.41l-2.83%202.83-1.41-1.41L18.59%2020l-2.83-2.83%201.41-1.41L20%2018.59z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

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
            <a
              href="#reservar"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-md hover:bg-gold-light transition-colors text-base"
            >
              Reservar Ahora
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
      </div>
    </section>
  );
};

export default CTAFinalSection;
