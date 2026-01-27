import { Link } from "react-router-dom";
import { Brain, Video, Sparkles, Code, LineChart, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

// Direction images
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";
import serviceReels from "@/assets/service-reels.jpg";
import serviceAiVideo from "@/assets/service-ai-video.jpg";
import aiAnalytics from "@/assets/ai-analytics.jpg";

export function WhatIDo() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const directions = [
    {
      icon: Code,
      image: serviceWeb,
      title: t("whatido.websites"),
      description: t("whatido.websites_desc"),
      href: "/razrabotka-sayta-pod-uslugi",
    },
    {
      icon: Brain,
      image: serviceBot,
      title: t("whatido.ai_products"),
      description: t("whatido.ai_products_desc"),
      href: "/ai-bot-dlya-biznesa",
    },
    {
      icon: Video,
      image: serviceReels,
      title: t("whatido.vertical_content"),
      description: t("whatido.vertical_content_desc"),
      href: "/montazh-reels",
    },
    {
      icon: Sparkles,
      image: serviceAiVideo,
      title: t("whatido.ai_video"),
      description: t("whatido.ai_video_desc"),
      href: "/services",
    },
    {
      icon: LineChart,
      image: aiAnalytics,
      title: t("whatido.consulting"),
      description: t("whatido.consulting_desc"),
      href: "/ai-audit",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-10 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              {t("whatido.label")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              {t("whatido.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("whatido.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Directions Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.1}>
          {directions.map((direction) => (
            <StaggerItem key={direction.title}>
              <Link to={direction.href}>
                <PremiumCard
                  className="group rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
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
                  <div className="p-5 sm:p-8">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6"
                      whileHover={!prefersReducedMotion ? { 
                        scale: 1.1,
                        backgroundColor: "hsl(var(--primary) / 0.2)"
                      } : undefined}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <direction.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3 group-hover:text-gradient transition-colors duration-300">
                      {direction.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                      {direction.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t("whatido.more")} <ArrowRight className="h-4 w-4" />
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
