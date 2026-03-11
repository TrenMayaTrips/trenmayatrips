import { CheckCircle, Star, ShieldCheck, Clock } from "lucide-react";

const indicators = [
  { icon: Clock, text: "Respuesta promedio: 4 horas" },
  { icon: CheckCircle, text: "500+ viajeros satisfechos" },
  { icon: Star, text: "4.8/5 en Google Reviews", href: "https://g.page/r/trenmayatrips/review" },
  { icon: ShieldCheck, text: "Datos protegidos", href: "/aviso-privacidad" },
];

const TrustIndicators = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-0 mt-5 pt-5 border-t border-border">
    {indicators.map(({ icon: Icon, text, href }, i) => {
      const content = (
        <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Icon size={16} className="text-primary flex-shrink-0" />
          {text}
        </span>
      );
      return (
        <div key={text} className="flex items-center">
          {i > 0 && <span className="hidden sm:block w-px h-4 bg-border mx-3" aria-hidden />}
          {href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-primary transition-colors"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </div>
      );
    })}
  </div>
);

export default TrustIndicators;
