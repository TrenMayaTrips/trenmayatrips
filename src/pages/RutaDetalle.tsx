import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Train, Calendar, ChevronDown, ChevronUp, Check, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { routes } from "@/data/routes";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useState } from "react";
import GrecaDivider from "@/components/maya/GrecaDivider";
import EstelaCard from "@/components/maya/EstelaCard";

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

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary pt-24 md:pt-28 pb-10 md:pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/tren-maya">Tren Maya</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{route.origin} → {route.destination}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
              {route.badgeEmoji} {route.badge}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {route.origin} <ArrowRight className="inline text-primary mx-2" size={28} /> {route.destination}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">{route.description}</p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: Clock, label: route.duration },
                { icon: MapPin, label: `${route.stops} paradas` },
                { icon: Train, label: `${route.dailyDepartures} salidas diarias` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5">
                  <Icon size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="md" />

      {/* Timeline */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Recorrido</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Paradas de la ruta</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {route.timeline.map((stop, i) => (
              <motion.div
                key={stop.name}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 relative"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full shrink-0 mt-1 border-2 border-card ${
                    stop.isOrigin || stop.isDestination ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/30"
                  }`} />
                  {i < route.timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border min-h-[40px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded">
                      {stop.time}
                    </span>
                    <h3 className={`font-heading font-bold text-foreground ${
                      stop.isOrigin || stop.isDestination ? "text-lg" : "text-base"
                    }`}>
                      {stop.name}
                    </h3>
                    {stop.isOrigin && (
                      <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Origen</span>
                    )}
                    {stop.isDestination && (
                      <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Destino</span>
                    )}
                  </div>
                  {stop.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {stop.highlights.filter(h => h !== "Origen").map((h) => (
                        <span key={h} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GrecaDivider variant="gold" size="sm" />

      {/* Prices by class */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Tarifas</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Precios por clase</h2>
            <p className="text-muted-foreground mt-2 text-sm">Precios por persona, tramo sencillo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {([
              { key: "xiinbal" as const, name: "Xiinbal", meaning: "Caminar", type: "Estándar", slug: "xiinbal" },
              { key: "janal" as const, name: "Janal", meaning: "Comer", type: "Restaurante", slug: "janal" },
              { key: "patal" as const, name: "P'atal", meaning: "Quedarse", type: "Cama", slug: "patal" },
            ]).map((cls, i) => (
              <motion.div
                key={cls.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-xl border overflow-hidden ${
                  i === 1 ? "border-primary ring-2 ring-primary/20 shadow-lg" : "border-border"
                }`}
              >
                {i === 1 && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1.5">
                    ⭐ Más popular
                  </div>
                )}
                <div className="p-5 md:p-6 text-center">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">{cls.type}</p>
                  <h3 className="font-heading text-xl font-bold text-foreground mt-1">{cls.name}</h3>
                  <p className="text-xs text-muted-foreground italic">"{cls.meaning}"</p>
                  <p className="font-heading text-3xl font-bold text-foreground mt-4">
                    ${route.prices[cls.key].toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-1">MXN</span>
                  </p>
                  <Link
                    to={`/tren-maya/clases/${cls.slug}`}
                    className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
                  >
                    Ver detalles de clase →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedules */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Horarios</p>
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
                {route.schedules.map((time, i) => (
                  <div key={time} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-primary" />
                      <span className="font-mono font-semibold text-foreground">{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Llegada aprox.</span>
                      <span className="text-sm font-medium text-foreground">
                        {route.timeline[route.timeline.length - 1]?.time || "—"}
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

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Preguntas frecuentes</p>
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
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
                    {expandedFaq === i ? (
                      <ChevronUp size={18} className="text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  )}
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
