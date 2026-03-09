import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SidebarNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const { error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email: email.trim() },
      });
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-5 text-center">
        <CheckCircle size={24} className="text-primary mx-auto mb-2" />
        <p className="text-sm font-medium text-foreground">¡Suscrito!</p>
        <p className="text-xs text-muted-foreground">Revisa tu correo 📬</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-heading text-sm font-bold text-foreground mb-1">
        Recibe guías como esta
      </p>
      <p className="text-xs text-muted-foreground mb-3">
        Tips y ofertas exclusivas del Tren Maya.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder="tu@correo.com"
          required
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          Suscribirme
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">Error. Intenta de nuevo.</p>
      )}
      <p className="mt-2 text-[10px] text-muted-foreground">Sin spam. Cancela cuando quieras.</p>
    </div>
  );
};

export default SidebarNewsletter;
