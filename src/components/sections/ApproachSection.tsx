import { Target, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import cardStrategy from "@/assets/card-strategy.jpg";
import cardUnderstanding from "@/assets/card-understanding.jpg";
import cardResults from "@/assets/card-results.jpg";
import cardSystem from "@/assets/card-system.jpg";

export function ApproachSection() {
  const { t } = useLanguage();

  const approachPillars = [
    {
      icon: Target,
      image: cardStrategy,
      title: t("approach.card_1_title"),
      description: t("approach.card_1_desc"),
      accent: t("approach.card_1_accent"),
    },
    {
      icon: Lightbulb,
      image: cardUnderstanding,
      title: t("approach.card_2_title"),
      description: t("approach.card_2_desc"),
      accent: t("approach.card_2_accent"),
    },
    {
      icon: TrendingUp,
      image: cardResults,
      title: t("approach.card_3_title"),
      description: t("approach.card_3_desc"),
      accent: t("approach.card_3_accent"),
    },
    {
      icon: Zap,
      image: cardSystem,
      title: t("approach.card_4_title"),
      description: t("approach.card_4_desc"),
      accent: t("approach.card_4_accent"),
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              {t("approach.label")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 text-glow">
              {t("approach.title")}<br />
              <span className="text-gradient">{t("approach.title_accent")}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("approach.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Approach Cards */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
          {approachPillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <PremiumCard
                className="group rounded-xl sm:rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-foreground/15 transition-colors duration-300 h-full relative overflow-hidden outline-none focus:outline-none focus-visible:outline-none"
                hoverScale={1.02}
                hoverY={-4}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ring-1 ring-primary/5 group-hover:ring-primary/20">
                      <pillar.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-semibold">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {pillar.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-px bg-primary/50" />
                    <span className="text-xs text-primary/80 font-medium">
                      {pillar.accent}
                    </span>
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