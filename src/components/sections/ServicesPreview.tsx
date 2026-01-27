import { Link } from "react-router-dom";
import { ArrowRight, Brain, Layers, Zap, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/contexts/LanguageContext";

// Service images
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";
import serviceReels from "@/assets/service-reels.jpg";
import serviceAiVideo from "@/assets/service-ai-video.jpg";

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const services = [
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
      icon: Layers,
      image: serviceReels,
      title: t("whatido.vertical_content"),
      description: t("whatido.vertical_content_desc"),
      href: "/montazh-reels",
    },
    {
      icon: Zap,
      image: serviceAiVideo,
      title: t("whatido.ai_video"),
      description: t("whatido.ai_video_desc"),
      href: "/services",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("services_preview.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("services_preview.subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12" staggerDelay={0.1}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link to={service.href}>
                <PremiumCard
                  className="group rounded-xl sm:rounded-2xl border border-border bg-card/30 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
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
                  <div className="p-4 sm:p-6">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4"
                      whileHover={!prefersReducedMotion ? { 
                        scale: 1.1,
                        backgroundColor: "hsl(var(--primary) / 0.2)"
                      } : undefined}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-sm sm:text-lg font-display font-semibold mb-1 sm:mb-2 line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t("whatido.more")} <ArrowRight className="h-3 w-3" />
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
                  {t("services_preview.all")}
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
