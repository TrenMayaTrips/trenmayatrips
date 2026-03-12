import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [lightboxOpen, prev, next]);

  // Swipe handlers for lightbox
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="h-56 md:h-80 rounded-xl bg-gradient-to-br from-primary/15 to-jade-light/25 border border-border" />
    );
  }

  // Mobile scroll-snap gallery
  if (isMobile) {
    return (
      <>
        <div className="relative rounded-xl overflow-hidden border border-border">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={() => {
              if (!scrollRef.current) return;
              const idx = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
              setCurrent(idx);
            }}
          >
            {images.map((img, i) => (
              <div key={i} className="snap-center min-w-full h-56 relative shrink-0">
                <img
                  src={img}
                  alt={`${title} - Foto ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onClick={() => { setCurrent(i); setLightboxOpen(true); }}
                />
                <button
                  onClick={() => { setCurrent(i); setLightboxOpen(true); }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center"
                  aria-label="Ampliar"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            ))}
          </div>
          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>

        <Lightbox
          images={images}
          current={current}
          title={title}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </>
    );
  }

  // Desktop gallery
  return (
    <>
      <div className="relative rounded-xl overflow-hidden border border-border group">
        {/* Main Image */}
        <div
          className="relative h-56 md:h-80 bg-muted cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`${title} - Foto ${current + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          {/* Zoom icon */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn size={16} />
          </div>
          {/* Counter */}
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
            {current + 1}/{images.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative h-14 md:h-16 flex-1 rounded-lg overflow-hidden transition-all ${
                i === current
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${title} - Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        images={images}
        current={current}
        title={title}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={prev}
        onNext={next}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </>
  );
};

/* ── Lightbox ── */

interface LightboxProps {
  images: string[];
  current: number;
  title: string;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const Lightbox = ({ images, current, title, open, onClose, onPrev, onNext, onTouchStart, onTouchMove, onTouchEnd }: LightboxProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Counter */}
        <span className="absolute top-4 left-4 text-white/80 text-sm font-medium z-10">
          {current + 1} / {images.length}
        </span>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} - Foto ${current + 1}`}
            className="max-h-[85vh] max-w-[92vw] md:max-w-[80vw] object-contain rounded-lg select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ImageGallery;
