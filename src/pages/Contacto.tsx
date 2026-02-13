import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Email no válido").max(255, "Máximo 255 caracteres"),
  topic: z.enum(["reservas", "consultas", "sugerencias"], { required_error: "Selecciona un tema" }),
  subject: z.string().trim().min(1, "El asunto es obligatorio").max(200, "Máximo 200 caracteres"),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000, "Máximo 2000 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

const topicLabels: Record<string, string> = {
  reservas: "🎫 Reservas",
  consultas: "❓ Consultas",
  sugerencias: "💡 Sugerencias",
};

const Contacto = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<Partial<ContactForm>>({
    name: "",
    email: "",
    topic: undefined,
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact", {
        body: result.data,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "¡Mensaje enviado!",
        description: "Te responderemos lo antes posible.",
      });
    } catch (err) {
      toast({
        title: "Error al enviar",
        description: "Intenta de nuevo o contáctanos por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-b from-jade-dark to-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Contacto</p>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="mt-4 text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
            Estamos aquí para hacer de tu viaje en el Tren Maya una experiencia inolvidable.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Información de Contacto</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nuestro equipo de expertos en viajes está listo para asesorarte personalmente.
              </p>

              <div className="space-y-5 pt-2">
                {[
                  { icon: Phone, label: "Teléfono", value: "(52) 998 218 6754", href: "tel:+529982186754" },
                  { icon: Mail, label: "Email", value: "info@trenmayantrips.com", href: "mailto:info@trenmayantrips.com" },
                  { icon: MapPin, label: "Dirección", value: "Av. Mallorca, Residencial Mallorca, Benito Juárez, Quintana Roo" },
                  { icon: Clock, label: "Horario", value: "Lun – Vie: 9:00 – 18:00\nSáb: 10:00 – 14:00" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-foreground hover:text-primary transition-colors whitespace-pre-line">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-4">
                <a
                  href="https://wa.me/529982186754?text=Hola%2C%20me%20interesa%20un%20viaje%20en%20el%20Tren%20Maya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[hsl(140,60%,40%)] text-white font-semibold rounded-lg hover:bg-[hsl(140,60%,35%)] transition-colors text-sm"
                >
                  💬 Escríbenos por WhatsApp
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-border"
                >
                  <CheckCircle size={64} className="text-primary mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Hemos recibido tu mensaje. Nuestro equipo te responderá en las próximas 24 horas hábiles.
                  </p>
                  <Button onClick={() => { setIsSuccess(false); setForm({ name: "", email: "", topic: undefined, subject: "", message: "" }); }}>
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5"
                >
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Envíanos un mensaje</h2>
                  <p className="text-muted-foreground text-sm mb-4">Completa el formulario y te responderemos pronto.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        maxLength={100}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        maxLength={255}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Topic */}
                    <div className="space-y-1.5">
                      <Label>Tema *</Label>
                      <Select value={form.topic} onValueChange={(v) => handleChange("topic", v)}>
                        <SelectTrigger className={errors.topic ? "border-destructive" : ""}>
                          <SelectValue placeholder="Selecciona un tema" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(topicLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.topic && <p className="text-xs text-destructive">{errors.topic}</p>}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Asunto *</Label>
                      <Input
                        id="subject"
                        placeholder="¿En qué podemos ayudarte?"
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        maxLength={200}
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos más sobre tu consulta..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      maxLength={2000}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.message ? (
                        <p className="text-destructive">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span>{form.message?.length || 0}/2000</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contacto;
