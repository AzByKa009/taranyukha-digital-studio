import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Briefcase, Megaphone, Share2, Bot, Globe, Loader2, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/useSEO";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";

import servicePackaging from "@/assets/service-packaging-light.jpg";
import serviceWebsites from "@/assets/service-websites-light.jpg";
import serviceSocial from "@/assets/service-social-light.jpg";
import servicePromotion from "@/assets/service-promotion-light.jpg";
import serviceAutomation from "@/assets/service-automation-light.jpg";

// Strategic services - tools for implementing growth strategy
const strategicServices = [
  {
    icon: Briefcase,
    image: servicePackaging,
    title: "Упаковка бизнеса",
    problemSolved: "Клиенты не понимают, чем вы лучше конкурентов",
    whyNeeded: "Позиционирование → понятное предложение → больше конверсий. Упаковка — фундамент всего маркетинга.",
    includes: ["Позиционирование", "Ценностное предложение", "Коммерческие материалы"],
    result: "Клиент понимает ценность за 5 секунд",
    href: "/contacts",
  },
  {
    icon: Globe,
    image: serviceWebsites,
    title: "Сайты",
    problemSolved: "Сайт есть, но заявок с него нет",
    whyNeeded: "Сайт — не визитка, а инструмент продаж. Правильная структура и тексты конвертируют посетителей в заявки.",
    includes: ["Продающая структура", "Конверсионные формы", "SEO-оптимизация"],
    result: "Сайт приносит заявки, а не просто «есть»",
    href: "/razrabotka-sayta-pod-uslugi",
  },
  {
    icon: Share2,
    image: serviceSocial,
    title: "Соцсети",
    problemSolved: "Ведёте соцсети, но они не приносят клиентов",
    whyNeeded: "Контент без стратегии — просто посты. Системный подход превращает соцсети в канал продаж.",
    includes: ["Контент-стратегия", "Визуальный стиль", "Регулярный постинг"],
    result: "Соцсети работают на узнаваемость и продажи",
    href: "/contacts",
  },
  {
    icon: Megaphone,
    image: servicePromotion,
    title: "Продвижение",
    problemSolved: "Нет стабильного потока новых клиентов",
    whyNeeded: "Органика — долго, реклама — можно слить бюджет. Нужна система, которая окупается.",
    includes: ["Таргетированная реклама", "SEO-продвижение", "Контент-маркетинг"],
    result: "Предсказуемый поток заявок каждый месяц",
    href: "/contacts",
  },
  {
    icon: Bot,
    image: serviceAutomation,
    title: "Автоматизация",
    problemSolved: "Команда тонет в рутине, время уходит на повторяющиеся задачи",
    whyNeeded: "Автоматизация освобождает время для важного. AI и интеграции работают 24/7 без усталости.",
    includes: ["Чат-боты", "CRM-интеграции", "Автоворонки"],
    result: "Рутина на автопилоте, команда занята важным",
    href: "/ai-bot-dlya-biznesa",
  },
];

const Services = () => {
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, title, short_description, price_from")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setDbServices(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('services-changes')
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

      {/* Strategic Services */}
      <section className="pb-20 sm:pb-28">
        <div className="container">
          <StaggerContainer className="space-y-4 sm:space-y-6" staggerDelay={0.1}>
            {strategicServices.map((service, index) => (
              <StaggerItem key={service.title}>
                <Link to={service.href}>
                  <PremiumCard
                    className="group rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
                    hoverScale={1.01}
                    hoverY={-4}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Image */}
                      <div className="lg:w-1/3 aspect-[4/3] lg:aspect-auto overflow-hidden relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:hidden" />
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 md:p-10 lg:w-2/3 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                            <service.icon className="h-5 w-5 text-primary" />
                          </div>
                          <h2 className="text-xl sm:text-2xl font-display font-bold group-hover:text-gradient transition-colors duration-300">
                            {service.title}
                          </h2>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {service.includes.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 text-xs rounded-lg bg-primary/5 text-muted-foreground border border-border/40"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-3 mb-5">
                          <div>
                            <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1 block">
                              Проблема
                            </span>
                            <p className="text-base sm:text-lg text-foreground font-medium">
                              {service.problemSolved}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.whyNeeded}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-primary">
                            <Target className="h-4 w-4" />
                            <span className="text-sm font-medium">{service.result}</span>
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
            ))}
          </StaggerContainer>
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
                  {[
                    { step: "01", title: "Упаковка", desc: "Формируем понятное предложение, которое отличает вас от конкурентов" },
                    { step: "02", title: "Сайт", desc: "Превращаем упаковку в конверсионный инструмент, который продаёт 24/7" },
                    { step: "03", title: "Соцсети", desc: "Выстраиваем доверие и узнаваемость через регулярный контент" },
                    { step: "04", title: "Продвижение", desc: "Запускаем трафик, который конвертируется в заявки" },
                    { step: "05", title: "Автоматизация", desc: "Масштабируем результат без увеличения нагрузки на команду" },
                  ].map((item, index) => (
                    <div key={item.step} className="flex gap-4 sm:gap-8">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 relative z-10 border-2 border-background">
                        <span className="text-primary font-display font-bold text-sm">{item.step}</span>
                      </div>
                      <div className="pt-2">
                        <h3 className="text-lg sm:text-xl font-display font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
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
