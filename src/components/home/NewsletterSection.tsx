import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import idoloRoto from "@/assets/litografias/idolo-roto-copan.jpg";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-24 bg-secondary relative">
      <MayaPattern variant="pop" opacity={0.03} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Newsletter</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Recibe ofertas exclusivas
          </h2>
          <GrecaDivider variant="gold" size="sm" className="mt-4 mb-4 max-w-xs mx-auto" />
          <p className="text-muted-foreground">
            Suscríbete y obtén una <strong className="text-foreground">guía gratuita en PDF</strong> con los 10 destinos imperdibles de la ruta del Tren Maya.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm min-h-[48px]"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-jade-light transition-colors text-sm min-h-[48px]"
            >
              <Send size={16} />
              Suscribirme
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            Sin spam. Cancela cuando quieras. Respetamos tu privacidad.
          </p>

          {/* Catherwood vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 mx-auto max-w-xs"
          >
            <div className="relative rounded-lg overflow-hidden border-2 border-border/60">
              <div className="absolute inset-[3px] border border-border/40 rounded pointer-events-none z-10" />
              <img
                src={idoloRoto}
                alt="Ídolo Roto de Copán — Litografía de Frederick Catherwood"
                className="w-full h-[160px] object-cover catherwood-lithograph opacity-40 catherwood-mask-edges"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground/50 italic">
              F. Catherwood — Ídolo Roto de Copán, 1844
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
