import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { InlineLeadForm } from "@/components/conversion/InlineLeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useABTest } from "@/hooks/useABTest";

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const { variant } = useABTest("cta_section_headline");

  const headline = variant === "A" 
    ? "Готовы начать" 
    : "Давайте создадим";

  const subHeadline = variant === "A"
    ? "ваш проект?"
    : "что-то крутое";

  return (
    <section className="py-28 relative overflow-hidden">
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
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
                whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">Бесплатная консультация</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                {headline}{" "}
                <span className="text-gradient">{subHeadline}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Оставьте контакт — обсудим задачу и я предложу решение. Без обязательств.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InlineLeadForm variant="compact" className="max-w-2xl mx-auto" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Ответ в течение 24ч</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                <span>Без спама</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
