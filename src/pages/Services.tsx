import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, HelpCircle, Film, Users, Bot, Globe, Sparkles, Loader2, Video, Cpu, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

import popularReelsMontage from "@/assets/popular-reels-montage.jpg";
import popularReelsProducer from "@/assets/popular-reels-producer.jpg";
import popularAiBot from "@/assets/popular-ai-bot.jpg";
import popularWebsite from "@/assets/popular-website.jpg";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string | null;
  icon: string | null;
  thumbnail: string | null;
  price_from: number | null;
  price_label: string | null;
  features: string[] | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Film,
  Users,
  Video,
  Cpu,
  Code,
  Bot,
  Globe,
};

const popularServices = [
  {
    title: "Монтаж Reels",
    description: "Профессиональный монтаж коротких видео для Instagram и TikTok",
    href: "/montazh-reels",
    icon: Film,
    gradient: "from-pink-500/20 to-rose-500/20",
    borderGradient: "hover:border-pink-500/50",
    image: popularReelsMontage,
  },
  {
    title: "Продюсер Reels",
    description: "Полный цикл создания Reels контента для вашего бизнеса",
    href: "/produser-reels",
    icon: Users,
    gradient: "from-violet-500/20 to-purple-500/20",
    borderGradient: "hover:border-violet-500/50",
    image: popularReelsProducer,
  },
  {
    title: "AI-бот для бизнеса",
    description: "Создание умных ботов для автоматизации общения с клиентами",
    href: "/ai-bot-dlya-biznesa",
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderGradient: "hover:border-cyan-500/50",
    image: popularAiBot,
  },
  {
    title: "Сайт под услуги",
    description: "Разработка продающего сайта для сферы услуг",
    href: "/razrabotka-sayta-pod-uslugi",
    icon: Globe,
    gradient: "from-emerald-500/20 to-green-500/20",
    borderGradient: "hover:border-emerald-500/50",
    image: popularWebsite,
  },
];

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, slug, title, short_description, full_description, icon, thumbnail, price_from, price_label, features")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  useSEO({
    title: "Услуги — монтаж Reels, AI-продукты, вайб кодинг | Aleksey Taranukha",
    description: "Монтаж вертикальных видео, продюсирование контента, создание AI продуктов и вайб кодинг. Премиальные услуги для бизнеса.",
    keywords: "монтаж Reels, продюсирование контента, AI продукты, вайб кодинг, премиальный лендинг, сайт под ключ, монтаж вертикальных видео",
  });

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Film;
    return iconMap[iconName] || Film;
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

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 animate-fade-in-up">
              Услуги
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              От вертикального контента до AI-продуктов и сайтов. 
              Беру на себя большую часть работы — вы занимаетесь своим делом.
            </p>
            <div className="flex items-center gap-2.5 text-primary animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Финальная стоимость зависит от задачи — рассчитывается индивидуально</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="pb-20">
        <div className="container">
          <div className="grid gap-5">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="group premium-card overflow-hidden animate-fade-in-up flex flex-col lg:flex-row"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="lg:w-64 h-48 lg:h-auto shrink-0 overflow-hidden">
                    {service.thumbnail ? (
                      <img 
                        src={service.thumbnail} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-7 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-400 group-hover:scale-105">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-display font-semibold mb-2 group-hover:text-gradient transition-colors duration-400">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {service.short_description}
                      </p>
                      <div className="flex flex-wrap gap-5 text-sm items-center">
                        {service.price_from && (
                          <span className="text-primary font-semibold text-base">
                            от {service.price_from.toLocaleString()} ₽
                          </span>
                        )}
                        {service.price_label && (
                          <span className="text-muted-foreground text-xs">
                            {service.price_label}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-medium shrink-0 group-hover:gap-3 transition-all duration-300">
                      Подробнее
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Как выбрать услугу?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Всё зависит от вашей задачи. Вот простая навигация:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-background/60 border border-border/40 hover:border-border/60 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2.5">Есть готовое видео</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Вы уже записали материал и нужно превратить его в готовый продукт
              </p>
              <Link to="/services/montage" className="text-primary text-sm font-medium hover:underline">
                Монтаж →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 border border-border/40 hover:border-border/60 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2.5">Нужен контент «под ключ»</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Хотите систему производства контента без погружения в детали
              </p>
              <Link to="/services/producing" className="text-primary text-sm font-medium hover:underline">
                Продюсирование →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 border border-border/40 hover:border-border/60 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2.5">Нужен WOW-эффект</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Хотите визуал, который невозможно снять традиционно
              </p>
              <Link to="/services/producing-ai" className="text-primary text-sm font-medium hover:underline">
                AI-видео →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 border border-border/40 hover:border-border/60 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2.5">Нужен AI в бизнесе</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Хотите автоматизировать процессы или создать AI-продукт
              </p>
              <Link to="/services/ai-product" className="text-primary text-sm font-medium hover:underline">
                AI-продукт →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 border border-border/40 hover:border-border/60 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2.5">Нужен MVP быстро</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Хотите проверить идею и выйти на рынок за недели
              </p>
              <Link to="/services/vibe-coding" className="text-primary text-sm font-medium hover:underline">
                Vibe coding →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2.5">Не уверены?</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Расскажите о задаче — я подскажу оптимальный вариант
              </p>
              <Link to="/contacts" className="text-primary text-sm font-medium hover:underline">
                Связаться →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services - SEO Landings */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-5">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Популярные услуги</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Быстрый старт
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Самые востребованные услуги с подробным описанием и примерами работ
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularServices.map((service, index) => (
              <Link
                key={service.href}
                to={service.href}
                className={cn(
                  "group relative rounded-2xl border transition-all duration-400 overflow-hidden",
                  "bg-gradient-to-br hover:shadow-xl",
                  service.gradient,
                  "border-border/40",
                  service.borderGradient
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-background/90 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-400 shadow-lg">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                    Подробнее
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/20 border-t border-border/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">
              Готовы обсудить проект?
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Расскажите о вашей задаче — подготовлю предложение в течение 24 часов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts">
                <Button variant="hero" size="lg" className="shadow-xl shadow-primary/20">
                  Связаться
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="hero-outline" size="lg">
                  Рассчитать проект
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
