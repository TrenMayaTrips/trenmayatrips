import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Star, Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { experiences, categoryLabels, stateLabels } from "@/data/experiences";
import heroExperiencias from "@/assets/hero-experiencias.jpg";
import ParallaxHero from "@/components/layout/ParallaxHero";
import { experienceGallery } from "@/data/experience-gallery";

const Experiencias = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return experiences.filter((exp) => {
      const matchesSearch = !searchQuery || 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || exp.category === selectedCategory;
      const matchesState = !selectedState || exp.state === selectedState;
      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchQuery, selectedCategory, selectedState]);

  const activeFilters = [selectedCategory, selectedState].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedState(null);
    setSearchQuery("");
  };

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero imageSrc={heroExperiencias} imageAlt="Ruinas mayas en la selva tropical">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Experiencias</p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Vive el Mundo Maya
        </h1>
        <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
          Aventura, cultura, gastronomía y bienestar en los 5 estados de la ruta del Tren Maya.
        </p>
      </ParallaxHero>

      {/* Search & Filters */}
      <section className="bg-background sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar experiencias..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm min-h-[44px]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium min-h-[44px] transition-colors ${
                activeFilters > 0 ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:bg-secondary"
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filtros</span>
              {activeFilters > 0 && (
                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Categoría</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            selectedCategory === key
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-muted"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Estado</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(stateLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedState(selectedState === key ? null : key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            selectedState === key
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-muted"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {activeFilters > 0 && (
                    <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-destructive hover:underline">
                      <X size={12} /> Limpiar filtros
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} experiencia{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No se encontraron experiencias con esos filtros.</p>
              <button onClick={clearFilters} className="mt-4 text-primary font-medium underline underline-offset-4">
                Ver todas las experiencias
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((exp, i) => (
                <motion.div
                  key={exp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/experiencias/${exp.slug}`}
                    className="group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                  >
                    <div className="h-48 md:h-52 relative overflow-hidden">
                      {experienceGallery[exp.slug]?.[0] ? (
                        <img
                          src={experienceGallery[exp.slug][0]}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-jade-light/30" />
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/90 backdrop-blur-sm text-xs font-medium rounded-full text-foreground">
                        {categoryLabels[exp.category]}
                      </span>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{exp.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        <span>{exp.stateName}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gold">
                            <Star size={14} fill="currentColor" />
                            <span className="font-medium">{exp.rating}</span>
                          </div>
                        </div>
                        <p className="font-heading font-bold text-foreground">
                          ${exp.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MXN</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Experiencias;
