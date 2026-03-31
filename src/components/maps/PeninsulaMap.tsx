import { motion } from "framer-motion";
import { useDestinations, destinationTypes } from "@/hooks/useDestinations";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

// Approximate SVG coordinates for destinations on a stylized Yucatan Peninsula map
// viewBox is 0 0 500 450
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

// Simplified Tren Maya route path connecting major stations
const routePath =
  "M 92,290 C 80,260 55,248 60,240 L 42,215 L 60,240 L 140,170 L 148,200 L 140,170 L 200,82 L 232,100 L 258,108 L 290,100 L 370,72 L 358,112 L 350,148 L 322,248 L 280,300 L 215,282 L 170,310 L 92,290";

// Simplified peninsula coastline
const coastlinePath =
  "M 20,180 C 30,140 60,100 100,60 C 140,30 180,18 220,12 C 260,8 310,15 350,30 C 380,42 400,58 410,80 C 420,105 415,135 408,165 C 400,200 385,240 370,275 C 355,310 340,340 315,360 C 290,378 260,385 230,375 C 200,365 175,345 150,330 C 120,310 95,300 75,285 C 55,270 35,255 25,235 C 18,218 16,200 20,180 Z";

interface PeninsulaMapProps {
  highlightedSlugs: string[];
}

const PeninsulaMap = ({ highlightedSlugs }: PeninsulaMapProps) => {
  // Build a path connecting only the highlighted destinations in order
  const highlightedPath = highlightedSlugs
    .map((slug) => destinationCoords[slug])
    .filter(Boolean)
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x},${c.y}`)
    .join(" ");

  return (
    <TooltipProvider>
      <div className="w-full max-w-md mx-auto">
        <svg viewBox="0 0 460 420" className="w-full h-auto" role="img" aria-label="Mapa del Tren Maya">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 35%, 30%)" />
            <stop offset="100%" stopColor="hsl(160, 30%, 42%)" />
          </linearGradient>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(38, 30%, 93%)" />
            <stop offset="100%" stopColor="hsl(38, 20%, 88%)" />
          </linearGradient>
        </defs>

        {/* Water background */}
        <rect width="460" height="420" fill="hsl(200, 30%, 92%)" rx="12" />

        {/* Peninsula landmass */}
        <motion.path
          d={coastlinePath}
          fill="url(#landGradient)"
          stroke="hsl(38, 20%, 78%)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* State labels */}
        <text x="80" y="310" className="fill-muted-foreground/40 text-[9px] font-body" textAnchor="middle">
          CHIAPAS
        </text>
        <text x="60" y="230" className="fill-muted-foreground/40 text-[9px] font-body" textAnchor="middle">
          TABASCO
        </text>
        <text x="165" y="225" className="fill-muted-foreground/40 text-[9px] font-body" textAnchor="middle">
          CAMPECHE
        </text>
        <text x="240" y="70" className="fill-muted-foreground/40 text-[9px] font-body" textAnchor="middle">
          YUCATÁN
        </text>
        <text x="360" y="200" className="fill-muted-foreground/40 text-[9px] font-body" textAnchor="middle">
          Q. ROO
        </text>

        {/* Train route */}
        <motion.path
          d={routePath}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Animated itinerary path connecting selected destinations */}
        {highlightedPath && highlightedSlugs.length > 1 && (
          <motion.path
            d={highlightedPath}
            fill="none"
            stroke="hsl(40, 65%, 55%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
          />
        )}

        {/* All destination dots (muted) */}
        {Object.entries(destinationCoords).map(([slug, { x, y }]) => {
          const isHighlighted = highlightedSlugs.includes(slug);
          if (isHighlighted) return null; // render highlighted ones on top
          return (
            <circle
              key={slug}
              cx={x}
              cy={y}
              r="3"
              fill="hsl(160, 35%, 30%)"
              opacity={0.2}
            />
          );
        })}

        {/* Highlighted destinations */}
         {highlightedSlugs.map((slug, i) => {
           const coords = destinationCoords[slug];
           if (!coords) return null;
           const dest = destinations.find((d) => d.slug === slug);
           if (!dest) return null;

           return (
             <Tooltip key={slug}>
               <TooltipTrigger asChild>
                 <motion.g
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.8 + i * 0.15, duration: 0.4, type: "spring" }}
                   className="cursor-pointer"
                 >
                   {/* Pulse ring */}
                   <motion.circle
                     cx={coords.x}
                     cy={coords.y}
                     r="10"
                     fill="none"
                     stroke="hsl(40, 65%, 55%)"
                     strokeWidth="1.5"
                     initial={{ r: 5, opacity: 0.8 }}
                     animate={{ r: 14, opacity: 0 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                   />
                   {/* Dot */}
                   <circle
                     cx={coords.x}
                     cy={coords.y}
                     r="5"
                     fill="hsl(40, 65%, 55%)"
                     stroke="white"
                     strokeWidth="2"
                     filter="url(#glow)"
                   />
                   {/* Order number */}
                   <text
                     x={coords.x}
                     y={coords.y + 1}
                     textAnchor="middle"
                     dominantBaseline="middle"
                     className="fill-accent-foreground text-[7px] font-bold font-body"
                   >
                     {i + 1}
                   </text>
                   {/* Label */}
                   <text
                     x={coords.x + (coords.x > 300 ? -12 : 12)}
                     y={coords.y - 10}
                     textAnchor={coords.x > 300 ? "end" : "start"}
                     className="fill-foreground text-[9px] font-heading font-semibold"
                   >
                     {dest.name}
                   </text>
                 </motion.g>
               </TooltipTrigger>
               <TooltipContent className="max-w-xs">
                 <div className="space-y-1">
                   <p className="font-semibold">{dest.name}</p>
                   <p className="text-xs text-muted-foreground">{dest.tagline}</p>
                   <p className="text-xs">{destinationTypes[dest.type]}</p>
                 </div>
               </TooltipContent>
             </Tooltip>
           );
         })}

        {/* Map title */}
        <text x="16" y="24" className="fill-foreground/60 text-[10px] font-heading font-semibold tracking-wide">
          🚂 RUTA DEL TREN MAYA
        </text>
        </svg>
      </div>
    </TooltipProvider>
  );
};

export default PeninsulaMap;
