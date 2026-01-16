import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Video, Calendar, Users, TrendingUp, Lightbulb, BarChart3, Palette, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReelsProducer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    goals: ""
  });

  useEffect(() => {
    document.title = "Продюсер Reels для бизнеса — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Продюсирование Reels под ключ: от идеи до публикации. Контент-стратегия, съёмка, монтаж и продвижение для вашего бизнеса."
    );

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Продюсер Reels для бизнеса",
      "description": "Полный цикл продюсирования Reels: стратегия, создание контента, монтаж и продвижение.",
      "provider": {
        "@type": "Person",
        "name": "Aleksey Taranukha"
      },
      "areaServed": "Worldwide",
      "serviceType": "Content Production"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'reels-producer');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="reels-producer"]');
      if (schemaScript) schemaScript.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Заявка получена!",
      description: "Свяжусь с вами в ближайшее время для обсуждения стратегии.",
    });
    setFormData({ name: "", email: "", business: "", goals: "" });
    setIsSubmitting(false);
  };

  const services = [
    { icon: Lightbulb, title: "Контент-стратегия", description: "Разработка контент-плана на месяц с учётом вашей ниши и целевой аудитории" },
    { icon: Calendar, title: "Планирование съёмок", description: "Составление сценариев, подбор локаций, организация съёмочного процесса" },
    { icon: Video, title: "Продакшен", description: "Профессиональная съёмка или работа с вашими материалами" },
    { icon: Palette, title: "Монтаж и оформление", description: "Динамичный монтаж, цветокоррекция, добавление титров и эффектов" },
    { icon: TrendingUp, title: "Оптимизация", description: "Подбор хештегов, времени публикации, написание вовлекающих описаний" },
    { icon: BarChart3, title: "Аналитика", description: "Отслеживание метрик, анализ эффективности, корректировка стратегии" },
  ];

  const forWhom = [
    { title: "Салоны красоты", description: "Демонстрация работ, процесс преображения, отзывы клиентов" },
    { title: "Рестораны и кафе", description: "Аппетитная подача блюд, атмосфера заведения, за кулисами" },
    { title: "Фитнес-студии", description: "Тренировки, трансформации клиентов, мотивационный контент" },
    { title: "Эксперты и коучи", description: "Экспертный контент, лайфхаки, личный бренд" },
  ];

  const results = [
    { metric: "В 3-5 раз", description: "рост охватов за первый месяц работы" },
    { metric: "70%", description: "экономия времени на создание контента" },
    { metric: "Регулярность", description: "системный постинг без пробелов" },
    { metric: "Узнаваемость", description: "единый визуальный стиль бренда" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6 animate-fade-in-up">
              <Video className="h-4 w-4" />
              <span className="text-sm font-medium">Продюсирование контента</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Продюсер Reels<br />для бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Полный цикл создания контента: от разработки стратегии до публикации. Вы занимаетесь бизнесом — я делаю Reels, которые приносят клиентов
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

      {/* Services */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Что входит в продюсирование
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Комплексный подход от идеи до результата
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Для кого это подходит
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {forWhom.map((item, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Какие результаты получите
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {results.map((result, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {result.metric}
                </div>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-16 bg-gradient-to-b from-card/30 to-background">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Начать сотрудничество
              </h2>
              <p className="text-muted-foreground">
                Расскажите о вашем бизнесе, и я подготовлю индивидуальное предложение
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
                <label className="block text-sm font-medium mb-2">Ваш бизнес / ниша</label>
                <Input 
                  placeholder="Салон красоты, ресторан, фитнес-студия..."
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Какие цели хотите достичь?</label>
                <Textarea 
                  placeholder="Больше клиентов, повышение узнаваемости, регулярный контент..."
                  rows={4}
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Обсудить проект"}
                <MessageSquare className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReelsProducer;
