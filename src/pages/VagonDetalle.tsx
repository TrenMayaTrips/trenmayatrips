import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check, ArrowRight, ChevronLeft, X, Expand, Play } from "lucide-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import PageLayout from "@/components/layout/PageLayout";
import ParallaxHero from "@/components/layout/ParallaxHero";
import { findWagonBySlug, wagonClassesDetailed } from "@/data/wagon-classes";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import VideoEmbed from "@/components/ui/VideoEmbed";

// ── Wagon Gallery Component ──────────────────────────────────────────────────
interface WagonGalleryProps {
  images: string[];
  wagonName: string;
}

const WagonGallery = ({ images, wagonName }: WagonGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const total = images.length;

  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % total), [total]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Touch / swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      {/* ── Main image with arrows & counter ── */}
      <div className="rounded-xl overflow-hidden border border-border mb-3 relative group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${wagonName} – Foto ${activeIdx + 1}`}
            className="w-full h-56 md:h-96 object-cover cursor-zoom-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxOpen(true)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        </AnimatePresence>

        {/* Expand hint */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(0,0,0,0.45)" }}
          aria-label="Ver en pantalla completa"
        >
          <Expand size={16} className="text-white" />
        </button>

        {/* Counter badge */}
        {total > 1 && (
          <div
            className="absolute bottom-3 left-3 text-white text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            {activeIdx + 1} / {total}
          </div>
        )}

        {/* Navigation arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(0,0,0,0.35)" }}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(0,0,0,0.35)" }}
              aria-label="Foto siguiente"
            >
              <ArrowRight size={20} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* ── Dots (mobile) + Thumbnails (desktop) ── */}
      {total > 1 && (
        <>
          {/* Mobile dots */}
          <div className="flex md:hidden justify-center gap-2 mb-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === activeIdx ? "hsl(var(--primary))" : "hsl(var(--border))", transform: i === activeIdx ? "scale(1.4)" : "scale(1)" }}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>

          {/* Desktop thumbnails */}
          <div className="hidden md:flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`relative h-16 md:h-20 flex-1 rounded-lg overflow-hidden transition-all ${
                  i === activeIdx
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.93)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
              aria-label="Cerrar"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/70 text-sm font-medium">
              {activeIdx + 1} / {total}
            </div>

            {/* Image */}
            <div
              className="relative w-full max-w-5xl px-4"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={images[activeIdx]}
                  alt={`${wagonName} – Foto ${activeIdx + 1}`}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>

            {/* Prev / Next arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  aria-label="Foto anterior"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  aria-label="Foto siguiente"
                >
                  <ArrowRight size={24} className="text-white" />
                </button>
              </>
            )}

            {/* Bottom dot strip */}
            {total > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      background: i === activeIdx ? "#fff" : "rgba(255,255,255,0.35)",
                      transform: i === activeIdx ? "scale(1.5)" : "scale(1)",
                    }}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Seat Layout Component ────────────────────────────────────────────────────
type SeatPos = "A" | "B" | "C" | "D";

const SEAT_META: Record<SeatPos, { type: "window" | "aisle"; label: string }> = {
  A: { type: "window", label: "Ventana" },
  B: { type: "aisle",  label: "Pasillo" },
  C: { type: "aisle",  label: "Pasillo" },
  D: { type: "window", label: "Ventana" },
};

function buildOccupied(seats: number): Set<string> {
  const rows = Math.min(6, Math.ceil(seats / 4));
  const occ = new Set<string>();
  let s = seats * 37 + 7;
  for (let r = 0; r < rows; r++) {
    for (const pos of ["A", "B", "C", "D"] as SeatPos[]) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      if ((s >>> 28) < 4) occ.add(`${r}-${pos}`);
    }
  }
  return occ;
}

interface SeatLayoutProps { seats: number; config: string; seatWidth: string; }

const SeatLayout = ({ seats, config, seatWidth }: SeatLayoutProps) => {
  const rows = Math.min(6, Math.ceil(seats / 4));
  const occupied = useMemo(() => buildOccupied(seats), [seats]);
  const [tooltip, setTooltip] = useState<{ row: number; pos: SeatPos } | null>(null);

  const styleOf = (row: number, pos: SeatPos): "window" | "aisle" | "occupied" =>
    occupied.has(`${row}-${pos}`) ? "occupied" : SEAT_META[pos].type;

  const cellCls = (style: "window" | "aisle" | "occupied") => {
    if (style === "window")
      return "bg-primary/15 border-primary/40 hover:bg-primary/25 cursor-pointer";
    if (style === "aisle")
      return "bg-muted border-border hover:bg-muted/70 cursor-pointer";
    return "bg-muted-foreground/25 border-muted-foreground/20 cursor-not-allowed opacity-60";
  };

  const SeatCell = ({ row, pos }: { row: number; pos: SeatPos }) => {
    const style = styleOf(row, pos);
    const active = tooltip?.row === row && tooltip?.pos === pos;
    const toggle = () => {
      if (style === "occupied") return;
      setTooltip(active ? null : { row, pos });
    };
    return (
      <div className="relative">
        <div
          className={`w-9 h-7 rounded border text-[9px] font-semibold flex items-center justify-center transition-colors select-none ${cellCls(style)} ${active ? "ring-2 ring-accent ring-offset-1 ring-offset-card" : ""}`}
          onMouseEnter={() => style !== "occupied" && setTooltip({ row, pos })}
          onMouseLeave={() => setTooltip(null)}
          onTouchEnd={(e) => { e.preventDefault(); toggle(); }}
          aria-label={`Fila ${row + 1}, Asiento ${pos} — ${SEAT_META[pos].label}`}
        >
          {style === "occupied" ? "×" : pos}
        </div>

        {active && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none">
            <div className="whitespace-nowrap px-2.5 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-medium shadow-xl">
              Fila {row + 1} · {pos} · {SEAT_META[pos].label}
            </div>
            <div className="w-0 h-0 mx-auto border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-foreground" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      {/* Front / Door */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/70 border-b border-border text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">🚪 Entrada / Salida</span>
        <span className="font-medium">← Frente del tren</span>
      </div>

      {/* Rows */}
      <div className="px-5 py-4 space-y-2">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex items-center justify-center gap-5">
            <div className="flex gap-1.5">
              <SeatCell row={row} pos="A" />
              <SeatCell row={row} pos="B" />
            </div>
            <span className="text-[10px] text-muted-foreground/40 font-mono w-4 text-center">{row + 1}</span>
            <div className="flex gap-1.5">
              <SeatCell row={row} pos="C" />
              <SeatCell row={row} pos="D" />
            </div>
          </div>
        ))}
      </div>

      {/* Rear / Bathrooms */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/70 border-t border-border text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">🚻 Sanitarios</span>
        <span className="font-medium">Parte trasera →</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 border-t border-border bg-background text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-primary/15 border border-primary/40" />
          Ventana
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-muted border border-border" />
          Pasillo
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded bg-muted-foreground/25 border border-muted-foreground/20 opacity-60" />
          Ocupado
        </div>
      </div>

      {/* Specs + disclaimer */}
      <div className="px-5 py-3 border-t border-border bg-background text-center space-y-1">
        <p className="text-xs text-muted-foreground">
          {seats} asientos · Configuración {config} · Ancho {seatWidth}
        </p>
        <p className="text-[11px] text-muted-foreground/60 italic">
          La selección de asiento estará disponible al momento de la reserva.
        </p>
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
const VagonDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const wagon = findWagonBySlug(slug || "");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!wagon) return <Navigate to="/tren-maya" replace />;

  const otherClasses = wagonClassesDetailed.filter((w) => w.slug !== wagon.slug);

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero
        imageSrc={wagon.heroImage}
        imageAlt={`Interior del vagón clase ${wagon.name}`}
        className="pt-24 md:pt-32 pb-14 md:pb-20 min-h-[340px] md:min-h-[460px]"
        overlayClass="bg-gradient-to-b from-black/50 via-black/55 to-black/70"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs mb-4">
            <Link to="/tren-maya" className="hover:text-white transition-colors">Tren Maya</Link>
            <span>/</span>
            <span>Clases</span>
            <span>/</span>
            <span className="text-white">{wagon.name}</span>
          </nav>

          {wagon.isFeatured && wagon.badge && (
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-3">
              {wagon.badge}
            </span>
          )}
          <p className="text-accent font-medium tracking-[0.25em] uppercase text-xs mb-2">{wagon.type}</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">{wagon.name}</h1>
          <p className="mt-3 text-white/75 text-sm md:text-base max-w-xl mx-auto italic">
            "{wagon.meaningFull}"
          </p>
          <p className="mt-4 font-heading text-2xl md:text-3xl font-bold text-white">
            ${wagon.priceBase.toLocaleString()} <span className="text-base font-normal text-white/70">MXN / tramo</span>
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              to="/contacto"
               className="inline-block px-8 py-3 rounded-lg font-bold text-sm transition-colors bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Reservar desde ${wagon.priceBase.toLocaleString()} MXN
            </Link>
            <button
              onClick={() => document.getElementById('comparativa-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              O compara las 3 clases ↓
            </button>
          </div>
        </motion.div>
      </ParallaxHero>

      {/* Class Navigation Tabs */}
      <nav className="bg-card border-b border-border sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
            {wagonClassesDetailed.map((w) => {
              const isCurrent = w.slug === wagon.slug;
              return (
                <Link
                  key={w.slug}
                  to={`/tren-maya/clases/${w.slug}`}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isCurrent
                      ? "text-white shadow-md"
                      : "border border-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                  style={isCurrent ? { backgroundColor: "#D4A853", color: "#fff" } : {}}
                >
                  {w.name}
                  <span className={`ml-1.5 ${isCurrent ? "text-white/80" : "text-muted-foreground"}`}>
                    ${w.priceBase.toLocaleString()}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Stats row */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: String(wagon.seats), label: "Asientos" },
              { value: wagon.config, label: "Configuración" },
              { value: wagon.seatWidth, label: "Ancho de asiento" },
              { value: `$${wagon.priceBase.toLocaleString()}`, label: "Precio base" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="font-heading text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="md" />

      {/* Gallery & Video */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="section-label">Galería</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Interior del vagón</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Enhanced photo gallery */}
            <WagonGallery images={wagon.galleryImages} wagonName={wagon.name} />

            {/* Video / Interior view */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {wagon.videoUrl ? "📹 Recorrido en video" : "🖼️ Vista interior"}
              </p>

              <div className="rounded-xl overflow-hidden border border-border relative">
                {wagon.videoUrl ? (
                  <VideoEmbed
                    url={wagon.videoUrl}
                    poster={wagon.heroImage}
                    badge="Recorrido virtual"
                    autoplay={false}
                  />
                ) : (
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={wagon.heroImage}
                      alt={`Vista interior de ${wagon.name}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 text-foreground text-sm font-semibold">
                        <Play size={16} className="text-primary" />
                        Próximamente
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seat layout */}
      <section className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Distribución</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Layout de asientos</h2>
          </div>
          <SeatLayout seats={wagon.seats} config={wagon.config} seatWidth={wagon.seatWidth} />
        </div>
      </section>

      {/* Amenities */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">A bordo</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Amenidades detalladas</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {wagon.amenities.map((amenity, i) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{amenity.icon}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2">{amenity.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{amenity.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparativa-section" className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Comparativa</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">¿Cómo se compara?</h2>
          </div>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 rounded-tl-lg font-medium bg-primary text-primary-foreground">
                    Característica
                  </th>
                  {wagonClassesDetailed.map((w, idx) => {
                    const isCurrent = w.slug === wagon.slug;
                    const isLast = idx === wagonClassesDetailed.length - 1;
                    return (
                      <th
                        key={w.slug}
                        className={`px-4 py-3 font-medium text-center relative ${isLast ? "rounded-tr-lg" : ""}`}
                        style={{
                          backgroundColor: isCurrent ? "#D4A853" : "hsl(var(--primary) / 0.85)",
                          color: isCurrent ? "#2D4A3E" : "hsl(var(--primary-foreground))",
                          borderTop: isCurrent ? "3px solid #D4A853" : "none",
                        }}
                      >
                        <Link
                          to={`/tren-maya/clases/${w.slug}`}
                          className="hover:underline underline-offset-2"
                        >
                          {w.name} {isCurrent && "★"}
                        </Link>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Precio base", key: "price" as const },
                  { label: "Comida", key: "comida" as const },
                  { label: "Pantalla", key: "pantalla" as const },
                  { label: "Espacio asiento", key: "espacio" as const },
                  { label: "Lounge VIP", key: "lounge" as const },
                  { label: "Atención VIP", key: "atencionVIP" as const },
                ].map((row, i) => (
                  <tr key={row.label}>
                    <td className={`px-4 py-3 font-medium text-foreground ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                      {row.label}
                    </td>
                    {wagonClassesDetailed.map((w) => {
                      const isCurrent = w.slug === wagon.slug;
                      return (
                        <td
                          key={w.slug}
                          className={`px-4 py-3 text-center ${isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                          style={{
                            backgroundColor: isCurrent
                              ? "#FFF8E1"
                              : i % 2 === 0 ? "hsl(var(--card))" : "hsl(var(--secondary) / 0.3)",
                          }}
                        >
                          {row.key === "price" ? `$${w.priceBase.toLocaleString()}` : w.comparison[row.key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* CTA Row */}
                <tr>
                  <td className="px-4 py-4 bg-card rounded-bl-lg" />
                  {wagonClassesDetailed.map((w, idx) => {
                    const isCurrent = w.slug === wagon.slug;
                    const isLast = idx === wagonClassesDetailed.length - 1;
                    const isUpgrade = w.priceBase > wagon.priceBase;
                    return (
                      <td
                        key={w.slug}
                        className={`px-3 py-4 text-center ${isLast ? "rounded-br-lg" : ""}`}
                        style={{ backgroundColor: isCurrent ? "#FFF8E1" : "hsl(var(--card))" }}
                      >
                        {isCurrent ? (
                          <span className="inline-block px-4 py-2 rounded-lg text-xs font-medium bg-muted text-muted-foreground cursor-default">
                            Clase actual
                          </span>
                        ) : (
                          <Link
                            to={`/tren-maya/clases/${w.slug}`}
                            className="inline-block px-4 py-2 rounded-lg text-xs font-bold border-2 transition-colors"
                            style={{
                              borderColor: "#D4A853",
                              color: "#D4A853",
                              backgroundColor: "transparent",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#D4A853";
                              e.currentTarget.style.color = "#2D4A3E";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "#D4A853";
                            }}
                          >
                            {isUpgrade ? `Subir a ${w.name} →` : `Ver ${w.name} →`}
                          </Link>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="section-label">Preguntas frecuentes</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Preguntas sobre {wagon.name}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {wagon.faqs.map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                  >
                    <span className="font-medium text-foreground text-sm md:text-base pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
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
                        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-primary/10">
                          <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other classes */}
      <section className="py-10 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Otras clases disponibles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {otherClasses.map((w) => (
              <Link
                key={w.slug}
                to={`/tren-maya/clases/${w.slug}`}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-36 overflow-hidden">
                  <img src={w.heroImage} alt={`Vagón ${w.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">{w.typeShort}</p>
                  <h3 className="font-heading text-lg font-bold text-foreground mt-1">{w.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{w.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-heading font-bold text-foreground">${w.priceBase.toLocaleString()} MXN</span>
                    <span className="text-sm text-primary font-medium group-hover:underline flex items-center gap-1">
                      Ver detalles <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-16 bg-primary relative">
        <MayaPattern variant="greca" opacity={0.05} />
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            ¿Listo para viajar en clase {wagon.name}?
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-sm md:text-base">
            Solicita tu cotización personalizada y reserva tu lugar
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:brightness-110 shadow-lg"
              style={{ backgroundColor: "#D4A853", color: "#2D4A3E" }}
            >
              Reservar desde ${wagon.priceBase.toLocaleString()} MXN →
            </Link>
            <a
              href="https://wa.me/529982186754?text=Hola%2C%20me%20interesa%20la%20clase%20{wagon.name}%20del%20Tren%20Maya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              💬 Escríbenos al (52) 998 218 6754
            </a>
          </div>
          <p className="mt-5 text-primary-foreground/50 text-xs">
            Sin cargos ocultos · Cancelación flexible · Atención en español
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default VagonDetalle;
