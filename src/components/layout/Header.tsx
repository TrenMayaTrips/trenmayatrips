import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import logoTmt from "@/assets/logo-tmt.png";
import SearchOverlay from "./SearchOverlay";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navLinks: NavItem[] = [
  {
    label: "Explorar",
    href: "/destinos",
    children: [
      { label: "Destinos", href: "/destinos" },
      { label: "Experiencias", href: "/experiencias" },
      { label: "Paquetes", href: "/paquetes" },
    ],
  },
  {
    label: "Tren Maya",
    href: "/tren-maya",
    children: [
      { label: "Todo sobre el Tren Maya", href: "/tren-maya" },
      { label: "Clase Xiinbal", href: "/tren-maya/clases/xiinbal" },
      { label: "Clase Janal", href: "/tren-maya/clases/janal" },
      { label: "Clase P'atal", href: "/tren-maya/clases/patal" },
      { label: "Ruta Cancún – Mérida", href: "/tren-maya/rutas/cancun-merida" },
      { label: "Ruta Cancún – Tulum", href: "/tren-maya/rutas/cancun-tulum" },
      { label: "Ruta Mérida – Palenque", href: "/tren-maya/rutas/merida-palenque" },
    ],
  },
  {
    label: "Itinerarios",
    href: "/itinerarios",
  },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logoTmt} alt="Tren Maya Trips" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    </Link>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 py-2"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="#reservar"
              className="ml-2 px-5 py-2.5 bg-jade-dark text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary transition-colors"
            >
              Reservar
            </a>
          </nav>
        )}

      </div>
    </header>
  );
};

export default Header;
