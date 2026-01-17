import { Brain, Video, Sparkles, Code, LineChart } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const directions = [
  {
    icon: Code,
    title: "Сайты под услуги",
    description: "Премиальные сайты, которые повышают доверие и собирают заявки. Быстро и без лишней сложности.",
  },
  {
    icon: Brain,
    title: "AI-продукты",
    description: "Чат-боты, ассистенты, автоматизация. Снимаю рутину и ускоряю работу вашей команды.",
  },
  {
    icon: Video,
    title: "Вертикальный контент",
    description: "Reels, Shorts, TikTok — монтаж и продюсирование роликов, которые удерживают внимание.",
  },
  {
    icon: Sparkles,
    title: "AI-видео",
    description: "Визуал нового уровня с AI-генерацией. Включает продюсирование и профессиональный монтаж.",
  },
  {
    icon: LineChart,
    title: "Консалтинг",
    description: "Аудит процессов и стратегия внедрения AI. Помогаю понять, где технологии принесут максимум пользы.",
  },
];

export function WhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-4 block">
              Направления
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Что я делаю
            </h2>
            <p className="text-lg text-muted-foreground">
              AI-продукты и сайты — основной фокус. Плюс продюсирование контента 
              для тех, кому нужны охваты. Беру на себя большую часть работы.
            </p>
          </div>
        </FadeIn>

        {/* Directions Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {directions.map((direction) => (
            <StaggerItem key={direction.title}>
              <PremiumCard
                className="group p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full"
                hoverScale={1.02}
                hoverY={-6}
              >
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={!prefersReducedMotion ? { 
                    scale: 1.1,
                    backgroundColor: "hsl(var(--primary) / 0.2)"
                  } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <direction.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-gradient transition-colors duration-300">
                  {direction.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {direction.description}
                </p>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
