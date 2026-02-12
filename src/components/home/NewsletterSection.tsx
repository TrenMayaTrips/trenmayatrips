import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
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
          <p className="mt-3 text-muted-foreground">
            Suscríbete y obtén una <strong className="text-foreground">guía gratuita en PDF</strong> con los 10 paisajes imperdibles desde el tren.
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
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
