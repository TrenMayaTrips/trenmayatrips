import { useParams, Link } from "react-router-dom";
import { Clock, Users, Star, Check, X, MapPin, Mountain, ChevronRight, MessageCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import EstelaCard from "@/components/maya/EstelaCard";
import { Button } from "@/components/ui/button";
import { packages, packageTypes, type Package } from "@/data/packages";
import { packageImageMap } from "@/data/package-images";
import NotFound from "./NotFound";

const difficultyColors: Record<string, string> = {
  fácil: "bg-green-100 text-green-800",
  moderado: "bg-amber-100 text-amber-800",
  desafiante: "bg-red-100 text-red-800",
};

const PaqueteDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) return <NotFound />;

  const heroImage = packageImageMap[pkg.slug] || "/placeholder.svg";
  const related = packages.filter((p) => p.type === pkg.type && p.slug !== pkg.slug).slice(0, 3);

  const handleQuote = () => {
    const message = `Hola, me interesa el paquete "${pkg.title}" (${pkg.duration} días, $${pkg.price.toLocaleString()} MXN). ¿Pueden ayudarme con una cotización?`;
    window.open(`https://wa.me/529982186754?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero imageSrc={heroImage} imageAlt={pkg.title}>
        <nav className="flex items-center justify-center gap-2 text-white/70 text-sm mb-4">
          <Link to="/paquetes" className="hover:text-white transition-colors">Paquetes</Link>
          <ChevronRight size={14} />
          <span className="text-white">{pkg.title}</span>
        </nav>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${difficultyColors[pkg.difficulty] || "bg-secondary text-foreground"}`}>
          {packageTypes[pkg.type]}
        </span>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {pkg.title}
        </h1>
        <div className="flex items-center justify-center gap-4 mt-4 text-white/90">
          <span className="font-heading text-2xl font-bold">${pkg.price.toLocaleString()} <span className="text-sm font-normal">MXN</span></span>
          <span className="flex items-center gap-1"><Star size={16} className="text-gold fill-gold" /> {pkg.rating} ({pkg.reviews})</span>
        </div>
      </ParallaxHero>

      <GrecaDivider variant="jade" />

      {/* Description */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-foreground/80 leading-relaxed">{pkg.description}</p>
          <p className="text-sm text-muted-foreground mt-3">Ideal para: {pkg.bestFor}</p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <MetricCard icon={<Clock size={20} className="text-accent" />} label="Duración" value={`${pkg.duration} días`} />
            <MetricCard icon={<Users size={20} className="text-accent" />} label="Grupo" value={pkg.groupSize} />
            <MetricCard icon={<Mountain size={20} className="text-accent" />} label="Dificultad" value={pkg.difficulty} />
            <MetricCard icon={<Star size={20} className="text-gold fill-gold" />} label="Rating" value={`${pkg.rating}`} />
            <MetricCard icon={<MapPin size={20} className="text-accent" />} label="Estados" value={`${pkg.states.length}`} />
          </div>
        </div>
      </section>

      <GrecaDivider variant="gold" />

      {/* Itinerary — stepped pyramid timeline */}
      <section className="relative py-12 md:py-20 bg-background overflow-hidden">
        <MayaPattern variant="greca" opacity={0.03} />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Itinerario día a día
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-6">
              {pkg.itinerary.map((day, i) => (
                <div key={day.day} className="relative pl-14 md:pl-16">
                  {/* Step node */}
                  <div
                    className="absolute left-2.5 md:left-3.5 w-5 h-5 md:w-5 md:h-5 rounded bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold"
                    style={{ top: "0.25rem", clipPath: "polygon(0 20%, 20% 0, 80% 0, 100% 20%, 100% 100%, 0 100%)" }}
                  >
                    {day.day}
                  </div>
                  <EstelaCard variant={i % 2 === 0 ? "jade" : "gold"}>
                    <div className="p-4 md:p-5">
                      <h3 className="font-heading text-lg font-bold text-foreground">{day.title}</h3>
                      <p className="text-sm text-foreground/70 mt-1">{day.description}</p>
                    </div>
                  </EstelaCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GrecaDivider variant="terracotta" />

      {/* Includes / Excludes */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <EstelaCard variant="jade">
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">✓ Incluye</h3>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </EstelaCard>
            <EstelaCard variant="gold">
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">✕ No incluye</h3>
                <ul className="space-y-2">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </EstelaCard>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">Destinos incluidos</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {pkg.highlights.map((h) => (
              <span key={h} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground">
                {h}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {pkg.states.map((s) => (
              <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Rating */}
      {pkg.seasonalRating && (
        <>
          <GrecaDivider variant="jade" size="sm" />
          <section className="py-10 md:py-14 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">Mejor época para viajar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(pkg.seasonalRating).map(([season, rating]) => (
                  <div key={season} className="text-center p-4 bg-card border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{season}</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star size={16} className="text-gold fill-gold" />
                      <span className="font-heading text-xl font-bold text-foreground">{rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-jade-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿Listo para vivir esta experiencia?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Cotiza sin compromiso por WhatsApp y resuelve todas tus dudas con nuestros expertos.
          </p>
          <Button onClick={handleQuote} variant="secondary" size="lg" className="gap-2">
            <MessageCircle size={18} /> Solicitar cotización
          </Button>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Paquetes similares</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} to={`/paquetes/${r.slug}`} className="group block rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all">
                  <div className="h-40 overflow-hidden">
                    <img src={packageImageMap[r.slug] || "/placeholder.svg"} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary font-medium mb-1">{packageTypes[r.type]}</p>
                    <h3 className="font-heading text-lg font-bold text-foreground">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{r.duration} días · ${r.price.toLocaleString()} MXN</p>
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

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
    {icon}
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold text-sm text-foreground capitalize">{value}</p>
    </div>
  </div>
);

export default PaqueteDetalle;
