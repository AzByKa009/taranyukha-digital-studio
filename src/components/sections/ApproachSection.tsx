import { Target, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function ApproachSection() {
  const { t } = useLanguage();

  const approachPillars = [
    {
      icon: Target,
      title: t("approach.card_1_title"),
      description: t("approach.card_1_desc"),
      accent: t("approach.card_1_accent"),
    },
    {
      icon: Lightbulb,
      title: t("approach.card_2_title"),
      description: t("approach.card_2_desc"),
      accent: t("approach.card_2_accent"),
    },
    {
      icon: TrendingUp,
      title: t("approach.card_3_title"),
      description: t("approach.card_3_desc"),
      accent: t("approach.card_3_accent"),
    },
    {
      icon: Zap,
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
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
                className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full"
                hoverScale={1.02}
                hoverY={-4}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <pillar.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                  {pillar.description}
                </p>
                <span className="text-xs text-primary/80 font-medium">
                  {pillar.accent}
                </span>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
