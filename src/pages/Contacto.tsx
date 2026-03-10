import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, Loader2, Check, Navigation, MessageSquare, MessageCircle } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import heroTrenMaya from "@/assets/hero-tren-maya.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import GrecaDivider from "@/components/maya/GrecaDivider";
import ContactFAQ, { faqSchemaData } from "@/components/contacto/ContactFAQ";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(3, "Ingresa tu nombre completo").max(100, "Máximo 100 caracteres").regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, "Solo letras y espacios"),
  email: z.string().trim().email("Ingresa un email válido").max(255, "Máximo 255 caracteres"),
  topic: z.enum(["reservas", "consultas", "sugerencias"], { required_error: "Selecciona un tema" }),
  subject: z.string().trim().min(5, "El asunto debe tener al menos 5 caracteres").max(200, "Máximo 200 caracteres"),
  message: z.string().trim().min(20, "Escribe al menos 20 caracteres").max(2000, "Máximo 2000 caracteres")
});

type ContactForm = z.infer<typeof contactSchema>;
type FieldKey = keyof ContactForm;

const topicLabels: Record<string, string> = {
  reservas: "🎫 Reservas",
  consultas: "❓ Consultas",
  sugerencias: "💡 Sugerencias"
};

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "(52) 998 218 6754", href: "tel:+529982186754" },
  { icon: Mail, label: "Email", value: "info@trenmayantrips.com", href: "mailto:info@trenmayantrips.com" },
  { icon: MapPin, label: "Dirección", value: "Av. Mallorca, Residencial Mallorca, Benito Juárez, Quintana Roo" },
  { icon: Clock, label: "Horario", value: "Lun – Vie: 9:00 – 18:00\nSáb: 10:00 – 14:00" }
];

const contactChannels = [
  {
    icon: MessageSquare,
    title: "Envíanos un mensaje",
    subtitle: "Respuesta en 24h",
    action: "scroll",
  },
  {
    icon: MessageCircle,
    title: "Escríbenos por WhatsApp",
    subtitle: "Respuesta inmediata",
    action: "https://wa.me/529982186754?text=Hola%2C%20me%20interesa%20un%20viaje%20en%20el%20Tren%20Maya",
  },
  {
    icon: Phone,
    title: "Llámanos",
    subtitle: "Lun–Vie 9–18h",
    action: "tel:+529982186754",
  },
];

const Contacto = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<Partial<ContactForm>>({
    name: "", email: "", topic: undefined, subject: "", message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [honeypot, setHoneypot] = useState("");

  const validateField = useCallback((field: FieldKey, value: unknown): string | undefined => {
    const fieldSchema = contactSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    return result.success ? undefined : result.error.errors[0]?.message;
  }, []);

  const isFieldValid = useCallback((field: FieldKey): boolean => {
    const value = form[field];
    if (!value || (typeof value === "string" && value.trim() === "")) return false;
    return !validateField(field, value);
  }, [form, validateField]);

  const allValid = (["name", "email", "topic", "subject", "message"] as FieldKey[]).every(isFieldValid);

  const handleChange = (field: FieldKey, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: FieldKey) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const allTouched: Partial<Record<FieldKey, boolean>> = {};
    (["name", "email", "topic", "subject", "message"] as FieldKey[]).forEach(f => { allTouched[f] = true; });
    setTouched(allTouched);

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<FieldKey, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as FieldKey;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact", { body: result.data });
      if (error) throw error;
      setIsSuccess(true);
      toast({ title: "¡Mensaje enviado!", description: "Te responderemos lo antes posible." });
    } catch {
      toast({
        title: "No pudimos enviar tu mensaje",
        description: "Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: FieldKey) => {
    if (errors[field] && touched[field]) return "border-destructive focus-visible:ring-destructive";
    if (touched[field] && isFieldValid(field)) return "border-[hsl(var(--jade))] focus-visible:ring-[hsl(var(--jade))]";
    return "";
  };

  const ValidCheck = ({ field }: { field: FieldKey }) =>
    touched[field] && isFieldValid(field) ? (
      <Check size={16} className="text-[hsl(var(--jade))] absolute right-3 top-1/2 -translate-y-1/2" />
    ) : null;

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageLayout>
      <ParallaxHero imageSrc={heroTrenMaya} imageAlt="Contacto Tren Maya">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Contacto</p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
          ¿Cómo podemos ayudarte?
        </h1>
        <p className="mt-4 text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
          Estamos aquí para hacer de tu viaje en el Tren Maya una experiencia inolvidable.
        </p>
      </ParallaxHero>

      <GrecaDivider variant="jade" size="md" />

      {/* Channel Selector */}
      <section className="py-10 md:py-14 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center mb-8">
            Elige cómo contactarnos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactChannels.map(({ icon: Icon, title, subtitle, action }) => {
              const isWhatsApp = action.startsWith("https://wa.me");
              const isPhone = action.startsWith("tel:");
              const isScroll = action === "scroll";

              const cardContent = (
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                    isWhatsApp ? "bg-[#25D366]/10 text-[#25D366]" : "bg-primary/10 text-primary"
                  }`}>
                    <Icon size={28} strokeWidth={1.8} />
                  </div>
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                </div>
              );

              if (isScroll) {
                return (
                  <button key={title} onClick={scrollToForm} className="text-left">
                    {cardContent}
                  </button>
                );
              }

              return (
                <a
                  key={title}
                  href={action}
                  target={isWhatsApp ? "_blank" : undefined}
                  rel={isWhatsApp ? "noopener noreferrer" : undefined}
                >
                  {cardContent}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Información de contacto</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nuestro equipo de expertos en viajes está listo para asesorarte personalmente.
              </p>
              <div className="space-y-5 pt-2">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-foreground hover:text-primary transition-colors whitespace-pre-line">{value}</a>
                      ) : (
                        <p className="text-sm text-foreground whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Google Maps */}
              <div className="pt-2">
                <div className="rounded-xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5!2d-86.8515!3d21.1619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c2b05aef653ef%3A0xc987fae251849a69!2sResidencial%20Mallorca%2C%20Benito%20Ju%C3%A1rez%2C%20Q.R.!5e0!3m2!1ses!2smx!4v1700000000000"
                    width="100%"
                    className="h-[250px] md:h-[300px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Tren Maya Trips"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=21.1619,-86.8515&destination_place_id=ChIJ72X2rgkrTI8RqZqEUeL6h8k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 px-4 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Navigation size={16} />
                  Cómo llegar
                </a>
              </div>
            </div>

            {/* Form / Success */}
            <div id="contact-form" className="lg:col-span-2">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12 bg-card rounded-2xl border border-border"
                >
                  <CheckCircle size={64} className="text-primary mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Hemos recibido tu mensaje. Nuestro equipo te responderá en las próximas 24 horas hábiles.
                  </p>
                  <Button onClick={() => { setIsSuccess(false); setForm({ name: "", email: "", topic: undefined, subject: "", message: "" }); setTouched({}); setErrors({}); }}>
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

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <div className="relative">
                        <Input id="name" placeholder="Tu nombre" value={form.name} onChange={e => handleChange("name", e.target.value)} onBlur={() => handleBlur("name")} maxLength={100} className={fieldClass("name")} />
                        <ValidCheck field="name" />
                      </div>
                      {errors.name && touched.name && <p className="text-[13px] text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Input id="email" type="email" placeholder="tu@email.com" value={form.email} onChange={e => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} maxLength={255} className={fieldClass("email")} />
                        <ValidCheck field="email" />
                      </div>
                      {errors.email && touched.email && <p className="text-[13px] text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Tema *</Label>
                      <div className="relative">
                        <Select value={form.topic} onValueChange={v => { handleChange("topic", v); setTouched(prev => ({ ...prev, topic: true })); }}>
                          <SelectTrigger className={fieldClass("topic")} onBlur={() => handleBlur("topic")}>
                            <SelectValue placeholder="Selecciona un tema" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(topicLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2">
                          {touched.topic && isFieldValid("topic") && <Check size={16} className="text-[hsl(var(--jade))]" />}
                        </div>
                      </div>
                      {errors.topic && touched.topic && <p className="text-[13px] text-destructive">{errors.topic}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Asunto *</Label>
                      <div className="relative">
                        <Input id="subject" placeholder="¿En qué podemos ayudarte?" value={form.subject} onChange={e => handleChange("subject", e.target.value)} onBlur={() => handleBlur("subject")} maxLength={200} className={fieldClass("subject")} />
                        <ValidCheck field="subject" />
                      </div>
                      {errors.subject && touched.subject && <p className="text-[13px] text-destructive">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Mensaje *</Label>
                    <div className="relative">
                      <Textarea id="message" placeholder="Cuéntanos más sobre tu consulta..." rows={5} value={form.message} onChange={e => handleChange("message", e.target.value)} onBlur={() => handleBlur("message")} maxLength={2000} className={fieldClass("message")} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.message && touched.message ? (
                        <p className="text-[13px] text-destructive">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span>{form.message?.length || 0}/2000</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !allValid}>
                    {isSubmitting ? (
                      <><Loader2 size={18} className="mr-2 animate-spin" />Enviando...</>
                    ) : (
                      <><Send size={18} className="mr-2" />Enviar mensaje</>
                    )}
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="sm" />
      <ContactFAQ />

      <SEOHead
        title="Contacto — Tren Maya Trips"
        description="Contáctanos para planificar tu viaje en el Tren Maya. Teléfono, email, WhatsApp y ubicación en Cancún, Quintana Roo."
        canonical="https://trenmayatrips.com/contacto"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Tren Maya Trips",
          "image": "https://trenmayatrips.com/logo-tmt.png",
          "telephone": "+529982186754",
          "email": "info@trenmayantrips.com",
          "url": "https://trenmayatrips.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Mallorca, Mz 31, Lt 84, Residencial Mallorca",
            "addressLocality": "Benito Juárez",
            "addressRegion": "Quintana Roo",
            "addressCountry": "MX"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.1619,
            "longitude": -86.8515
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "10:00",
              "closes": "14:00"
            }
          ]
        }}
      />
    </PageLayout>
  );
};

export default Contacto;
