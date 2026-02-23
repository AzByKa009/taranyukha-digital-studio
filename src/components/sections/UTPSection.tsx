import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Video, Cpu, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UTPSection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const features = [
    { icon: Globe, label: t("utp.feature_1") },
    { icon: Video, label: t("utp.feature_2") },
    { icon: Cpu, label: t("utp.feature_3") },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/[0.03] rounded-full blur-[200px]" />
      
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            {/* Main card with strong border */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-foreground/20 bg-card shadow-[0_0_60px_-15px_hsl(0_0%_100%/0.08)] overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
              
              <div className="p-8 sm:p-12 lg:p-16 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/20 bg-foreground/5 text-foreground/80 text-sm font-medium mb-8">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("utp.badge")}
                </div>

                {/* Title - structured layout */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold leading-tight mb-3">
                    {t("utp.title")}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    Сайт, видео и автоматизация — единый пакет для запуска вашего бизнеса в digital
                  </p>
                </div>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={!prefersReducedMotion ? { opacity: 0, y: 10 } : undefined}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-foreground/15 bg-foreground/[0.03] text-sm sm:text-base"
                    >
                      <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
                      </div>
                      <span className="text-foreground font-medium">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Link to="/zapusk">
                  <motion.div
                    whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                    whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-block"
                  >
                    <Button variant="hero" size="lg" className="shadow-[0_0_30px_-5px_hsl(0_0%_100%/0.12)]">
                      {t("utp.timeline")}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
