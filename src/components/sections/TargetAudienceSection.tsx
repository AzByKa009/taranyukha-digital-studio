import { Check, X } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function TargetAudienceSection() {
  const { t } = useLanguage();

  const fits = [
    { title: t("target.fit_1"), desc: t("target.fit_1_desc") },
    { title: t("target.fit_2"), desc: t("target.fit_2_desc") },
    { title: t("target.fit_3"), desc: t("target.fit_3_desc") },
  ];

  const noFits = [
    { title: t("target.nofit_1"), desc: t("target.nofit_1_desc") },
    { title: t("target.nofit_2"), desc: t("target.nofit_2_desc") },
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              {t("target.label")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              {t("target.title")}<span className="text-gradient">{t("target.title_accent")}</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Fits */}
          <FadeIn delay={0.1}>
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-primary/20 bg-primary/5">
              <h3 className="text-lg sm:text-xl font-display font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                {t("target.fit_title")}
              </h3>
              <div className="space-y-4">
                {fits.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold">{item.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* No Fits */}
          <FadeIn delay={0.2}>
            <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-destructive/20 bg-destructive/5">
              <h3 className="text-lg sm:text-xl font-display font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                {t("target.nofit_title")}
              </h3>
              <div className="space-y-4">
                {noFits.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold">{item.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
