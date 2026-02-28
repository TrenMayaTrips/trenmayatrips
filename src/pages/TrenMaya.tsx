import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Train, ArrowRight, ChevronDown, ChevronUp, Check, ArrowLeftRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import TrenMayaRouteMap from "@/components/maps/TrenMayaRouteMap";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import EstelaCard from "@/components/maya/EstelaCard";
import { stations, trenMayaStats, wagonClasses } from "@/data/stations";
import { routes, allStationNames } from "@/data/routes";
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

  const stationSlugMap: Record<string, string> = Object.fromEntries(
    stationDetails.map((sd) => [sd.name, sd.slug])
  );

  const stateList = [...new Set(stations.map((s) => s.stateKey))];
  const filteredStations = selectedState
    ? stations.filter((s) => s.stateKey === selectedState)
    : stations;

  const swapStations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearch = () => {
    const route = routes.find(
      (r) =>
        (r.origin === origin && r.destination === destination) ||
        (r.origin === destination && r.destination === origin)
    );
    if (route) {
      navigate(`/tren-maya/rutas/${route.slug}`);
    }
  };

  return (
    <PageLayout>
      {/* Hero + Route Finder */}
      <ParallaxHero
        imageSrc={heroTrenMayaPage}
        imageAlt="Tren Maya llegando a estación rodeada de selva tropical"
        className="pt-24 md:pt-32 pb-14 md:pb-20 min-h-[380px] md:min-h-[500px]"
        overlayClass="bg-black/55"
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
                className="w-full sm:w-auto shrink-0 mt-4 sm:mt-5 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors min-h-[44px] text-sm"
              >
                Buscar
              </button>
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
          <TrenMayaRouteMap />
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
                          ${prices[i].toLocaleString()} <span className="text-sm font-normal text-muted-foreground">MXN/tramo</span>
                        </p>
                        <ul className="mt-4 space-y-2">
                          {wagon.amenities.map((a) => (
                            <li key={a} className="flex items-center gap-2 text-sm text-foreground/80">
                              <Check size={14} className="text-primary shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/tren-maya/clases/${["xiinbal", "janal", "patal"][i]}`}
                          className={`w-full mt-5 py-2.5 rounded-lg font-semibold text-sm transition-colors block text-center ${
                            isFeatured
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border border-border text-foreground hover:bg-secondary"
                          }`}
                        >
                          Ver detalles
                        </Link>
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
            {routes.slice(0, 3).map((route, i) => (
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
