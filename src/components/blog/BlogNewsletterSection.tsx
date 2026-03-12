import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MayaPattern from "@/components/maya/MayaPattern";
import { useIsMobile } from "@/hooks/use-mobile";

const interests = [
  { id: "guias", label: "Guías prácticas", emoji: "🗺️" },
  { id: "ofertas", label: "Ofertas y paquetes", emoji: "💰" },
  { id: "rutas", label: "Nuevas rutas", emoji: "🚂" },
  { id: "gastronomia", label: "Gastronomía", emoji: "🍽️" },
];

const BlogNewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
      setMessage("¡Bienvenido! Revisa tu correo para confirmar tu suscripción 📬");
      setEmail("");
      setSelectedInterests([]);
    } catch {
      setStatus("error");
      setMessage("Hubo un error. Intenta de nuevo.");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-jade-light relative overflow-hidden">
      <MayaPattern variant="greca" opacity={0.05} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Animated envelope icon + Title */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/10 mb-4"
            >
              <Mail size={28} className="text-gold" />
            </motion.div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
              No te pierdas ninguna historia
            </h2>
            
            {/* Social proof */}
            <p className="text-gold text-sm font-medium mb-4">
              Únete a +2,500 viajeros que ya reciben nuestras guías
            </p>
            
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
              Suscríbete y recibe gratis nuestra guía:{" "}
              <strong className="text-primary-foreground">
                "10 secretos del Tren Maya que solo los locales conocen"
              </strong>
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/20 mb-4"
                >
                  <CheckCircle size={32} className="text-gold" />
                </motion.div>
                <p className="text-xl font-heading font-bold text-primary-foreground mb-2">
                  {message}
                </p>
                <p className="text-primary-foreground/70 text-sm">
                  Tu guía PDF llegará en los próximos minutos.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }}>
                {/* Interest Pills */}
                <div className="mb-6">
                  <p className="text-primary-foreground/70 text-xs text-center mb-3">
                    ¿Qué te interesa? (opcional)
                  </p>
                  <div
                    className={`flex justify-center gap-2 ${
                      isMobile
                        ? "overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide snap-x"
                        : "flex-wrap"
                    }`}
                  >
                    {interests.map((interest) => {
                      const isSelected = selectedInterests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 snap-start transition-all duration-200 ${
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20"
                          }`}
                        >
                          <span>{interest.emoji}</span>
                          {interest.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-lg text-foreground bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent min-h-[48px]"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-obsidian font-semibold rounded-lg hover:bg-gold/90 transition-colors text-sm min-h-[48px] disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    Suscribirme gratis
                  </button>
                </form>

                {status === "error" && (
                  <p className="mt-3 text-sm text-center text-red-200">{message}</p>
                )}

                {/* Frequency note */}
                <p className="mt-4 text-[11px] text-primary-foreground/50 text-center">
                  Enviamos 1–2 correos por semana. Sin spam, cancela en cualquier momento.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletterSection;
