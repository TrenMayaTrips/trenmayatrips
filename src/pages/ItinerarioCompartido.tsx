import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Compass, Sparkles, ArrowLeft, Copy, Check, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import PeninsulaMap from "@/components/maps/PeninsulaMap";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { destinations, states, destinationTypes } from "@/data/destinations";

const tripTypes = [
  { id: "cultural", label: "Cultural & Arqueología", emoji: "🏛️" },
  { id: "aventura", label: "Aventura & Naturaleza", emoji: "🌿" },
  { id: "playa", label: "Sol & Playa", emoji: "🏖️" },
  { id: "gastronomia", label: "Gastronomía", emoji: "🍫" },
  { id: "romantico", label: "Romántico", emoji: "💛" },
];

const lodgingOptions = [
  { id: "boutique", label: "Hotel Boutique", emoji: "🏨", pricePerNight: 120 },
  { id: "ecolodge", label: "Eco-Lodge", emoji: "🌿", pricePerNight: 85 },
  { id: "allinclusive", label: "All-Inclusive", emoji: "🏖️", pricePerNight: 150 },
  { id: "hostal", label: "Hostal", emoji: "🎒", pricePerNight: 35 },
];

const ItinerarioCompartido = () => {
  const { code } = useParams<{ code: string }>();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!code) return;
      const { data, error } = await supabase
        .from("saved_itineraries")
        .select("*")
        .eq("short_code", code)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setItinerary(data);
      }
      setLoading(false);
    };
    fetchItinerary();
  }, [code]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </PageLayout>
    );
  }

  if (notFound || !itinerary) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
          <h1 className="font-heading text-3xl font-bold text-foreground">Itinerario no encontrado</h1>
          <p className="text-muted-foreground">Este enlace no es válido o el itinerario fue eliminado.</p>
          <Button asChild>
            <Link to="/itinerarios">
              <ArrowLeft size={16} /> Crear mi itinerario
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const tripType = tripTypes.find((t) => t.id === itinerary.trip_type);
  const destSlugs = itinerary.destinations as string[];
  const lodgingByDest = itinerary.lodging as Record<string, string>;
  const selectedDests = destSlugs.map((slug) => destinations.find((d) => d.slug === slug)).filter(Boolean);
  const duration = itinerary.duration;

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Vi este itinerario y me interesa:\n\n🧭 Tipo: ${tripType?.label}\n📅 Duración: ${duration} días\n\n${selectedDests
      .map((d) => {
        const lodging = lodgingOptions.find((l) => l.id === lodgingByDest[d!.slug]);
        return `  📍 ${d!.name} — ${lodging?.emoji} ${lodging?.label}`;
      })
      .join("\n")}\n\n🔗 Ver itinerario: ${window.location.href}\n\n¿Pueden ayudarme a reservar?`
  );

  return (
    <PageLayout>
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
            {tripType?.emoji} Itinerario compartido
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg md:text-xl"
          >
            Un circuito personalizado por el Mundo Maya
          </motion.p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <div className={`${!isMobile ? 'grid grid-cols-[1fr_340px] gap-8 items-start' : ''}`}>
          <div className="space-y-8">
          <Card className="overflow-hidden">
            <div className="bg-primary p-6">
              <div className="flex flex-wrap gap-4 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Compass size={18} />
                  <span className="font-medium">{tripType?.emoji} {tripType?.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-medium">{duration} días</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span className="font-medium">{selectedDests.length} destinos</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-medium">💰 ${itinerary.total_cost}/total</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-0">
                {selectedDests.map((dest, i) => {
                  if (!dest) return null;
                  const state = states.find((s) => s.slug === dest.state);
                  const lodging = lodgingOptions.find((l) => l.id === lodgingByDest[dest.slug]);
                  return (
                    <div key={dest.slug} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        {i < selectedDests.length - 1 && (
                          <div className="w-0.5 h-full min-h-[3rem] bg-border my-1" />
                        )}
                      </div>
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
                          {lodging && (
                            <Badge variant="outline" className="text-xs">
                              💰 ${lodging.pricePerNight} x {duration} = ${lodging.pricePerNight * duration}
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8" asChild>
              <a href={`https://wa.me/529982186754?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <Send size={18} /> Solicitar este itinerario
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={copyLink} className="text-base">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "¡Enlace copiado!" : "Copiar enlace"}
            </Button>
            <Button variant="outline" size="lg" asChild className="text-base">
              <Link to="/itinerarios">
                <Sparkles size={16} /> Crear el mío
              </Link>
            </Button>
          </div>
          </div>

          {/* Desktop-only SVG map */}
          {!isMobile && (
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <div className="p-4 bg-secondary/50 border-b border-border">
                  <h3 className="font-heading text-sm font-semibold text-foreground/70 tracking-wide uppercase">
                    🗺️ Tu recorrido
                  </h3>
                </div>
                <CardContent className="p-4">
                  <PeninsulaMap highlightedSlugs={destSlugs} />
                </CardContent>
              </Card>
            </div>
          )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ItinerarioCompartido;
