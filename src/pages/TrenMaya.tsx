import { useState, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Train, ArrowRight, ChevronDown, ChevronUp, Check, ArrowLeftRight, Clock, MapPin, TrainFront, Loader2, AlertTriangle } from "lucide-react";
import { findRoute, routes as allRoutes, type Route } from "@/data/routes";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import TrenMayaRouteMap from "@/components/maps/TrenMayaRouteMap";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import EstelaCard from "@/components/maya/EstelaCard";
import { stations, trenMayaStats, wagonClasses } from "@/data/stations";
import { allStationNames } from "@/data/routes";
import { stationDetails } from "@/data/station-details";
import heroTrenMayaPage from "@/assets/hero-tren-maya-page.jpg";
import trenXiinbal from "@/assets/tren-xiinbal-interior.jpg";
import trenJanal from "@/assets/tren-janal-interior.jpg";
import trenPatal from "@/assets/tren-patal-interior.jpg";

const wagonImages = [trenXiinbal, trenJanal, trenPatal];

const stateLabelsMap: Record<string, string> = {
  chiapas: "Chiapas",
  tabasco: "Tabasco",
  campeche: "Campeche",
  "quintana-roo": "Quintana Roo",
  yucatan: "Yucatán",
};

const faqItems = [
  { q: "¿Cómo compro boletos para el Tren Maya?", a: "Puedes solicitar tu cotización directamente con nosotros. En Tren Maya Trips nos encargamos de gestionar tus boletos junto con el circuito turístico completo, sin complicaciones." },
  { q: "¿Puedo llevar equipaje grande?", a: "Sí, cada pasajero puede llevar una maleta de mano y una pieza de equipaje documentado. Las clases Janal y P'atal permiten equipaje adicional. Hay bodega disponible en todos los vagones." },
  { q: "¿Hay descuento para residentes locales?", a: "Sí, residentes de los 5 estados de la ruta (Quintana Roo, Yucatán, Campeche, Chiapas y Tabasco) cuentan con tarifas preferenciales presentando identificación oficial con domicilio." },
  { q: "¿Puedo viajar con mascotas?", a: "Mascotas pequeñas (hasta 10 kg) pueden viajar en transportadora bajo el asiento en clase Xiinbal y Janal. P'atal permite mascotas de hasta 15 kg. Se requiere certificado de salud vigente." },
  { q: "¿Hay accesibilidad para personas con discapacidad?", a: "Todas las estaciones principales cuentan con rampas y elevadores. Los vagones tienen espacios reservados para sillas de ruedas y baños accesibles. Se recomienda solicitar asistencia al reservar." },
  { q: "¿El tren tiene retrasos frecuentes?", a: "El Tren Maya mantiene un 92% de puntualidad. Se recomienda llegar 30 minutos antes de la salida. En caso de retrasos mayores a 1 hora, se ofrece compensación o cambio de horario sin costo." },
  { q: "¿Se puede comer a bordo en todas las clases?", a: "En Xiinbal hay servicio de snacks y bebidas para compra. Janal incluye un snack box regional con tu boleto. P'atal ofrece menú gourmet completo con platillos regionales y bar premium." },
  { q: "¿Hay WiFi en todo el recorrido?", a: "Las clases Janal y P'atal cuentan con Wi-Fi de alta velocidad. Xiinbal tiene servicio limitado. Nota: en tramos de selva densa la señal puede reducirse temporalmente." },
];

const TrenMaya = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("Cancún");
  const [destination, setDestination] = useState("Mérida");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<Route | null>(null);
  const [searchNoResult, setSearchNoResult] = useState<{ transfer: string; estimated: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const stationSlugMap: Record<string, string> = Object.fromEntries(
    stationDetails.map((sd) => [sd.name, sd.slug])
  );

  const stateList = [...new Set(stations.map((s) => s.stateKey))];
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set([stateList[0]]));
  const stateRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const stationsByState = useMemo(() => {
    const map: Record<string, typeof stations> = {};
    for (const s of stations) {
      if (!map[s.stateKey]) map[s.stateKey] = [];
      map[s.stateKey].push(s);
    }
    return map;
  }, []);

  const toggleState = useCallback((key: string) => {
    setExpandedStates(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleStateFilter = useCallback((key: string | null) => {
    setSelectedState(key);
    if (key) {
      setExpandedStates(prev => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      setTimeout(() => {
        stateRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const swapStations = () => {
    setOrigin(destination);
    setDestination(origin);
    setSearchResult(null);
    setSearchNoResult(null);
  };

  // Find a transfer station between two stations that don't have a direct route
  const findTransfer = (o: string, d: string): { transfer: string; estimated: string } => {
    const hubs = ["Cancún", "Mérida", "Tulum", "San Francisco de Campeche", "Escárcega"];
    for (const hub of hubs) {
      if (hub === o || hub === d) continue;
      const leg1 = findRoute(o, hub);
      const leg2 = findRoute(hub, d);
      if (leg1 && leg2) {
        const t1 = parseFloat(leg1.duration);
        const t2 = parseFloat(leg2.duration);
        return { transfer: hub, estimated: `${Math.ceil(t1 + t2 + 0.5)}h aprox.` };
      }
    }
    return { transfer: "Mérida", estimated: "6-8h aprox." };
  };

  const handleSearch = () => {
    if (origin === destination) return;
    setIsSearching(true);
    setSearchResult(null);
    setSearchNoResult(null);

    // Simulate brief loading for UX feedback
    setTimeout(() => {
      const route = findRoute(origin, destination);
      if (route) {
        setSearchResult(route);
        setSearchNoResult(null);
      } else {
        const transfer = findTransfer(origin, destination);
        setSearchNoResult(transfer);
        setSearchResult(null);
      }
      setIsSearching(false);
      // Scroll to result after render
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    }, 600);
  };

  return (
    <PageLayout>
      {/* Hero + Route Finder */}
      <ParallaxHero
        imageSrc={heroTrenMayaPage}
        imageAlt="Tren Maya llegando a estación rodeada de selva tropical"
        className="pt-24 md:pt-32 pb-14 md:pb-20 min-h-[380px] md:min-h-[500px]"
        overlayClass="bg-gradient-to-b from-black/50 via-black/55 to-black/70"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">La guía más completa</p>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            El Tren Maya
          </h1>
          <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Todo lo que necesitas saber para recorrer la Península de Yucatán sobre rieles
          </p>

          {/* Route Finder */}
          <div className="mt-8 bg-card/95 backdrop-blur-md rounded-xl p-4 md:p-6 max-w-2xl mx-auto border border-border shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <label className="text-xs text-muted-foreground font-medium mb-1 block">Origen</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm min-h-[44px]"
                >
                  {allStationNames.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={swapStations}
                className="shrink-0 p-2 rounded-full bg-secondary hover:bg-muted transition-colors mt-4 sm:mt-5"
                aria-label="Invertir estaciones"
              >
                <ArrowLeftRight size={18} className="text-muted-foreground" />
              </button>

              <div className="flex-1 w-full">
                <label className="text-xs text-muted-foreground font-medium mb-1 block">Destino</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm min-h-[44px]"
                >
                  {allStationNames.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching || origin === destination}
                className="w-full sm:w-auto shrink-0 mt-4 sm:mt-5 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors min-h-[44px] text-sm disabled:opacity-50"
              >
                {isSearching ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Buscar"}
              </button>
            </div>

            {/* Search Results */}
            <div ref={resultRef}>
              <AnimatePresence mode="wait">
                {isSearching && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-muted/50 rounded animate-pulse" />
                  </motion.div>
                )}

                {searchResult && !isSearching && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 rounded-lg bg-background/80 border border-border"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-lg font-bold text-foreground">{searchResult.origin}</span>
                          <ArrowRight size={16} className="text-primary" />
                          <span className="font-heading text-lg font-bold text-foreground">{searchResult.destination}</span>
                          <span className="px-2 py-0.5 bg-secondary rounded-full text-xs font-medium text-foreground">
                            {searchResult.badgeEmoji} {searchResult.badge}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock size={14} /> {searchResult.duration}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {searchResult.stops} paradas</span>
                          <span className="flex items-center gap-1"><TrainFront size={14} /> {searchResult.dailyDepartures} trenes diarios</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Desde</span>
                          <span className="ml-1 font-heading text-xl font-bold text-foreground">
                            ${searchResult.prices.xiinbal.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MXN</span>
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/tren-maya/rutas/${searchResult.slug}`}
                        className="shrink-0 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors text-center"
                        style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
                      >
                        Ver horarios y reservar
                      </Link>
                    </div>
                  </motion.div>
                )}

                {searchNoResult && !isSearching && (
                  <motion.div
                    key="no-result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 rounded-lg bg-background/80 border border-accent/30"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} className="text-accent shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          No hay ruta directa entre {origin} y {destination}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Esta ruta requiere transbordo en <strong className="text-foreground">{searchNoResult.transfer}</strong>. Duración estimada: {searchNoResult.estimated}
                        </p>
                        <Link
                          to="/contacto"
                          className="inline-block mt-2 text-sm text-primary font-medium hover:underline"
                        >
                          Contáctanos para armar tu itinerario →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </ParallaxHero>

      {/* Greca divider after hero */}
      <GrecaDivider variant="jade" size="md" />

      {/* Stats */}
      <section className="bg-card border-b border-border relative overflow-hidden">
        <MayaPattern variant="pop" opacity={0.03} />
        <div className="container mx-auto px-4 py-8 md:py-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${trenMayaStats.totalKm.toLocaleString()}`, unit: "km", label: "De ruta" },
              { value: String(trenMayaStats.stations), unit: "", label: "Estaciones" },
              { value: String(trenMayaStats.states), unit: "", label: "Estados" },
              { value: String(trenMayaStats.wagonTypes), unit: "", label: "Clases" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-heading text-3xl md:text-5xl font-bold text-primary">
                  {stat.value}<span className="text-lg md:text-2xl ml-1 text-muted-foreground">{stat.unit}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Greca divider */}
      <GrecaDivider variant="gold" size="sm" />

      {/* Route Map */}
      <section className="py-12 md:py-20 bg-secondary/50 relative overflow-hidden">
        <MayaPattern variant="greca" opacity={0.03} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <p className="section-label">Mapa de la red</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Recorrido completo del Tren Maya
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">
              Toca cualquier estación para ver detalles
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <TrenMayaRouteMap />
          </div>
        </div>
      </section>

      {/* Greca divider */}
      <GrecaDivider variant="jade" size="lg" />

      {/* Wagon Classes - Pricing Grid with Estela borders */}
      <section className="py-12 md:py-20 bg-background relative overflow-hidden">
        <MayaPattern variant="pop" opacity={0.025} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <p className="section-label">Clases de servicio</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Compara y elige tu experiencia a bordo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {wagonClasses.map((wagon, i) => {
              const isFeatured = i === 1;
              const prices = [890, 1490, 2490];
              return (
                <motion.div
                  key={wagon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <EstelaCard variant={isFeatured ? "gold" : "jade"} className={isFeatured ? "md:-mt-4 md:mb-4" : ""}>
                    <div className={`bg-card rounded-xl overflow-hidden relative ${
                      isFeatured ? "shadow-lg" : ""
                    }`}>
                      {isFeatured && (
                        <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1.5">
                          ⭐ Más popular
                        </div>
                      )}
                      <div className="h-40 overflow-hidden">
                        <img
                          src={wagonImages[i]}
                          alt={`Interior del vagón clase ${wagon.name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 md:p-6">
                        <p className="text-xs text-accent font-medium uppercase tracking-wider">{wagon.type}</p>
                        <h3 className="font-heading text-xl font-bold text-foreground mt-1">{wagon.name}</h3>
                        <p className="text-xs text-muted-foreground italic">"{wagon.meaning}"</p>
                        <p className="font-heading text-2xl font-bold text-foreground mt-3">
                          ${prices[i].toLocaleString()} <span className="text-sm font-normal text-muted-foreground">MXN</span>
                        </p>
                        <p className="text-xs text-muted-foreground -mt-1">por persona / tramo sencillo</p>
                        <ul className="mt-4 space-y-2">
                          {wagon.amenities.map((a) => (
                            <li key={a} className="flex items-center gap-2 text-sm text-foreground/80">
                              <Check size={14} className="text-primary shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        {isFeatured ? (
                          <div className="mt-5 space-y-2">
                            <a
                              href="https://wa.me/529811234567?text=Quiero%20reservar%20en%20clase%20Janal"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 rounded-lg font-bold text-sm transition-colors block text-center"
                              style={{ backgroundColor: '#2D4A3E', color: 'white' }}
                            >
                              Reservar ahora
                            </a>
                            <Link
                              to="/tren-maya/clases/janal"
                              className="block text-center text-sm text-primary hover:underline font-medium"
                            >
                              Ver detalles de esta clase →
                            </Link>
                          </div>
                        ) : (
                          <div className="mt-5 space-y-2">
                            <Link
                              to={`/tren-maya/clases/${["xiinbal", "janal", "patal"][i]}`}
                              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors block text-center border border-border text-foreground hover:bg-secondary"
                            >
                              Ver detalles
                            </Link>
                            <a
                              href={`https://wa.me/529811234567?text=Quiero%20reservar%20en%20clase%20${wagon.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-center text-sm text-primary hover:underline font-medium"
                            >
                              Reservar en clase {wagon.name} →
                            </a>
                          </div>
                        )}

                      </div>
                    </div>
                  </EstelaCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Greca divider */}
      <GrecaDivider variant="terracotta" size="sm" />

      {/* Popular Routes */}
      <section className="py-12 md:py-20 bg-secondary relative overflow-hidden">
        <MayaPattern variant="greca" opacity={0.025} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="section-label">Rutas populares</p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
                Las rutas más solicitadas
              </h2>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {allRoutes.slice(0, 3).map((route, i) => (
              <motion.div
                key={route.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-center min-w-[300px] md:min-w-0"
              >
                <EstelaCard variant="jade">
                  <Link to={`/tren-maya/rutas/${route.slug}`} className="block bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-secondary rounded-full text-xs font-medium text-foreground">
                          {route.badgeEmoji} {route.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-heading text-lg font-bold text-foreground">{route.origin}</span>
                        <ArrowRight size={16} className="text-primary" />
                        <span className="font-heading text-lg font-bold text-foreground">{route.destination}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <span>🕐 {route.duration}</span>
                        <span>📍 {route.stops} paradas</span>
                        <span>🚂 {route.dailyDepartures} diarios</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">Desde</span>
                          <p className="font-heading text-xl font-bold text-foreground">
                            ${route.prices.xiinbal.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MXN</span>
                          </p>
                        </div>
                        <span className="text-sm text-primary font-medium group-hover:underline">
                          Ver ruta completa →
                        </span>
                      </div>
                    </div>
                  </Link>
                </EstelaCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Greca divider */}
      <GrecaDivider variant="gold" size="md" />

      {/* Stations by State */}
      <section className="py-12 md:py-20 bg-background relative overflow-hidden">
        <MayaPattern variant="pop" opacity={0.02} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <p className="section-label">Todas las estaciones</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              34 estaciones en 5 estados
            </h2>
          </div>

          {/* State tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedState(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedState ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Todas
            </button>
            {stateList.map((key) => {
              const count = stations.filter((s) => s.stateKey === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedState(selectedState === key ? null : key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedState === key ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  {stateLabelsMap[key] || key} ({count})
                </button>
              );
            })}
          </div>

          {/* Station list */}
          <div className="max-w-3xl mx-auto">
            {filteredStations.map((station, i) => (
              <motion.div
                key={station.name}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex gap-4 relative"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full shrink-0 mt-1 border-2 border-card ${
                    station.type === "principal" ? "bg-primary" : station.type === "estacion" ? "bg-muted-foreground/40" : "bg-border"
                  }`} />
                  {i < filteredStations.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                </div>
                <div className={`pb-5 ${station.type === "principal" ? "" : "opacity-70"}`}>
                  <div className="flex items-center gap-2">
                    {stationSlugMap[station.name] ? (
                      <Link
                        to={`/tren-maya/estaciones/${stationSlugMap[station.name]}`}
                        className={`font-heading font-semibold text-foreground hover:text-primary transition-colors ${station.type === "principal" ? "text-base md:text-lg" : "text-sm"}`}
                      >
                        {station.name} →
                      </Link>
                    ) : (
                      <h3 className={`font-heading font-semibold text-foreground ${station.type === "principal" ? "text-base md:text-lg" : "text-sm"}`}>
                        {station.name}
                      </h3>
                    )}
                    {station.type === "principal" && <Train size={14} className="text-primary" />}
                    {station.type === "estacion" && <span className="text-[10px] text-muted-foreground font-medium">Estación</span>}
                    {station.type === "paradero" && <span className="text-[10px] text-muted-foreground">Paradero</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{station.state} · km {station.km}</p>
                  {station.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {station.highlights.map((h) => (
                        <span key={h} className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Greca divider */}
      <GrecaDivider variant="jade" size="sm" />

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-secondary relative overflow-hidden">
        <MayaPattern variant="greca" opacity={0.02} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <p className="section-label">FAQ</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Preguntas frecuentes sobre el Tren Maya
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                >
                  <span className="font-medium text-foreground text-sm md:text-base pr-4">{item.q}</span>
                  {expandedFaq === i ? <ChevronUp size={18} className="text-muted-foreground shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground shrink-0" />}
                </button>
                {expandedFaq === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 md:px-5 pb-4 md:pb-5 border-t border-primary/10">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">{item.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Greca divider */}
      <GrecaDivider variant="gold" size="lg" />

      {/* CTA Final */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary via-jade-dark to-primary relative overflow-hidden">
        <MayaPattern variant="pop" opacity={0.06} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground">
            ¿Listo para recorrer la Península?
          </h2>
          <p className="mt-3 text-primary-foreground/70 max-w-xl mx-auto">
            Diseñamos el circuito perfecto para ti. Tren Maya + experiencias + hospedaje en un solo lugar.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/paquetes">
                Ver paquetes todo incluido
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="ctaOutline" size="lg" asChild>
              <a href="https://wa.me/529982186754" target="_blank" rel="noopener noreferrer">
                Contactar asesor
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TrenMaya;
