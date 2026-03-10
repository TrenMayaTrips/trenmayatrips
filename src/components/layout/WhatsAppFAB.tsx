import { MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

const WhatsAppFAB = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  // Hide on /contacto — contact channels are already visible on that page
  if (location.pathname === "/contacto") return null;

  return (
    <a
      href="https://wa.me/529982186754?text=Hola%2C%20quiero%20info%20sobre%20el%20Tren%20Maya"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-[60] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all ${
        isMobile ? "bottom-[84px] right-4" : "bottom-6 right-6"
      }`}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppFAB;
