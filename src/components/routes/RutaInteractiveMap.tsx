import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ExternalLink, ChevronDown, ZoomIn, ZoomOut } from "lucide-react";
import { Link } from "react-router-dom";
import EstelaCard from "@/components/maya/EstelaCard";
import { RouteStop } from "@/data/routes";
import { destinationImageMap } from "@/data/destination-images";
import { destinations } from "@/data/destinations";

// Station coordinates on the SVG map
const stationCoords: Record<string, { x: number; y: number }> = {
  "Palenque": { x: 72, y: 290 },
  "Boca del Cerro": { x: 65, y: 270 },
  "Tenosique": { x: 80, y: 252 },
  "Candelaria": { x: 112, y: 222 },
  "Escárcega": { x: 132, y: 206 },
  "Calakmul": { x: 200, y: 280 },
  "Xpujil": { x: 225, y: 274 },
  "Chetumal": { x: 310, y: 268 },
  "Bacalar": { x: 308, y: 248 },
  "Limones-Chacchoben": { x: 310, y: 228 },
  "Felipe Carrillo Puerto": { x: 340, y: 198 },
  "Tulum": { x: 350, y: 150 },
  "Tulum Aeropuerto": { x: 350, y: 150 },
  "Playa del Carmen": { x: 358, y: 118 },
  "Puerto Morelos": { x: 365, y: 98 },
  "Cancún": { x: 372, y: 74 },
  "Cancún Aeropuerto": { x: 372, y: 74 },
  "Valladolid": { x: 292, y: 100 },
  "Chichén Itzá": { x: 260, y: 106 },
  "Izamal": { x: 234, y: 100 },
  "Mérida": { x: 200, y: 82 },
  "Mérida-Teya": { x: 200, y: 82 },
  "Maxcanú": { x: 178, y: 110 },
  "Calkiní": { x: 168, y: 124 },
  "San Francisco de Campeche": { x: 140, y: 168 },
  "Edzná": { x: 138, y: 194 },
  "El Triunfo": { x: 75, y: 260 },
  "Centenario": { x: 145, y: 215 },
  "Nicolás Bravo": { x: 280, y: 275 },
  "Leona Vicario": { x: 375, y: 82 },
  "Nuevo Xcán": { x: 350, y: 90 },
  "Tixkokob": { x: 212, y: 88 },
  "Umán": { x: 188, y: 92 },
  "Hecelchakán": { x: 158, y: 140 },
  "Tenabo": { x: 150, y: 154 },
  "Carrillo Puerto": { x: 135, y: 200 },
};

const coastlinePath =
  "M 20,180 C 30,140 60,100 100,60 C 140,30 180,18 220,12 C 260,8 310,15 350,30 C 380,42 400,58 410,80 C 420,105 415,135 408,165 C 400,200 385,240 370,275 C 355,310 340,340 315,360 C 290,378 260,385 230,375 C 200,365 175,345 150,330 C 120,310 95,300 75,285 C 55,270 35,255 25,235 C 18,218 16,200 20,180 Z";

// Map station name to destination slug
const stationToDestinationSlug: Record<string, string> = {
  "Cancún": "cancun",
  "Cancún Aeropuerto": "cancun",
  "Tulum": "tulum",
  "Tulum Aeropuerto": "tulum",
  "Bacalar": "bacalar",
  "Playa del Carmen": "playa-del-carmen",
  "Mérida": "merida",
  "Mérida-Teya": "merida",
  "Valladolid": "valladolid",
  "Chichén Itzá": "chichen-itza",
  "Izamal": "izamal",
  "San Francisco de Campeche": "campeche-ciudad",
  "Calakmul": "calakmul",
  "Edzná": "edzna",
  "Palenque": "palenque",
};

interface RutaInteractiveMapProps {
  timeline: RouteStop[];
  hoveredStation: string | null;
  onStationHover: (name: string | null) => void;
}

const RutaInteractiveMap = ({ timeline, hoveredStation, onStationHover }: RutaInteractiveMapProps) => {
  const [selectedStation, setSelectedStation] = useState<RouteStop | null>(null);
  const [tooltipStation, setTooltipStation] = useState<RouteStop | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const coords = timeline
    .map((stop) => ({ ...stationCoords[stop.name], stop }))
    .filter((c) => c.x !== undefined);

  // Create dashed path between stations
  const routeSegments: string[] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    routeSegments.push(`M ${coords[i].x},${coords[i].y} L ${coords[i + 1].x},${coords[i + 1].y}`);
  }

  // Sync with external hover
  useEffect(() => {
    if (hoveredStation) {
      const stop = timeline.find((s) => s.name === hoveredStation);
      const coord = stationCoords[hoveredStation];
      if (stop && coord) {
        setTooltipStation(stop);
        setTooltipPos({ x: coord.x, y: coord.y });
      }
    } else {
      setTooltipStation(null);
    }
  }, [hoveredStation, timeline]);

  if (coords.length < 2) return null;

  const handleMarkerHover = (stop: RouteStop, x: number, y: number) => {
    setTooltipStation(stop);
    setTooltipPos({ x, y });
    onStationHover(stop.name);
  };

  const handleMarkerLeave = () => {
    setTooltipStation(null);
    onStationHover(null);
  };

  const handleMarkerClick = (stop: RouteStop) => {
    setSelectedStation(stop);
  };

  const getDestinationInfo = (stationName: string) => {
    const slug = stationToDestinationSlug[stationName];
    if (!slug) return null;
    const dest = destinations.find((d) => d.slug === slug);
    const image = destinationImageMap[slug];
    return dest ? { ...dest, image } : null;
  };


  const mapContent = (
    <div className="relative">
      {/* Zoom controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.25, 2))}
          className="p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-secondary transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} className="text-foreground" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
          className="p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-secondary transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} className="text-foreground" />
        </button>
      </div>

      {/* SVG Map */}
      <div className="overflow-auto max-h-[400px] rounded-lg">
        <svg
          viewBox="0 0 460 420"
          className="w-full h-auto transition-transform duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
        >
          {/* Water */}
          <rect width="460" height="420" fill="hsl(200, 30%, 92%)" rx="8" />
          {/* Landmass */}
          <path d={coastlinePath} fill="hsl(38, 30%, 93%)" stroke="hsl(38, 20%, 78%)" strokeWidth="1" />

          {/* Full route ghost */}
          <path
            d="M 72,290 L 80,252 L 112,222 L 132,206 L 138,194 L 140,168 L 168,124 L 178,110 L 200,82 L 234,100 L 260,106 L 292,100 L 372,74 L 365,98 L 358,118 L 350,150 L 340,198 L 310,228 L 308,248 L 310,268"
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            opacity="0.15"
            strokeDasharray="4 3"
          />

          {/* Dashed route segments */}
          {routeSegments.map((segment, i) => (
            <motion.path
              key={i}
              d={segment}
              fill="none"
              stroke="#2D4A3E"
              strokeWidth="3"
              strokeDasharray="8 4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            />
          ))}

          {/* Station markers */}
          {coords.map((c, i) => {
            const isTerminal = c.stop.isOrigin || c.stop.isDestination;
            const isHovered = hoveredStation === c.stop.name || tooltipStation?.name === c.stop.name;
            const radius = isTerminal ? 6 : 4;
            const fillColor = isTerminal ? "#D4A853" : "#2D4A3E";

            return (
              <g key={i}>
                {/* Hover ring */}
                {isHovered && (
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={radius + 6}
                    fill="none"
                    stroke={fillColor}
                    strokeWidth="2"
                    opacity="0.4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered ? radius + 2 : radius}
                  fill={fillColor}
                  stroke="white"
                  strokeWidth={isTerminal ? 2 : 1.5}
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onMouseEnter={() => handleMarkerHover(c.stop, c.x, c.y)}
                  onMouseLeave={handleMarkerLeave}
                  onClick={() => handleMarkerClick(c.stop)}
                  style={{ pointerEvents: "all" }}
                />
                {/* Labels for terminals */}
                {isTerminal && (
                  <text
                    x={c.x + (c.x > 300 ? -10 : 10)}
                    y={c.y - 10}
                    textAnchor={c.x > 300 ? "end" : "start"}
                    className="fill-foreground text-[9px] font-heading font-semibold pointer-events-none"
                  >
                    {c.stop.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipStation && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${(tooltipPos.x / 460) * 100}%`,
              top: `${(tooltipPos.y / 420) * 100 - 5}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-card border border-border rounded-lg shadow-lg p-3 min-w-[160px]">
              <p className="font-heading font-bold text-foreground text-sm">{tooltipStation.name}</p>
              <p className="text-xs text-primary font-mono mt-1">{tooltipStation.time}</p>
              {tooltipStation.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tooltipStation.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side panel for selected station */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 right-0 w-64 bg-card border border-border rounded-lg shadow-xl z-30 overflow-hidden"
          >
            <button
              onClick={() => setSelectedStation(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-secondary/80 hover:bg-secondary transition-colors z-10"
            >
              <X size={14} className="text-muted-foreground" />
            </button>

            {(() => {
              const destInfo = getDestinationInfo(selectedStation.name);
              return (
                <>
                  {destInfo?.image && (
                    <div className="h-28 overflow-hidden">
                      <img
                        src={destInfo.image}
                        alt={selectedStation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-xs text-primary font-mono">{selectedStation.time}</p>
                    <h4 className="font-heading font-bold text-foreground mt-1">{selectedStation.name}</h4>
                    {selectedStation.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedStation.highlights.map((h) => (
                          <span key={h} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                    {destInfo && (
                      <>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{destInfo.description}</p>
                        <Link
                          to={`/destinos/${destInfo.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline"
                        >
                          Ver destino <ExternalLink size={12} />
                        </Link>
                      </>
                    )}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:block sticky top-28">
        <EstelaCard className="p-4 md:p-6" variant="gold">
          <div className="text-center mb-3">
            <p className="section-label mb-1">Tramo</p>
            <h3 className="font-heading text-lg font-bold text-foreground">Mapa de la ruta</h3>
            <p className="text-xs text-muted-foreground mt-1">Haz clic en una estación para ver detalles</p>
          </div>
          {mapContent}
        </EstelaCard>
      </div>

      {/* Mobile version (collapsible) */}
      <div className="lg:hidden mt-6">
        <div className="relative">
          <EstelaCard
            className={`overflow-hidden transition-all duration-300 ${
              isMobileExpanded ? "max-h-[500px]" : "max-h-[200px]"
            }`}
            variant="gold"
          >
            {!isMobileExpanded && (
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent z-10 pointer-events-none" />
            )}
            <div className="p-4">
              <div className="text-center mb-3">
                <h3 className="font-heading text-base font-bold text-foreground">Mapa de la ruta</h3>
              </div>
              {mapContent}
            </div>
          </EstelaCard>
          
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 bg-secondary/80 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <MapPin size={16} className="text-primary" />
            {isMobileExpanded ? "Ocultar mapa" : "Ver mapa completo"}
            <ChevronDown
              size={16}
              className={`text-muted-foreground transition-transform ${isMobileExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default RutaInteractiveMap;
