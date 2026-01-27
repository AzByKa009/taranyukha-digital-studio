import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { InlineLeadForm } from "@/components/conversion/InlineLeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useABTest } from "@/hooks/useABTest";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const { variant } = useABTest("cta_section_headline");
  const { t, language } = useLanguage();

  const headline = variant === "A" 
    ? (language === "ru" ? "Готовы начать" : "Ready to start")
    : (language === "ru" ? "Давайте создадим" : "Let's create");

  const subHeadline = variant === "A"
    ? (language === "ru" ? "ваш проект?" : "your project?")
    : (language === "ru" ? "что-то крутое" : "something great");

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background with parallax-like effect */}
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
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/5 mb-4 sm:mb-6"
                whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm text-primary font-medium">
                  {language === "ru" ? "Бесплатная консультация" : "Free consultation"}
                </span>
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                {headline}{" "}
                <span className="text-gradient">{subHeadline}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
                {language === "ru" 
                  ? "Оставьте контакт — обсудим задачу и я предложу решение. Без обязательств."
                  : "Leave your contact — we'll discuss your task and I'll propose a solution. No obligations."
                }
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InlineLeadForm variant="compact" className="max-w-2xl mx-auto" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>{language === "ru" ? "Ответ в течение 24ч" : "Response within 24h"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{language === "ru" ? "Без спама" : "No spam"}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
