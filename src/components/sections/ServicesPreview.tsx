import { Link } from "react-router-dom";
import { ArrowRight, Brain, Layers, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const services = [
  {
    icon: Brain,
    title: "AI-решения",
    description: "Разработка и интеграция искусственного интеллекта в бизнес-процессы",
  },
  {
    icon: Layers,
    title: "Digital Production",
    description: "Полный цикл создания цифрового контента и продуктов",
  },
  {
    icon: Zap,
    title: "Автоматизация",
    description: "Оптимизация рабочих процессов с помощью современных технологий",
  },
  {
    icon: Target,
    title: "Консалтинг",
    description: "Стратегическое консультирование по цифровой трансформации",
  },
];

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24">
      <div className="container">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Чем я могу помочь
            </h2>
            <p className="text-muted-foreground">
              Комплексный подход к созданию цифровых решений — от стратегии до реализации
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <PremiumCard
                className="group p-6 rounded-2xl border border-border bg-card/30 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full"
                hoverScale={1.03}
                hoverY={-4}
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={!prefersReducedMotion ? { 
                    scale: 1.1,
                    backgroundColor: "hsl(var(--primary) / 0.2)"
                  } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <service.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-display font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="text-center">
            <Link to="/services">
              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-block"
              >
                <Button variant="outline" className="group">
                  Все услуги
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
