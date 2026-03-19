import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import WhatsAppFAB from "./WhatsAppFAB";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 pt-16 md:pt-20 ${isMobile ? "pb-20" : ""}`}>{children}</main>
      <Footer />
      <WhatsAppFAB />
      
      <BottomNav />
    </div>
  );
};

export default PageLayout;
