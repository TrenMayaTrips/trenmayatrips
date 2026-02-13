import { motion } from "framer-motion";
import { stations, Station } from "@/data/stations";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

// SVG coordinates for each station on a stylized Yucatan Peninsula map
// viewBox is 0 0 500 450
const stationCoords: Record<string, { x: number; y: number }> = {
  // Tramo 1: Palenque – Escárcega
  "Palenque": { x: 72, y: 290 },
  "Boca del Cerro": { x: 65, y: 270 },
  "Tenosique": { x: 80, y: 252 },
  "El Triunfo": { x: 96, y: 238 },
  "Candelaria": { x: 112, y: 222 },
  "Escárcega": { x: 132, y: 206 },

  // Tramo 2: ramal sur (Escárcega → Calakmul → Chetumal)
  "Centenario": { x: 148, y: 218 },
  "Calakmul": { x: 200, y: 280 },
  "Xpujil": { x: 225, y: 274 },
  "Nicolás Bravo": { x: 260, y: 264 },
  "Chetumal": { x: 310, y: 268 },

  // Tramo 3: Chetumal – Cancún (costa caribe)
  "Bacalar": { x: 308, y: 248 },
  "Limones-Chacchoben": { x: 310, y: 228 },
  "Felipe Carrillo Puerto": { x: 340, y: 198 },
  "Tulum Aeropuerto": { x: 348, y: 162 },
  "Tulum": { x: 350, y: 150 },
  "Playa del Carmen": { x: 358, y: 118 },
  "Puerto Morelos": { x: 365, y: 98 },
  "Cancún": { x: 372, y: 74 },

  // Tramo 4: Cancún – Mérida (interior)
  "Leona Vicario": { x: 348, y: 88 },
  "Nuevo Xcán": { x: 322, y: 96 },
  "Valladolid": { x: 292, y: 100 },
  "Chichén Itzá": { x: 260, y: 106 },
  "Izamal": { x: 234, y: 100 },
  "Tixkokob": { x: 218, y: 92 },
  "Mérida-Teya": { x: 200, y: 82 },

  // Tramo 5: Mérida – Campeche – Escárcega
  "Umán": { x: 190, y: 96 },
  "Maxcanú": { x: 178, y: 110 },
  "Calkiní": { x: 168, y: 124 },
  "Hecelchakán": { x: 160, y: 138 },
  "Tenabo": { x: 152, y: 152 },
  "San Francisco de Campeche": { x: 140, y: 168 },
  "Edzná": { x: 138, y: 194 },
  "Carrillo Puerto": { x: 134, y: 206 },
};

const stateColors: Record<string, string> = {
  chiapas: "hsl(160, 35%, 30%)",
  tabasco: "hsl(12, 60%, 50%)",
  campeche: "hsl(40, 65%, 55%)",
  "quintana-roo": "hsl(160, 35%, 35%)",
  yucatan: "hsl(45, 70%, 55%)",
};

// Simplified peninsula coastline
const coastlinePath =
  "M 20,180 C 30,140 60,100 100,60 C 140,30 180,18 220,12 C 260,8 310,15 350,30 C 380,42 400,58 410,80 C 420,105 415,135 408,165 C 400,200 385,240 370,275 C 355,310 340,340 315,360 C 290,378 260,385 230,375 C 200,365 175,345 150,330 C 120,310 95,300 75,285 C 55,270 35,255 25,235 C 18,218 16,200 20,180 Z";

// Build the route path connecting all stations in order
const routeSegments = stations
  .map((s) => stationCoords[s.name])
  .filter(Boolean);

const routePath = routeSegments
  .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x},${c.y}`)
  .join(" ");

const TrenMayaRouteMap = () => {
  return (
    <TooltipProvider>
      <div className="w-full max-w-lg mx-auto">
        <svg viewBox="0 0 460 420" className="w-full h-auto" role="img" aria-label="Mapa de la ruta del Tren Maya con todas las estaciones">
          <defs>
            <filter id="station-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(38, 30%, 93%)" />
              <stop offset="100%" stopColor="hsl(38, 20%, 88%)" />
            </linearGradient>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(160, 35%, 30%)" />
              <stop offset="100%" stopColor="hsl(160, 30%, 42%)" />
            </linearGradient>
          </defs>

          {/* Water background */}
          <rect width="460" height="420" fill="hsl(200, 30%, 92%)" rx="12" />

          {/* Peninsula landmass */}
          <motion.path
            d={coastlinePath}
            fill="url(#land-gradient)"
            stroke="hsl(38, 20%, 78%)"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* State labels */}
          <text x="78" y="306" className="fill-muted-foreground/40 text-[8px] font-body" textAnchor="middle">CHIAPAS</text>
          <text x="85" y="240" className="fill-muted-foreground/40 text-[8px] font-body" textAnchor="middle">TABASCO</text>
          <text x="168" y="240" className="fill-muted-foreground/40 text-[8px] font-body" textAnchor="middle">CAMPECHE</text>
          <text x="240" y="68" className="fill-muted-foreground/40 text-[8px] font-body" textAnchor="middle">YUCATÁN</text>
          <text x="358" y="200" className="fill-muted-foreground/40 text-[8px] font-body" textAnchor="middle">Q. ROO</text>

          {/* Train route line */}
          <motion.path
            d={routePath}
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />

          {/* Station dots */}
          {stations.map((station, i) => {
            const coords = stationCoords[station.name];
            if (!coords) return null;
            const isPrincipal = station.type === "principal";
            const isEstacion = station.type === "estacion";
            const r = isPrincipal ? 5 : isEstacion ? 3.5 : 2.5;
            const color = stateColors[station.stateKey] || "hsl(160, 35%, 35%)";

            return (
              <Tooltip key={station.name}>
                <TooltipTrigger asChild>
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.04, duration: 0.3, type: "spring" }}
                    className="cursor-pointer"
                  >
                    {/* Pulse for principal stations */}
                    {isPrincipal && (
                      <motion.circle
                        cx={coords.x}
                        cy={coords.y}
                        r="8"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        initial={{ r: 5, opacity: 0.6 }}
                        animate={{ r: 12, opacity: 0 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={r}
                      fill={isPrincipal ? color : "white"}
                      stroke={color}
                      strokeWidth={isPrincipal ? 2 : 1.5}
                      filter={isPrincipal ? "url(#station-glow)" : undefined}
                    />
                    {/* Label for principal stations */}
                    {isPrincipal && (
                      <text
                        x={coords.x + (coords.x > 300 ? -10 : 10)}
                        y={coords.y - 8}
                        textAnchor={coords.x > 300 ? "end" : "start"}
                        className="fill-foreground text-[8px] font-heading font-semibold"
                      >
                        {station.name}
                      </text>
                    )}
                  </motion.g>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm">{station.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {station.state} · km {station.km} ·{" "}
                      {station.type === "principal" ? "Estación principal" : station.type === "estacion" ? "Estación" : "Paradero"}
                    </p>
                    {station.highlights.length > 0 && (
                      <p className="text-xs">{station.highlights.join(", ")}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Map legend */}
          <g transform="translate(12, 370)">
            <text className="fill-foreground/60 text-[8px] font-heading font-semibold tracking-wide">🚂 RUTA DEL TREN MAYA</text>
            <g transform="translate(0, 14)">
              <circle cx="4" cy="0" r="4" fill="hsl(160, 35%, 35%)" stroke="white" strokeWidth="1.5" />
              <text x="12" y="3" className="fill-muted-foreground text-[7px] font-body">Principal</text>
              <circle cx="62" cy="0" r="3" fill="white" stroke="hsl(160, 35%, 35%)" strokeWidth="1.5" />
              <text x="69" y="3" className="fill-muted-foreground text-[7px] font-body">Estación</text>
              <circle cx="118" cy="0" r="2" fill="white" stroke="hsl(160, 35%, 35%)" strokeWidth="1" />
              <text x="124" y="3" className="fill-muted-foreground text-[7px] font-body">Paradero</text>
            </g>
          </g>
        </svg>
      </div>
    </TooltipProvider>
  );
};

export default TrenMayaRouteMap;
