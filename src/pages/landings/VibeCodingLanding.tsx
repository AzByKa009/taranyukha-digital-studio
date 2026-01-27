import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Code, Zap, Clock, Rocket, CheckCircle, Layers, Sparkles } from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const VibeCodingLanding = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    idea: ""
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Вайб кодинг — быстрая разработка MVP",
    "description": "Вайб кодинг: быстрое создание MVP и веб-приложений с помощью AI. Запуск продукта за дни, а не месяцы.",
    "provider": {
      "@type": "Person",
      "name": "Aleksey Taranukha"
    },
    "areaServed": "Worldwide",
    "serviceType": "Software Development"
  };

  useSEO({
    title: "Вайб кодинг — быстрая разработка MVP с AI | Aleksey Taranukha",
    description: "Вайб кодинг: создание MVP и веб-приложений с помощью AI за дни, а не месяцы. Быстрый запуск идей, тестирование гипотез, прототипирование.",
    keywords: "вайб кодинг, vibe coding, быстрая разработка, MVP, создание приложений, AI разработка"
  }, [serviceSchema]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Заявка отправлена! Свяжусь в течение 24 часов");
    setFormData({ name: "", contact: "", idea: "" });
    setIsSubmitting(false);
  };

  const advantages = [
    { icon: Zap, title: "Скорость", description: "MVP за 1-2 недели вместо месяцев классической разработки" },
    { icon: Code, title: "AI-ускорение", description: "Использую AI-инструменты для быстрого прототипирования" },
    { icon: Clock, title: "Итерации", description: "Быстрые правки и доработки без долгих согласований" },
    { icon: Rocket, title: "Запуск", description: "Готовый продукт для тестирования гипотез и привлечения инвестиций" },
  ];

  const whatCanBuild = [
    "Лендинги и маркетинговые сайты",
    "SaaS-приложения и дашборды",
    "Внутренние инструменты для команды",
    "MVP для стартапов",
    "Интеграции и автоматизации",
    "Чат-боты и AI-ассистенты"
  ];

  const process = [
    { step: "01", title: "Идея", description: "Обсуждаем концепцию и ключевые функции" },
    { step: "02", title: "Прототип", description: "Создаю рабочий прототип за 2-3 дня" },
    { step: "03", title: "Итерации", description: "Дорабатываем по вашим пожеланиям" },
    { step: "04", title: "Запуск", description: "Публикуем и настраиваем" },
  ];

  return (
    <Layout>
      <article>
        <header className="pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
                <Code className="h-4 w-4" />
                <span className="text-sm font-medium">Вайб кодинг</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Вайб кодинг —<br />быстрая разработка
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Создание MVP и веб-приложений с помощью AI за дни, а не месяцы. 
                Идеально для тестирования идей и быстрого запуска продуктов
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Обсудить идею
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link to="/calculator">
                  <Button variant="hero-outline" size="lg">
                    Калькулятор стоимости
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="py-16" aria-labelledby="advantages-heading">
          <div className="container">
            <h2 id="advantages-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Почему вайб кодинг
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((item, index) => (
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

        <section className="py-16 bg-card/30" aria-labelledby="whatbuild-heading">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 id="whatbuild-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                Что можно создать
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {whatCanBuild.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 glass-card p-4 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" aria-labelledby="process-heading">
          <div className="container">
            <h2 id="process-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Как это работает
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-display font-bold text-primary/30 mb-2">{item.step}</div>
                  <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="order-form" className="py-16 bg-card/30" aria-labelledby="order-heading">
          <div className="container">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h2 id="order-heading" className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Расскажите о своей идее
                </h2>
                <p className="text-muted-foreground">
                  Опишите, что хотите создать — оценю сроки и стоимость
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
                  <label htmlFor="idea" className="block text-sm font-medium mb-2">Идея продукта</label>
                  <Textarea 
                    id="idea"
                    placeholder="Опишите, что хотите создать и для кого..."
                    rows={4}
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    maxLength={2000}
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Получить оценку"}
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

export default VibeCodingLanding;