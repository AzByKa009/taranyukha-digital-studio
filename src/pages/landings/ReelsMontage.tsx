import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Film, Clock, Sparkles, CheckCircle, Target } from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";

const ReelsMontage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    details: ""
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Монтаж Reels на заказ",
    "description": "Профессиональный монтаж Reels для бизнеса. Динамичные ролики, которые привлекают внимание и увеличивают охваты.",
    "provider": {
      "@type": "Person",
      "name": "Aleksey Taranukha"
    },
    "areaServed": "Worldwide",
    "serviceType": "Video Editing"
  };

  useSEO({
    title: "Монтаж Reels на заказ — монтаж вертикальных видео | Aleksey Taranukha",
    description: "Профессиональный монтаж вертикальных видео для Instagram Reels, TikTok, Shorts. Динамичные ролики, которые увеличивают охваты. Заказать монтаж Reels.",
    keywords: "монтаж reels, монтаж вертикальных видео, монтаж tiktok, монтаж shorts, видеомонтаж"
  }, [serviceSchema]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Заявка отправлена! Свяжусь с вами в течение 24 часов");
    setFormData({ name: "", email: "", instagram: "", details: "" });
    setIsSubmitting(false);
  };

  const benefits = [
    { icon: Film, title: "Динамичный монтаж", description: "Современные переходы и эффекты, которые удерживают внимание зрителя" },
    { icon: Clock, title: "Быстрые сроки", description: "Готовый Reels за 2-3 рабочих дня после получения материалов" },
    { icon: Sparkles, title: "Тренды и музыка", description: "Подбор актуальных трендов и лицензионной музыки под ваш контент" },
    { icon: Target, title: "Под вашу нишу", description: "Адаптация стиля монтажа под специфику вашего бизнеса" },
  ];

  const processSteps = [
    { step: "01", title: "Бриф", description: "Обсуждаем цели, стиль, референсы и целевую аудиторию" },
    { step: "02", title: "Материалы", description: "Вы присылаете исходные видео и пожелания по музыке" },
    { step: "03", title: "Монтаж", description: "Создаю черновой вариант с учетом всех пожеланий" },
    { step: "04", title: "Правки", description: "Вносим корректировки до полного утверждения" },
    { step: "05", title: "Готово", description: "Получаете файл в нужном формате и разрешении" },
  ];

  const whyMe = [
    "Опыт монтажа для салонов красоты, фитнес-студий, ресторанов",
    "Понимание алгоритмов Instagram и TikTok",
    "Работа с форматами: обучающие, развлекательные, продающие Reels",
    "Цветокоррекция и ретушь включены в стоимость",
  ];

  return (
    <Layout>
      <article>
        <header className="pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Film className="h-4 w-4" />
                <span className="text-sm font-medium">Монтаж Reels</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Монтаж Reels на заказ
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Профессиональный монтаж коротких видео, которые привлекают внимание, увеличивают охваты и конвертируют зрителей в клиентов
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Заказать монтаж
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link to="/produser-reels">
                  <Button variant="hero-outline" size="lg">
                    Полное продюсирование
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Что вы получите
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Как проходит работа
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl font-display font-bold text-primary/30 mb-2">{step.step}</div>
                  <h3 className="font-display font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Почему выбирают меня
            </h2>
            <div className="space-y-4">
              {whyMe.map((item, index) => (
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

      {/* Order Form */}
      <section id="order-form" className="py-16 bg-gradient-to-b from-card/30 to-background">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Заказать монтаж Reels
              </h2>
              <p className="text-muted-foreground">
                Заполните форму, и я свяжусь с вами для обсуждения проекта
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
                <label className="block text-sm font-medium mb-2">Instagram аккаунт</label>
                <Input 
                  placeholder="@username"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Расскажите о проекте</label>
                <Textarea 
                  placeholder="Опишите, какой Reels вам нужен, для какой цели, есть ли референсы..."
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  required
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

export default ReelsMontage;
