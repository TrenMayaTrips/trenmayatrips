import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Compass, Plus, X, ChevronRight, Send, Sparkles, Hotel } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { destinations, states, destinationTypes, type Destination } from "@/data/destinations";

const tripTypes = [
  { id: "cultural", label: "Cultural & Arqueología", emoji: "🏛️", description: "Ruinas mayas, museos y tradiciones" },
  { id: "aventura", label: "Aventura & Naturaleza", emoji: "🌿", description: "Cenotes, cascadas y selva" },
  { id: "playa", label: "Sol & Playa", emoji: "🏖️", description: "Caribe, arena blanca y relax" },
  { id: "gastronomia", label: "Gastronomía", emoji: "🍫", description: "Sabores del sureste mexicano" },
  { id: "romantico", label: "Romántico", emoji: "💛", description: "Escapadas en pareja" },
];

const durations = [
  { days: 3, label: "3 días", subtitle: "Escapada express" },
  { days: 5, label: "5 días", subtitle: "Exploración ideal" },
  { days: 7, label: "7 días", subtitle: "Inmersión completa" },
  { days: 10, label: "10+ días", subtitle: "Gran circuito" },
];

const lodgingOptions = [
  { id: "boutique", label: "Hotel Boutique", emoji: "🏨", description: "Diseño, confort y atención personalizada" },
  { id: "ecolodge", label: "Eco-Lodge", emoji: "🌿", description: "En armonía con la naturaleza" },
  { id: "allinclusive", label: "All-Inclusive", emoji: "🏖️", description: "Todo incluido, sin preocupaciones" },
  { id: "hostal", label: "Hostal", emoji: "🎒", description: "Económico y social" },
];

const steps = [
  { id: 1, label: "Tipo de viaje", icon: Compass },
  { id: 2, label: "Duración", icon: Clock },
  { id: 3, label: "Destinos", icon: MapPin },
  { id: 4, label: "Hospedaje", icon: Hotel },
  { id: 5, label: "Resumen", icon: Sparkles },
];

const Itinerarios = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [lodgingByDest, setLodgingByDest] = useState<Record<string, string>>({});

  const maxDestinations = selectedDuration ? Math.min(Math.floor(selectedDuration / 1.5), 8) : 4;

  const filteredDestinations = useMemo(() => {
    let filtered = destinations;
    if (stateFilter) {
      filtered = filtered.filter((d) => d.state === stateFilter);
    }
    return filtered;
  }, [stateFilter]);

  const selectedDests = useMemo(
    () => destinations.filter((d) => selectedDestinations.includes(d.slug)),
    [selectedDestinations]
  );

  const toggleDestination = (slug: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < maxDestinations
        ? [...prev, slug]
        : prev
    );
  };

  const setLodging = (destSlug: string, lodgingId: string) => {
    setLodgingByDest((prev) => ({ ...prev, [destSlug]: lodgingId }));
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedType;
    if (currentStep === 2) return !!selectedDuration;
    if (currentStep === 3) return selectedDestinations.length >= 2;
    if (currentStep === 4) return selectedDestinations.every((slug) => !!lodgingByDest[slug]);
    return true;
  };

  const progressValue = (currentStep / steps.length) * 100;

  const whatsappMessage = useMemo(() => {
    if (currentStep !== 5) return "";
    const type = tripTypes.find((t) => t.id === selectedType);
    const destLines = selectedDests
      .map((d) => {
        const lodging = lodgingOptions.find((l) => l.id === lodgingByDest[d.slug]);
        return `  📍 ${d.name} — ${lodging?.emoji} ${lodging?.label}`;
      })
      .join("\n");
    return encodeURIComponent(
      `¡Hola! Me interesa un itinerario personalizado:\n\n🧭 Tipo: ${type?.label}\n📅 Duración: ${selectedDuration} días\n\n${destLines}\n\n¿Pueden ayudarme a armarlo?`
    );
  }, [currentStep, selectedType, selectedDuration, selectedDests, lodgingByDest]);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative bg-primary py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4"
          >
            Arma tu circuito ideal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Selecciona tus destinos favoritos y nosotros diseñamos la ruta perfecta por el Mundo Maya
          </motion.p>
        </div>
      </section>

      {/* Stepper */}
      <section className="bg-card border-b border-border sticky top-16 md:top-20 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto mb-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (isDone) setCurrentStep(step.id);
                  }}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActive
                      ? "text-primary"
                      : isDone
                      ? "text-accent cursor-pointer"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isDone
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-muted"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.label}</span>
                </button>
              );
            })}
          </div>
          <Progress value={progressValue} className="h-1.5 max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-16 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Trip Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                    ¿Qué tipo de viaje buscas?
                  </h2>
                  <p className="text-muted-foreground">Elige el estilo que mejor te represente</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tripTypes.map((type) => (
                    <Card
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                        selectedType === type.id
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:border-primary/30"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <span className="text-4xl mb-3 block">{type.emoji}</span>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                          {type.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Duration */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                    ¿Cuántos días tienes?
                  </h2>
                  <p className="text-muted-foreground">
                    La duración determina cuántos destinos puedes incluir
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {durations.map((dur) => (
                    <Card
                      key={dur.days}
                      onClick={() => setSelectedDuration(dur.days)}
                      className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                        selectedDuration === dur.days
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:border-primary/30"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <span className="text-3xl font-heading font-bold text-primary block mb-1">
                          {dur.label}
                        </span>
                        <p className="text-sm text-muted-foreground">{dur.subtitle}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Destinations */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Elige tus destinos
                  </h2>
                  <p className="text-muted-foreground">
                    Selecciona entre 2 y {maxDestinations} destinos ({selectedDestinations.length}/{maxDestinations})
                  </p>
                </div>

                {/* Selected destinations pills */}
                {selectedDestinations.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {selectedDests.map((d, i) => (
                      <Badge
                        key={d.slug}
                        variant="secondary"
                        className="bg-primary/10 text-primary px-3 py-1.5 text-sm gap-2 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                        onClick={() => toggleDestination(d.slug)}
                      >
                        <span className="font-medium">{i + 1}.</span> {d.emoji} {d.name}
                        <X size={14} />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* State filters */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant={stateFilter === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStateFilter(null)}
                  >
                    Todos
                  </Button>
                  {states.map((s) => (
                    <Button
                      key={s.slug}
                      variant={stateFilter === s.slug ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStateFilter(s.slug)}
                    >
                      {s.emoji} {s.name}
                    </Button>
                  ))}
                </div>

                {/* Destination grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredDestinations.map((dest) => {
                    const isSelected = selectedDestinations.includes(dest.slug);
                    const isFull = selectedDestinations.length >= maxDestinations && !isSelected;
                    return (
                      <Card
                        key={dest.slug}
                        onClick={() => !isFull && toggleDestination(dest.slug)}
                        className={`cursor-pointer transition-all ${
                          isSelected
                            ? "ring-2 ring-primary bg-primary/5"
                            : isFull
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:border-primary/30 hover:shadow-md"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <span className="text-2xl">{dest.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-semibold text-foreground truncate">
                              {dest.name}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">{dest.tagline}</p>
                          </div>
                          <div className="flex-shrink-0">
                            {isSelected ? (
                              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground text-xs font-bold">
                                  {selectedDestinations.indexOf(dest.slug) + 1}
                                </span>
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full border-2 border-muted flex items-center justify-center">
                                <Plus size={14} className="text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: Lodging */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                    ¿Dónde prefieres hospedarte?
                  </h2>
                  <p className="text-muted-foreground">
                    Elige el tipo de alojamiento para cada destino
                  </p>
                </div>

                <div className="space-y-6">
                  {selectedDests.map((dest) => {
                    const currentLodging = lodgingByDest[dest.slug];
                    return (
                      <Card key={dest.slug} className="overflow-hidden">
                        <div className="bg-muted/50 px-5 py-3 border-b border-border flex items-center gap-2">
                          <span className="text-xl">{dest.emoji}</span>
                          <h3 className="font-heading font-semibold text-foreground">{dest.name}</h3>
                        </div>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {lodgingOptions.map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => setLodging(dest.slug, opt.id)}
                                className={`rounded-xl border-2 p-4 text-center transition-all hover:shadow-md ${
                                  currentLodging === opt.id
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-border hover:border-primary/30"
                                }`}
                              >
                                <span className="text-2xl block mb-2">{opt.emoji}</span>
                                <span className="font-heading text-sm font-semibold text-foreground block">
                                  {opt.label}
                                </span>
                                <span className="text-xs text-muted-foreground leading-tight block mt-1">
                                  {opt.description}
                                </span>
                              </button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 5: Summary */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Tu circuito personalizado
                  </h2>
                  <p className="text-muted-foreground">
                    Revisa tu selección y solicita tu itinerario detallado
                  </p>
                </div>

                <Card className="overflow-hidden">
                  <div className="bg-primary p-6">
                    <div className="flex flex-wrap gap-4 text-primary-foreground">
                      <div className="flex items-center gap-2">
                        <Compass size={18} />
                        <span className="font-medium">
                          {tripTypes.find((t) => t.id === selectedType)?.emoji}{" "}
                          {tripTypes.find((t) => t.id === selectedType)?.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span className="font-medium">{selectedDuration} días</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span className="font-medium">{selectedDestinations.length} destinos</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    {/* Route visualization */}
                    <div className="space-y-0">
                      {selectedDests.map((dest, i) => {
                        const state = states.find((s) => s.slug === dest.state);
                        const lodging = lodgingOptions.find((l) => l.id === lodgingByDest[dest.slug]);
                        return (
                          <div key={dest.slug} className="flex gap-4">
                            {/* Timeline */}
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                                {i + 1}
                              </div>
                              {i < selectedDests.length - 1 && (
                                <div className="w-0.5 h-full min-h-[3rem] bg-border my-1" />
                              )}
                            </div>
                            {/* Content */}
                            <div className="pb-6 flex-1">
                              <h4 className="font-heading text-lg font-semibold text-foreground">
                                {dest.emoji} {dest.name}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-1">{dest.tagline}</p>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {state?.emoji} {state?.name}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {destinationTypes[dest.type]}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  🚂 {dest.travelTime}
                                </Badge>
                                {lodging && (
                                  <Badge variant="secondary" className="text-xs bg-accent/10 text-accent-foreground">
                                    {lodging.emoji} {lodging.label}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
                    asChild
                  >
                    <a
                      href={`https://wa.me/529982186754?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Send size={18} />
                      Solicitar itinerario por WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setCurrentStep(1)} className="text-base">
                    Empezar de nuevo
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-10 max-w-xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={currentStep === 1}
              >
                Atrás
              </Button>
              <Button onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>
                Siguiente <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Itinerarios;
