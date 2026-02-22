import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoTmt from "@/assets/logo-tmt.png";
import { footerPanoramic } from "@/data/litografias";

const Footer = () => {
  return (
    <footer className="bg-jade-dark text-primary-foreground">
      {/* Decorative lithograph strip */}
      <div className="relative h-[140px] md:h-[180px] overflow-hidden">
        <img
          src={footerPanoramic}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover catherwood-lithograph-dark opacity-[0.18] catherwood-mask"
          style={{ filter: "sepia(20%) contrast(0.85) brightness(0.7)", mixBlendMode: "luminosity" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-jade-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-jade-dark via-jade-dark/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logoTmt} alt="Tren Maya Trips" className="h-12 w-auto brightness-0 invert" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Explora el Mundo Maya a bordo del Tren Maya. Circuitos turísticos con experiencias únicas en el sureste de México.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Explora</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {[
                { label: "Destinos", href: "/destinos" },
                { label: "Experiencias", href: "/experiencias" },
                { label: "Tren Maya", href: "/tren-maya" },
                { label: "Paquetes", href: "/paquetes" },
                { label: "Itinerarios", href: "/itinerarios" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {[
                { label: "Nosotros", href: "#" },
                { label: "Sostenibilidad", href: "#" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contacto" },
                { label: "Trabaja con nosotros", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gold" />
                <span>(52) 998 218 6754</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <span>info@trenmayantrips.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-gold mt-0.5" />
                <span>Av. Mallorca, Residencial Mallorca, Benito Juárez, Quintana Roo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© 2026 Tren Maya Trips. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Privacidad</a>
            <a href="#" className="hover:text-gold transition-colors">Términos</a>
            <a href="#" className="hover:text-gold transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile nav */}
      <div className="h-16 md:h-0" />
    </footer>
  );
};

export default Footer;
