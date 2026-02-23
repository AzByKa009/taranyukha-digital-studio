import { Brain, Users, BarChart, Layers } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyTrustMe() {
  const { t } = useLanguage();

  const trustFactors = [
    {
      icon: Brain,
      title: t("trust.item_1_title"),
      description: t("trust.item_1_desc"),
    },
    {
      icon: Users,
      title: t("trust.item_2_title"),
      description: t("trust.item_2_desc"),
    },
    {
      icon: BarChart,
      title: t("trust.item_3_title"),
      description: t("trust.item_3_desc"),
    },
    {
      icon: Layers,
      title: t("trust.item_4_title"),
      description: t("trust.item_4_desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side - Content */}
          <FadeIn direction="right">
            <div>
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
                {t("trust.label")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                {t("trust.title")}<span className="text-gradient">{t("trust.title_accent")}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {t("trust.subtitle")}
              </p>
              
              {/* Quote */}
              <blockquote className="border-l-2 border-primary pl-4 sm:pl-6 py-2">
                <p className="text-base sm:text-lg italic text-foreground/90 mb-2">
                  "{t("trust.quote")}"
                </p>
              </blockquote>
            </div>
          </FadeIn>

          {/* Right side - Trust factors */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" staggerDelay={0.1}>
            {trustFactors.map((factor) => (
              <StaggerItem key={factor.title}>
                <PremiumCard
                  className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-foreground/15 transition-colors h-full relative overflow-hidden outline-none focus:outline-none focus-visible:outline-none"
                  hoverScale={1.03}
                  hoverY={-4}
                >
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/0 group-hover:bg-primary/8 rounded-full blur-xl transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300 ring-1 ring-primary/5 group-hover:ring-primary/20">
                      <factor.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{factor.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                </PremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
