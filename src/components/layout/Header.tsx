import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import logoTmt from "@/assets/logo-tmt.png";

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
    label: "Experiencias",
    href: "/experiencias",
    children: [
      { label: "Todas las experiencias", href: "/experiencias" },
      { label: "Cultural y patrimonio", href: "/experiencias/cultural-patrimonio" },
      { label: "Aventura y naturaleza", href: "/experiencias/aventura-naturaleza" },
      { label: "Gastronómico", href: "/experiencias/gastronomico" },
      { label: "Bienestar y relajación", href: "/experiencias/bienestar" },
    ],
  },
  {
    label: "Destinos",
    href: "/destinos",
    children: [
      { label: "Todos los destinos", href: "/destinos" },
      { label: "Cancún", href: "/destinos/cancun" },
      { label: "Tulum", href: "/destinos/tulum" },
      { label: "Mérida", href: "/destinos/merida" },
      { label: "Chichén Itzá", href: "/destinos/chichen-itza" },
      { label: "Palenque", href: "/destinos/palenque" },
      { label: "Campeche", href: "/destinos/campeche-ciudad" },
      { label: "Bacalar", href: "/destinos/bacalar" },
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
    label: "Paquetes",
    href: "/paquetes",
    children: [
      { label: "Todos los paquetes", href: "/paquetes" },
      { label: "Ruta de la grandeza maya", href: "/paquetes/ruta-grandeza-maya" },
      { label: "Cultura y gastronomía", href: "/paquetes/cultura-gastronomia-entretenimiento" },
      { label: "Aventura 5 estados", href: "/paquetes/aventura-naturaleza-5-estados" },
      { label: "Mundo Maya 4 días", href: "/paquetes/mundo-maya-classico-4-dias" },
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
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <a href="tel:+529982186754" className="p-2 text-primary">
              <Phone size={20} />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-card border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.children) {
                  const isExpanded = mobileExpanded === link.label;
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                        className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        {link.label}
                        <ChevronDown size={16} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                                className="block py-2.5 pl-8 pr-4 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 rounded-md transition-colors"
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
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href="#reservar"
                onClick={() => setIsOpen(false)}
                className="mt-2 py-3 px-4 bg-jade-dark text-primary-foreground font-semibold text-center rounded-md"
              >
                Reservar ahora
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
