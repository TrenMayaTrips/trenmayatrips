import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface ArticleTOCProps {
  items: TOCItem[];
}

const ArticleTOC = ({ items }: ArticleTOCProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track active section & progress via IntersectionObserver + scroll
  useEffect(() => {
    if (items.length === 0) return;

    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    // IntersectionObserver for active section
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current?.observe(el));

    // Scroll-based progress calculation
    const handleScroll = () => {
      const newProgress: Record<string, number> = {};
      for (let i = 0; i < headingEls.length; i++) {
        const start = headingEls[i].offsetTop;
        const end =
          i + 1 < headingEls.length
            ? headingEls[i + 1].offsetTop
            : document.documentElement.scrollHeight;
        const sectionHeight = end - start;
        const scrolled = window.scrollY + 120 - start;
        newProgress[items[i].id] = Math.min(1, Math.max(0, scrolled / sectionHeight));
      }
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setDrawerOpen(false);
    },
    []
  );

  if (items.length === 0) return null;

  const tocList = (
    <nav aria-label="Tabla de contenidos">
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const prog = progress[item.id] || 0;
          return (
            <li key={item.id} className="relative flex items-stretch">
              {/* Progress bar */}
              <div className="relative w-[3px] flex-shrink-0 rounded-full bg-border overflow-hidden mr-3">
                <div
                  className="absolute top-0 left-0 w-full bg-gold transition-all duration-300 rounded-full"
                  style={{ height: `${prog * 100}%` }}
                />
              </div>
              <button
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm leading-relaxed py-1.5 transition-colors duration-200 ${
                  item.level === 3 ? "pl-4" : ""
                } ${
                  isActive
                    ? "text-gold font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside className="hidden md:block sticky top-[100px] max-h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-thin">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Contenido
        </p>
        {tocList}
      </aside>

      {/* Mobile: FAB + drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-32 left-4 z-50 flex items-center gap-1.5 bg-card border border-border shadow-lg rounded-full px-4 py-2.5 text-sm font-medium text-foreground"
          aria-label="Abrir índice"
        >
          <List size={16} className="text-primary" />
          Índice
        </button>

        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40"
                onClick={() => setDrawerOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl max-h-[70vh] overflow-y-auto p-6 pb-10"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Índice del artículo
                  </p>
                  <button onClick={() => setDrawerOpen(false)} aria-label="Cerrar índice">
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>
                {/* Drag handle */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border" />
                {tocList}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ArticleTOC;
