import { MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const WhatsAppFAB = () => {
  const isMobile = useIsMobile();

  return (
    <a
      href="https://wa.me/5215512345678?text=Hola%2C%20quiero%20info%20sobre%20el%20tren"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all ${
        isMobile ? "bottom-[136px] right-4" : "bottom-6 right-6"
      }`}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppFAB;
