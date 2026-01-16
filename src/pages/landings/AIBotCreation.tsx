import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Bot, MessageSquare, Clock, Zap, Shield, Settings, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIBotCreation = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    task: ""
  });

  useEffect(() => {
    document.title = "Создание AI-бота для бизнеса — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Разработка умных AI-ботов для автоматизации продаж, поддержки клиентов и бизнес-процессов. Telegram, WhatsApp, веб-чат."
    );

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Создание AI-бота для бизнеса",
      "description": "Разработка умных чат-ботов с искусственным интеллектом для автоматизации бизнес-процессов.",
      "provider": {
        "@type": "Person",
        "name": "Aleksey Taranukha"
      },
      "areaServed": "Worldwide",
      "serviceType": "AI Development"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'ai-bot');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="ai-bot"]');
      if (schemaScript) schemaScript.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Заявка отправлена!",
      description: "Свяжусь с вами для обсуждения вашего AI-бота.",
    });
    setFormData({ name: "", email: "", phone: "", task: "" });
    setIsSubmitting(false);
  };

  const botTypes = [
    { 
      icon: MessageSquare, 
      title: "Бот для продаж", 
      description: "Квалифицирует лиды, отвечает на вопросы о товарах, помогает выбрать и оформить заказ",
      features: ["Каталог товаров", "Корзина и оплата", "Интеграция с CRM"]
    },
    { 
      icon: Users, 
      title: "Бот поддержки", 
      description: "Отвечает на частые вопросы, решает типовые проблемы, передаёт сложные кейсы операторам",
      features: ["База знаний", "Тикет-система", "Эскалация"]
    },
    { 
      icon: Clock, 
      title: "Бот записи", 
      description: "Автоматизирует запись клиентов, напоминает о визитах, управляет расписанием",
      features: ["Календарь", "Напоминания", "Синхронизация"]
    },
    { 
      icon: TrendingUp, 
      title: "HR-бот", 
      description: "Автоматизирует найм: собирает резюме, проводит первичный скрининг, назначает интервью",
      features: ["Скрининг", "Тесты", "Аналитика"]
    },
  ];

  const platforms = [
    "Telegram",
    "WhatsApp Business",
    "Веб-чат на сайте",
    "VK Messenger",
    "Instagram Direct",
    "Viber"
  ];

  const advantages = [
    { icon: Zap, title: "Работает 24/7", description: "Бот не спит, не болеет и не уходит в отпуск" },
    { icon: Clock, title: "Мгновенные ответы", description: "Клиенты получают ответ за секунды, а не минуты" },
    { icon: Shield, title: "Без ошибок", description: "Бот не забудет скрипт и не перепутает цены" },
    { icon: Settings, title: "Легко масштабировать", description: "Обрабатывает хоть 10, хоть 10 000 диалогов" },
  ];

  const process = [
    { step: "1", title: "Анализ", description: "Изучаю ваш бизнес, процессы и задачи для бота" },
    { step: "2", title: "Проектирование", description: "Разрабатываю сценарии диалогов и логику" },
    { step: "3", title: "Разработка", description: "Создаю бота, обучаю AI, настраиваю интеграции" },
    { step: "4", title: "Тестирование", description: "Проверяем все сценарии, вносим правки" },
    { step: "5", title: "Запуск", description: "Подключаем к вашим каналам и обучаем команду" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in-up">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-medium">AI-разработка</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Создание AI-бота<br />для бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Умный чат-бот, который работает 24/7: отвечает клиентам, принимает заявки, записывает на услуги и экономит ваше время
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Заказать бота
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Types */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Какие боты разрабатываю
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Каждый бот создаётся под конкретные задачи вашего бизнеса
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {botTypes.map((bot, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <bot.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">{bot.title}</h3>
                    <p className="text-muted-foreground mb-4">{bot.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {bot.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Платформы для бота
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="px-6 py-3 glass-card rounded-full animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="font-medium">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Почему бот выгоднее менеджера
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <adv.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{adv.title}</h3>
                <p className="text-muted-foreground text-sm">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Как создаётся бот
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {process.map((step, index) => (
                <div 
                  key={index}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-display font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order-form" className="py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Заказать AI-бота
              </h2>
              <p className="text-muted-foreground">
                Опишите задачу, и я рассчитаю стоимость и сроки разработки
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
                <label className="block text-sm font-medium mb-2">Телефон (необязательно)</label>
                <Input 
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Какую задачу должен решать бот?</label>
                <Textarea 
                  placeholder="Расскажите, что должен делать бот: отвечать на вопросы, принимать заказы, записывать на услуги..."
                  rows={4}
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Получить расчёт"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIBotCreation;
