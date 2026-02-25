import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Train, ChevronRight, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import { destinations, states, destinationTypes } from "@/data/destinations";
import { destinationImageMap } from "@/data/destination-images";
import { getDestinationGallery } from "@/data/destination-gallery";
import { Button } from "@/components/ui/button";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import EstelaCard from "@/components/maya/EstelaCard";
import DestinoExperiencias from "@/components/destinos/DestinoExperiencias";
import DestinoGallery from "@/components/destinos/DestinoGallery";
import DestinoMap from "@/components/destinos/DestinoMap";
import VideoModule from "@/components/ui/VideoModule";

const DestinoDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = destinations.find((d) => d.slug === slug);

  if (!dest) return <Navigate to="/destinos" replace />;

  const state = states.find((s) => s.slug === dest.state);
  const image = destinationImageMap[dest.slug];
  const galleryImages = getDestinationGallery(dest.slug, dest.state);
  const related = destinations
    .filter((d) => d.state === dest.state && d.slug !== dest.slug)
    .slice(0, 3);

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero
        imageSrc={image}
        imageAlt={dest.name}
        className="pt-24 md:pt-32 pb-14 md:pb-20 min-h-[340px] md:min-h-[460px]"
        overlayClass="bg-black/50"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs mb-4">
            <Link to="/destinos" className="hover:text-white transition-colors">Destinos</Link>
            <span>/</span>
            <span className="text-white">{dest.name}</span>
          </nav>

          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{ backgroundColor: `${state?.color}cc`, color: "white" }}
            >
              {state?.emoji} {state?.name}
            </span>
            <span className="px-3 py-1 bg-accent/80 text-accent-foreground text-xs font-semibold rounded-full">
              {destinationTypes[dest.type]}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            {dest.emoji} {dest.name}
          </h1>
          <p className="mt-3 text-white/80 text-base md:text-lg italic max-w-xl mx-auto">
            {dest.tagline}
          </p>
        </motion.div>
      </ParallaxHero>

      <GrecaDivider variant="jade" size="md" />

      {/* Description */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed text-center">
            {dest.description}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-16 bg-card border-y border-border relative">
        <MayaPattern variant="pop" opacity={0.03} />
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Imperdibles</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Qué ver y hacer en {dest.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {dest.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <EstelaCard className="p-5 flex items-center gap-3">
                  <Star size={16} className="text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground">{highlight}</span>
                </EstelaCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GrecaDivider variant="gold" size="sm" />

      {/* Travel Info */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Información práctica</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Cómo llegar</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Train size={20} className="text-primary" />, label: "Estación más cercana", value: dest.nearestStation },
              { icon: <Clock size={20} className="text-accent" />, label: "Tiempo desde estación", value: dest.travelTime },
              { icon: <Calendar size={20} className="text-muted-foreground" />, label: "Mejor época", value: dest.bestMonths },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-heading font-semibold text-foreground mt-1">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <DestinoGallery images={galleryImages} title={dest.name} />

      {/* Video */}
      {dest.videoUrl && (
        <div className="container mx-auto px-4 -mt-4 mb-6">
          <VideoModule
            url={dest.videoUrl}
            poster={image}
            title={`Descubre ${dest.name} en video`}
            badge="Recorrido virtual"
          />
        </div>
      )}

      <GrecaDivider variant="terracotta" size="sm" />

      {/* Map */}
      <DestinoMap slug={dest.slug} name={dest.name} nearestStation={dest.nearestStation} />

      {/* Experiences */}
      <DestinoExperiencias stateName={state?.name || ""} stateSlug={dest.state} />

      {/* Related Destinations */}
      {related.length > 0 && (
        <section className="py-10 md:py-16 bg-secondary/30 border-t border-border relative">
          <MayaPattern variant="greca" opacity={0.03} />
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Explora más</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Otros destinos en {state?.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/destinos/${rel.slug}`}
                    className="block rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all group"
                  >
                    <div className="relative h-40 overflow-hidden bg-muted">
                      {destinationImageMap[rel.slug] && (
                        <img
                          src={destinationImageMap[rel.slug]}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <h3 className="font-heading text-lg font-bold text-white">{rel.emoji} {rel.name}</h3>
                        <p className="text-xs text-white/70">{rel.tagline}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary relative">
        <MayaPattern variant="greca" opacity={0.05} />
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            ¿Listo para visitar {dest.name}?
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-sm md:text-base max-w-xl mx-auto">
            Te ayudamos a planificar tu viaje perfecto al sureste mexicano
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <a
              href={`https://wa.me/529982186754?text=${encodeURIComponent(`Hola, me interesa visitar ${dest.name} (${state?.name}) en el Tren Maya. ¿Pueden ayudarme a planificar?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm"
            >
              💬 Planificar por WhatsApp
            </a>
            <Link
              to="/paquetes"
              className="px-6 py-3 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors text-sm"
            >
              Ver paquetes
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DestinoDetalle;
