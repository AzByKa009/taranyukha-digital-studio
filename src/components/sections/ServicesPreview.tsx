import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Brain, Layers, Zap, Code, Briefcase, Megaphone, Bot, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

// Fallback images
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";
import serviceReels from "@/assets/service-reels.jpg";
import serviceAiVideo from "@/assets/service-ai-video.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, Brain, Layers, Zap, Briefcase, Megaphone, Bot, BarChart3,
};

const fallbackImages = [serviceWeb, serviceBot, serviceReels, serviceAiVideo];

interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  thumbnail: string | null;
  icon: string | null;
}

export function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion();
  const [services, setServices] = useState<Service[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("id, slug, title, short_description, thumbnail, icon")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .limit(4);

      if (data) setServices(data);
    };

    fetchServices();

    const channel = supabase
      .channel("services-preview-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "services" }, () => fetchServices())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const getIcon = (iconName: string | null, index: number) => {
    if (iconName && iconMap[iconName]) return iconMap[iconName];
    const defaultIcons = [Code, Brain, Layers, Zap];
    return defaultIcons[index % defaultIcons.length];
  };

  const getImage = (thumbnail: string | null, index: number) => {
    return thumbnail || fallbackImages[index % fallbackImages.length];
  };

  return (
    <section className="py-24 section-depth-services">
      <div className="container relative z-[1]">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("services_preview.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("services_preview.subtitle")}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.1}>
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon, index);
            return (
              <StaggerItem key={service.id}>
                <Link to={`/services/${service.slug}`}>
                  <PremiumCard
                    className="group rounded-2xl border border-border bg-card/30 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full overflow-hidden"
                    hoverScale={1.03}
                    hoverY={-4}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={getImage(service.thumbnail, index)}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        width={320}
                        height={180}
                      />
                    </div>
                    <div className="p-6">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                        whileHover={!prefersReducedMotion ? { scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" } : undefined}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <IconComponent className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="text-lg font-display font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{service.short_description}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t("services_preview.details")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </PremiumCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

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
