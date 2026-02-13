import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Experiencias", href: "/experiencias" },
  { label: "Paquetes", href: "/paquetes" },
  { label: "Tren Maya", href: "/tren-maya" },
  { label: "Blog", href: "/blog" },
  { label: "Destinos", href: "/destinos" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm md:text-lg">T</span>
          </div>
          <div className="flex flex-col leading-tight">
         <span className="font-heading font-bold text-foreground text-base md:text-lg tracking-wide">Tren Maya</span>
            <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">Trips</span>
          </div>
        </a>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("/#");
              return isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
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
              className="ml-2 px-5 py-2.5 bg-accent text-accent-foreground font-semibold text-sm rounded-md hover:bg-gold-light transition-colors"
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
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => {
                const isExternal = link.href.startsWith("/#");
                return isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-3 px-4 text-base font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
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
                className="mt-2 py-3 px-4 bg-accent text-accent-foreground font-semibold text-center rounded-md"
              >
                Reservar Ahora
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
