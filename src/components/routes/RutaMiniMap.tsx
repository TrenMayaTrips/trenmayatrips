import { motion } from "framer-motion";
import EstelaCard from "@/components/maya/EstelaCard";

// Reuse same coordinates as TrenMayaRouteMap
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
};

const coastlinePath =
  "M 20,180 C 30,140 60,100 100,60 C 140,30 180,18 220,12 C 260,8 310,15 350,30 C 380,42 400,58 410,80 C 420,105 415,135 408,165 C 400,200 385,240 370,275 C 355,310 340,340 315,360 C 290,378 260,385 230,375 C 200,365 175,345 150,330 C 120,310 95,300 75,285 C 55,270 35,255 25,235 C 18,218 16,200 20,180 Z";

interface RutaMiniMapProps {
  stopNames: string[];
}

const RutaMiniMap = ({ stopNames }: RutaMiniMapProps) => {
  const coords = stopNames
    .map((name) => stationCoords[name])
    .filter(Boolean);

  if (coords.length < 2) return null;

  const routePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x},${c.y}`)
    .join(" ");

  return (
    <EstelaCard className="p-4 md:p-6" variant="gold">
      <div className="text-center mb-3">
        <p className="text-accent font-medium tracking-widest uppercase text-xs mb-1">
          Tramo
        </p>
        <h3 className="font-heading text-lg font-bold text-foreground">
          Mapa de la ruta
        </h3>
      </div>
      <div className="max-w-sm mx-auto">
        <svg viewBox="0 0 460 420" className="w-full h-auto">
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

          {/* Highlighted route segment */}
          <motion.path
            d={routePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Stop dots */}
          {coords.map((c, i) => {
            const isTerminal = i === 0 || i === coords.length - 1;
            return (
              <motion.circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={isTerminal ? 5 : 3}
                fill={isTerminal ? "hsl(var(--primary))" : "white"}
                stroke="hsl(var(--primary))"
                strokeWidth={isTerminal ? 2 : 1.5}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
            );
          })}

          {/* Labels for origin & destination */}
          {[coords[0], coords[coords.length - 1]].map((c, i) => (
            <text
              key={i}
              x={c.x + (c.x > 300 ? -10 : 10)}
              y={c.y - 8}
              textAnchor={c.x > 300 ? "end" : "start"}
              className="fill-foreground text-[9px] font-heading font-semibold"
            >
              {stopNames[i === 0 ? 0 : stopNames.length - 1]}
            </text>
          ))}
        </svg>
      </div>
    </EstelaCard>
  );
};

export default RutaMiniMap;
