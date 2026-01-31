import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { InlineLeadForm } from "@/components/conversion/InlineLeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();

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
                  Бесплатная диагностика
                </span>
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                Хотите так же{" "}
                <span className="text-gradient">для своего бизнеса?</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
                Расскажите о задаче — разберёмся, что мешает расти и как это исправить. 
                Так же системно, как выстроен этот сайт.
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
                <span>Ответ в течение 24ч</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Без обязательств</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
