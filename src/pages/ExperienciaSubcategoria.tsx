import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, MapPin, Clock, Star, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import { useSubcategoryBySlug } from "@/hooks/useExperienceCategories";
import { guarantees } from "@/data/experience-categories";
import { experiences, stateLabels } from "@/data/experiences";
import { experienceGallery } from "@/data/experience-gallery";
import heroExperiencias from "@/assets/hero-experiencias.jpg";
import TestimoniosSection from "@/components/home/TestimoniosSection";
import GrecaDivider from "@/components/maya/GrecaDivider";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ExperienciaSubcategoria = () => {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();

  const { category, subcategory, isLoading } = useSubcategoryBySlug(categorySlug, subcategorySlug);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!category) return [];
    return experiences.filter((exp) => {
      const matchesCategory = exp.category === category.experienceCategory;
      const matchesSearch =
        !searchQuery ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = !selectedState || exp.state === selectedState;
      return matchesCategory && matchesSearch && matchesState;
    });
  }, [category, searchQuery, selectedState]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </PageLayout>
    );
  }

  if (!category || !subcategory) return <Navigate to={category ? `/experiencias/${category.slug}` : "/experiencias"} replace />;


  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero imageSrc={heroExperiencias} imageAlt={subcategory.name}>
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList className="text-primary-foreground/60">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/experiencias" className="text-primary-foreground/60 hover:text-primary-foreground">Experiencias</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/experiencias/${category.slug}`} className="text-primary-foreground/60 hover:text-primary-foreground">
                    {category.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">{subcategory.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">{subcategory.icon} {category.name}</p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {subcategory.name}
        </h1>
        <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
          {subcategory.heroDescription}
        </p>
      </ParallaxHero>

      <GrecaDivider variant="jade" size="md" />

      {/* Filters */}
      <section className="bg-background sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Buscar en ${subcategory.name.toLowerCase()}...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm min-h-[44px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setSelectedState(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedState ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Todos
            </button>
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
      </section>

      {/* Experience listings */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered.length} experiencia{filtered.length !== 1 ? "s" : ""} en {subcategory.name.toLowerCase()}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No se encontraron experiencias con esos filtros.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedState(null); }}
                className="mt-4 text-primary font-medium underline underline-offset-4"
              >
                Ver todas
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

      {/* Other subcategories in same category */}
      <section className="py-10 md:py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Más en {category.name.toLowerCase()}
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-5 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {category.subcategories
              .filter((s) => s.slug !== subcategory.slug)
              .map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/experiencias/${category.slug}/${sub.slug}`}
                  className="group block min-w-[160px] md:min-w-0 bg-card p-4 md:p-5 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
                >
                  <span className="text-2xl mb-2 block">{sub.icon}</span>
                  <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {sub.name}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <TestimoniosSection />

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label">FAQ</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Información general</h3>
              <div className="space-y-3">
                {category.faqCultural.map((faq, i) => {
                  const idx = i;
                  const isOpen = expandedFaq === idx;
                  return (
                    <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="font-medium text-foreground text-sm pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={18} className="text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 border-t border-primary/10">
                              <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Tips del experto</h3>
              <div className="space-y-3">
                {category.faqTips.map((faq, i) => {
                  const idx = 100 + i;
                  const isOpen = expandedFaq === idx;
                  return (
                    <div key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="font-medium text-foreground text-sm pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={18} className="text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 border-t border-primary/10">
                              <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-10 md:py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {guarantees.map((g) => (
              <div key={g.title} className="text-center p-4 md:p-6">
                <span className="text-2xl md:text-3xl block mb-2">{g.icon}</span>
                <h3 className="font-heading text-sm md:text-base font-semibold text-foreground">{g.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ExperienciaSubcategoria;
