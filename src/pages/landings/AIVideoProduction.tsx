import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Sparkles, Video, Palette, Clock, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AIVideoProduction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: ""
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI видеопродакшн",
    "description": "Создание видеоконтента с использованием искусственного интеллекта. AI-генерация, нейросети для видео, автоматизация продакшна.",
    "provider": {
      "@type": "Person",
      "name": "Aleksey Taranukha"
    },
    "areaServed": "Worldwide",
    "serviceType": "AI Video Production"
  };

  useSEO({
    title: "AI видеопродакшн — создание видео с нейросетями | Aleksey Taranukha",
    description: "AI видеопродакшн: создание видеоконтента с искусственным интеллектом. Генерация видео нейросетями, автоматизация монтажа, AI-визуал для бизнеса.",
    keywords: "AI видео, нейросети для видео, генерация видео, AI продакшн, видео с искусственным интеллектом"
  }, [serviceSchema]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Заявка отправлена! Свяжусь в течение 24 часов");
    setFormData({ name: "", contact: "", description: "" });
    setIsSubmitting(false);
  };

  const features = [
    { icon: Sparkles, title: "AI-генерация", description: "Создание уникального визуала с помощью нейросетей последнего поколения" },
    { icon: Video, title: "Профессиональный монтаж", description: "Сборка и пост-продакшн с AI-инструментами для ускорения процесса" },
    { icon: Palette, title: "Стилизация", description: "Уникальный визуальный стиль, созданный с помощью AI" },
    { icon: Clock, title: "Быстрые сроки", description: "AI ускоряет производство в 3-5 раз по сравнению с традиционным подходом" },
  ];

  const useCases = [
    "Промо-ролики для социальных сетей",
    "Визуал для рекламных кампаний",
    "Контент для YouTube и TikTok",
    "Корпоративные презентации",
    "Музыкальные клипы и арт-проекты",
    "Визуализация продуктов"
  ];

  return (
    <Layout>
      <article>
        <header className="pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI Video</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                AI видеопродакшн
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Создание видеоконтента нового уровня с использованием нейросетей. 
                Уникальный визуал, который невозможно снять традиционным способом
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Обсудить проект
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link to="/cases">
                  <Button variant="hero-outline" size="lg">
                    Смотреть примеры
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="py-16" aria-labelledby="features-heading">
          <div className="container">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Что включает AI-продакшн
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
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

        <section className="py-16 bg-card/30" aria-labelledby="usecases-heading">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 id="usecases-heading" className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                Для чего подходит
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((item, index) => (
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
                  Заказать AI-видео
                </h2>
                <p className="text-muted-foreground">
                  Расскажите о проекте — подготовлю предложение
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
                  <label htmlFor="description" className="block text-sm font-medium mb-2">О проекте</label>
                  <Textarea 
                    id="description"
                    placeholder="Опишите, какое видео вам нужно..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    maxLength={2000}
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
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

export default AIVideoProduction;