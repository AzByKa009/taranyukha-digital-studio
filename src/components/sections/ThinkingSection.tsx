import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ThinkingSection() {
  const { t } = useLanguage();

  const thinkingPrinciples = [
    { principle: t("thinking.principle_1"), explanation: t("thinking.principle_1_desc") },
    { principle: t("thinking.principle_2"), explanation: t("thinking.principle_2_desc") },
    { principle: t("thinking.principle_3"), explanation: t("thinking.principle_3_desc") },
    { principle: t("thinking.principle_4"), explanation: t("thinking.principle_4_desc") },
    { principle: t("thinking.principle_5"), explanation: t("thinking.principle_5_desc") },
  ];

  const realQuestions = [
    t("thinking.question_1"),
    t("thinking.question_2"),
    t("thinking.question_3"),
    t("thinking.question_4"),
    t("thinking.question_5"),
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-14 sm:mb-20">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 block">
              {t("thinking.label")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 sm:mb-6">
              {t("thinking.title")}<span className="text-gradient">{t("thinking.title_accent")}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("thinking.subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Principles */}
          <div>
            <FadeIn delay={0.1}>
              <h3 className="text-lg sm:text-xl font-display font-semibold mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                {t("thinking.principles_title")}
              </h3>
            </FadeIn>
            
            <StaggerContainer className="space-y-5 sm:space-y-6" staggerDelay={0.08}>
              {thinkingPrinciples.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl sm:text-3xl font-display font-bold text-primary/30 group-hover:text-primary/50 transition-colors duration-300 leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-display font-semibold mb-1.5">
                          {item.principle}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right - Questions I ask */}
          <div>
            <FadeIn delay={0.2}>
              <h3 className="text-lg sm:text-xl font-display font-semibold mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                {t("thinking.questions_title")}
              </h3>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card/50 border border-border/60 mb-6 sm:mb-8">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-base sm:text-lg text-foreground/90 italic leading-relaxed mb-4">
                  «{t("thinking.quote")}»
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-3 sm:space-y-4" staggerDelay={0.06}>
              {realQuestions.map((question, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-border/40 hover:border-primary/30 transition-colors duration-300">
                    <span className="text-primary text-lg leading-none">?</span>
                    <p className="text-sm sm:text-base text-foreground/80">
                      {question}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Bottom note */}
        <FadeIn delay={0.5}>
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-border/40">
            <p className="text-center text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("thinking.bottom_note")}
              <Link to="/contacts" className="text-primary hover:text-primary/80 ml-1 transition-colors">
                {t("thinking.bottom_link")}
              </Link>.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
