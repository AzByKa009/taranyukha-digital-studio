import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Rocket, Globe, Video, Cpu } from "lucide-react";

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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Rocket className="w-4 h-4" />
              {t("utp.badge")}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 border border-border/50 text-sm sm:text-base"
                >
                  <feature.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground">{feature.label}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-lg sm:text-xl text-primary font-semibold">
              {t("utp.timeline")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
