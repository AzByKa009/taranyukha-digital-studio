import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { TargetAudienceSection } from "@/components/sections/TargetAudienceSection";
import { WhyTrustMe } from "@/components/sections/WhyTrustMe";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { UTPSection } from "@/components/sections/UTPSection";
import { ExitIntentPopup } from "@/components/conversion/ExitIntentPopup";
import { useSEO, personSchema, websiteSchema, professionalServiceSchema } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Системы привлечения заявок для бизнеса | Сайты, CRM, AI-автоматизация",
    description: "Создаём сайты и AI-системы, которые приносят заявки. Разработка, внедрение CRM и автоматизация процессов для малого и среднего бизнеса. Запуск от 14 дней.",
    keywords: "разработка сайтов, автоматизация бизнеса, внедрение CRM, AI для бизнеса, система привлечения клиентов, заявки для бизнеса",
  }, [personSchema, websiteSchema, professionalServiceSchema]);

  return (
    <Layout>
      <ExitIntentPopup />
      <HeroSection />
      <ProblemsSection />
      <WhatIDo />
      <FeaturedCases />
      <UTPSection />
      <ApproachSection />
      <TargetAudienceSection />
      <WhyTrustMe />
      <CTASection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
