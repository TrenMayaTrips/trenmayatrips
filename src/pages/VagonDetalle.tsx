import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check, ArrowRight, ChevronLeft, X, Expand, Play } from "lucide-react";
...
            {/* Video / Interior view */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {wagon.videoUrl ? "📹 Recorrido en video" : "🖼️ Vista interior"}
              </p>

              <div className="rounded-xl overflow-hidden border border-border relative">
                {wagon.videoUrl ? (
                  <VideoEmbed
                    url={wagon.videoUrl}
                    poster={wagon.heroImage}
                    badge="Recorrido virtual"
                    autoplay={false}
                  />
                ) : (
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={wagon.heroImage}
                      alt={`Vista interior de ${wagon.name}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 text-foreground text-sm font-semibold">
                        <Play size={16} className="text-primary" />
                        Próximamente
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seat layout */}
      <section className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Distribución</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Layout de asientos</h2>
          </div>

          <div className="max-w-md mx-auto bg-card rounded-xl border border-border p-6">
            <p className="text-xs text-muted-foreground text-center mb-4">← Frente del tren</p>
            <div className="space-y-2">
              {Array.from({ length: Math.min(6, Math.ceil(wagon.seats / 4)) }).map((_, row) => (
                <div key={row} className="flex items-center justify-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-8 h-6 rounded bg-primary/20 border border-primary/30" />
                    <div className="w-8 h-6 rounded bg-primary/20 border border-primary/30" />
                  </div>
                  <div className="w-px h-6 bg-border" />
                  <div className="flex gap-1.5">
                    <div className="w-8 h-6 rounded bg-primary/20 border border-primary/30" />
                    <div className="w-8 h-6 rounded bg-primary/20 border border-primary/30" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-3 rounded bg-primary/20 border border-primary/30" />
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-3 rounded bg-muted border border-border" />
                <span>Ocupado</span>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              {wagon.seats} asientos · Configuración {wagon.config} · Ancho {wagon.seatWidth}
            </p>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">A bordo</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Amenidades detalladas</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {wagon.amenities.map((amenity, i) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{amenity.icon}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2">{amenity.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{amenity.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparativa-section" className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Comparativa</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">¿Cómo se compara?</h2>
          </div>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-4 py-3 rounded-tl-lg font-medium">Característica</th>
                  {wagonClassesDetailed.map((w) => (
                    <th
                      key={w.slug}
                      className={`px-4 py-3 font-medium text-center ${w.slug === wagon.slug ? "bg-primary" : "bg-primary/80"} ${
                        w.slug === wagonClassesDetailed[wagonClassesDetailed.length - 1].slug ? "rounded-tr-lg" : ""
                      }`}
                    >
                      {w.name} {w.slug === wagon.slug && "★"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Precio base", key: "price" as const },
                  { label: "Comida", key: "comida" as const },
                  { label: "Pantalla", key: "pantalla" as const },
                  { label: "Espacio asiento", key: "espacio" as const },
                  { label: "Lounge VIP", key: "lounge" as const },
                  { label: "Atención VIP", key: "atencionVIP" as const },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                    {wagonClassesDetailed.map((w) => (
                      <td
                        key={w.slug}
                        className={`px-4 py-3 text-center ${w.slug === wagon.slug ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                      >
                        {row.key === "price" ? `$${w.priceBase.toLocaleString()}` : w.comparison[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Preguntas frecuentes</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Preguntas sobre {wagon.name}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-0">
            {wagon.faqs.map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className="font-medium text-foreground text-sm md:text-base pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pb-4"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other classes */}
      <section className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Otras clases disponibles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {otherClasses.map((w) => (
              <Link
                key={w.slug}
                to={`/tren-maya/clases/${w.slug}`}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-36 overflow-hidden">
                  <img src={w.heroImage} alt={`Vagón ${w.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">{w.typeShort}</p>
                  <h3 className="font-heading text-lg font-bold text-foreground mt-1">{w.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{w.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-heading font-bold text-foreground">${w.priceBase.toLocaleString()} MXN</span>
                    <span className="text-sm text-primary font-medium group-hover:underline flex items-center gap-1">
                      Ver detalles <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-primary relative">
        <MayaPattern variant="greca" opacity={0.05} />
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            ¿Listo para viajar en clase {wagon.name}?
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-sm md:text-base">
            Solicita tu cotización personalizada y reserva tu lugar
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Button variant="cta" asChild>
              <Link to="/contacto">Reservar clase {wagon.name}</Link>
            </Button>
            <Button variant="ctaOutline" asChild>
              <a href="https://wa.me/529811234567" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default VagonDetalle;
