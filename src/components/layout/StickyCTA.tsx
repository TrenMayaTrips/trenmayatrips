import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setExpanded(false); // Collapse when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-[999]"
          style={{ bottom: 80, left: 16 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          layout
        >
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.a
                key="expanded"
                href="/itinerarios"
                initial={{ width: 56, borderRadius: 28 }}
                animate={{ width: "auto", borderRadius: 16 }}
                exit={{ width: 56, borderRadius: 28 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => setExpanded(false)}
                className="flex items-center gap-2 bg-accent text-white font-heading font-semibold text-sm px-5 py-3.5 shadow-lg hover:shadow-xl active:scale-[0.98] whitespace-nowrap"
                style={{ borderRadius: 16 }}
              >
                <CalendarDays size={20} />
                Planifica tu viaje
              </motion.a>
            ) : (
              <motion.button
                key="collapsed"
                onClick={() => setExpanded(true)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center"
                aria-label="Planifica tu viaje"
              >
                <CalendarDays size={22} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
