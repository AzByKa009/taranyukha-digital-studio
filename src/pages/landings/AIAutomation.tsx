import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Zap, Bot, BarChart3, Clock, Settings, TrendingUp, CheckCircle, Workflow, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIAutomation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    task: ""
  });

  useEffect(() => {
    document.title = "AI автоматизация бизнеса — автоматизация процессов | Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      "AI автоматизация бизнес-процессов: чат-боты, интеграции, автоматические отчёты. Снижение рутины и экономия времени команды."
    );

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI автоматизация бизнеса",
      "description": "Автоматизация бизнес-процессов с помощью искусственного интеллекта.",
      "provider": { "@type": "Person", "name": "Aleksey Taranukha" },
      "areaServed": "Worldwide",
      "serviceType": "Business Automation"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'ai-automation');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-schema="ai-automation"]');
      if (s) s.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Заявка отправлена!", description: "Свяжусь с вами для обсуждения проекта." });
    setFormData({ name: "", email: "", business: "", task: "" });
    setIsSubmitting(false);
  };

  const features = [
    { icon: Bot, title: "Чат-боты", description: "Автоматические ответы клиентам, запись, консультации 24/7" },
    { icon: Settings, title: "Интеграции", description: "Связка CRM, мессенджеров, таблиц и других сервисов" },
    { icon: BarChart3, title: "Автоматические отчёты", description: "Аналитика и отчёты формируются без ручной работы" },
    { icon: Workflow, title: "Бизнес-процессы", description: "Автоматизация повторяющихся задач и рутины" },
    { icon: RefreshCw, title: "Автоворонки", description: "Автоматическая обработка и прогрев лидов" },
    { icon: Clock, title: "Экономия времени", description: "Команда фокусируется на важном, рутину делает AI" },
  ];

  const automationTypes = [
    {
      title: "Базовая автоматизация",
      description: "Автоматизация 1-2 ключевых процессов для быстрого результата",
      features: ["1 бот или интеграция", "Базовая настройка", "Обучение команды"],
      ideal: "Малый бизнес, тестирование автоматизации"
    },
    {
      title: "Комплексная автоматизация",
      description: "Связка нескольких процессов в единую систему",
      features: ["3-5 автоматизаций", "CRM-интеграция", "Аналитика", "Поддержка 1 мес"],
      ideal: "Растущие компании, отделы продаж"
    },
    {
      title: "AI-трансформация",
      description: "Полная перестройка процессов с использованием AI",
      features: ["Аудит процессов", "AI-решения", "Обучение нейросетей", "Долгосрочная поддержка"],
      ideal: "Компании, готовые к цифровой трансформации"
    },
  ];

  const whyImportant = [
    "Экономия 10-20 часов в неделю на рутинных задачах",
    "Снижение ошибок от человеческого фактора до минимума",
    "Масштабирование бизнеса без найма новых сотрудников",
    "Быстрая обработка заявок — клиенты не ждут и не уходят",
  ];

  const process = [
    { step: "01", title: "Аудит", description: "Анализируем процессы и находим точки автоматизации" },
    { step: "02", title: "Стратегия", description: "Определяем приоритеты и выбираем инструменты" },
    { step: "03", title: "Разработка", description: "Создаём ботов, интеграции и автоматизации" },
    { step: "04", title: "Тестирование", description: "Проверяем все сценарии и исправляем ошибки" },
    { step: "05", title: "Запуск", description: "Внедряем в работу и обучаем команду" },
    { step: "06", title: "Поддержка", description: "Мониторим, оптимизируем и масштабируем" },
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
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">AI Автоматизация</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              AI автоматизация<br />бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Снимаю рутину с вашей команды с помощью AI. Чат-боты, интеграции, автоматические отчёты — больше времени на важные задачи
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить автоматизацию
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
            Что можно автоматизировать
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

      {/* Automation Types */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Какой формат автоматизации нужен
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Подберём решение под масштаб вашего бизнеса
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {automationTypes.map((type, index) => (
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
              Результаты автоматизации
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Заказать автоматизацию</h2>
              <p className="text-muted-foreground">Расскажите о процессах — предложу решение</p>
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
                <Input placeholder="Ниша, размер команды, текущие инструменты..." value={formData.business} onChange={(e) => setFormData({ ...formData, business: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Что хотите автоматизировать?</label>
                <Textarea placeholder="Опишите процессы, которые занимают много времени..." rows={4} value={formData.task} onChange={(e) => setFormData({ ...formData, task: e.target.value })} required />
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

export default AIAutomation;
