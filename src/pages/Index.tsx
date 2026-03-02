import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import DestinosSection from "@/components/home/DestinosSection";
import ExperienciasSection from "@/components/home/ExperienciasSection";
import VagonesSection from "@/components/home/VagonesSection";
import RutasSection from "@/components/home/RutasSection";
import TestimoniosSection from "@/components/home/TestimoniosSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTAFinalSection from "@/components/home/CTAFinalSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <DestinosSection />
      <ExperienciasSection />
      <VagonesSection />
      <RutasSection />
      <TestimoniosSection />
      <NewsletterSection />
      <CTAFinalSection />
    </PageLayout>
  );
};

export default Index;
