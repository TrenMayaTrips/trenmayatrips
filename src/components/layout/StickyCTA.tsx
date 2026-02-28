import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyCTA = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-[72px] left-4 right-4 z-40">
      <Button variant="cta" className="w-full py-3.5 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98]" asChild>
        <a href="#reservar">
          <CalendarDays size={18} />
          Planifica tu viaje
        </a>
      </Button>
    </div>
  );
};

export default StickyCTA;
