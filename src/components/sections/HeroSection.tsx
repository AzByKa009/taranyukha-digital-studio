import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Scene3D } from "@/components/3d/Scene3D";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const processSteps = [
    { number: "01", title: t("hero.step_1_title"), description: t("hero.step_1_desc") },
    { number: "02", title: t("hero.step_2_title"), description: t("hero.step_2_desc") },
    { number: "03", title: t("hero.step_3_title"), description: t("hero.step_3_desc") },
    { number: "04", title: t("hero.step_4_title"), description: t("hero.step_4_desc") },
  ];

  const stats = [
    { value: "2+", label: t("hero.stat_years") },
    { value: "10+", label: t("hero.stat_projects") },
    { value: "AI", label: t("hero.stat_ai") },
    { value: "1 день", label: t("hero.stat_response") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* 3D Scene */}
      <Scene3D />
      
      <div className="container relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm mb-6 sm:mb-10">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{t("hero.badge")}</span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] sm:leading-[1.08] mb-5 sm:mb-7">
                <span className="text-gradient">{t("hero.title_1")}</span>{t("hero.title_2")}
              </h1>
            </FadeIn>

            {/* Subheading */}
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-12 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.3}>
              <Link to="/contacts" className="inline-block">
                <motion.div
                  whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button variant="hero" size="lg" className="shadow-xl shadow-primary/25">
                    {t("hero.cta_primary")}
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </Link>
            </FadeIn>
          </div>

          {/* Right side - Stats (visible on larger screens) */}
          <div className="hidden lg:block" />
        </div>

        {/* Stats Row */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-border/40">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.5 + index * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* How I Work */}
        <FadeIn delay={0.5}>
          <div className="mt-16 sm:mt-24">
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 sm:mb-10">
              {t("hero.how_i_work")}
            </h3>
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5" staggerDelay={0.1}>
              {processSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={!prefersReducedMotion ? { 
                      y: -4, 
                      transition: { type: "spring", stiffness: 400, damping: 25 } 
                    } : undefined}
                    className="group p-4 sm:p-7 rounded-xl sm:rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-400"
                  >
                    <div className="text-xl sm:text-3xl font-display font-bold text-primary/50 mb-2 sm:mb-4 group-hover:text-primary/70 transition-colors duration-400">
                      {step.number}
                    </div>
                    <h4 className="text-sm sm:text-lg font-display font-semibold mb-1 sm:mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
