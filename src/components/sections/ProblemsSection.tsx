import { AlertTriangle, UserX, Clock, BarChart3, Globe } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProblemsSection() {
  const { t } = useLanguage();

  const problems = [
    { icon: UserX, title: t("problems.item_1"), desc: t("problems.item_1_desc") },
    { icon: AlertTriangle, title: t("problems.item_2"), desc: t("problems.item_2_desc") },
    { icon: Clock, title: t("problems.item_3"), desc: t("problems.item_3_desc") },
    { icon: BarChart3, title: t("problems.item_4"), desc: t("problems.item_4_desc") },
    { icon: Globe, title: t("problems.item_5"), desc: t("problems.item_5_desc") },
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-destructive text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              {t("problems.label")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              {t("problems.title")}<span className="text-destructive">{t("problems.title_accent")}</span>
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5" staggerDelay={0.08}>
          {problems.map((problem, i) => (
            <StaggerItem key={i}>
              <div className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-border/60 bg-background/50 hover:border-destructive/30 transition-all duration-300 h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors duration-300">
                  <problem.icon className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm sm:text-base font-display font-semibold mb-2">
                  {problem.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {problem.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
