import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  if (!isMobile) return null;

  return (
    <motion.div
      className="fixed z-40"
      style={{ bottom: 80, right: 16 }}
      layout
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.a
            key="expanded"
            href="#reservar"
            initial={{ width: 56, borderRadius: 28 }}
            animate={{ width: "auto", borderRadius: 16 }}
            exit={{ width: 56, borderRadius: 28 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setExpanded(false)}
            className="flex items-center gap-2 bg-gold text-white font-heading font-semibold text-sm px-5 py-3.5 shadow-lg hover:shadow-xl active:scale-[0.98] whitespace-nowrap"
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
            className="w-14 h-14 rounded-full bg-gold text-white shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center"
            aria-label="Planifica tu viaje"
          >
            <CalendarDays size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StickyCTA;
