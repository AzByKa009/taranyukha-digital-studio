import { Globe, Bot, BarChart3 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import cardPackaging from "@/assets/card-whatido-websites.jpg";
import cardAutomation from "@/assets/card-whatido-automation.jpg";
import cardAnalytics from "@/assets/card-whatido-analytics.jpg";

export function WhatIDo() {
  const { t } = useLanguage();

  const expertiseAreas = [
    {
      icon: Globe,
      image: cardPackaging,
      title: t("whatido.card_1_title"),
      description: t("whatido.card_1_desc"),
      examples: t("whatido.card_1_tags").split(","),
    },
    {
      icon: Bot,
      image: cardAutomation,
      title: t("whatido.card_2_title"),
      description: t("whatido.card_2_desc"),
      examples: t("whatido.card_2_tags").split(","),
    },
    {
      icon: BarChart3,
      image: cardAnalytics,
      title: t("whatido.card_3_title"),
      description: t("whatido.card_3_desc"),
      examples: t("whatido.card_3_tags").split(","),
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
              {t("whatido.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("whatido.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Solutions Grid - 3 cards */}
        <StaggerContainer className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12" staggerDelay={0.1}>
          {expertiseAreas.map((area) => (
            <StaggerItem key={area.title}>
              <PremiumCard
                className="group rounded-xl sm:rounded-2xl border border-border bg-background/50 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full relative overflow-hidden outline-none focus:outline-none focus-visible:outline-none"
                hoverScale={1.02}
                hoverY={-4}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ring-1 ring-primary/5 group-hover:ring-primary/20">
                      <area.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-semibold">
                      {area.title}
                    </h3>
                  </div>
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