import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Megaphone, Target, TrendingUp, BarChart3, Search, Zap, Users, CheckCircle, MousePointer, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Promotion = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    goals: ""
  });

  useEffect(() => {
    document.title = "Продвижение бизнеса — реклама и трафик | Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      "Продвижение бизнеса: таргетированная реклама, контекстная реклама, SEO-продвижение. Привлечение клиентов с измеримым результатом."
    );

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Продвижение бизнеса",
      "description": "Комплексное продвижение бизнеса: таргетированная и контекстная реклама, SEO, performance-маркетинг.",
      "provider": { "@type": "Person", "name": "Aleksey Taranukha" },
      "areaServed": "Worldwide",
      "serviceType": "Digital Marketing"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'promotion');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-schema="promotion"]');
      if (s) s.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Заявка отправлена!", description: "Свяжусь с вами для обсуждения проекта." });
    setFormData({ name: "", email: "", business: "", goals: "" });
    setIsSubmitting(false);
  };

  const features = [
    { icon: Target, title: "Таргетированная реклама", description: "Точное попадание в целевую аудиторию в соцсетях" },
    { icon: Search, title: "Контекстная реклама", description: "Яндекс.Директ и Google Ads — клиенты, которые уже ищут" },
    { icon: TrendingUp, title: "SEO-продвижение", description: "Органический трафик из поиска без оплаты за клики" },
    { icon: BarChart3, title: "Аналитика и отчёты", description: "Прозрачные метрики: CPA, ROI, конверсии в реальном времени" },
    { icon: MousePointer, title: "Ретаргетинг", description: "Возвращаем тех, кто уже был на сайте, но не купил" },
    { icon: Eye, title: "A/B тестирование", description: "Тестируем гипотезы и масштабируем лучшие результаты" },
  ];

  const promoTypes = [
    {
      title: "Быстрый старт",
      description: "Запуск рекламы за 3-5 дней для быстрого потока заявок",
      features: ["Настройка 1 канала", "Базовая аналитика", "Еженедельные отчёты"],
      ideal: "Тестирование спроса, быстрый запуск"
    },
    {
      title: "Комплексное продвижение",
      description: "Мультиканальная стратегия для стабильного потока клиентов",
      features: ["2-3 рекламных канала", "Сквозная аналитика", "Оптимизация воронки", "Ежемесячные отчёты"],
      ideal: "Бизнесы с постоянным потоком заявок"
    },
    {
      title: "Performance-маркетинг",
      description: "Полная система привлечения с фокусом на ROI",
      features: ["Все каналы трафика", "CRM-интеграция", "Автоматизация", "Масштабирование"],
      ideal: "Компании с бюджетом от 300 000 ₽/мес"
    },
  ];

  const whyImportant = [
    "Без продвижения даже лучший продукт не найдут",
    "Платная реклама даёт результат в первую неделю",
    "SEO приносит бесплатных клиентов на годы вперёд",
    "Аналитика показывает, куда вкладывать каждый рубль",
  ];

  const process = [
    { step: "01", title: "Аудит", description: "Анализируем нишу, конкурентов и текущие каналы" },
    { step: "02", title: "Стратегия", description: "Определяем каналы, бюджеты и KPI" },
    { step: "03", title: "Запуск", description: "Настраиваем рекламу и запускаем кампании" },
    { step: "04", title: "Оптимизация", description: "Тестируем креативы и улучшаем конверсии" },
    { step: "05", title: "Масштаб", description: "Увеличиваем бюджет на лучшие связки" },
    { step: "06", title: "Отчёт", description: "Прозрачная отчётность по всем метрикам" },
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in-up">
              <Megaphone className="h-4 w-4" />
              <span className="text-sm font-medium">Маркетинг</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Продвижение<br />бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Привлекаю клиентов через рекламу и SEO с измеримым результатом. Каждый рубль в рекламе — под контролем
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить продвижение
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
            Что включает продвижение
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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

      {/* Promo Types */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Какой формат продвижения нужен
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Подберём стратегию под ваши цели и бюджет
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {promoTypes.map((type, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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
              Зачем нужно продвижение
            </h2>
            <div className="space-y-4">
              {whyImportant.map((item, index) => (
                <div key={index} className="flex items-start gap-4 glass-card p-4 rounded-xl animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Этапы работы
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Заказать продвижение</h2>
              <p className="text-muted-foreground">Расскажите о бизнесе, и я подготовлю стратегию</p>
            </div>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя</label>
                <Input placeholder="Как к вам обращаться?" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ваш бизнес</label>
                <Input placeholder="Ниша, продукт, текущий трафик..." value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Цели продвижения</label>
                <Textarea placeholder="Сколько заявок нужно, какой бюджет, какие каналы интересуют..." rows={4} value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} required />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Получить стратегию"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Promotion;
