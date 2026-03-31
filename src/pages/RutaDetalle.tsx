import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, MapPin, Train, Calendar, ChevronDown, ChevronUp, ArrowLeft, Star, ChevronRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import { routes } from "@/data/routes";
import { useDestinations } from "@/hooks/useDestinations";
import { useExperiences } from "@/hooks/useExperiences";
import { experienceGallery } from "@/data/experience-gallery";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useState } from "react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import EstelaCard from "@/components/maya/EstelaCard";
import RutaDestinos from "@/components/routes/RutaDestinos";
import RutaInteractiveMap from "@/components/routes/RutaInteractiveMap";
import RutaTips from "@/components/routes/RutaTips";

const routeFaqs: Record<string, { q: string; a: string }[]> = {
  "cancun-merida": [
    { q: "¿Cuánto dura el viaje Cancún–Mérida?", a: "Aproximadamente 4 horas 30 minutos con las paradas intermedias. El tren alcanza velocidades de hasta 160 km/h en los tramos rectos." },
    { q: "¿Puedo bajarme en Valladolid para visitar Chichén Itzá?", a: "Sí, puedes comprar un boleto Cancún–Valladolid y luego otro Valladolid–Mérida. Chichén Itzá está a 40 minutos en transporte local desde la estación." },
    { q: "¿Hay servicio nocturno en esta ruta?", a: "Actualmente no. Las salidas son a las 6:00 AM, 10:00 AM y 3:00 PM. Se planea agregar un servicio vespertino próximamente." },
    { q: "¿Qué documentos necesito para abordar?", a: "Solo necesitas tu boleto (digital o impreso) y una identificación oficial. Extranjeros pueden usar pasaporte o visa de turista." },
  ],
  "cancun-tulum": [
    { q: "¿Es más rápido el tren que el autobús a Tulum?", a: "Sí, significativamente. El tren hace el recorrido en aproximadamente 3 horas 15 minutos vs. 2–4 horas en autobús dependiendo del tráfico, especialmente en temporada alta." },
    { q: "¿La estación de Tulum está cerca de las ruinas?", a: "La estación está a unos 10 minutos en taxi de la zona arqueológica y a 15 minutos de la zona hotelera de playa." },
    { q: "¿Puedo llevar equipo de snorkel o buceo?", a: "Sí, equipo deportivo personal se permite como parte de tu equipaje. Debe ir en la bodega si es voluminoso." },
  ],
  "merida-palenque": [
    { q: "¿Es recomendable hacer todo el recorrido de un tirón?", a: "Es posible pero largo (8 horas). Recomendamos hacer una parada en Campeche para disfrutar la ciudad amurallada y continuar al día siguiente." },
    { q: "¿Qué se ve durante el recorrido por la selva?", a: "El tramo Escárcega–Palenque atraviesa selva tropical densa. Es común avistar aves exóticas y, con suerte, monos aulladores desde las ventanillas." },
    { q: "¿Hay servicio de comida en un viaje tan largo?", a: "Sí, en clase Janal se incluye un snack box y hay servicio de cafetería. En P'atal se sirven dos tiempos de comida regional completa." },
    { q: "¿Puedo hacer escala en Edzná?", a: "Sí, la estación Edzná permite bajar a visitar la zona arqueológica. Está a 5 minutos caminando. Puedes tomar el siguiente tren con tu mismo boleto." },
  ],
  "merida-campeche": [
    { q: "¿Es la ruta más corta del Tren Maya?", a: "Es una de las más cortas: solo 2 horas 30 minutos. Ideal para una excursión de ida y vuelta en el día." },
    { q: "¿Campeche vale la pena para una visita de un día?", a: "Absolutamente. El centro amurallado (UNESCO) es compacto y recorrible a pie. Puedes tomar el tren de las 7 AM y regresar en el de las 5 PM." },
    { q: "¿Hay conexión a Edzná desde esta ruta?", a: "Sí, hay una parada intermedia. Desde la estación Edzná puedes visitar la zona arqueológica en menos de 10 minutos." },
  ],
  "tulum-bacalar": [
    { q: "¿Qué hace especial a la Laguna de Bacalar?", a: "Es conocida como la 'Laguna de los Siete Colores' por sus impresionantes tonalidades de azul y turquesa. Es ideal para kayak, paddleboard y paseos en velero." },
    { q: "¿Hay actividades en las paradas intermedias?", a: "En Felipe Carrillo Puerto puedes visitar el centro ceremonial maya. En Chacchoben hay una zona arqueológica rodeada de selva a minutos de la estación." },
    { q: "¿Puedo regresar el mismo día?", a: "Sí, con las salidas de 8 AM y 3 PM puedes ir por la mañana y regresar por la tarde, aunque recomendamos al menos una noche en Bacalar." },
  ],
};

const RutaDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  const route = routes.find((r) => r.slug === slug);
  if (!route) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Ruta no encontrada</h1>
          <p className="text-muted-foreground mt-4">La ruta que buscas no existe.</p>
          <Link to="/tren-maya" className="inline-block mt-6 text-primary font-medium hover:underline">
            ← Volver al Tren Maya
          </Link>
        </div>
      </PageLayout>
    );
  }

  const faqs = routeFaqs[route.slug] || [];
  const relatedRoutes = routes.filter(
    (r) => r.slug !== route.slug && (r.origin === route.origin || r.origin === route.destination || r.destination === route.origin || r.destination === route.destination)
  ).slice(0, 3);

  // Experiences in route states (max 6)
  const routeExperiences = experiences
    .filter((e) => route.statesTraversed.includes(e.state))
    .slice(0, 6);

  // Calculate arrival time dynamically
  const calculateArrivalTime = (departure: string): string => {
    const match = departure.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return "—";

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    // Convert to 24h
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Add duration
    const totalMinutes = hours * 60 + minutes + route.durationMinutes;
    let arrivalHours = Math.floor(totalMinutes / 60) % 24;
    const arrivalMinutes = totalMinutes % 60;
    const nextDay = totalMinutes >= 24 * 60;

    // Convert back to 12h format
    const arrivalPeriod = arrivalHours >= 12 ? "PM" : "AM";
    if (arrivalHours === 0) arrivalHours = 12;
    else if (arrivalHours > 12) arrivalHours -= 12;

    const timeStr = `${arrivalHours}:${arrivalMinutes.toString().padStart(2, "0")} ${arrivalPeriod}`;
    return nextDay ? `${timeStr} +1 día` : timeStr;
  };

  return (
    <PageLayout>
      {/* Hero with parallax */}
      <ParallaxHero
        imageSrc={route.heroImage}
        imageAlt={`Ruta ${route.origin} a ${route.destination}`}
        className="pt-24 md:pt-32 pb-14 md:pb-20 min-h-[380px] md:min-h-[460px]"
        overlayClass="bg-gradient-to-b from-black/50 via-black/55 to-black/70"
      >
        <Breadcrumb className="mb-6 justify-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/" className="text-white/70 hover:text-white">Inicio</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/tren-maya" className="text-white/70 hover:text-white">Tren Maya</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">{route.origin} → {route.destination}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold mb-4">
            {route.badgeEmoji} {route.badge}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
            {route.origin} <ArrowRight className="inline text-accent mx-2" size={28} /> {route.destination}
          </h1>
          <p className="text-white/80 mt-3 max-w-2xl mx-auto text-sm md:text-base">{route.description}</p>

          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {[
              { icon: Clock, label: route.duration },
              { icon: MapPin, label: `${route.stops} paradas` },
              { icon: Train, label: `${route.dailyDepartures} salidas diarias` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2.5">
                <Icon size={16} className="text-accent" />
                <span className="text-sm font-medium text-white">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Link
              to={`/contacto?ruta=${encodeURIComponent(`${route.origin} → ${route.destination}`)}`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-sm transition-all hover:brightness-110 shadow-lg"
              style={{ backgroundColor: "#D4A853", color: "#fff" }}
            >
              Reservar esta ruta
            </Link>
            <button
              onClick={() => {
                const section = document.getElementById("horarios-section");
                if (section) {
                  const top = section.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-sm border border-white text-white bg-transparent hover:bg-white/10 transition-colors"
            >
              Ver horarios ↓
            </button>
          </div>
        </motion.div>
      </ParallaxHero>

      <GrecaDivider variant="jade" size="md" />

      {/* Scenic highlights */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="section-label">🌄 Paisaje</p>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic">
            "{route.scenicHighlights}"
          </p>
        </div>
      </section>

      <GrecaDivider variant="gold" size="sm" />

      {/* Timeline */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label">Recorrido</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Paradas de la ruta</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            {/* Timeline */}
            <div>
              {route.timeline.map((stop, i) => {
                // Map station name to destination slug
                const stationToSlug: Record<string, string> = {
                  "Cancún": "cancun", "Cancún Aeropuerto": "cancun",
                  "Tulum": "tulum", "Tulum Aeropuerto": "tulum",
                  "Bacalar": "bacalar", "Playa del Carmen": "playa-del-carmen",
                  "Puerto Morelos": "cancun", // Part of Cancun region
                  "Mérida": "merida", "Mérida-Teya": "merida",
                  "Valladolid": "valladolid", "Izamal": "izamal",
                  "San Francisco de Campeche": "campeche-ciudad",
                  "Palenque": "palenque", "Calakmul": "calakmul",
                  "Felipe Carrillo Puerto": "bacalar", // Near Bacalar
                };
                const destSlug = stationToSlug[stop.name];
                const stationLink = destSlug ? `/destinos/${destSlug}` : "/destinos";

                // Parse tag to get link
                const getTagLink = (tag: string): string | null => {
                  if (tag.includes("Pueblo Mágico")) return "/destinos?categoria=pueblo-magico";
                  if (tag.includes("UNESCO")) return "/destinos?categoria=unesco";
                  if (tag.includes("Chichén Itzá")) return "/experiencias/chichen-itza";
                  if (tag.includes("Cenote")) return "/experiencias?categoria=cenotes";
                  if (tag.includes("Zona arqueológica")) return "/experiencias?categoria=arqueologia";
                  if (tag.includes("Cascadas")) return "/experiencias/cascadas-agua-azul";
                  if (tag.includes("Ferry")) return "/destinos/playa-del-carmen";
                  if (tag.includes("Arrecife")) return "/experiencias?categoria=snorkel";
                  return null;
                };

                return (
                  <motion.div
                    key={stop.name}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex gap-4 relative cursor-pointer transition-all duration-200 rounded-lg -mx-3 px-3 py-4 md:py-2 group ${
                      hoveredStation === stop.name ? "bg-sand scale-[1.01]" : "hover:bg-sand/50"
                    }`}
                    onMouseEnter={() => setHoveredStation(stop.name)}
                    onMouseLeave={() => setHoveredStation(null)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full shrink-0 mt-1 border-2 border-card transition-all ${
                        stop.isOrigin || stop.isDestination ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/30"
                      } ${hoveredStation === stop.name ? "ring-4 ring-accent/30 scale-110" : ""}`} />
                      {i < route.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border min-h-[40px]" />
                      )}
                    </div>
                    <div className="pb-4 md:pb-6 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded">
                          {stop.time}
                        </span>
                        <Link 
                          to={stationLink}
                          className={`font-heading font-bold text-foreground hover:text-primary transition-colors ${
                            stop.isOrigin || stop.isDestination ? "text-lg" : "text-base"
                          }`}
                        >
                          {stop.name}
                        </Link>
                        {stop.isOrigin && (
                          <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Origen</span>
                        )}
                        {stop.isDestination && (
                          <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Destino</span>
                        )}
                        <ChevronRight 
                          size={16} 
                          className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                        />
                      </div>
                      {stop.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {stop.highlights.filter(h => h !== "Origen").map((h) => {
                            const tagLink = getTagLink(h);
                            return tagLink ? (
                              <Link 
                                key={h} 
                                to={tagLink}
                                className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                              >
                                {h}
                              </Link>
                            ) : (
                              <span key={h} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                                {h}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive map */}
            <RutaInteractiveMap
              timeline={route.timeline}
              hoveredStation={hoveredStation}
              onStationHover={setHoveredStation}
            />
          </div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="sm" />

      {/* Destinos en la ruta */}
      <RutaDestinos 
        statesTraversed={route.statesTraversed} 
        timelineStops={route.timeline.map(s => s.name)}
      />

      <GrecaDivider variant="gold" size="sm" />

      {/* Experiencias recomendadas */}
      {routeExperiences.length > 0 && (
        <section className="py-10 md:py-16 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="section-label">
                Vive la experiencia
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Experiencias en esta ruta
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {routeExperiences.map((exp, i) => {
                const gallery = experienceGallery[exp.slug];
                const thumb = gallery?.[0];
                return (
                  <motion.div
                    key={exp.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link to={`/experiencias/${exp.slug}`}>
                      <EstelaCard className="overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
                        {thumb && (
                          <div className="relative h-40 overflow-hidden">
                            <img src={thumb} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-heading font-bold text-foreground text-sm leading-tight mb-1">{exp.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{exp.description}</p>
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock size={12} /> {exp.duration}</span>
                            <span className="flex items-center gap-1"><Star size={12} className="text-accent" /> {exp.rating}</span>
                            <span className="flex items-center gap-1 ml-auto font-semibold text-primary">${exp.price.toLocaleString()} MXN</span>
                          </div>
                        </div>
                      </EstelaCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <GrecaDivider variant="jade" size="sm" />

      {/* Prices by class */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label">Tarifas</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Precios por clase</h2>
            <p className="text-muted-foreground mt-2 text-sm">Precios por persona, tramo sencillo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {([
              { key: "xiinbal" as const, name: "Xiinbal", meaning: "Caminar", type: "Estándar", slug: "xiinbal", benefits: "Asientos reclinables, A/C" },
              { key: "janal" as const, name: "Janal", meaning: "Comer", type: "Restaurante", slug: "janal", benefits: "Comida incluida, WiFi" },
              { key: "patal" as const, name: "P'atal", meaning: "Quedarse", type: "Cama", slug: "patal", benefits: "Cama privada, amenidades premium" },
            ]).map((cls, i) => (
              <motion.div
                key={cls.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-xl border overflow-hidden flex flex-col ${
                  i === 1 ? "border-primary ring-2 ring-primary/20 shadow-lg" : "border-border"
                }`}
              >
                {i === 1 && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1.5">⭐ Más popular</div>
                )}
                <div className="p-5 md:p-6 text-center flex-1 flex flex-col">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">{cls.type}</p>
                  <h3 className="font-heading text-xl font-bold text-foreground mt-1">{cls.name}</h3>
                  <p className="text-xs text-muted-foreground italic">"{cls.meaning}"</p>
                  {i === 1 && (
                    <span className="inline-block mx-auto mt-2 text-[10px] bg-accent/15 text-accent font-semibold px-2 py-0.5 rounded-full">
                      Mejor relación calidad-precio
                    </span>
                  )}
                  <p className="font-heading text-3xl font-bold text-foreground mt-4">
                    ${route.prices[cls.key].toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-1">MXN</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{cls.benefits}</p>
                  
                  <div className="mt-auto pt-4 space-y-2">
                    <Link
                      to={`/contacto?ruta=${encodeURIComponent(`${route.origin} → ${route.destination}`)}&clase=${cls.slug}`}
                      className="block w-full py-3 rounded-lg font-semibold text-sm text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: "#D4A853", minHeight: "48px" }}
                    >
                      Reservar {cls.name}
                    </Link>
                    <Link 
                      to={`/tren-maya/clases/${cls.slug}`} 
                      className="block text-sm text-primary font-medium hover:underline py-1"
                    >
                      Ver detalles de clase →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedules */}
      <section id="horarios-section" className="py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label">Horarios</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Salidas diarias</h2>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-primary/5 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-foreground">{route.origin}</span>
                  <ArrowRight size={16} className="text-primary" />
                  <span className="font-heading font-bold text-foreground">{route.destination}</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {route.schedules.map((time) => (
                  <div key={time} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-primary" />
                      <span className="font-mono font-semibold text-foreground">{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Llegada</span>
                      <span className="text-sm font-medium text-foreground font-mono">
                        {calculateArrivalTime(time)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-secondary/50 text-xs text-muted-foreground text-center">
                Horarios sujetos a cambios. Todos los días de la semana.
              </div>
            </div>
          </div>
        </div>
      </section>

      <GrecaDivider variant="terracotta" size="sm" />

      {/* Tips */}
      <RutaTips tips={route.tips} />

      <GrecaDivider variant="jade" size="sm" />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="section-label">Preguntas frecuentes</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Sobre esta ruta</h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                  >
                    <span className="font-medium text-foreground text-sm md:text-base pr-4">{faq.q}</span>
                    {expandedFaq === i ? (
                      <ChevronUp size={18} className="text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-primary/10">
                          <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <GrecaDivider variant="gold" size="sm" />

      {/* Related routes */}
      {relatedRoutes.length > 0 && (
        <section className="py-10 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="section-label">Conecta tu viaje</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Rutas relacionadas</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {relatedRoutes.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={`/tren-maya/rutas/${r.slug}`}>
                    <EstelaCard className="p-4 hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                          {r.badgeEmoji} {r.badge}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-foreground">
                        {r.origin} → {r.destination}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock size={12} /> {r.duration}</span>
                        <span className="font-semibold text-primary">Desde ${r.prices.xiinbal.toLocaleString()} MXN</span>
                      </div>
                    </EstelaCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            ¿Listo para viajar de {route.origin} a {route.destination}?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            Cotiza tu viaje con nosotros y recibe un itinerario personalizado con boletos, hospedaje y experiencias.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Solicitar cotización
            </Link>
            <Link
              to="/tren-maya"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors text-sm"
            >
              <ArrowLeft size={16} /> Ver todas las rutas
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default RutaDetalle;
