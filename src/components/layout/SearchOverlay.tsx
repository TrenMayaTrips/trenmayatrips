import { useState, useEffect, useRef } from "react";
import { X, Search, MapPin, Compass, Train } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDestinations } from "@/hooks/useDestinations";
import { experiences } from "@/data/experiences";
import { routes } from "@/data/routes";

interface SearchResult {
  label: string;
  href: string;
  category: string;
  icon: typeof MapPin;
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const { data: destinations = [] } = useDestinations();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Escape key closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const q = query.toLowerCase().trim();

  const results: SearchResult[] = q.length < 2 ? [] : [
    ...destinations
      .filter((d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q))
      .slice(0, 5)
      .map((d) => ({ label: d.name, href: `/destinos/${d.slug}`, category: "Destinos", icon: MapPin })),
    ...experiences
      .filter((e) => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
      .slice(0, 5)
      .map((e) => ({ label: e.title, href: `/experiencias/${e.category}/${e.slug}`, category: "Experiencias", icon: Compass })),
    ...routes
      .filter((r) => r.origin.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q))
      .slice(0, 3)
      .map((r) => ({ label: `${r.origin} → ${r.destination}`, href: `/tren-maya/rutas/${r.slug}`, category: "Rutas", icon: Train })),
  ];

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-background"
    >
      <div className="container mx-auto px-4 pt-4">
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search size={20} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar destinos, experiencias, rutas…"
            className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Results */}
        <div className="mt-6 max-h-[70vh] overflow-y-auto">
          {q.length >= 2 && results.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              No se encontraron resultados para "{query}"
            </p>
          )}

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {category}
              </h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <item.icon size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="text-foreground/90 group-hover:text-foreground">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {q.length < 2 && (
            <div className="text-center py-16">
              <Search size={40} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-sm">Escribe al menos 2 caracteres para buscar</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchOverlay;
