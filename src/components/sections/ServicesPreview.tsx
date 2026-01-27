import { Link } from "react-router-dom";
import { ArrowRight, Brain, Layers, Zap, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Service images
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";
import serviceReels from "@/assets/service-reels.jpg";
import serviceAiVideo from "@/assets/service-ai-video.jpg";

const services = [
  {
    icon: Code,
    image: serviceWeb,
    title: "Сайты под услуги",
    description: "Премиальный сайт, который повышает доверие и собирает заявки",
    href: "/razrabotka-sayta-pod-uslugi",
  },
  {
    icon: Brain,
    image: serviceBot,
    title: "AI-продукты",
    description: "Чат-боты, ассистенты, автоматизация — меньше рутины, больше времени",
    href: "/ai-bot-dlya-biznesa",
  },
  {
    icon: Layers,
    image: serviceReels,
    title: "Вертикальный контент",
    description: "Reels, Shorts, TikTok — от монтажа до полного продюсирования",
    href: "/montazh-reels",
  },
  {
    icon: Zap,
    image: serviceAiVideo,
    title: "AI-видео",
    description: "Визуал нового уровня с AI-генерацией и профессиональным монтажом",
    href: "/services",
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
              AI-продукты, сайты под услуги и вертикальный контент. Беру на себя большую часть работы.
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link to={service.href}>
                <PremiumCard
                  className="group rounded-2xl border border-border bg-card/30 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
                  hoverScale={1.03}
                  hoverY={-4}
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={320}
                      height={180}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
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
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Подробнее <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </PremiumCard>
              </Link>
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
