import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { InlineLeadForm } from "@/components/conversion/InlineLeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-glow opacity-40"
        animate={!prefersReducedMotion ? {
          scale: [1, 1.02, 1],
          opacity: [0.4, 0.5, 0.4],
        } : undefined}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-card/30" />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                {t("cta.title")}<span className="text-gradient">{t("cta.title_accent")}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {t("cta.subtitle")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InlineLeadForm variant="compact" className="max-w-xl mx-auto" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
              {t("cta.response_time")}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
