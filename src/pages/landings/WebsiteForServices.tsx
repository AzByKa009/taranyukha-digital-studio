import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Globe, Smartphone, Search, Zap, BarChart3, Shield, Palette, Code, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WebsiteForServices = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    requirements: ""
  });

  useEffect(() => {
    document.title = "Разработка сайта под услуги — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Создание продающих сайтов для услуг: SEO-оптимизация, мобильная адаптация, высокая конверсия. Сайт, который приносит клиентов."
    );

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Разработка сайта под услуги",
      "description": "Создание продающих сайтов для услуг с SEO-оптимизацией и высокой конверсией.",
      "provider": {
        "@type": "Person",
        "name": "Aleksey Taranukha"
      },
      "areaServed": "Worldwide",
      "serviceType": "Web Development"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'website-services');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="website-services"]');
      if (schemaScript) schemaScript.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Заявка отправлена!",
      description: "Свяжусь с вами для обсуждения проекта.",
    });
    setFormData({ name: "", email: "", service: "", requirements: "" });
    setIsSubmitting(false);
  };

  const features = [
    { icon: Search, title: "SEO-оптимизация", description: "Сайт виден в поиске по ключевым запросам вашей ниши" },
    { icon: Smartphone, title: "Мобильная версия", description: "Идеально работает на телефонах, планшетах и компьютерах" },
    { icon: Zap, title: "Быстрая загрузка", description: "Страницы грузятся за 1-2 секунды — клиенты не уходят" },
    { icon: BarChart3, title: "Аналитика", description: "Отслеживание конверсий, источников трафика, поведения" },
    { icon: Shield, title: "Безопасность", description: "SSL-сертификат, защита от взлома, резервные копии" },
    { icon: Palette, title: "Уникальный дизайн", description: "Не шаблон — дизайн разрабатывается под ваш бренд" },
  ];

  const siteTypes = [
    {
      title: "Лендинг",
      description: "Одностраничный сайт для одной услуги или продукта",
      features: ["Высокая конверсия", "Быстрый запуск", "Фокус на одном действии"],
      ideal: "Запуск новой услуги, тестирование гипотез, акции"
    },
    {
      title: "Корпоративный сайт",
      description: "Многостраничный сайт компании с полным описанием услуг",
      features: ["Каталог услуг", "Портфолио", "Блог", "Формы заявок"],
      ideal: "Агентства, студии, консалтинговые компании"
    },
    {
      title: "Сайт специалиста",
      description: "Персональный сайт эксперта или частного специалиста",
      features: ["Личный бренд", "Кейсы", "Онлайн-запись", "Отзывы"],
      ideal: "Коучи, консультанты, фрилансеры"
    },
  ];

  const process = [
    { step: "01", title: "Бриф", description: "Собираем информацию о бизнесе, целях и конкурентах" },
    { step: "02", title: "Прототип", description: "Создаём структуру и логику сайта" },
    { step: "03", title: "Дизайн", description: "Разрабатываем уникальный визуальный стиль" },
    { step: "04", title: "Разработка", description: "Верстаем и программируем сайт" },
    { step: "05", title: "SEO", description: "Оптимизируем для поисковых систем" },
    { step: "06", title: "Запуск", description: "Публикуем и настраиваем аналитику" },
  ];

  const whyImportant = [
    "Клиенты проверяют сайт перед обращением — это ваша визитка",
    "Сайт работает 24/7 и принимает заявки даже ночью",
    "Органический трафик из поиска — бесплатные клиенты",
    "Сайт повышает доверие и статус вашего бизнеса",
  ];

  return (
    <Layout>
      <div className="container pt-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Все услуги
        </Link>
      </div>
      {/* Hero */}
      <section className="pt-8 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6 animate-fade-in-up">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Веб-разработка</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Разработка сайта<br />под услуги
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Создаю сайты, которые не просто красиво выглядят, а приводят клиентов. SEO-оптимизация, мобильная адаптация, высокая скорость загрузки
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить проект
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Что включает разработка
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Types */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Какой сайт вам нужен
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Подберём оптимальный формат под ваши задачи и бюджет
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {siteTypes.map((type, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-display font-semibold mb-3">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <div className="space-y-2 mb-4">
                  {type.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Идеально для:</span> {type.ideal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Important */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Зачем нужен сайт в 2024 году
            </h2>
            <div className="space-y-4">
              {whyImportant.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 glass-card p-4 rounded-xl animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Этапы разработки
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {process.map((step, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl font-display font-bold text-primary/30 mb-2">{step.step}</div>
                <h3 className="font-display font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Заказать сайт
              </h2>
              <p className="text-muted-foreground">
                Расскажите о вашем проекте, и я подготовлю коммерческое предложение
              </p>
            </div>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя</label>
                <Input 
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Какие услуги оказываете?</label>
                <Input 
                  placeholder="Юридические услуги, дизайн интерьеров, консалтинг..."
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Требования к сайту</label>
                <Textarea 
                  placeholder="Какие страницы нужны, есть ли референсы, какие функции важны..."
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Получить предложение"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebsiteForServices;
