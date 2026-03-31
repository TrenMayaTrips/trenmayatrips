import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Navigation, Info } from "lucide-react";
import { useDestinations, destinationTypes } from "@/hooks/useDestinations";
import { destinationImageMap } from "@/data/destination-images";
import EstelaCard from "@/components/maya/EstelaCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Map destination slugs to station names they match
const destToStations: Record<string, string[]> = {
  "cancun": ["Cancún", "Cancún Aeropuerto"],
  "tulum": ["Tulum", "Tulum Aeropuerto"],
  "bacalar": ["Bacalar"],
  "playa-del-carmen": ["Playa del Carmen"],
  "merida": ["Mérida", "Mérida-Teya"],
  "valladolid": ["Valladolid"],
  "izamal": ["Izamal"],
  "chichen-itza": ["Chichén Itzá"],
  "campeche-ciudad": ["San Francisco de Campeche"],
  "calakmul": ["Calakmul"],
  "edzna": ["Edzná"],
  "palenque": ["Palenque"],
};

// Nearby access info for destinations without direct stations
const nearbyAccess: Record<string, { station: string; time: string; transport: string }> = {
  "cancun": { station: "Puerto Morelos", time: "25min", transport: "taxi" },
  "tulum": { station: "Playa del Carmen", time: "45min", transport: "colectivo" },
  "bacalar": { station: "Felipe Carrillo Puerto", time: "1h", transport: "colectivo" },
  "chichen-itza": { station: "Valladolid", time: "40min", transport: "colectivo" },
  "riviera-maya": { station: "Playa del Carmen", time: "20min", transport: "taxi" },
  "calakmul": { station: "Xpujil", time: "1h", transport: "tour" },
  "edzna": { station: "San Francisco de Campeche", time: "50min", transport: "taxi" },
  "palenque": { station: "Palenque", time: "15min", transport: "colectivo" },
  "villahermosa": { station: "Tenosique", time: "2h", transport: "autobús" },
  "comalcalco": { station: "Tenosique", time: "2.5h", transport: "autobús" },
  "san-cristobal": { station: "Palenque", time: "5h", transport: "autobús" },
  "cascadas-agua-azul": { station: "Palenque", time: "1.5h", transport: "tour" },
};

interface RutaDestinosProps {
  statesTraversed: string[];
  timelineStops?: string[]; // Names of stops in this route's timeline
}

const RutaDestinos = ({ statesTraversed, timelineStops = [] }: RutaDestinosProps) => {
  const routeDestinations = destinations.filter((d) =>
    statesTraversed.includes(d.state)
  );

  if (routeDestinations.length === 0) return null;

  // Check if destination has a direct station in this route
  const hasDirectStation = (destSlug: string): boolean => {
    const stations = destToStations[destSlug] || [];
    return stations.some(station => timelineStops.includes(station));
  };

  // Get nearby access info for destinations without direct stations
  const getNearbyInfo = (destSlug: string): { station: string; time: string; transport: string } | null => {
    // First check if any nearby station is in this route's timeline
    const nearby = nearbyAccess[destSlug];
    if (nearby && timelineStops.some(stop => 
      stop.toLowerCase().includes(nearby.station.toLowerCase()) ||
      nearby.station.toLowerCase().includes(stop.toLowerCase().split('-')[0])
    )) {
      return nearby;
    }
    // Fallback: find any timeline stop that could be nearby
    if (nearby) {
      return nearby;
    }
    return null;
  };

  // Sort: direct stations first, then nearby
  const sortedDestinations = [...routeDestinations].sort((a, b) => {
    const aHasDirect = hasDirectStation(a.slug);
    const bHasDirect = hasDirectStation(b.slug);
    if (aHasDirect && !bHasDirect) return -1;
    if (!aHasDirect && bHasDirect) return 1;
    return 0;
  });

  // Split into direct and nearby
  const directDestinations = sortedDestinations.filter(d => hasDirectStation(d.slug));
  const nearbyDestinations = sortedDestinations.filter(d => !hasDirectStation(d.slug));

  const renderDestinationCard = (dest: typeof destinations[0], i: number, isDirect: boolean) => {
    const img = destinationImageMap[dest.slug];
    const nearbyInfo = !isDirect ? getNearbyInfo(dest.slug) : null;

    return (
      <motion.div
        key={dest.slug}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.06 }}
      >
        <Link to={`/destinos/${dest.slug}`}>
          <EstelaCard className="overflow-hidden hover:shadow-lg transition-all group h-full">
            <div className="relative h-32 sm:h-36 overflow-hidden">
              {img && (
                <img
                  src={img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute top-2 right-2 text-[10px] bg-primary/90 text-primary-foreground px-1.5 py-0.5 rounded-full font-semibold">
                {destinationTypes[dest.type]}
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-heading font-bold text-foreground text-sm leading-tight">
                {dest.name}
              </h3>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {dest.tagline}
              </p>
              
              {/* Station access badge */}
              {timelineStops.length > 0 && (
                <div className="mt-2">
                  {isDirect ? (
                    <div className="flex items-center gap-1 text-[10px] text-primary font-medium">
                      <CheckCircle2 size={12} className="text-primary" />
                      <span>Estación directa ✓</span>
                    </div>
                  ) : nearbyInfo ? (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Navigation size={10} />
                      <span>Desde {nearbyInfo.station}, {nearbyInfo.time}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin size={10} />
                      <span>{dest.travelTime}</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Fallback if no timeline provided */}
              {timelineStops.length === 0 && (
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
                  <MapPin size={10} className="text-primary" />
                  <span>{dest.travelTime}</span>
                </div>
              )}
            </div>
          </EstelaCard>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="section-label">
            Explora en el camino
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Destinos en esta ruta
          </h2>
        </div>

        {/* Direct destinations */}
        {directDestinations.length > 0 && (
          <div className="mb-8">
            {timelineStops.length > 0 && nearbyDestinations.length > 0 && (
              <p className="text-sm text-muted-foreground text-center mb-4">
                <span className="font-medium text-foreground">Con estación directa</span>
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {directDestinations.map((dest, i) => renderDestinationCard(dest, i, true))}
            </div>
          </div>
        )}

        {/* Nearby destinations */}
        {nearbyDestinations.length > 0 && timelineStops.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="font-medium text-foreground text-sm">Destinos cercanos</span>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <Info size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[280px] text-center">
                    <p className="text-xs leading-relaxed">
                      Estos destinos no tienen estación de tren directa en esta ruta, pero son fácilmente accesibles en taxi, colectivo o tour desde las estaciones indicadas.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {nearbyDestinations.map((dest, i) => renderDestinationCard(dest, i, false))}
            </div>
          </div>
        )}

        {/* If no timeline provided, show all destinations normally */}
        {timelineStops.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {routeDestinations.map((dest, i) => renderDestinationCard(dest, i, false))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RutaDestinos;
