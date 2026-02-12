import { Home, Map, Train, CalendarDays, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Map, label: "Rutas", href: "#rutas" },
  { icon: Train, label: "Vagones", href: "#vagones" },
  { icon: CalendarDays, label: "Reservar", href: "#reservar" },
  { icon: User, label: "Cuenta", href: "#cuenta" },
];

const BottomNav = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[48px] text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
