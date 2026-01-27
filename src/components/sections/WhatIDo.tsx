import { Link } from "react-router-dom";
import { Brain, Video, Sparkles, Code, LineChart, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Direction images
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";
import serviceReels from "@/assets/service-reels.jpg";
import serviceAiVideo from "@/assets/service-ai-video.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";

const directions = [
  {
    icon: Code,
    image: serviceWeb,
    title: "Сайты под услуги",
    description: "Премиальные сайты, которые повышают доверие и собирают заявки. Быстро и без лишней сложности.",
    href: "/razrabotka-sayta-pod-uslugi",
  },
  {
    icon: Brain,
    image: serviceBot,
    title: "AI-продукты",
    description: "Чат-боты, ассистенты, автоматизация. Снимаю рутину и ускоряю работу вашей команды.",
    href: "/ai-bot-dlya-biznesa",
  },
  {
    icon: Video,
    image: serviceReels,
    title: "Вертикальный контент",
    description: "Reels, Shorts, TikTok — монтаж и продюсирование роликов, которые удерживают внимание.",
    href: "/montazh-reels",
  },
  {
    icon: Sparkles,
    image: serviceAiVideo,
    title: "AI-видео",
    description: "Визуал нового уровня с AI-генерацией. Включает продюсирование и профессиональный монтаж.",
    href: "/services",
  },
  {
    icon: LineChart,
    image: aiAnalytics,
    title: "Консалтинг",
    description: "Аудит процессов и стратегия внедрения AI. Помогаю понять, где технологии принесут максимум пользы.",
    href: "/ai-audit",
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
              <Link to={direction.href}>
                <PremiumCard
                  className="group rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
                  hoverScale={1.02}
                  hoverY={-6}
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={direction.image}
                      alt={direction.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={400}
                      height={225}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
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
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {direction.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Подробнее <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </PremiumCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
