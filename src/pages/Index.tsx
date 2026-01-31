import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { WhyTrustMe } from "@/components/sections/WhyTrustMe";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { ExitIntentPopup } from "@/components/conversion/ExitIntentPopup";
import { useSEO, personSchema, websiteSchema, professionalServiceSchema } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Алексей Тарануха — Сайты под услуги и AI-решения для бизнеса",
    description: "Делаю продающие сайты для бизнеса в сфере услуг и внедряю AI-автоматизацию. Один исполнитель, без агентств. Запуск за 2-3 недели.",
    keywords: "сайт под услуги, сайт для бизнеса, AI автоматизация, чат-бот для бизнеса, разработка сайта, лендинг под ключ",
  }, [personSchema, websiteSchema, professionalServiceSchema]);

  return (
    <Layout>
      <ExitIntentPopup />
      <HeroSection />
      <WhatIDo />
      <FeaturedCases />
      <WhyTrustMe />
      <CTASection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
