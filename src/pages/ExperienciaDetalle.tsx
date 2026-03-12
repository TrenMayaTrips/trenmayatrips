import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MapPin, Clock, Star, Users, Globe, Check, X, ChevronRight, ArrowLeft, ShieldCheck } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { getExperienceBySlug, experiences, categoryLabels } from "@/data/experiences";
import { experienceGallery } from "@/data/experience-gallery";
import ImageGallery from "@/components/experiences/ImageGallery";
import GrecaDivider from "@/components/maya/GrecaDivider";
import EstelaCard from "@/components/maya/EstelaCard";
import VideoModule from "@/components/ui/VideoModule";
import MobileStickyBookingBar from "@/components/experiences/MobileStickyBookingBar";

const tabs = ["Resumen", "Itinerario", "Incluye", "Recomendaciones"];

const ExperienciaDetalle = () => {
  const params = useParams();
  const slug = params.slug || params.slugOrCategory || "";
  const [activeTab, setActiveTab] = useState("Resumen");
  const [sidebarStuck, setSidebarStuck] = useState(true);
  const relatedRef = useRef<HTMLDivElement>(null);
  const exp = getExperienceBySlug(slug);

  // Stop sticky when related section is visible
  useEffect(() => {
    if (!relatedRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSidebarStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );
    observer.observe(relatedRef.current);
    return () => observer.disconnect();
  }, [exp]);

  if (!exp) return <Navigate to="/experiencias" replace />;

  const relatedExps = exp.related
    .map((s) => experiences.find((e) => e.slug === s))
    .filter(Boolean);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-14 bg-gradient-to-b from-jade-dark to-primary">
        <div className="container mx-auto px-4">
          <Link to="/experiencias" className="inline-flex items-center gap-1 text-primary-foreground/60 hover:text-primary-foreground text-sm mb-4 transition-colors">
            <ArrowLeft size={16} />
            Experiencias
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-primary-foreground/10 text-primary-foreground text-xs font-medium rounded-full">
              {categoryLabels[exp.category]}
            </span>
            <span className="px-2.5 py-1 bg-primary-foreground/10 text-primary-foreground text-xs font-medium rounded-full">
              {exp.stateName}
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            {exp.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1"><Clock size={14} /> {exp.duration}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {exp.groupSize}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {exp.stateName}</span>
            <span className="flex items-center gap-1 text-gold"><Star size={14} fill="currentColor" /> {exp.rating} ({exp.reviews} reseñas)</span>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 -mt-4 md:-mt-6 space-y-3">
        <ImageGallery images={experienceGallery[exp.slug] || []} title={exp.title} />
        {exp.videoUrl && (
          <VideoModule
            url={exp.videoUrl}
            poster={(experienceGallery[exp.slug] || [])[0]}
            title={`Video: ${exp.title}`}
            badge="Recorrido"
          />
        )}
      </div>

      <GrecaDivider variant="jade" size="md" />

      {/* Content */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex overflow-x-auto gap-1 border-b border-border mb-6 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {activeTab === "Resumen" && (
                  <div className="prose-sm">
                    <p className="text-foreground/80 leading-relaxed text-base">{exp.longDescription}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe size={14} />
                        <span>Idiomas: {exp.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Itinerario" && (
                  <div className="space-y-0">
                    {exp.itinerary.map((item, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5" />
                          {i < exp.itinerary.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                        </div>
                        <div className="pb-6">
                          <p className="text-xs font-semibold text-primary">{item.time}</p>
                          <p className="text-sm text-foreground mt-0.5">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Incluye" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-3">✅ Incluye</h3>
                      <ul className="space-y-2">
                        {exp.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                            <Check size={14} className="text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-3">❌ No incluye</h3>
                      <ul className="space-y-2">
                        {exp.notIncludes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <X size={14} className="text-destructive shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "Recomendaciones" && (
                  <ul className="space-y-3">
                    {exp.recommendations.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                        <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <EstelaCard
                variant="gold"
                className={sidebarStuck ? "sticky top-28" : ""}
                style={sidebarStuck ? { maxHeight: "calc(100vh - 120px)" } : undefined}
              >
                <div className="bg-card rounded-xl p-5 md:p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Desde</p>
                  <p className="font-heading text-3xl font-bold text-foreground">
                    ${exp.price.toLocaleString()} <span className="text-base font-normal text-muted-foreground">MXN</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">por persona</p>

                  <Button variant="cta" className="mt-5 w-full" asChild>
                    <a href="#reservar">Apartar mi lugar</a>
                  </Button>
                  <p className="text-center text-[11px] text-muted-foreground mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck size={12} className="text-primary" />
                    Sin compromiso · Respuesta en 24h
                  </p>
                  <Button variant="ghost" className="mt-3 w-full border border-border hover:bg-secondary" asChild>
                    <a
                      href="https://wa.me/529982186754?text=Hola,%20me%20interesa%20la%20experiencia%20de%20este%20enlace"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💬 WhatsApp
                    </a>
                  </Button>

                  <div className="mt-5 pt-5 border-t border-border space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duración</span>
                      <span className="text-foreground font-medium">{exp.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grupo</span>
                      <span className="text-foreground font-medium">{exp.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Idiomas</span>
                      <span className="text-foreground font-medium">{exp.languages.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calificación</span>
                      <span className="text-gold font-medium flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> {exp.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </EstelaCard>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky booking bar */}
      <MobileStickyBookingBar price={exp.price} />

      {/* Related */}
      <div ref={relatedRef}>
      {relatedExps.length > 0 && (
        <section className="py-10 md:py-14 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Experiencias relacionadas
            </h2>
            <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
              {relatedExps.map((rel) => rel && (
                <Link
                  key={rel.slug}
                  to={`/experiencias/${rel.slug}`}
                  className="snap-center min-w-[280px] md:min-w-0 group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all"
                >
                  <div className="h-36 bg-gradient-to-br from-primary/15 to-jade-light/25" />
                  <div className="p-4">
                    <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">{rel.stateName}</span>
                      <span className="font-semibold">${rel.price.toLocaleString()} MXN</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ExperienciaDetalle;
