import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarDays } from "lucide-react";

const StickyCTA = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-[72px] left-4 right-4 z-40">
      <a
        href="#reservar"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent text-accent-foreground font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
      >
        <CalendarDays size={18} />
        Planifica tu Viaje
      </a>
    </div>
  );
};

export default StickyCTA;
