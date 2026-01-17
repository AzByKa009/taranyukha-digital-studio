import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyTrustMe } from "@/components/sections/WhyTrustMe";
import { ContactSection } from "@/components/sections/ContactSection";
import { useSEO, personSchema, websiteSchema, professionalServiceSchema } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Aleksey Taranukha — AI продюсер, вайб кодинг, монтаж Reels",
    description: "AI продюсер и специалист по вайб кодингу. Создание AI продуктов, монтаж вертикальных видео, продюсирование контента, премиальные лендинги и сайты под ключ.",
    keywords: "AI продюсер, монтаж вертикальных видео, продюсирование контента, вайб кодинг, создание AI продукта, премиальный лендинг, сайт под ключ",
  }, [personSchema, websiteSchema, professionalServiceSchema]);

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
