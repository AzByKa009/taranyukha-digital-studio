import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Scene3D } from "@/components/3d/Scene3D";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface HeroContent {
  badge?: string;
  title_1?: string;
  title_2?: string;
  subtitle?: string;
  cta_text?: string;
  stat_years?: string;
  stat_projects?: string;
  stat_ai?: string;
  stat_response?: string;
  step_1_title?: string;
  step_1_desc?: string;
  step_2_title?: string;
  step_2_desc?: string;
  step_3_title?: string;
  step_3_desc?: string;
  step_4_title?: string;
  step_4_desc?: string;
  how_i_work?: string;
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { data: heroSettings, isLoading } = useSiteSettings<HeroContent>("hero");

  // Default values that will be used until data loads
  const content = {
    badge: heroSettings?.badge || "Маркетолог · Системный подход",
    title_1: heroSettings?.title_1 || "Выстраиваю маркетинг, ",
    title_2: heroSettings?.title_2 || "который приносит клиентов",
    subtitle: heroSettings?.subtitle || "Работаю с бизнесом напрямую. Упаковка, продвижение, автоматизация — как единая система, а не хаос задач.",
    cta_text: heroSettings?.cta_text || "Обсудить задачу",
    how_i_work: heroSettings?.how_i_work || "Как я работаю",
  };

  const processSteps = [
    { number: "01", title: heroSettings?.step_1_title || "Разбираюсь", description: heroSettings?.step_1_desc || "Изучаю бизнес и задачу" },
    { number: "02", title: heroSettings?.step_2_title || "Планирую", description: heroSettings?.step_2_desc || "Предлагаю решение" },
    { number: "03", title: heroSettings?.step_3_title || "Делаю", description: heroSettings?.step_3_desc || "Беру реализацию на себя" },
    { number: "04", title: heroSettings?.step_4_title || "Развиваю", description: heroSettings?.step_4_desc || "Помогаю масштабировать" },
  ];

  const stats = [
    { value: heroSettings?.stat_years || "2+", label: "года опыта" },
    { value: heroSettings?.stat_projects || "10+", label: "проектов" },
    { value: heroSettings?.stat_ai || "AI", label: "автоматизация" },
    { value: heroSettings?.stat_response || "24ч", label: "ответ" },
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
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{content.badge}</span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] sm:leading-[1.08] mb-5 sm:mb-7">
                <span className="text-gradient">{content.title_1}</span>{content.title_2}
              </h1>
            </FadeIn>

            {/* Subheading */}
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-12 leading-relaxed">
                {content.subtitle}
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
                    {content.cta_text}
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
              {content.how_i_work}
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
