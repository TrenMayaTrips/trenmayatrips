import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Compass, Plus, X, ChevronRight, Send, Sparkles, Hotel, Save, Copy, Check, Loader2, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { destinations, states, destinationTypes, type Destination } from "@/data/destinations";
import { destinationImageMap } from "@/data/destination-images";

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
  { id: "boutique", label: "Hotel Boutique", emoji: "🏨", description: "Diseño, confort y atención personalizada", basePrice: 120 },
  { id: "ecolodge", label: "Eco-Lodge", emoji: "🌿", description: "En armonía con la naturaleza", basePrice: 85 },
  { id: "allinclusive", label: "All-Inclusive", emoji: "🏖️", description: "Todo incluido, sin preocupaciones", basePrice: 150 },
  { id: "hostal", label: "Hostal", emoji: "🎒", description: "Económico y social", basePrice: 35 },
];

// Destination-specific lodging prices (null = not available)
type LodgingPrices = { boutique: number | null; ecolodge: number | null; allinclusive: number | null; hostal: number | null };
const lodgingByDestination: Record<string, LodgingPrices> = {
  // Quintana Roo - Tourist prices
  "cancun": { boutique: 180, ecolodge: 120, allinclusive: 250, hostal: 45 },
  "playa-del-carmen": { boutique: 160, ecolodge: 110, allinclusive: 220, hostal: 40 },
  "tulum": { boutique: 200, ecolodge: 150, allinclusive: null, hostal: 50 },
  "bacalar": { boutique: 120, ecolodge: 90, allinclusive: null, hostal: 30 },
  "riviera-maya": { boutique: 170, ecolodge: 130, allinclusive: 280, hostal: 45 },
  // Yucatán - Mid prices
  "merida": { boutique: 100, ecolodge: 70, allinclusive: 140, hostal: 28 },
  "valladolid": { boutique: 85, ecolodge: 60, allinclusive: null, hostal: 22 },
  "izamal": { boutique: 75, ecolodge: 55, allinclusive: null, hostal: 20 },
  "chichen-itza": { boutique: 130, ecolodge: 90, allinclusive: 180, hostal: 35 },
  // Campeche - Lower prices
  "campeche-ciudad": { boutique: 80, ecolodge: 55, allinclusive: null, hostal: 22 },
  "calakmul": { boutique: 95, ecolodge: 70, allinclusive: null, hostal: 25 },
  "edzna": { boutique: 70, ecolodge: 50, allinclusive: null, hostal: 18 },
  // Chiapas
  "palenque": { boutique: 90, ecolodge: 65, allinclusive: null, hostal: 25 },
  "san-cristobal": { boutique: 85, ecolodge: 60, allinclusive: null, hostal: 22 },
  "cascadas-agua-azul": { boutique: null, ecolodge: 55, allinclusive: null, hostal: 20 },
  // Tabasco
  "villahermosa": { boutique: 95, ecolodge: 65, allinclusive: 120, hostal: 28 },
  "comalcalco": { boutique: 70, ecolodge: 50, allinclusive: null, hostal: 18 },
};

// Get price for a specific destination and lodging type
const getLodgingPrice = (destSlug: string, lodgingId: string): number | null => {
  const destPrices = lodgingByDestination[destSlug];
  if (destPrices) {
    return destPrices[lodgingId as keyof LodgingPrices];
  }
  // Fallback to base price for unlisted destinations
  const option = lodgingOptions.find(o => o.id === lodgingId);
  return option?.basePrice || null;
};

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
  const [nightsByDest, setNightsByDest] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [savedCode, setSavedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const maxDestinations = selectedDuration ? Math.min(Math.floor(selectedDuration / 1.5), 8) : 4;
  const totalNights = (selectedDuration || 1) - 1;

  // Distribute nights proportionally when destinations or duration change
  const distributeNights = (destSlugs: string[], nights: number) => {
    if (destSlugs.length === 0) return {};
    const base = Math.floor(nights / destSlugs.length);
    const remainder = nights % destSlugs.length;
    const result: Record<string, number> = {};
    destSlugs.forEach((slug, i) => {
      result[slug] = base + (i < remainder ? 1 : 0);
    });
    return result;
  };

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
    setSelectedDestinations((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < maxDestinations
        ? [...prev, slug]
        : prev;
      // Redistribute nights when destinations change
      setNightsByDest(distributeNights(next, totalNights));
      return next;
    });
  };

  // Redistribute when duration changes
  useMemo(() => {
    if (selectedDestinations.length > 0) {
      setNightsByDest(distributeNights(selectedDestinations, totalNights));
    }
  }, [selectedDuration]);

  const adjustNights = (destSlug: string, delta: number) => {
    setNightsByDest((prev) => {
      const current = prev[destSlug] || 0;
      const newVal = current + delta;
      if (newVal < 0) return prev;

      // Find another destination to take/give the night
      const otherSlugs = selectedDestinations.filter((s) => s !== destSlug);
      const otherWithCapacity = delta > 0
        ? otherSlugs.find((s) => (prev[s] || 0) > 0)
        : otherSlugs[0];

      if (!otherWithCapacity) return prev;

      const otherCurrent = prev[otherWithCapacity] || 0;
      if (delta > 0 && otherCurrent <= 0) return prev;

      return {
        ...prev,
        [destSlug]: newVal,
        [otherWithCapacity]: otherCurrent - delta,
      };
    });
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

  const totalCost = useMemo(() => {
    return selectedDests.reduce((total, dest) => {
      const lodgingId = lodgingByDest[dest.slug];
      const price = getLodgingPrice(dest.slug, lodgingId) || 0;
      const nights = nightsByDest[dest.slug] || 0;
      return total + price * nights;
    }, 0);
  }, [selectedDests, lodgingByDest, nightsByDest]);

  const saveItinerary = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke("save-itinerary", {
        body: {
          trip_type: selectedType!,
          duration: selectedDuration!,
          destinations: selectedDestinations,
          lodging: lodgingByDest,
          total_cost: totalCost,
        },
      });

      if (error) throw error;

      setSavedCode(data.short_code);
      toast({
        title: "¡Itinerario guardado!",
        description: "Ya puedes compartir tu circuito con un enlace único.",
      });
    } catch {
      toast({
        title: "Error al guardar",
        description: "Intenta de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const copyShareLink = async () => {
    if (!savedCode) return;
    const url = `${window.location.origin}/itinerarios/${savedCode}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <section className="bg-card border-b border-border sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* "Paso X de 5" — mobile only */}
          <p className="text-center text-sm text-muted-foreground mb-3 sm:hidden">
            Paso <span className="font-semibold text-foreground">{currentStep}</span> de {steps.length}
          </p>

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
                    {isDone ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  {/* Desktop: always show label. Mobile: only active step */}
                  <span
                    className={`text-[11px] sm:text-xs font-semibold sm:font-medium ${
                      isActive ? "block text-primary" : "hidden sm:block"
                    }`}
                  >
                    {step.label}
                  </span>
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
                        {destinationImageMap[dest.slug] && (
                          <div className="h-32 overflow-hidden">
                            <img
                              src={destinationImageMap[dest.slug]}
                              alt={dest.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
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
                    Elige el tipo de alojamiento y ajusta las noches en cada destino
                  </p>
                  <p className="text-sm text-accent font-medium mt-2">
                    {totalNights} noches en total ({selectedDuration} días − 1)
                  </p>
                </div>

                <div className="space-y-6">
                  {selectedDests.map((dest) => {
                    const currentLodging = lodgingByDest[dest.slug];
                    return (
                      <Card key={dest.slug} className="overflow-hidden">
                        <div className="bg-muted/50 px-5 py-3 border-b border-border flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{dest.emoji}</span>
                            <h3 className="font-heading font-semibold text-foreground">{dest.name}</h3>
                          </div>
                          {/* Nights adjuster */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => adjustNights(dest.slug, -1)}
                              disabled={(nightsByDest[dest.slug] || 0) <= 0}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-heading font-bold text-foreground min-w-[60px] text-center text-sm">
                              {nightsByDest[dest.slug] || 0} {(nightsByDest[dest.slug] || 0) === 1 ? "noche" : "noches"}
                            </span>
                            <button
                              onClick={() => adjustNights(dest.slug, 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {lodgingOptions.map((opt) => {
                              const price = getLodgingPrice(dest.slug, opt.id);
                              const isAvailable = price !== null;
                              const isSelected = currentLodging === opt.id;
                              
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => isAvailable && setLodging(dest.slug, opt.id)}
                                  disabled={!isAvailable}
                                  title={!isAvailable ? "No disponible en este destino" : undefined}
                                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                                    !isAvailable
                                      ? "border-border/50 opacity-40 cursor-not-allowed"
                                      : isSelected
                                      ? "border-primary bg-primary/5 shadow-sm"
                                      : "border-border hover:border-primary/30 hover:shadow-md"
                                  }`}
                                >
                                  <span className="text-2xl block mb-2">{opt.emoji}</span>
                                  <span className="font-heading text-sm font-semibold text-foreground block">
                                    {opt.label}
                                  </span>
                                  <span className="text-xs text-muted-foreground leading-tight block mt-1">
                                    {opt.description}
                                  </span>
                                  {isAvailable ? (
                                    <span className="text-sm font-heading font-bold text-primary block mt-3">
                                      Desde ${price}/noche
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground block mt-3 italic">
                                      No disponible
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-[10px] text-muted-foreground text-center mt-3">
                            Precios aproximados. El precio final dependerá de la fecha y disponibilidad.
                          </p>
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
                        <span className="font-medium">{selectedDuration} días · {totalNights} noches</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span className="font-medium">{selectedDestinations.length} destinos</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="font-medium">
                          💰 Hospedaje total: ${totalCost.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    {/* Route visualization */}
                    <div className="space-y-0">
                      {selectedDests.map((dest, i) => {
                        const state = states.find((s) => s.slug === dest.state);
                        const lodging = lodgingOptions.find((l) => l.id === lodgingByDest[dest.slug]);
                        const nights = nightsByDest[dest.slug] || 0;
                        const pricePerNight = getLodgingPrice(dest.slug, lodgingByDest[dest.slug]) || 0;
                        const subtotal = pricePerNight * nights;
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
                              </div>
                              {lodging && (
                                <div className="mt-2 bg-secondary/50 rounded-lg p-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-foreground font-medium">
                                      {lodging.emoji} {lodging.label}
                                    </span>
                                    <span className="text-sm font-heading font-bold text-primary">
                                      ${subtotal.toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {nights} {nights === 1 ? "noche" : "noches"} × ${pricePerNight}/noche
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Total breakdown */}
                    <div className="border-t border-border pt-4 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-semibold text-foreground">Hospedaje total estimado</span>
                        <span className="font-heading text-xl font-bold text-primary">${totalCost.toLocaleString()} USD</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {totalNights} noches repartidas en {selectedDestinations.length} destinos. No incluye transporte ni actividades.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                  {!savedCode ? (
                    <Button
                      size="lg"
                      onClick={saveItinerary}
                      disabled={saving}
                      className="text-base px-8"
                    >
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      {saving ? "Guardando..." : "Guardar y compartir"}
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={copyShareLink}
                        className="text-base px-8"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "¡Enlace copiado!" : "Copiar enlace para compartir"}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate(`/itinerarios/${savedCode}`)}
                        className="text-base"
                      >
                        <Sparkles size={16} /> Ver itinerario guardado
                      </Button>
                    </>
                  )}
                  <Button
                    variant="cta"
                    size="lg"
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
                  <Button variant="outline" size="lg" onClick={() => { setCurrentStep(1); setSavedCode(null); }} className="text-base">
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
