import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import StickyCTA from "./StickyCTA";
import WhatsAppFAB from "./WhatsAppFAB";

interface PageLayoutProps {
  children: ReactNode;
  showStickyCTA?: boolean;
}

const PageLayout = ({ children, showStickyCTA = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppFAB />
      {showStickyCTA && <StickyCTA />}
      <BottomNav />
    </div>
  );
};

export default PageLayout;
