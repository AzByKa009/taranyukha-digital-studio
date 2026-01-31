import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { ThinkingSection } from "@/components/sections/ThinkingSection";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { WhyTrustMe } from "@/components/sections/WhyTrustMe";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { ExitIntentPopup } from "@/components/conversion/ExitIntentPopup";
import { useSEO, personSchema, websiteSchema, professionalServiceSchema } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Алексей Тарануха — Маркетолог для бизнеса | Стратегия, упаковка, продвижение",
    description: "Системный маркетинг для роста бизнеса. Упаковка, продвижение, автоматизация. Работаю как стратег и партнёр, не как исполнитель.",
    keywords: "маркетолог, маркетинг для бизнеса, упаковка бизнеса, продвижение, стратегия маркетинга, автоматизация маркетинга",
  }, [personSchema, websiteSchema, professionalServiceSchema]);

  return (
    <Layout>
      <ExitIntentPopup />
      <HeroSection />
      <ApproachSection />
      <WhatIDo />
      <ThinkingSection />
      <FeaturedCases />
      <WhyTrustMe />
      <CTASection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
