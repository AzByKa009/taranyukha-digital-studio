import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  useEffect(() => {
    document.title = "Aleksey Taranukha — AI & Digital Production";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Эксперт в области AI и цифрового продакшена. Создаю инновационные цифровые решения для трансформации бизнеса."
    );
  }, []);

  return (
    <Layout>
      <HeroSection />
      <FeaturedCases />
      <ServicesPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;