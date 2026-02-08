import { Briefcase, Megaphone, Bot, BarChart3 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhatIDo() {
  const { t } = useLanguage();

  const expertiseAreas = [
    {
      icon: Briefcase,
      title: t("whatido.card_1_title"),
      description: t("whatido.card_1_desc"),
      examples: t("whatido.card_1_tags").split(","),
    },
    {
      icon: Megaphone,
      title: t("whatido.card_2_title"),
      description: t("whatido.card_2_desc"),
      examples: t("whatido.card_2_tags").split(","),
    },
    {
      icon: Bot,
      title: t("whatido.card_3_title"),
      description: t("whatido.card_3_desc"),
      examples: t("whatido.card_3_tags").split(","),
    },
    {
      icon: BarChart3,
      title: t("whatido.card_4_title"),
      description: t("whatido.card_4_desc"),
      examples: t("whatido.card_4_tags").split(","),
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-card/30">
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              {t("whatido.label")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              {t("whatido.title")}<span className="text-gradient">{t("whatido.title_accent")}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("whatido.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Expertise Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12" staggerDelay={0.1}>
          {expertiseAreas.map((area) => (
            <StaggerItem key={area.title}>
              <PremiumCard
                className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-background/50 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full relative overflow-hidden"
                hoverScale={1.02}
                hoverY={-4}
              >
                {/* Subtle corner glow on hover */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors duration-300 ring-1 ring-primary/5 group-hover:ring-primary/20">
                    <area.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.examples.map((example) => (
                      <span
                        key={example}
                        className="px-2.5 py-1 text-xs rounded-lg bg-primary/5 text-muted-foreground border border-border/40"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
