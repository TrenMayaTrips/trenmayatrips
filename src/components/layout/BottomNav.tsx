import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Map, Train, CalendarDays, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Map, label: "Rutas", href: "/tren-maya" },
  { icon: Train, label: "Vagones", href: "/tren-maya/clases/janal" },
  { icon: CalendarDays, label: "Reservar", href: "/itinerarios" },
  { icon: User, label: "Contacto", href: "/contacto" },
];

const BottomNav = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up or near top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
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
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom"
        >
          <div className="flex items-center justify-around h-16 px-2">
            {items.map(({ icon: Icon, label, href }) => {
              const isActive = location.pathname === href || 
                (href !== "/" && location.pathname.startsWith(href));
              
              return (
                <Link
                  key={label}
                  to={href}
                  className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default BottomNav;
