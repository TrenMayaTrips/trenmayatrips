import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-jade-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl font-bold mb-3">Tren Turístico</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Descubre México desde la ventana de un tren. Lujo, cultura y naturaleza en una experiencia única.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Explora</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Rutas", "Experiencias", "Vagones", "Paquetes", "Blog"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {["Nosotros", "Sostenibilidad", "Prensa", "Trabaja con nosotros"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-gold transition-colors">{l}</a>
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
                <span>+52 (55) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <span>info@trenturistico.mx</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-gold mt-0.5" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© 2026 Tren Turístico de México. Todos los derechos reservados.</p>
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
