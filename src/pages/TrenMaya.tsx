import { useState } from "react";
import { motion } from "framer-motion";
import { Train, MapPin, ChevronDown, ChevronUp, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { stations, trenMayaStats, wagonClasses } from "@/data/stations";

const stateColors: Record<string, string> = {
  chiapas: "bg-jade-dark",
  tabasco: "bg-terracotta",
  campeche: "bg-accent",
  "quintana-roo": "bg-primary",
  yucatan: "bg-gold",
};

const faqItems = [
  { q: "¿Cómo compro boletos del Tren Maya?", a: "Puedes solicitar tu cotización directamente con nosotros. En Tren Maya Trips nos encargamos de gestionar tus boletos junto con el circuito turístico completo." },
  { q: "¿Cuántas clases de vagón existen?", a: "Existen 3 clases: Xiinbal (económica), Janal (intermedia) y P'atal (premium). Cada una ofrece diferentes niveles de confort y servicios a bordo." },
  { q: "¿Puedo llevar equipaje?", a: "Sí, cada pasajero puede llevar una maleta de mano y una pieza de equipaje documentado. Las clases Janal y P'atal permiten equipaje adicional." },
  { q: "¿El tren tiene Wi-Fi?", a: "Las clases Janal y P'atal cuentan con conectividad Wi-Fi. La clase Xiinbal tiene servicio limitado." },
  { q: "¿Es seguro viajar en el Tren Maya?", a: "Sí. El Tren Maya cuenta con estándares internacionales de seguridad, personal capacitado y monitoreo constante en todas las rutas." },
];

const TrenMaya = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filteredStations = selectedState
    ? stations.filter((s) => s.stateKey === selectedState)
    : stations;

  const stateList = [...new Set(stations.map((s) => s.stateKey))];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-20 bg-gradient-to-b from-jade-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Información del tren</p>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              El Tren Maya: Tu puerta al{" "}
              <span className="text-gold italic">Mundo Maya</span>
            </h1>
            <p className="mt-5 text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto">
              1,554 kilómetros de ruta ferroviaria conectando los destinos más impresionantes del sureste de México.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${trenMayaStats.totalKm.toLocaleString()} km`, label: "De ruta" },
              { value: trenMayaStats.stations, label: "Estaciones" },
              { value: trenMayaStats.states, label: "Estados" },
              { value: trenMayaStats.wagonTypes, label: "Clases de vagón" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-heading text-2xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stations - Metro style */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Estaciones</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Ruta y estaciones del Tren Maya
            </h2>
          </div>

          {/* State filter */}
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
              const label = key === "quintana-roo" ? "Quintana Roo" : key === "yucatan" ? "Yucatán" : key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <button
                  key={key}
                  onClick={() => setSelectedState(selectedState === key ? null : key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedState === key ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Metro-style line */}
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
                  <div className={`w-4 h-4 rounded-full shrink-0 mt-1 border-2 border-card ${station.isMain ? stateColors[station.stateKey] || "bg-primary" : "bg-border"}`} />
                  {i < filteredStations.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                </div>
                <div className={`pb-5 ${station.isMain ? "" : "opacity-70"}`}>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-heading font-semibold text-foreground ${station.isMain ? "text-base md:text-lg" : "text-sm"}`}>
                      {station.name}
                    </h3>
                    {station.isMain && <Train size={14} className="text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{station.state} · km {station.km}</p>
                  {station.isMain && station.highlights.length > 0 && (
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

      {/* Wagon Classes */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">Clases</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Tres formas de viajar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {wagonClasses.map((wagon, i) => (
              <motion.div
                key={wagon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-xl border overflow-hidden ${
                  i === 1 ? "border-accent ring-1 ring-accent/20 shadow-lg" : "border-border"
                }`}
              >
                <div className={`h-40 ${i === 1 ? "bg-gradient-to-br from-accent/20 to-gold-light/30" : "bg-gradient-to-br from-secondary to-muted"}`}>
                  {i === 1 && (
                    <div className="m-3 inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                      Recomendado
                    </div>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">{wagon.type}</p>
                  <h3 className="font-heading text-xl font-bold text-foreground mt-1">{wagon.name}</h3>
                  <p className="text-xs text-muted-foreground italic">"{wagon.meaning}"</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{wagon.description}</p>
                  <ul className="mt-4 space-y-2">
                    {wagon.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Check size={14} className="text-primary shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-2">FAQ</p>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                >
                  <span className="font-medium text-foreground text-sm md:text-base pr-4">{item.q}</span>
                  {expandedFaq === i ? <ChevronUp size={18} className="text-muted-foreground shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground shrink-0" />}
                </button>
                {expandedFaq === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 md:px-5 pb-4 md:pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary via-jade-dark to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground">
            ¿Listo para abordar?
          </h2>
          <p className="mt-3 text-primary-foreground/70 max-w-xl mx-auto">
            Diseñamos el circuito perfecto para ti. Tren Maya + experiencias + hospedaje en un solo lugar.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/experiencias"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-gold-light transition-colors"
            >
              Ver Experiencias
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/529982186754"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/10 transition-colors"
            >
              Contactar asesor
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TrenMaya;
