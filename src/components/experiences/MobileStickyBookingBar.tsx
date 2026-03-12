import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileStickyBookingBarProps {
  price: number;
}

const MobileStickyBookingBar = ({ price }: MobileStickyBookingBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-[60px] left-0 right-0 z-40 bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden"
        >
          <div className="flex items-center justify-between px-4 py-2.5 gap-3">
            <div className="shrink-0">
              <p className="text-[11px] text-muted-foreground leading-none">Desde</p>
              <p className="font-heading text-lg font-bold text-foreground leading-tight">
                ${price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">MXN</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/529982186754?text=Hola,%20me%20interesa%20información%20sobre%20esta%20experiencia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <Button variant="cta" size="sm" className="whitespace-nowrap" asChild>
                <a href="#reservar">Reservar</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyBookingBar;
