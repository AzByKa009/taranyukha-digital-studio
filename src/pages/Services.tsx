import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Briefcase, Megaphone, Share2, Bot, Globe, Loader2, TrendingUp, Code, Brain, Layers, Zap, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/useSEO";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";

// Icon mapping for dynamic services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Globe,
  Share2,
  Megaphone,
  Bot,
  Code,
  Brain,
  Layers,
  Zap,
  BarChart3,
  Target,
};

interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string | null;
  price_from: number | null;
  price_label: string | null;
  thumbnail: string | null;
  icon: string | null;
  features: string[] | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoadError(null);
      const { data, error } = await supabase
        .from("services")
        .select(
          "id, slug, title, short_description, full_description, price_from, price_label, thumbnail, icon, features"
        )
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (error) {
        throw error;
      }

      setServices(data ?? []);
    } catch (e) {
      console.error("Failed to fetch services:", e);
      setServices([]);
      setLoadError("Не удалось загрузить услуги. Обновите страницу и попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('services-page-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useSEO({
    title: "Услуги маркетолога — упаковка, продвижение, автоматизация | Алексей Тарануха",
    description: "Не список услуг, а инструменты для роста бизнеса. Упаковка, сайты, соцсети, продвижение, автоматизация. Системный подход к маркетингу.",
    keywords: "маркетолог услуги, упаковка бизнеса, продвижение бизнеса, автоматизация маркетинга, сайт для бизнеса, соцсети для бизнеса",
  });

  const getIcon = (iconName: string | null) => {
    if (iconName && iconMap[iconName]) {
      return iconMap[iconName];
    }
    return Briefcase;
  };

  const getServiceLink = (service: Service) => {
    // Map slugs to landing pages if they exist
    const landingPages: Record<string, string> = {
      'sajty': '/razrabotka-sayta-pod-uslugi',
      'avtomatizaciya': '/ai-bot-dlya-biznesa',
    };
    return landingPages[service.slug] || `/services/${service.slug}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (loadError) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-display font-bold mb-3">Услуги</h1>
            <p className="text-muted-foreground">{loadError}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero - Strategic positioning */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 block">
                Инструменты роста
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 sm:mb-6">
                Не услуги, <br />
                <span className="text-gradient">а решения задач</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                Каждый инструмент — часть системы роста вашего бизнеса. 
                Я не продаю «часы работы» — я решаю конкретные проблемы, 
                которые мешают вам расти.
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Начинаем с диагностики — чтобы понять, что именно нужно вам</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Dynamic Services from Database */}
      <section className="pb-20 sm:pb-28">
        <div className="container">
          <StaggerContainer className="space-y-4 sm:space-y-6" staggerDelay={0.1}>
            {services.map((service) => {
              const IconComponent = getIcon(service.icon);
              return (
                <StaggerItem key={service.id}>
                  <Link to={getServiceLink(service)}>
                    <PremiumCard
                      className="group p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300"
                      hoverScale={1.01}
                      hoverY={-4}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                        {/* Left - Icon & Title */}
                        <div className="lg:w-1/3">
                          <div className="flex items-start gap-4 mb-4 lg:mb-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                              <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <div>
                              <h2 className="text-xl sm:text-2xl font-display font-bold mb-2 group-hover:text-gradient transition-colors duration-300">
                                {service.title}
                              </h2>
                              {service.features && service.features.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {service.features.slice(0, 3).map((item) => (
                                    <span
                                      key={item}
                                      className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right - Description & Price */}
                        <div className="lg:w-2/3 space-y-4">
                          <div>
                            <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1 block">
                              Проблема
                            </span>
                            <p className="text-base sm:text-lg text-foreground font-medium">
                              {service.short_description}
                            </p>
                          </div>
                          
                          {service.full_description && (
                            <div>
                              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1 block">
                                Решение
                              </span>
                              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {service.full_description}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4">
                              {(service.price_from || service.price_label) && (
                                <div className="flex items-center gap-2 text-primary">
                                  <Target className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {service.price_label || `от ${service.price_from?.toLocaleString()} ₽`}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Подробнее
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </PremiumCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Услуги пока не добавлены</p>
            </div>
          )}
        </div>
      </section>

      {/* How it works together */}
      <section className="py-16 sm:py-24 bg-card/30 border-y border-border/30">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 block">
                Системный подход
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
                Как это работает <span className="text-gradient">вместе</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Отдельные услуги — как разрозненные инструменты. 
                Но когда они работают в системе — результат кратно выше.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Connection line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 hidden sm:block" />
                
                <div className="space-y-6 sm:space-y-8">
                  {services.map((service, index) => {
                    const stepNumber = String(index + 1).padStart(2, '0');
                    return (
                      <div key={service.id} className="flex gap-4 sm:gap-8">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 relative z-10 border-2 border-background">
                          <span className="text-primary font-display font-bold text-sm">{stepNumber}</span>
                        </div>
                        <div className="pt-2">
                          <h3 className="text-lg sm:text-xl font-display font-semibold mb-1">{service.title}</h3>
                          <p className="text-sm sm:text-base text-muted-foreground">{service.short_description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-5">
                С чего <span className="text-gradient">начать</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 leading-relaxed">
                Расскажите о бизнесе — разберём вместе, какие инструменты 
                сработают именно в вашем случае.
              </p>
              <Link to="/contacts">
                <Button variant="hero" size="lg" className="shadow-xl shadow-primary/20">
                  Разобрать мой проект
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
