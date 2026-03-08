import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { stations, Station } from "@/data/stations";
import { stationDetails } from "@/data/station-details";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── SVG coordinates for each station ── */
const stationCoords: Record<string, { x: number; y: number }> = {
  "Palenque": { x: 72, y: 290 },
  "Boca del Cerro": { x: 65, y: 270 },
  "Tenosique": { x: 80, y: 252 },
  "El Triunfo": { x: 96, y: 238 },
  "Candelaria": { x: 112, y: 222 },
  "Escárcega": { x: 132, y: 206 },
  "Centenario": { x: 148, y: 218 },
  "Calakmul": { x: 200, y: 280 },
  "Xpujil": { x: 225, y: 274 },
  "Nicolás Bravo": { x: 260, y: 264 },
  "Chetumal": { x: 310, y: 268 },
  "Bacalar": { x: 308, y: 248 },
  "Limones-Chacchoben": { x: 310, y: 228 },
  "Felipe Carrillo Puerto": { x: 340, y: 198 },
  "Tulum Aeropuerto": { x: 348, y: 162 },
  "Tulum": { x: 350, y: 150 },
  "Playa del Carmen": { x: 358, y: 118 },
  "Puerto Morelos": { x: 365, y: 98 },
  "Cancún": { x: 372, y: 74 },
  "Leona Vicario": { x: 348, y: 88 },
  "Nuevo Xcán": { x: 322, y: 96 },
  "Valladolid": { x: 292, y: 100 },
  "Chichén Itzá": { x: 260, y: 106 },
  "Izamal": { x: 234, y: 100 },
  "Tixkokob": { x: 218, y: 92 },
  "Mérida-Teya": { x: 200, y: 82 },
  "Umán": { x: 190, y: 96 },
  "Maxcanú": { x: 178, y: 110 },
  "Calkiní": { x: 168, y: 124 },
  "Hecelchakán": { x: 160, y: 138 },
  "Tenabo": { x: 152, y: 152 },
  "San Francisco de Campeche": { x: 140, y: 168 },
  "Edzná": { x: 138, y: 194 },
  "Carrillo Puerto": { x: 134, y: 206 },
};

/* ── State colors matching the Destinos timeline palette ── */
const stateColors: Record<string, string> = {
  chiapas: "hsl(153, 43%, 30%)",
  tabasco: "hsl(12, 60%, 50%)",
  campeche: "hsl(36, 55%, 52%)",
  "quintana-roo": "hsl(170, 40%, 36%)",
  yucatan: "hsl(45, 70%, 50%)",
};

const stateColorHex: Record<string, string> = {
  chiapas: "#2D6A4F",
  tabasco: "#C65D3A",
  campeche: "#C49A3C",
  "quintana-roo": "#37877A",
  yucatan: "#D4A520",
};

const coastlinePath =
  "M 20,180 C 30,140 60,100 100,60 C 140,30 180,18 220,12 C 260,8 310,15 350,30 C 380,42 400,58 410,80 C 420,105 415,135 408,165 C 400,200 385,240 370,275 C 355,310 340,340 315,360 C 290,378 260,385 230,375 C 200,365 175,345 150,330 C 120,310 95,300 75,285 C 55,270 35,255 25,235 C 18,218 16,200 20,180 Z";

/* ── Build colored route segments by state ── */
function buildSegments() {
  const segments: { path: string; color: string }[] = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const a = stationCoords[stations[i].name];
    const b = stationCoords[stations[i + 1].name];
    if (!a || !b) continue;
    segments.push({
      path: `M ${a.x},${a.y} L ${b.x},${b.y}`,
      color: stateColorHex[stations[i].stateKey] || "#2D6A4F",
    });
  }
  return segments;
}
const routeSegments = buildSegments();

const stationSlugMap: Record<string, string> = Object.fromEntries(
  stationDetails.map((sd) => [sd.name, sd.slug])
);

const typeLabel: Record<string, string> = {
  principal: "Estación principal",
  estacion: "Estación",
  paradero: "Paradero",
};

/* ── Tooltip state ── */
interface TooltipState {
  station: Station;
  x: number;
  y: number;
}

const TrenMayaRouteMap = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  /* ── Pinch zoom state ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const lastDist = useRef<number | null>(null);
  const lastCenter = useRef<{ x: number; y: number } | null>(null);
  const lastTranslate = useRef({ x: 0, y: 0 });

  const getDistance = (t1: React.Touch, t2: React.Touch) =>
    Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  const getCenter = (t1: React.Touch, t2: React.Touch) => ({
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastDist.current = getDistance(e.touches[0], e.touches[1]);
      lastCenter.current = getCenter(e.touches[0], e.touches[1]);
      lastTranslate.current = { ...translate };
    }
  }, [translate]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastDist.current !== null && lastCenter.current !== null) {
      e.preventDefault();
      const dist = getDistance(e.touches[0], e.touches[1]);
      const center = getCenter(e.touches[0], e.touches[1]);
      const newScale = Math.min(3, Math.max(1, scale * (dist / lastDist.current)));
      const dx = center.x - lastCenter.current.x;
      const dy = center.y - lastCenter.current.y;
      setScale(newScale);
      setTranslate({
        x: lastTranslate.current.x + dx,
        y: lastTranslate.current.y + dy,
      });
    }
  }, [scale]);

  const handleTouchEnd = useCallback(() => {
    lastDist.current = null;
    lastCenter.current = null;
    if (scale <= 1.05) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  }, [scale]);

  const handleStationInteraction = (station: Station, coords: { x: number; y: number }) => {
    if (isMobile) {
      // On mobile tap: show tooltip, second tap navigates
      if (tooltip?.station.name === station.name) {
        const slug = stationSlugMap[station.name];
        if (slug) navigate(`/tren-maya/estaciones/${slug}`);
        setTooltip(null);
      } else {
        setTooltip({ station, x: coords.x, y: coords.y });
      }
    } else {
      const slug = stationSlugMap[station.name];
      if (slug) navigate(`/tren-maya/estaciones/${slug}`);
    }
  };

  const handleStationHover = (station: Station, coords: { x: number; y: number }) => {
    if (!isMobile) {
      setTooltip({ station, x: coords.x, y: coords.y });
    }
  };

  // Tooltip positioning
  const tooltipX = tooltip ? (tooltip.x > 280 ? tooltip.x - 135 : tooltip.x + 12) : 0;
  const tooltipY = tooltip ? (tooltip.y > 300 ? tooltip.y - 80 : tooltip.y - 20) : 0;

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto touch-pan-x touch-pan-y"
      style={{ maxWidth: "900px" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Zoom hint on mobile */}
      {isMobile && (
        <p className="text-center text-xs text-muted-foreground mb-2">
          Pellizca para hacer zoom · Toca una estación para ver detalles
        </p>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 460 420"
        className="w-full h-auto"
        role="img"
        aria-label="Mapa interactivo de la ruta del Tren Maya con todas las estaciones"
        style={{
          transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
          transformOrigin: "center center",
          transition: scale === 1 ? "transform 0.3s ease" : undefined,
        }}
        onMouseLeave={() => !isMobile && setTooltip(null)}
      >
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

        {/* Train route segments colored by state */}
        {routeSegments.map((seg, i) => (
          <motion.path
            key={i}
            d={seg.path}
            fill="none"
            stroke={seg.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.75}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.15, ease: "easeInOut" }}
          />
        ))}

        {/* Station dots */}
        {stations.map((station, i) => {
          const coords = stationCoords[station.name];
          if (!coords) return null;
          const isPrincipal = station.type === "principal";
          const isEstacion = station.type === "estacion";
          const r = isPrincipal ? 5.5 : isEstacion ? 3.5 : 2.5;
          const color = stateColorHex[station.stateKey] || "#2D6A4F";
          const isHovered = tooltip?.station.name === station.name;
          const hasDetail = !!stationSlugMap[station.name];

          return (
            <motion.g
              key={station.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.03, duration: 0.25, type: "spring" }}
              className={hasDetail ? "cursor-pointer" : "cursor-default"}
              onClick={() => handleStationInteraction(station, coords)}
              onMouseEnter={() => handleStationHover(station, coords)}
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

              {/* Hover ring */}
              {isHovered && (
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={r + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  strokeOpacity={0.5}
                />
              )}

              <circle
                cx={coords.x}
                cy={coords.y}
                r={isHovered ? r + 1 : r}
                fill={isPrincipal ? color : "white"}
                stroke={color}
                strokeWidth={isPrincipal ? 2 : 1.5}
                filter={isPrincipal ? "url(#station-glow)" : undefined}
                style={{ transition: "r 0.15s ease" }}
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
          );
        })}

        {/* SVG Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltipX}
              y={tooltipY}
              width="130"
              height="70"
              rx="6"
              fill="hsl(0, 0%, 100%)"
              stroke="hsl(38, 20%, 82%)"
              strokeWidth="1"
              filter="url(#station-glow)"
              opacity={0.97}
            />
            <text x={tooltipX + 8} y={tooltipY + 16} className="text-[9px] font-heading font-bold fill-foreground">
              {tooltip.station.name}
            </text>
            <text x={tooltipX + 8} y={tooltipY + 28} className="text-[7px] fill-muted-foreground font-body">
              {typeLabel[tooltip.station.type]} · {tooltip.station.state}
            </text>
            <text x={tooltipX + 8} y={tooltipY + 39} className="text-[7px] fill-muted-foreground font-body">
              km {tooltip.station.km}
            </text>
            {tooltip.station.highlights.length > 0 && (
              <text x={tooltipX + 8} y={tooltipY + 52} className="text-[6.5px] fill-foreground/70 font-body">
                {tooltip.station.highlights.slice(0, 3).join(" · ")}
              </text>
            )}
            {stationSlugMap[tooltip.station.name] && (
              <text x={tooltipX + 8} y={tooltipY + 64} className="text-[6.5px] font-body" fill="hsl(160, 43%, 30%)">
                {isMobile ? "Toca de nuevo para ver →" : "Click para ver →"}
              </text>
            )}
          </g>
        )}

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
          {/* State color legend */}
          <g transform="translate(0, 28)">
            {Object.entries({ chiapas: "Chiapas", tabasco: "Tabasco", campeche: "Campeche", "quintana-roo": "Q. Roo", yucatan: "Yucatán" }).map(([key, label], i) => (
              <g key={key} transform={`translate(${i * 72}, 0)`}>
                <rect x="0" y="-4" width="10" height="4" rx="1" fill={stateColorHex[key]} />
                <text x="13" y="0" className="fill-muted-foreground text-[6px] font-body">{label}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Reset zoom button */}
      {scale > 1.1 && (
        <button
          onClick={() => { setScale(1); setTranslate({ x: 0, y: 0 }); }}
          className="mt-2 mx-auto block text-xs text-muted-foreground underline"
        >
          Restablecer zoom
        </button>
      )}
    </div>
  );
};

export default TrenMayaRouteMap;
