import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { InlineLeadForm } from "@/components/conversion/InlineLeadForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface CTASettings {
  title?: string;
  subtitle?: string;
  response_note?: string;
}

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const { data: ctaSettings } = useSiteSettings<CTASettings>("cta");

  const title = ctaSettings?.title || "С чего начать?";
  const subtitle = ctaSettings?.subtitle || "Расскажите о задаче — разберёмся вместе, что нужно и как это сделать.";
  const responseNote = ctaSettings?.response_note || "Отвечу в течение дня";

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
                {title.includes("начать") ? (
                  <>С чего <span className="text-gradient">начать?</span></>
                ) : (
                  title
                )}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {subtitle}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InlineLeadForm variant="compact" className="max-w-xl mx-auto" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
              {responseNote}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
