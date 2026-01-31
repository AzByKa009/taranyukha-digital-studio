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
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                С чего <span className="text-gradient">начать?</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Расскажите о задаче — разберёмся вместе, что нужно и как это сделать.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InlineLeadForm variant="compact" className="max-w-xl mx-auto" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
              Отвечу в течение дня
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
