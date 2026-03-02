import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight, Lightbulb } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import { findStationBySlug } from "@/data/station-details";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";

const EstacionDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const station = findStationBySlug(slug || "");
  const [expandedTips, setExpandedTips] = useState(true);

  if (!station) return <Navigate to="/tren-maya" replace />;

  const typeLabel =
    station.type === "principal" ? "Estación principal" :
    station.type === "estacion" ? "Estación" : "Paradero";

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero
        imageSrc={station.image}
        imageAlt={`Estación ${station.name} del Tren Maya`}
        className="pt-24 md:pt-32 pb-14 md:pb-20 min-h-[340px] md:min-h-[460px]"
        overlayClass="bg-gradient-to-b from-black/50 via-black/55 to-black/70"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs mb-4">
            <Link to="/tren-maya" className="hover:text-white transition-colors">Tren Maya</Link>
            <span>/</span>
            <span>Estaciones</span>
            <span>/</span>
            <span className="text-white">{station.name}</span>
          </nav>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-semibold rounded-full">
              🚂 {typeLabel}
            </span>
            <span className="px-3 py-1 bg-accent/80 text-accent-foreground text-xs font-semibold rounded-full">
              {station.stateBadge}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            {station.fullName}
          </h1>
          <p className="mt-3 text-white/75 text-sm md:text-base max-w-xl mx-auto">
            {station.subtitle}
          </p>
        </motion.div>
      </ParallaxHero>

      {/* Station data */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "📍", label: "Ubicación", value: `Km ${station.km.toLocaleString()}` },
              { icon: "🕐", label: "Horario", value: station.schedule },
              { icon: "🅿", label: "Estacionamiento", value: station.parking },
              { icon: "♿", label: "Accesibilidad", value: station.accessibility },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                <p className="font-medium text-foreground text-sm mt-0.5">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="md" />

      {/* Services */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">En la estación</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Servicios disponibles</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {station.services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2 px-4 py-3 bg-card rounded-xl border border-border"
              >
                <span className="text-xl">{service.icon}</span>
                <span className="text-sm font-medium text-foreground">{service.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connections */}
      <section className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Conexiones</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Rutas disponibles desde {station.name}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {station.connections.map((conn, i) => (
              <motion.div
                key={conn.destination}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {conn.stationSlug ? (
                  <Link
                    to={`/tren-maya/estaciones/${conn.stationSlug}`}
                    className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all group"
                  >
                    <ConnectionContent conn={conn} />
                    <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                    <ConnectionContent conn={conn} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby destinations */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Qué visitar</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Destinos cercanos</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {station.nearbyDestinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{dest.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{dest.type}</p>
                  </div>
                  {dest.badge && (
                    <span className="px-2 py-0.5 bg-secondary text-foreground text-xs rounded-full whitespace-nowrap">
                      {dest.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{dest.access}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get there */}
      <section className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Acceso</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Cómo llegar</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {station.transport.map((t, i) => (
              <motion.div
                key={t.method}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{t.method}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setExpandedTips(!expandedTips)}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-2">
                <Lightbulb size={20} className="text-accent" />
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  Tips para esta estación
                </h2>
              </div>
              {expandedTips ? (
                <ChevronUp size={18} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={18} className="text-muted-foreground" />
              )}
            </button>

            {expandedTips && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {station.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-accent font-bold shrink-0">●</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-primary relative">
        <MayaPattern variant="greca" opacity={0.05} />
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            ¿Listo para explorar desde {station.name}?
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-sm md:text-base">
            Encuentra las mejores rutas y paquetes para tu viaje
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Button variant="cta" asChild>
              <Link to="/contacto">Buscar rutas desde {station.name}</Link>
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

interface ConnectionContentProps {
  conn: { direction: string; destination: string; time: string; price: string };
}

const ConnectionContent = ({ conn }: ConnectionContentProps) => (
  <div className="flex items-center gap-4 flex-wrap">
    <span className="text-xs text-muted-foreground font-medium min-w-[60px]">{conn.direction}</span>
    <span className="font-heading font-semibold text-foreground">{conn.destination}</span>
    <span className="text-sm text-muted-foreground">🕐 {conn.time}</span>
    <span className="text-sm font-medium text-primary">{conn.price}</span>
  </div>
);

export default EstacionDetalle;
