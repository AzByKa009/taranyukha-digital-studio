import { Link } from "react-router-dom";
import { Brain, Globe, Video, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Direction images
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";
import serviceReels from "@/assets/service-reels.jpg";

// Main services (primary focus)
const mainServices = [
  {
    icon: Globe,
    image: serviceWeb,
    title: "Сайты под услуги",
    description: "Продающие сайты для бизнеса в сфере услуг. Понятная структура, формы заявок, интеграции с CRM. Запуск за 2-3 недели.",
    href: "/razrabotka-sayta-pod-uslugi",
    badge: "Основное",
  },
  {
    icon: Brain,
    image: serviceBot,
    title: "AI-решения",
    description: "Чат-боты для поддержки и продаж, автоматизация рутины, интеграция AI в бизнес-процессы. Экономия времени вашей команды.",
    href: "/ai-bot-dlya-biznesa",
    badge: "Основное",
  },
];

// Additional service
const additionalService = {
  icon: Video,
  image: serviceReels,
  title: "Видеопродакшн",
  description: "Reels, Shorts, TikTok — монтаж и продюсирование. Для тех, кому нужен контент для соцсетей.",
  href: "/montazh-reels",
  badge: "Дополнительно",
};

export function WhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              Специализация
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              Чем могу помочь
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Делаю сайты, которые приносят заявки, и внедряю AI для автоматизации. 
              Работаю с бизнесом в сфере услуг — от юристов до клиник.
            </p>
          </div>
        </FadeIn>

        {/* Main Services - 2 columns */}
        <StaggerContainer className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6" staggerDelay={0.1}>
          {mainServices.map((service) => (
            <StaggerItem key={service.title}>
              <Link to={service.href}>
                <PremiumCard
                  className="group rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
                  hoverScale={1.02}
                  hoverY={-6}
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-primary text-primary-foreground">
                        {service.badge}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 sm:p-8">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6"
                      whileHover={!prefersReducedMotion ? { 
                        scale: 1.1,
                        backgroundColor: "hsl(var(--primary) / 0.2)"
                      } : undefined}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3 group-hover:text-gradient transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                      {service.description}
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

        {/* Additional Service - full width, smaller */}
        <FadeIn delay={0.3}>
          <Link to={additionalService.href}>
            <PremiumCard
              className="group rounded-xl sm:rounded-2xl border border-border/60 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-border transition-colors duration-300 overflow-hidden"
              hoverScale={1.01}
              hoverY={-3}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
                  <img 
                    src={additionalService.image}
                    alt={additionalService.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-5 sm:p-8 flex items-center">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                      <additionalService.icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <h3 className="text-base sm:text-lg font-display font-semibold group-hover:text-foreground transition-colors duration-300">
                          {additionalService.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
                          {additionalService.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {additionalService.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
