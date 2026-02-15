import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Instagram, Video, PenTool, BarChart3, Calendar, Users, TrendingUp, CheckCircle, Camera, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SocialMedia = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accounts: "",
    goals: ""
  });

  useEffect(() => {
    document.title = "Ведение соцсетей для бизнеса — контент и продвижение | Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      "Ведение соцсетей для бизнеса: контент-стратегия, съёмка Reels, оформление профиля, рост аудитории. Контент, который приносит заявки."
    );

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Ведение соцсетей для бизнеса",
      "description": "Комплексное ведение социальных сетей: контент-стратегия, создание контента, продвижение и аналитика.",
      "provider": { "@type": "Person", "name": "Aleksey Taranukha" },
      "areaServed": "Worldwide",
      "serviceType": "Social Media Management"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'social-media');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-schema="social-media"]');
      if (s) s.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Заявка отправлена!", description: "Свяжусь с вами для обсуждения проекта." });
    setFormData({ name: "", email: "", accounts: "", goals: "" });
    setIsSubmitting(false);
  };

  const features = [
    { icon: PenTool, title: "Контент-стратегия", description: "Рубрикатор, темы, тональность — план на месяц вперёд" },
    { icon: Video, title: "Reels и видео", description: "Съёмка, монтаж и продакшн вертикальных видео" },
    { icon: Camera, title: "Визуальный контент", description: "Фото, графика, карусели в едином стиле бренда" },
    { icon: Calendar, title: "Регулярный постинг", description: "Публикации по расписанию без пропусков" },
    { icon: BarChart3, title: "Аналитика", description: "Отчёты по охватам, вовлечённости и росту аудитории" },
    { icon: Megaphone, title: "Продвижение", description: "Таргет, коллаборации, Reels-стратегия для роста" },
  ];

  const serviceTypes = [
    {
      title: "Контент-пакет",
      description: "Создание контента без ведения — вы публикуете сами",
      features: ["12-16 постов/месяц", "Reels-сценарии", "Визуальное оформление"],
      ideal: "Те, кто хочет сам управлять аккаунтом"
    },
    {
      title: "Полное ведение",
      description: "Полный цикл: от стратегии до публикации и аналитики",
      features: ["Контент-план", "Создание контента", "Публикация", "Аналитика"],
      ideal: "Бизнесы, у которых нет времени на соцсети"
    },
    {
      title: "Рост и продвижение",
      description: "Ведение + активное продвижение для роста аудитории",
      features: ["Полное ведение", "Таргетированная реклама", "Коллаборации", "Рост подписчиков"],
      ideal: "Компании, готовые инвестировать в рост"
    },
  ];

  const whyImportant = [
    "Соцсети — первое место, куда заходит клиент перед покупкой",
    "Регулярный контент формирует доверие и экспертность",
    "Reels дают бесплатный органический охват тысяч людей",
    "Соцсети — это ваш актив, который растёт в цене каждый день",
  ];

  const process = [
    { step: "01", title: "Аудит", description: "Анализируем текущие соцсети, конкурентов и аудиторию" },
    { step: "02", title: "Стратегия", description: "Создаём контент-план и визуальную концепцию" },
    { step: "03", title: "Контент", description: "Производим фото, видео, тексты и графику" },
    { step: "04", title: "Публикация", description: "Размещаем контент по оптимальному расписанию" },
    { step: "05", title: "Продвижение", description: "Запускаем рекламу и Reels-стратегию" },
    { step: "06", title: "Аналитика", description: "Анализируем результаты и корректируем план" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6 animate-fade-in-up">
              <Instagram className="h-4 w-4" />
              <span className="text-sm font-medium">Социальные сети</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Ведение соцсетей<br />для бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Контент, который не просто набирает лайки, а приносит заявки. Стратегия, съёмка, публикация и аналитика
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
            Что включает ведение
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

      {/* Service Types */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Какой формат вам подходит
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Подберём оптимальный пакет под ваши задачи и бюджет
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceTypes.map((type, index) => (
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
              Зачем бизнесу соцсети
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Заказать ведение соцсетей</h2>
              <p className="text-muted-foreground">Расскажите о проекте, и я подготовлю предложение</p>
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
                <label className="block text-sm font-medium mb-2">Какие соцсети ведёте?</label>
                <Input placeholder="Instagram, Telegram, VK..." value={formData.accounts} onChange={(e) => setFormData({ ...formData, accounts: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Цели и задачи</label>
                <Textarea placeholder="Какой результат хотите? Рост подписчиков, заявки, узнаваемость..." rows={4} value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} required />
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

export default SocialMedia;
