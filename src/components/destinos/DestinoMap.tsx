import { motion } from "framer-motion";

// Same coords as PeninsulaMap
const destinationCoords: Record<string, { x: number; y: number }> = {
  cancun: { x: 370, y: 72 },
  "playa-del-carmen": { x: 358, y: 112 },
  tulum: { x: 350, y: 148 },
  bacalar: { x: 322, y: 248 },
  merida: { x: 200, y: 82 },
  valladolid: { x: 290, y: 100 },
  "chichen-itza": { x: 258, y: 108 },
  izamal: { x: 232, y: 100 },
  "campeche-ciudad": { x: 140, y: 170 },
  calakmul: { x: 215, y: 282 },
  edzna: { x: 148, y: 200 },
  villahermosa: { x: 60, y: 240 },
  comalcalco: { x: 42, y: 215 },
  palenque: { x: 92, y: 290 },
  "san-cristobal": { x: 52, y: 360 },
  "cascadas-agua-azul": { x: 78, y: 320 },
};

const coastlinePath =
  "M 20,180 C 30,140 60,100 100,60 C 140,30 180,18 220,12 C 260,8 310,15 350,30 C 380,42 400,58 410,80 C 420,105 415,135 408,165 C 400,200 385,240 370,275 C 355,310 340,340 315,360 C 290,378 260,385 230,375 C 200,365 175,345 150,330 C 120,310 95,300 75,285 C 55,270 35,255 25,235 C 18,218 16,200 20,180 Z";

interface DestinoMapProps {
  slug: string;
  name: string;
  nearestStation: string;
}

const DestinoMap = ({ slug, name, nearestStation }: DestinoMapProps) => {
  const coords = destinationCoords[slug];
  if (!coords) return null;

  return (
    <section className="py-10 md:py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Ubicación</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            ¿Dónde está {name}?
          </h2>
        </div>

        <div className="max-w-sm mx-auto">
          <svg viewBox="0 0 460 420" className="w-full h-auto" role="img" aria-label={`Ubicación de ${name}`}>
            <defs>
              <filter id="dest-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="dest-land" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(38, 30%, 93%)" />
                <stop offset="100%" stopColor="hsl(38, 20%, 88%)" />
              </linearGradient>
            </defs>

            <rect width="460" height="420" fill="hsl(200, 30%, 92%)" rx="12" />

            <path d={coastlinePath} fill="url(#dest-land)" stroke="hsl(38, 20%, 78%)" strokeWidth="1.5" />

            {/* All dots muted */}
            {Object.entries(destinationCoords).map(([s, { x, y }]) =>
              s !== slug ? (
                <circle key={s} cx={x} cy={y} r="2.5" fill="hsl(160, 35%, 30%)" opacity={0.15} />
              ) : null
            )}

            {/* Highlighted destination */}
            <motion.circle
              cx={coords.x}
              cy={coords.y}
              r="12"
              fill="none"
              stroke="hsl(40, 65%, 55%)"
              strokeWidth="1.5"
              initial={{ r: 6, opacity: 0.8 }}
              animate={{ r: 18, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <circle
              cx={coords.x}
              cy={coords.y}
              r="7"
              fill="hsl(160, 45%, 36%)"
              stroke="white"
              strokeWidth="2.5"
              filter="url(#dest-glow)"
            />

            {/* Label */}
            <text
              x={coords.x + (coords.x > 250 ? -14 : 14)}
              y={coords.y - 14}
              textAnchor={coords.x > 250 ? "end" : "start"}
              className="fill-foreground text-[11px] font-heading font-bold"
            >
              📍 {name}
            </text>
            <text
              x={coords.x + (coords.x > 250 ? -14 : 14)}
              y={coords.y + 22}
              textAnchor={coords.x > 250 ? "end" : "start"}
              className="fill-muted-foreground text-[9px] font-body"
            >
              🚂 Est. {nearestStation}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DestinoMap;
