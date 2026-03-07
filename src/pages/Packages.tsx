import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Users, Star, Check, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { packages, packageTypes } from "@/data/packages";
import { packageImageMap } from "@/data/package-images";
import { Button } from "@/components/ui/button";
import heroPaquetes from "@/assets/hero-paquetes.jpg";
import ParallaxHero from "@/components/layout/ParallaxHero";
import GrecaDivider from "@/components/maya/GrecaDivider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Packages = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filtered = useMemo(() => {
    return selectedType
      ? packages.filter((pkg) => pkg.type === selectedType)
      : packages;
  }, [selectedType]);

  const priceRange = useMemo(() => {
    const prices = filtered.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [filtered]);

  const toCompare = packages.filter((pkg) => selectedForCompare.includes(pkg.slug));

  const toggleCompare = (slug: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleQuote = (packageSlug: string) => {
    const pkg = packages.find((p) => p.slug === packageSlug);
    if (pkg) {
      const message = `Hola, me interesa el paquete "${pkg.title}" (${pkg.duration} días). ¿Pueden ayudarme con una cotización?`;
      const whatsappUrl = `https://wa.me/529982186754?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero imageSrc={heroPaquetes} imageAlt="Tren Maya cruzando la selva tropical">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Paquetes</p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Circuitos prediseñados
        </h1>
        <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
          Elige entre nuestros itinerarios cuidadosamente diseñados o personaliza tu aventura perfecta.
        </p>
      </ParallaxHero>

      <GrecaDivider />

      {/* Filters & Compare Mode */}
      <section className="bg-background sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-6">
          {/* Mobile: horizontal scroll chips in one line */}
          <div className="md:hidden relative">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  selectedType === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                Todos
              </button>
              {Object.entries(packageTypes).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedType === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => {
                  setCompareMode(!compareMode);
                  if (compareMode) setSelectedForCompare([]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 border-2 ${
                  compareMode
                    ? "border-gold bg-gold text-white"
                    : "border-gold text-gold hover:bg-gold/10"
                }`}
              >
              {compareMode ? "✕ Cancelar" : "Comparar"}
              </button>
              <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 px-2 py-2">
                ${priceRange.min.toLocaleString()} – ${priceRange.max.toLocaleString()} MXN
              </span>
            </div>
            {/* Scroll fade indicator */}
            <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Desktop: wrapped chips + separate compare button */}
          <div className="hidden md:flex flex-row items-center gap-3 mb-4">
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                Todos
              </button>
              {Object.entries(packageTypes).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Button
              variant="cta"
              size="sm"
              onClick={() => {
                setCompareMode(!compareMode);
                if (compareMode) setSelectedForCompare([]);
              }}
            >
              {compareMode ? "Cancelar" : "Comparar"}
            </Button>
          </div>

          {compareMode && selectedForCompare.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
              <span>{selectedForCompare.length} paquete{selectedForCompare.length !== 1 ? "s" : ""} seleccionado{selectedForCompare.length !== 1 ? "s" : ""}</span>
              {selectedForCompare.length < 2 && (
                <span className="text-xs">— selecciona al menos 2</span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Packages Grid - always visible */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-8">
            {filtered.length} paquete{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}
            {compareMode && " — selecciona paquetes para comparar"}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((pkg, i) => {
              const isLastOdd = filtered.length % 2 === 1 && i === filtered.length - 1;

              return (
              <motion.div
                key={pkg.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => compareMode && toggleCompare(pkg.slug)}
                className={`rounded-xl overflow-hidden border ${
                  isLastOdd ? "lg:col-span-2" : ""
                } ${
                  compareMode && selectedForCompare.includes(pkg.slug)
                    ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                    : "border-border bg-card"
                } ${compareMode ? "cursor-pointer" : ""} hover:shadow-lg transition-all ${
                  isLastOdd ? "lg:flex lg:flex-row" : ""
                }`}
              >
                {/* Package Header with Image */}
                <div className={`block relative overflow-hidden ${
                  isLastOdd ? "h-48 md:h-56 lg:h-auto lg:w-2/5 lg:min-h-[280px]" : "h-48 md:h-56"
                }`}>
                  <Link to={compareMode ? "#" : `/paquetes/${pkg.slug}`} onClick={e => compareMode && e.preventDefault()}>
                    {packageImageMap[pkg.slug] ? (
                      <img
                        src={packageImageMap[pkg.slug]}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-jade-light/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </Link>

                  {/* Selection checkbox overlay */}
                  {compareMode && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompare(pkg.slug); }}
                      className="absolute top-3 right-3 z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${
                          selectedForCompare.includes(pkg.slug)
                            ? "bg-primary border-primary text-primary-foreground scale-110"
                            : "border-white/80 bg-black/30 text-transparent hover:border-white hover:bg-black/50"
                        }`}
                      >
                        <Check size={16} />
                      </div>
                    </button>
                  )}
                </div>

                {/* Content wrapper for horizontal layout */}
                <div className={isLastOdd ? "lg:w-3/5 lg:flex lg:flex-col" : ""}>

                {/* Package Details */}
                <div className="p-6 border-b border-border relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2 bg-primary/10 px-2 py-1 rounded-full w-fit">
                        {packageTypes[pkg.type]}
                      </p>
                      <Link to={`/paquetes/${pkg.slug}`} className="hover:text-primary transition-colors">
                        <h3 className="font-heading text-2xl font-bold text-foreground leading-tight">
                          {pkg.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock size={16} className="text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duración</p>
                        <p className="font-semibold text-sm">{pkg.duration} días</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Users size={16} className="text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Grupo</p>
                        <p className="font-semibold text-sm text-xs">{pkg.groupSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Star size={16} className="text-gold fill-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="font-semibold text-sm">{pkg.rating} ({pkg.reviews})</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Content - hidden in compare mode for cleaner selection */}
                {!compareMode && (
                  <div className="p-6">
                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Destinos incluidos
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.slice(0, expandedPackage === pkg.slug ? undefined : 3).map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 bg-secondary text-foreground text-xs rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                        {pkg.highlights.length > 3 && expandedPackage !== pkg.slug && (
                          <button
                            onClick={() => setExpandedPackage(pkg.slug)}
                            className="px-3 py-1 text-primary text-xs hover:underline"
                          >
                            +{pkg.highlights.length - 3} más
                          </button>
                        )}
                      </div>
                    </div>

                    {/* States */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Estados
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.states.map((state) => (
                          <span key={state} className="text-sm text-foreground">
                            {state}
                            {pkg.states.indexOf(state) < pkg.states.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Includes Preview */}
                    <div className="mb-6 pb-6 border-t border-border pt-6">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Incluye
                      </p>
                      <ul className="space-y-2">
                        {pkg.includes.slice(0, 2).map((include) => (
                          <li key={include} className="flex items-start gap-2 text-sm text-foreground">
                            <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>{include}</span>
                          </li>
                        ))}
                        {pkg.includes.length > 2 && expandedPackage !== pkg.slug && (
                          <button
                            onClick={() => setExpandedPackage(pkg.slug)}
                            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                          >
                            <ChevronDown size={14} /> Ver todo lo incluido
                          </button>
                        )}
                      </ul>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedPackage === pkg.slug && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-border"
                          >
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                  Incluye completo
                                </p>
                                <ul className="space-y-1">
                                  {pkg.includes.slice(2).map((include) => (
                                    <li key={include} className="flex items-start gap-2 text-sm text-foreground">
                                      <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                      <span>{include}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                  No incluye
                                </p>
                                <ul className="space-y-1">
                                  {pkg.excludes.map((exclude) => (
                                    <li key={exclude} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <X size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                                      <span>{exclude}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                  Ideal para
                                </p>
                                <p className="text-sm text-foreground">{pkg.bestFor}</p>
                              </div>

                              <button
                                onClick={() => setExpandedPackage(null)}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <ChevronDown size={14} className="rotate-180" /> Ocultar detalles
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-end justify-between gap-4 pt-6 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Desde</p>
                        <p className="font-heading text-3xl font-bold text-foreground">
                          ${pkg.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">MXN</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">por adulto / grupo</p>
                      </div>
                      <Button
                        onClick={() => handleQuote(pkg.slug)}
                        className="w-full sm:w-auto"
                      >
                        Solicitar cotización
                      </Button>
                    </div>
                  </div>
                )}
                </div>{/* end content wrapper */}
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Compare Footer */}
      <AnimatePresence>
        {compareMode && selectedForCompare.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-40"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {toCompare.map((pkg) => (
                  <span
                    key={pkg.slug}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                  >
                    {pkg.title}
                    <button
                      onClick={() => toggleCompare(pkg.slug)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowCompareModal(true)}
                  disabled={selectedForCompare.length < 2}
                  className="flex-1 text-primary-foreground"
                  style={{ backgroundColor: '#2D4A3E' }}
                >
                  Comparar seleccionados ({selectedForCompare.length})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCompareMode(false);
                    setSelectedForCompare([]);
                  }}
                  className="text-muted-foreground"
                >
                  Cancelar
                </Button>
              </div>
              {selectedForCompare.length < 2 && (
                <p className="text-xs text-muted-foreground mt-2">Selecciona al menos 2 paquetes</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-heading text-2xl">Comparador de paquetes</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto p-6 pt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="text-left p-3 font-semibold text-muted-foreground w-36">Característica</th>
                  {toCompare.map((pkg) => (
                    <th key={pkg.slug} className="text-left p-3 min-w-[160px]">
                      <p className="font-heading text-base font-bold text-foreground">{pkg.title}</p>
                      <p className="text-xs text-muted-foreground font-normal mt-0.5">{packageTypes[pkg.type]}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Duración",
                    render: (pkg: typeof packages[0]) => <span className="font-semibold">{pkg.duration} días</span>,
                  },
                  {
                    label: "Precio",
                    render: (pkg: typeof packages[0]) => (
                      <span className="font-bold text-lg">${pkg.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MXN</span></span>
                    ),
                  },
                  {
                    label: "Grupo",
                    render: (pkg: typeof packages[0]) => <span>{pkg.groupSize}</span>,
                  },
                  {
                    label: "Dificultad",
                    render: (pkg: typeof packages[0]) => <span className="capitalize">{pkg.difficulty}</span>,
                  },
                  {
                    label: "Rating",
                    render: (pkg: typeof packages[0]) => (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-gold fill-gold" />
                        <span className="font-semibold">{pkg.rating}</span>
                        <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                      </div>
                    ),
                  },
                  {
                    label: "Estados",
                    render: (pkg: typeof packages[0]) => (
                      <div className="flex flex-wrap gap-1">
                        {pkg.states.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-secondary text-xs rounded-full">{s}</span>
                        ))}
                      </div>
                    ),
                  },
                  {
                    label: "Destinos",
                    render: (pkg: typeof packages[0]) => (
                      <ul className="space-y-1">
                        {pkg.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-1.5 text-xs">
                            <MapPin size={10} className="text-accent mt-0.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    label: "Incluye",
                    render: (pkg: typeof packages[0]) => (
                      <ul className="space-y-1">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5 text-xs">
                            <Check size={10} className="text-accent mt-0.5 flex-shrink-0" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <td className="p-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider align-top">{row.label}</td>
                    {toCompare.map((pkg) => (
                      <td key={pkg.slug} className="p-3 text-foreground align-top">{row.render(pkg)}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-3"></td>
                  {toCompare.map((pkg) => (
                    <td key={pkg.slug} className="p-3">
                      <Button onClick={() => { setShowCompareModal(false); handleQuote(pkg.slug); }} className="w-full" size="sm">
                        Cotizar
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-jade-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Podemos diseñar un itinerario completamente personalizado según tus intereses, duración y presupuesto.
          </p>
          <Button
            onClick={() => {
              const message =
                "Hola, me gustaría diseñar un paquete personalizado para mi viaje por el Tren Maya. ¿Podrían ayudarme?";
              const whatsappUrl = `https://wa.me/529982186754?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }}
            variant="secondary"
            size="lg"
          >
            Crear paquete personalizado
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Packages;
