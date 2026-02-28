import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Calendar, Star, ChevronRight, Train } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { destinations, states, destinationTypes } from "@/data/destinations";
import type { StateInfo } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { destinationImageMap } from "@/data/destination-images";
import heroDestinos from "@/assets/hero-destinos.jpg";
import ctaDestinos from "@/assets/cta-destinos.jpg";
import ParallaxHero from "@/components/layout/ParallaxHero";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";

const Destinos = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let results = destinations;
    if (selectedState) results = results.filter((d) => d.state === selectedState);
    if (selectedType) results = results.filter((d) => d.type === selectedType);
    return results;
  }, [selectedState, selectedType]);

  const statesWithCounts = states.map((s) => ({
    ...s,
    destinationCount: destinations.filter((d) => d.state === s.slug).length,
  }));

  const activeState = states.find((s) => s.slug === selectedState);

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero imageSrc={heroDestinos} imageAlt="Tren Maya Destinations" overlayClass="bg-black/40">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Destinos</p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
          5 estados, miles de historias
        </h1>
        <p className="mt-4 text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
          Explora los destinos más fascinantes del sureste mexicano a lo largo de la ruta del Tren Maya.
        </p>
      </ParallaxHero>

      <GrecaDivider variant="jade" size="md" />

      {/* Interactive State Map */}
      <section className="py-10 md:py-14 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            Selecciona un estado
          </h2>

          {/* State Selector - Metro Line Style */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 rounded-full" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-0 relative z-10">
              {statesWithCounts.map((state, i) => (
                <button
                  key={state.slug}
                  onClick={() => setSelectedState(selectedState === state.slug ? null : state.slug)}
                  className="flex flex-col items-center group"
                >
                  {/* Station Dot */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center text-2xl transition-all ${
                      selectedState === state.slug
                        ? "border-primary bg-primary/20 shadow-lg shadow-primary/20"
                        : "border-border bg-card group-hover:border-primary/50"
                    }`}
                    style={selectedState === state.slug ? { borderColor: state.color } : {}}
                  >
                    {state.emoji}
                  </motion.div>

                  {/* Label */}
                  <p className={`mt-2 text-xs md:text-sm font-semibold transition-colors text-center ${
                    selectedState === state.slug ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}>
                    {state.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {state.destinationCount} destinos
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active State Banner */}
          <AnimatePresence>
            {activeState && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-5 rounded-xl border border-border bg-secondary/50 text-center max-w-2xl mx-auto"
              >
                <p className="text-2xl mb-1">{activeState.emoji}</p>
                <h3 className="font-heading text-xl font-bold text-foreground">{activeState.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{activeState.tagline}</p>
                <p className="text-xs text-muted-foreground mt-1">Capital: {activeState.capital}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Type Filters */}
      <section className="bg-background sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Todos
            </button>
            {Object.entries(destinationTypes).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedType(selectedType === key ? null : key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-8">
            {filtered.length} destino{filtered.length !== 1 ? "s" : ""}
            {selectedState && ` en ${states.find((s) => s.slug === selectedState)?.name}`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No se encontraron destinos con esos filtros.</p>
              <button
                onClick={() => { setSelectedState(null); setSelectedType(null); }}
                className="text-primary font-medium underline underline-offset-4"
              >
                Ver todos los destinos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest, i) => {
                const state = states.find((s) => s.slug === dest.state);
                return (
                  <motion.div
                    key={dest.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                  <Link
                    to={`/destinos/${dest.slug}`}
                    className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all group block"
                  >
                    {/* Card Header with Image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {destinationImageMap[dest.slug] && (
                        <img
                          src={destinationImageMap[dest.slug]}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="text-4xl mb-2">{dest.emoji}</span>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: state?.color }}
                          />
                          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            {state?.name} · {destinationTypes[dest.type]}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-primary-foreground leading-tight group-hover:text-gold transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-primary-foreground/70 italic mt-1">{dest.tagline}</p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {dest.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5">
                        {dest.highlights.slice(0, 3).map((h) => (
                          <span key={h} className="px-2.5 py-1 bg-secondary text-foreground text-[11px] rounded-full">
                            {h}
                          </span>
                        ))}
                        {dest.highlights.length > 3 && (
                          <span className="px-2.5 py-1 bg-secondary text-foreground text-[11px] rounded-full">
                            +{dest.highlights.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Train size={12} className="text-primary" />
                          <span>{dest.nearestStation}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-accent" />
                          <span>{dest.travelTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Calendar size={12} className="text-muted-foreground" />
                          <span>Mejor época: {dest.bestMonths}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        asChild
                      >
                        <span>
                          Explorar destino <ChevronRight size={14} className="ml-1" />
                        </span>
                      </Button>
                    </div>
                  </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <GrecaDivider variant="gold" size="sm" />

      {/* Route Map - Metro Style */}
      <section className="py-12 md:py-16 bg-secondary/30 border-t border-border relative">
        <MayaPattern variant="pop" opacity={0.03} />
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
            Mapa de la ruta
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10 max-w-xl mx-auto">
            1,554 km conectando los destinos más espectaculares del sureste mexicano
          </p>

          <div className="max-w-3xl mx-auto">
            {states.map((state, stateIdx) => {
              const stateDests = destinations.filter((d) => d.state === state.slug);
              return (
                <div key={state.slug} className="relative">
                  {/* State Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2"
                      style={{ borderColor: state.color, backgroundColor: `${state.color}15` }}
                    >
                      {state.emoji}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{state.name}</h3>
                      <p className="text-xs text-muted-foreground">{state.tagline}</p>
                    </div>
                  </div>

                  {/* Destinations in this state */}
                  <div className="ml-5 pl-5 border-l-2 space-y-3 pb-8" style={{ borderColor: state.color }}>
                    {stateDests.map((dest, j) => (
                      <div key={dest.slug} className="relative flex items-start gap-3">
                        {/* Dot on line */}
                        <div
                          className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 bg-card"
                          style={{ borderColor: state.color }}
                        />
                        <div className="flex-1 p-3 rounded-lg bg-card border border-border hover:shadow-sm transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-semibold text-foreground">{dest.emoji} {dest.name}</span>
                              <p className="text-xs text-muted-foreground">{dest.tagline}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Train size={10} /> {dest.nearestStation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connector between states */}
                  {stateIdx < states.length - 1 && (
                    <div className="ml-5 pl-5 pb-2">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>→ Continúa hacia {states[stateIdx + 1].name}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={ctaDestinos}
            alt="Tren Maya Adventure"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿Listo para explorar?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Diseñamos tu itinerario perfecto combinando los mejores destinos de cada estado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/paquetes">Ver paquetes</Link>
            </Button>
            <Button variant="ctaOutline" size="lg" asChild>
              <Link to="/experiencias">Explorar experiencias</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Destinos;
