import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Zap, Bot, BarChart3, Clock, CheckCircle, Settings, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AIAutomation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    task: ""
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI автоматизация бизнеса",
    "description": "Автоматизация бизнес-процессов с помощью искусственного интеллекта. Боты, интеграции, автоматические отчёты.",
    "provider": {
      "@type": "Person",
      "name": "Aleksey Taranukha"
    },
    "areaServed": "Worldwide",
    "serviceType": "Business Automation"
  };

  useSEO({
    title: "AI автоматизация бизнеса — автоматизация процессов | Aleksey Taranukha",
    description: "AI автоматизация бизнес-процессов: чат-боты, интеграции, автоматические отчёты. Снижение рутины и экономия времени команды.",
    keywords: "AI автоматизация, автоматизация бизнеса, чат-боты, интеграции, автоматизация процессов"
  }, [serviceSchema]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Заявка отправлена! Свяжусь в течение 24 часов");
    setFormData({ name: "", contact: "", task: "" });
    setIsSubmitting(false);
  };

  const automationTypes = [
    { icon: Bot, title: "Чат-боты", description: "Автоматические ответы клиентам, запись, консультации 24/7" },
    { icon: Settings, title: "Интеграции", description: "Связка CRM, мессенджеров, таблиц и других сервисов" },
    { icon: BarChart3, title: "Отчёты", description: "Автоматическая аналитика и отчёты без ручной работы" },
    { icon: Zap, title: "Процессы", description: "Автоматизация повторяющихся задач и рутины" },
  ];

  const benefits = [
    "Экономия 10-20 часов в неделю на рутине",
    "Снижение ошибок от человеческого фактора",
    "Работа 24/7 без перерывов и выходных",
    "Масштабирование без найма новых сотрудников",
    "Быстрая обработка заявок и обращений",
    "Прозрачная аналитика в реальном времени"
  ];

  return (
    <Layout>
      <article>
        <header className="pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">AI Автоматизация</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                AI автоматизация<br />бизнеса
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Снимаю рутину с вашей команды с помощью AI. Чат-боты, интеграции, 
                автоматические отчёты — больше времени на важные задачи
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Обсудить автоматизацию
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link to="/ai-audit">
                  <Button variant="hero-outline" size="lg">
                    Бесплатный аудит
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="py-16" aria-labelledby="types-heading">
          <div className="container">
            <h2 id="types-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Что можно автоматизировать
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {automationTypes.map((item, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30" aria-labelledby="benefits-heading">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 id="benefits-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                Результаты автоматизации
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 glass-card p-4 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="order-form" className="py-16" aria-labelledby="order-heading">
          <div className="container">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h2 id="order-heading" className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Заказать автоматизацию
                </h2>
                <p className="text-muted-foreground">
                  Расскажите о процессах — предложу решение
                </p>
              </div>
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                  <Input 
                    id="name"
                    placeholder="Как к вам обращаться?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium mb-2">Контакт</label>
                  <Input 
                    id="contact"
                    placeholder="Telegram или Email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="task" className="block text-sm font-medium mb-2">Что хотите автоматизировать?</label>
                  <Textarea 
                    id="task"
                    placeholder="Опишите процессы, которые занимают много времени..."
                    rows={4}
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                    maxLength={2000}
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
      </article>
    </Layout>
  );
};

export default AIAutomation;