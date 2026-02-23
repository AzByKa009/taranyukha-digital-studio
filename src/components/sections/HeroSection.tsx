import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Search, Wrench, Rocket } from "lucide-react";
import { Scene3D } from "@/components/3d/Scene3D";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const processSteps = [
    { number: "01", icon: Search, title: t("hero.step_1_title"), description: t("hero.step_1_desc") },
    { number: "02", icon: Wrench, title: t("hero.step_2_title"), description: t("hero.step_2_desc") },
    { number: "03", icon: Rocket, title: t("hero.step_3_title"), description: t("hero.step_3_desc") },
  ];

  const checks = [
    t("hero.check_1"),
    t("hero.check_2"),
    t("hero.check_3"),
    t("hero.check_4"),
  ];

  const stats = [
    { value: "1+", label: t("hero.stat_years") },
    { value: "10+", label: t("hero.stat_projects") },
    { value: "AI", label: t("hero.stat_ai") },
    { value: "24ч", label: t("hero.stat_response") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Tech grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Gradient orbs - monochrome */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-foreground/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-foreground/[0.015] rounded-full blur-[100px]" />
      
      {/* Background layers */}

      {/* Diagonal light beam - silver */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-[0.03]" style={{
          background: 'linear-gradient(135deg, transparent 35%, hsl(0 0% 100% / 0.08) 45%, hsl(0 0% 100% / 0.04) 55%, transparent 65%)',
        }} />
      </div>
      
      {/* 3D Scene */}
      <Scene3D />
      
      <div className="container relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm mb-6 sm:mb-10">
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
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </FadeIn>

          {/* Checklist */}
          <FadeIn delay={0.25}>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-lg">
              {checks.map((check, i) => (
                <div key={i} className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                     <Check className="w-3 h-3 text-foreground/70" />
                  </div>
                  <span className="text-xs sm:text-sm text-foreground/80">{check}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/ai-audit">
                <motion.div
                  whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button variant="hero" size="lg" className="shadow-xl shadow-foreground/5">
                    {t("hero.cta_primary")}
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/cases">
                <motion.div
                  whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button variant="outline" size="lg">
                    {t("hero.cta_secondary")}
                  </Button>
                </motion.div>
              </Link>
            </div>
          </FadeIn>
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

        {/* How We Work - 3 steps */}
        <FadeIn delay={0.5}>
          <div className="mt-16 sm:mt-24">
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 sm:mb-10">
              {t("hero.how_i_work")}
            </h3>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5" staggerDelay={0.1}>
              {processSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={!prefersReducedMotion ? { 
                      y: -4, 
                      transition: { type: "spring", stiffness: 400, damping: 25 } 
                    } : undefined}
                     className="group p-4 sm:p-7 rounded-xl sm:rounded-2xl border border-foreground/10 bg-card backdrop-blur-sm hover:bg-card hover:border-foreground/25 hover:shadow-[0_0_25px_-8px_hsl(0_0%_100%/0.1)] transition-all duration-400"
                   >
                     <div className="flex items-center gap-3 mb-3 sm:mb-4">
                       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-300">
                         <step.icon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/70" />
                       </div>
                       <span className="text-lg sm:text-2xl font-display font-bold text-foreground/20 group-hover:text-foreground/40 transition-colors duration-400">
                         {step.number}
                      </span>
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
