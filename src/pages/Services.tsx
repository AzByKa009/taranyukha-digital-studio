import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const Services = () => {
  useEffect(() => {
    document.title = "Услуги — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Монтаж, продюсирование, AI-видео, AI-продукты и vibe coding. Премиальные услуги для создания контента и цифровых продуктов."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Услуги
            </h1>
            <p className="text-xl text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Беру на себя всю техническую работу — вы занимаетесь своей экспертизой, 
              а я делаю так, чтобы она выглядела и работала на высшем уровне
            </p>
            <div className="flex items-center gap-2 text-primary animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Снимаю с вас головную боль о технической реализации</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="pb-16">
        <div className="container">
          <div className="grid gap-6">
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group glass-card rounded-2xl p-8 hover-lift animate-fade-in-up flex flex-col lg:flex-row lg:items-center gap-6"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold mb-2 group-hover:text-gradient transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {service.tagline}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground">
                      <span className="text-foreground font-medium">Для:</span> {service.idealFor}
                    </span>
                    <span className="text-muted-foreground">
                      <span className="text-foreground font-medium">Сроки:</span> {service.timeline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary font-medium shrink-0">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Как выбрать услугу?
            </h2>
            <p className="text-lg text-muted-foreground">
              Всё зависит от вашей задачи. Вот простая навигация:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-background/50 border border-border">
              <h3 className="font-display font-semibold mb-2">Есть готовое видео</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Вы уже записали материал и нужно превратить его в готовый продукт
              </p>
              <Link to="/services/montage" className="text-primary text-sm font-medium hover:underline">
                Монтаж →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/50 border border-border">
              <h3 className="font-display font-semibold mb-2">Нужен контент «под ключ»</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Хотите систему производства контента без погружения в детали
              </p>
              <Link to="/services/producing" className="text-primary text-sm font-medium hover:underline">
                Продюсирование →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/50 border border-border">
              <h3 className="font-display font-semibold mb-2">Нужен WOW-эффект</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Хотите визуал, который невозможно снять традиционно
              </p>
              <Link to="/services/producing-ai" className="text-primary text-sm font-medium hover:underline">
                AI-видео →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/50 border border-border">
              <h3 className="font-display font-semibold mb-2">Нужен AI в бизнесе</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Хотите автоматизировать процессы или создать AI-продукт
              </p>
              <Link to="/services/ai-product" className="text-primary text-sm font-medium hover:underline">
                AI-продукт →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-background/50 border border-border">
              <h3 className="font-display font-semibold mb-2">Нужен MVP быстро</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Хотите проверить идею и выйти на рынок за недели
              </p>
              <Link to="/services/vibe-coding" className="text-primary text-sm font-medium hover:underline">
                Vibe coding →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <h3 className="font-display font-semibold mb-2">Не уверены?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Расскажите о задаче — я подскажу оптимальный вариант
              </p>
              <Link to="/contacts" className="text-primary text-sm font-medium hover:underline">
                Связаться →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
            Сравнение услуг
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-display font-semibold">Услуга</th>
                  <th className="text-left py-4 px-4 font-display font-semibold">Для кого</th>
                  <th className="text-left py-4 px-4 font-display font-semibold">Сроки</th>
                  <th className="text-left py-4 px-4 font-display font-semibold">Сложность</th>
                  <th className="text-left py-4 px-4 font-display font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-border/50 hover:bg-card/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <service.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{service.shortTitle}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{service.idealFor}</td>
                    <td className="py-4 px-4 text-muted-foreground">{service.timeline}</td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        service.complexity === "базовый" && "bg-green-500/10 text-green-500",
                        service.complexity === "средний" && "bg-yellow-500/10 text-yellow-500",
                        service.complexity === "продвинутый" && "bg-primary/10 text-primary"
                      )}>
                        {service.complexity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Link 
                        to={`/services/${service.slug}`}
                        className="text-primary text-sm font-medium hover:underline"
                      >
                        Подробнее →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Готовы обсудить проект?
            </h2>
            <p className="text-muted-foreground mb-8">
              Расскажите о вашей задаче — подготовлю предложение в течение 24 часов
            </p>
            <Link to="/contacts">
              <Button variant="hero" size="lg">
                Связаться
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
