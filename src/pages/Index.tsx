import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyTrustMe } from "@/components/sections/WhyTrustMe";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  useEffect(() => {
    document.title = "Aleksey Taranukha — AI & Digital Production";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Эксперт в области AI и цифрового продакшена. Внедряю нейросети, автоматизирую процессы и создаю продукты, которые решают реальные бизнес-задачи."
    );
  }, []);

  return (
    <Layout>
      <HeroSection />
      <WhatIDo />
      <FeaturedCases />
      <ServicesPreview />
      <WhyTrustMe />
      <ContactSection />
    </Layout>
  );
};

export default Index;
