import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, HelpCircle, Film, Users, Bot, Globe, Sparkles, Loader2, Video, Cpu, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

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

const Services = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  const popularServices = [
    {
      title: language === "ru" ? "Монтаж Reels" : "Reels Editing",
      description: language === "ru" 
        ? "Профессиональный монтаж коротких видео для Instagram и TikTok"
        : "Professional short video editing for Instagram and TikTok",
      href: "/montazh-reels",
      icon: Film,
      gradient: "from-pink-500/20 to-rose-500/20",
      borderGradient: "hover:border-pink-500/50",
      image: popularReelsMontage,
    },
    {
      title: language === "ru" ? "Продюсер Reels" : "Reels Producer",
      description: language === "ru"
        ? "Полный цикл создания Reels контента для вашего бизнеса"
        : "Full cycle of Reels content creation for your business",
      href: "/produser-reels",
      icon: Users,
      gradient: "from-violet-500/20 to-purple-500/20",
      borderGradient: "hover:border-violet-500/50",
      image: popularReelsProducer,
    },
    {
      title: language === "ru" ? "AI-бот для бизнеса" : "AI Business Bot",
      description: language === "ru"
        ? "Создание умных ботов для автоматизации общения с клиентами"
        : "Creating smart bots to automate customer communication",
      href: "/ai-bot-dlya-biznesa",
      icon: Bot,
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderGradient: "hover:border-cyan-500/50",
      image: popularAiBot,
    },
    {
      title: language === "ru" ? "Сайт под услуги" : "Service Website",
      description: language === "ru"
        ? "Разработка продающего сайта для сферы услуг"
        : "Development of a selling website for the service industry",
      href: "/razrabotka-sayta-pod-uslugi",
      icon: Globe,
      gradient: "from-emerald-500/20 to-green-500/20",
      borderGradient: "hover:border-emerald-500/50",
      image: popularWebsite,
    },
  ];

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
    title: language === "ru"
      ? "Услуги — монтаж Reels, AI-продукты, вайб кодинг | Aleksey Taranukha"
      : "Services — Reels editing, AI products, vibe coding | Aleksey Taranukha",
    description: language === "ru"
      ? "Монтаж вертикальных видео, продюсирование контента, создание AI продуктов и вайб кодинг. Премиальные услуги для бизнеса."
      : "Vertical video editing, content production, AI product creation and vibe coding. Premium business services.",
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
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-5 animate-fade-in-up">
              {t("services.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              {t("services.subtitle")}
            </p>
            <div className="flex items-start sm:items-center gap-2 text-primary animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 sm:mt-0 shrink-0" />
              <span className="text-sm sm:text-base font-medium">{t("services.price_note")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="pb-12 sm:pb-20">
        <div className="container">
          <div className="grid gap-4 sm:gap-5">
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
                  <div className="lg:w-48 xl:w-64 h-40 sm:h-48 lg:h-auto shrink-0 overflow-hidden">
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
                  <div className="flex-1 p-5 sm:p-7 md:p-8 flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-400 group-hover:scale-105">
                      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-1.5 sm:mb-2 group-hover:text-gradient transition-colors duration-400">
                        {service.title}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3 leading-relaxed line-clamp-2">
                        {service.short_description}
                      </p>
                      <div className="flex flex-wrap gap-3 sm:gap-5 text-sm items-center">
                        {service.price_from && (
                          <span className="text-primary font-semibold text-sm sm:text-base">
                            {t("common.from")} {service.price_from.toLocaleString()} ₽
                          </span>
                        )}
                        {service.price_label && (
                          <span className="text-muted-foreground text-xs">
                            {service.price_label}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-medium shrink-0 group-hover:gap-3 transition-all duration-300 text-sm sm:text-base">
                      {t("services.details")}
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
      <section className="py-12 sm:py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5">
              <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("services.how_choose")}
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
              {t("services.how_choose_subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 max-w-5xl mx-auto">
            {[
              { title: language === "ru" ? "Есть готовое видео" : "Have ready video", desc: language === "ru" ? "Вы уже записали материал и нужно превратить его в готовый продукт" : "You already recorded the material and need to turn it into a finished product", link: "/services/montage", linkText: language === "ru" ? "Монтаж →" : "Editing →" },
              { title: language === "ru" ? "Нужен контент «под ключ»" : "Need turnkey content", desc: language === "ru" ? "Хотите систему производства контента без погружения в детали" : "Want a content production system without diving into details", link: "/services/producing", linkText: language === "ru" ? "Продюсирование →" : "Production →" },
              { title: language === "ru" ? "Нужен WOW-эффект" : "Need WOW effect", desc: language === "ru" ? "Хотите визуал, который невозможно снять традиционно" : "Want visuals that can't be shot traditionally", link: "/services/producing-ai", linkText: language === "ru" ? "AI-видео →" : "AI Video →" },
              { title: language === "ru" ? "Нужен AI в бизнесе" : "Need AI in business", desc: language === "ru" ? "Хотите автоматизировать процессы или создать AI-продукт" : "Want to automate processes or create an AI product", link: "/services/ai-product", linkText: language === "ru" ? "AI-продукт →" : "AI Product →" },
              { title: language === "ru" ? "Нужен MVP быстро" : "Need MVP fast", desc: language === "ru" ? "Хотите проверить идею и выйти на рынок за недели" : "Want to test an idea and go to market in weeks", link: "/services/vibe-coding", linkText: "Vibe coding →" },
            ].map((item) => (
              <div key={item.title} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background/60 border border-border/40 hover:border-border/60 transition-colors duration-300">
                <h3 className="font-display font-semibold mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  {item.desc}
                </p>
                <Link to={item.link} className="text-primary text-xs sm:text-sm font-medium hover:underline">
                  {item.linkText}
                </Link>
              </div>
            ))}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-display font-semibold mb-2 text-sm sm:text-base">{language === "ru" ? "Не уверены?" : "Not sure?"}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                {language === "ru" ? "Расскажите о задаче — я подскажу оптимальный вариант" : "Tell me about your task — I'll suggest the best option"}
              </p>
              <Link to="/contacts" className="text-primary text-xs sm:text-sm font-medium hover:underline">
                {language === "ru" ? "Связаться →" : "Contact →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services - SEO Landings */}
      <section className="py-12 sm:py-20">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 sm:mb-5">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">{t("services.popular")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("services.quick_start")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("services.quick_start_subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {popularServices.map((service, index) => (
              <Link
                key={service.href}
                to={service.href}
                className={cn(
                  "group relative rounded-xl sm:rounded-2xl border transition-all duration-400 overflow-hidden",
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
                <div className="p-4 sm:p-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-background/90 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-400 shadow-lg">
                    <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-display font-semibold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-primary text-xs sm:text-sm font-medium group-hover:gap-2 sm:group-hover:gap-2.5 transition-all duration-300">
                    {t("services.details")}
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-card/20 border-t border-border/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-5">
              {t("cta.title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 leading-relaxed">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/contacts">
                <Button variant="hero" size="lg" className="w-full sm:w-auto shadow-xl shadow-primary/20">
                  {t("cta.primary")}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                  {t("cta.secondary")}
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
