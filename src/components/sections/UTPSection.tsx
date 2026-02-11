import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Video, Cpu, ArrowRight } from "lucide-react";

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
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            {/* Gradient border card */}
            <div className="relative p-px rounded-2xl sm:rounded-3xl bg-gradient-to-b from-primary/30 via-border/30 to-border/10">
              <div className="rounded-2xl sm:rounded-3xl bg-card/80 backdrop-blur-sm p-8 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 sm:mb-8">
                  <ArrowRight className="w-4 h-4" />
                  {t("utp.badge")}
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-8 leading-tight">
                  {t("utp.title")}
                </h2>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={!prefersReducedMotion ? { opacity: 0, y: 10 } : undefined}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-background/60 border border-border/50 text-sm sm:text-base"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-foreground font-medium">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>

                <Link to="/contacts">
                  <motion.div
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                    whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-block px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
                  >
                    <p className="text-base sm:text-lg text-primary font-semibold">
                      {t("utp.timeline")}
                    </p>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
