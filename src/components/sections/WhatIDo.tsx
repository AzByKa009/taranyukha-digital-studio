import { Link } from "react-router-dom";
import { Briefcase, Megaphone, Bot, BarChart3, Code, Brain, Layers, Zap, Globe, Share2, Target } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useRealtimeServices } from "@/hooks/useRealtimeServices";
import { Loader2 } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Megaphone,
  Bot,
  BarChart3,
  Code,
  Brain,
  Layers,
  Zap,
  Globe,
  Share2,
  Target,
};

export function WhatIDo() {
  const { services, loading } = useRealtimeServices({ limit: 4 });

  const getIcon = (iconName: string | null, index: number) => {
    if (iconName && iconMap[iconName]) {
      return iconMap[iconName];
    }
    const defaultIcons = [Briefcase, Megaphone, Bot, BarChart3];
    return defaultIcons[index % defaultIcons.length];
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-28 relative bg-card/30">
        <div className="container relative z-10">
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 relative bg-card/30">
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              Экспертиза
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              С чем помогаю <span className="text-gradient">бизнесу расти</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Это не список услуг, а области, в которых я разбираюсь. 
              Конкретное решение подбираю под вашу задачу — после диагностики.
            </p>
          </div>
        </FadeIn>

        {/* Expertise Grid - Dynamic from Services */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12" staggerDelay={0.1}>
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon, index);
            return (
              <StaggerItem key={service.id}>
                <Link to={`/services/${service.slug}`}>
                  <PremiumCard
                    className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-background/50 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full"
                    hoverScale={1.02}
                    hoverY={-4}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.short_description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </PremiumCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Removed redundant CTA - clean ending */}
      </div>
    </section>
  );
}
