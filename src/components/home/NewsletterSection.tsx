import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email: email.trim() },
      });

      if (error) throw error;

      setStatus("success");
      setMessage(data?.message || "¡Suscripción exitosa!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Hubo un error. Intenta de nuevo.");
    }
  };

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
          <p className="section-label">Newsletter</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Recibe ofertas exclusivas
          </h2>
          <GrecaDivider variant="gold" size="sm" className="mt-4 mb-4 max-w-xs mx-auto" />
          <p className="text-muted-foreground">
            Suscríbete y obtén una <strong className="text-foreground">guía gratuita en PDF</strong> con los 10 destinos imperdibles de la ruta del Tren Maya.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-2 text-primary font-medium"
            >
              <CheckCircle size={20} />
              <span>{message}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="tu@correo.com"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm min-h-[48px]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-jade-light transition-colors text-sm min-h-[48px] disabled:opacity-60"
              >
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Suscribirme
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-destructive">{message}</p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Sin spam. Cancela cuando quieras. Respetamos tu privacidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
