import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  CalendarDays,
  MoreHorizontal,
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Sparkles,
  Package,
  Train,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { LucideIcon } from "lucide-react";

interface SubLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface NavItemDef {
  icon: LucideIcon;
  label: string;
  href: string;
  subLinks?: SubLink[];
  isCenter?: boolean;
}

const navItems: NavItemDef[] = [
  { icon: Home, label: "Inicio", href: "/" },
  {
    icon: Compass,
    label: "Explorar",
    href: "/destinos",
    subLinks: [
      { label: "Destinos", href: "/destinos", icon: MapPin },
      { label: "Experiencias", href: "/experiencias", icon: Sparkles },
      { label: "Paquetes", href: "/paquetes", icon: Package },
    ],
  },
  { icon: CalendarDays, label: "Reservar", href: "/itinerarios", isCenter: true },
  {
    icon: Train,
    label: "Tren Maya",
    href: "/tren-maya",
    subLinks: [
      { label: "Todo sobre el Tren", href: "/tren-maya", icon: Train },
      { label: "Clase Xiinbal", href: "/tren-maya/clases/xiinbal" },
      { label: "Clase Janal", href: "/tren-maya/clases/janal" },
      { label: "Clase P'atal", href: "/tren-maya/clases/patal" },
    ],
  },
];

const moreLinks = [
  {
    title: "Rutas",
    links: [
      { label: "Cancún – Mérida", href: "/tren-maya/rutas/cancun-merida" },
      { label: "Cancún – Tulum", href: "/tren-maya/rutas/cancun-tulum" },
      { label: "Mérida – Palenque", href: "/tren-maya/rutas/merida-palenque" },
    ],
  },
  {
    title: "Más",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contacto" },
      { label: "Sobre Nosotros", href: "/sobre-nosotros" },
      { label: "Sostenibilidad", href: "/sostenibilidad" },
    ],
  },
];

const BottomNav = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
        setSubMenuOpen(null);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setSubMenuOpen(null);
  }, [location.pathname]);

  if (!isMobile) return null;

  const handleNavTap = (item: NavItemDef) => {
    if (item.subLinks) {
      setSubMenuOpen(subMenuOpen === item.label ? null : item.label);
    } else {
      setSubMenuOpen(null);
    }
  };

  return (
    <>
      {/* Sub-menu popover */}
      <AnimatePresence>
        {subMenuOpen && isVisible && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-[68px] left-0 right-0 z-[1099] px-4 pb-2 safe-area-bottom"
          >
            <div className="bg-card/98 backdrop-blur-lg border border-border rounded-xl shadow-xl p-2">
              {navItems
                .find((i) => i.label === subMenuOpen)
                ?.subLinks?.map((sub) => {
                  const SubIcon = sub.icon;
                  return (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      onClick={() => setSubMenuOpen(null)}
                      className="flex items-center gap-3 py-3 px-3 rounded-lg text-sm font-medium text-foreground/85 hover:bg-secondary/60 transition-colors"
                    >
                      {SubIcon && <SubIcon size={18} className="text-primary" />}
                      {sub.label}
                    </Link>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for submenu */}
      <AnimatePresence>
        {subMenuOpen && isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-[1098]"
            onClick={() => setSubMenuOpen(null)}
          />
        )}
      </AnimatePresence>

      {/* Main bottom nav */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-[1100] bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom"
          >
            <div className="flex items-center justify-around h-16 px-1">
              {navItems.map(({ icon: Icon, label, href, subLinks, isCenter }) => {
                const isActive =
                  location.pathname === href ||
                  (href !== "/" && location.pathname.startsWith(href));
                const hasSubMenu = !!subLinks;
                const isSubOpen = subMenuOpen === label;

                // Center "Reservar" button — elevated style
                if (isCenter) {
                  return (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setSubMenuOpen(null)}
                      className="flex flex-col items-center justify-center gap-0.5 min-w-[52px] min-h-[48px] -mt-3"
                    >
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-jade-dark text-primary-foreground shadow-lg border-[3px] border-card">
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <span className="text-[10px] font-semibold text-foreground mt-0.5">
                        {label}
                      </span>
                    </Link>
                  );
                }

                // Items with submenu
                if (hasSubMenu) {
                  return (
                    <button
                      key={label}
                      onClick={() => handleNavTap({ icon: Icon, label, href, subLinks })}
                      className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] transition-colors ${
                        isActive || isSubOpen
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Icon size={20} strokeWidth={isActive || isSubOpen ? 2.2 : 1.8} />
                      <span className="flex items-center gap-0.5">
                        <span className={`text-[10px] ${isActive || isSubOpen ? "font-semibold" : "font-medium"}`}>
                          {label}
                        </span>
                        <ChevronDown
                          size={10}
                          className={`transition-transform ${isSubOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                  );
                }

                // Regular items
                return (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => setSubMenuOpen(null)}
                    className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                      {label}
                    </span>
                  </Link>
                );
              })}

              {/* Más button */}
              <button
                onClick={() => {
                  setSubMenuOpen(null);
                  setSheetOpen(true);
                }}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] transition-colors ${
                  sheetOpen
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <MoreHorizontal size={20} strokeWidth={1.8} />
                <span className="text-[10px] font-medium">Más</span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sheet "Más" */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[75vh] rounded-t-2xl px-0 pb-safe">
          <SheetHeader className="px-6 pb-2">
            <SheetTitle className="text-lg font-semibold text-foreground">
              Menú
            </SheetTitle>
          </SheetHeader>

          <div className="overflow-y-auto px-4 pb-6 space-y-5">
            {moreLinks.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setSheetOpen(false)}
                      className="flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-foreground/85 hover:bg-secondary/60 transition-colors"
                    >
                      {link.label}
                      <ChevronRight size={16} className="text-muted-foreground/50" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact actions */}
            <div className="flex gap-3 pt-2 px-2">
              <a
                href="https://wa.me/529982186754"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href="tel:+529982186754"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <Phone size={18} />
                Llamar
              </a>
            </div>

            {/* CTA */}
            <Link
              to="/itinerarios"
              onClick={() => setSheetOpen(false)}
              className="block mx-2 py-3.5 bg-jade-dark text-primary-foreground font-semibold text-center rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Reservar ahora
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BottomNav;
