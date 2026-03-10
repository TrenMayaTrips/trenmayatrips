import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import StickyCTA from "./StickyCTA";
import WhatsAppFAB from "./WhatsAppFAB";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageLayoutProps {
  children: ReactNode;
  showStickyCTA?: boolean;
}

const PageLayout = ({ children, showStickyCTA = true }: PageLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 pt-16 md:pt-20 ${isMobile ? "pb-20" : ""}`}>{children}</main>
      <Footer />
      <WhatsAppFAB />
      {showStickyCTA && <StickyCTA />}
      <BottomNav />
    </div>
  );
};

export default PageLayout;
