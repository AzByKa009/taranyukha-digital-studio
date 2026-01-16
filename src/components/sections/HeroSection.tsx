import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Scene3D } from "@/components/3d/Scene3D";
import { FadeIn, StaggerContainer, StaggerItem, GlowPulse } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const processSteps = [
  { number: "01", title: "Анализ", description: "Изучаю задачу и контекст" },
  { number: "02", title: "Стратегия", description: "Предлагаю решение" },
  { number: "03", title: "Реализация", description: "Создаю продукт" },
  { number: "04", title: "Поддержка", description: "Помогаю масштабировать" },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* 3D Scene */}
      <Scene3D />
      
      <div className="container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI & Digital Production Expert</span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
                Превращаю идеи в{" "}
                <span className="text-gradient">AI-продукты</span>{" "}
                и цифровой контент
              </h1>
            </FadeIn>

            {/* Subheading */}
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Помогаю бизнесу внедрять нейросети, автоматизировать процессы 
                и создавать продукты, которые решают реальные задачи
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/contacts">
                  <motion.div
                    whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                    whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button variant="hero" size="lg">
                      Обсудить проект
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/cases">
                  <motion.div
                    whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                    whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button variant="hero-outline" size="lg">
                      <Play className="h-4 w-4" />
                      Смотреть кейсы
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right side - Stats (visible on larger screens) */}
          <div className="hidden lg:block" />
        </div>

        {/* Stats Row */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-border/50">
            {[
              { value: "10+", label: "Лет в digital" },
              { value: "50+", label: "Проектов" },
              { value: "AI", label: "Технологии" },
              { value: "24ч", label: "Ответ на заявку" },
            ].map((stat, index) => (
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
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* How I Work */}
        <FadeIn delay={0.5}>
          <div className="mt-20">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
              Как я работаю
            </h3>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {processSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={!prefersReducedMotion ? { 
                      y: -4, 
                      transition: { type: "spring", stiffness: 400, damping: 25 } 
                    } : undefined}
                    className="group p-6 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="text-3xl font-display font-bold text-primary/50 mb-3">
                      {step.number}
                    </div>
                    <h4 className="text-lg font-display font-semibold mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
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
