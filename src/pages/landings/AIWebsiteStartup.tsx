import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Rocket, Bot, Zap, Globe, BarChart3, Shield, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const faqData = [
  { q: "Что такое AI-сайт?", a: "Это сайт с интегрированными AI-функциями: чат-бот, автоматическая обработка заявок, персонализация контента, аналитика поведения пользователей." },
  { q: "Подходит ли для MVP?", a: "Идеально. Мы используем вайб-кодинг и современные фреймворки для быстрого создания MVP — от идеи до рабочего продукта за 2–4 недели." },
  { q: "Какие AI-функции можно интегрировать?", a: "Чат-боты, автоматическая квалификация лидов, генерация контента, анализ данных, персональные рекомендации, голосовые интерфейсы." },
  { q: "Сколько стоит AI-сайт для стартапа?", a: "MVP от 80 000 ₽. Полноценный сайт с AI-интеграциями от 150 000 ₽. Зависит от набора функций." },
  { q: "Как быстро можно запустить?", a: "MVP — 2–4 недели. Полный проект — 4–8 недель. Мы работаем итеративно, запуская функционал поэтапно." },
];

const AIWebsiteStartup = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  useSEO({
    title: "AI-сайт для стартапа — MVP и веб-платформы с AI",
    description: "Создаём AI-сайты и MVP для стартапов. Чат-боты, автоматизация, персонализация. Быстрый запуск от 2 недель. Вайб-кодинг и современный стек.",
    keywords: "AI сайт, сайт для стартапа, MVP разработка, AI интеграция сайт, веб платформа стартап, сайт с искусственным интеллектом, вайб кодинг",
  }, [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Создание AI-сайта для стартапа",
      "description": "Разработка веб-платформ и MVP с интеграцией искусственного интеллекта для стартапов.",
      "provider": { "@type": "Organization", "name": "Taranukha Digital Studio" },
      "areaServed": { "@type": "Country", "name": "Russia" },
      "serviceType": "AI Web Development",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supabase.functions.invoke("submit-lead", {
        body: { name: formData.name, contact: formData.contact, message: formData.message, source_page: "/ai-sayt-dlya-startapa" },
      });
      toast({ title: "Заявка отправлена!", description: "Обсудим ваш проект!" });
      setFormData({ name: "", contact: "", message: "" });
    } catch { toast({ title: "Ошибка", variant: "destructive" }); }
    setIsSubmitting(false);
  };

  const features = [
    { icon: Bot, title: "AI-чат-бот", desc: "Встроенный интеллектуальный ассистент, который отвечает на вопросы, квалифицирует лиды и записывает на демо." },
    { icon: Zap, title: "Быстрый MVP", desc: "Используем вайб-кодинг для создания рабочего прототипа за 2–4 недели вместо месяцев." },
    { icon: Globe, title: "Современный стек", desc: "React, TypeScript, Supabase — масштабируемая архитектура, готовая к росту." },
    { icon: BarChart3, title: "AI-аналитика", desc: "Автоматический анализ поведения пользователей и оптимизация конверсий с помощью AI." },
    { icon: Shield, title: "Безопасность", desc: "Row-level security, шифрование данных, соответствие стандартам безопасности." },
    { icon: Rocket, title: "Масштабирование", desc: "Архитектура рассчитана на рост: от первых 100 пользователей до 100 000." },
  ];

  return (
    <Layout>
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">Для стартапов</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              AI-сайт<br />для стартапа
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Создаём веб-платформы с AI-интеграциями для стартапов. От MVP до полноценного продукта. Чат-боты, автоматизация, аналитика — всё из коробки.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить проект <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/vibe-coding">Что такое вайб-кодинг?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Что мы делаем для стартапов</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><f.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6">Почему стартапу нужен AI-сайт</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Стартапы конкурируют не ресурсами, а скоростью. AI-интеграции позволяют автоматизировать рутину с первого дня: квалификация лидов, поддержка клиентов, персонализация контента. Это экономит время и деньги, которые критичны на ранних стадиях.</p>
              <p>Мы используем подход <Link to="/vibe-coding" className="text-primary hover:underline">вайб-кодинга</Link> — быстрое создание рабочих продуктов с помощью AI-ассистентов. Это позволяет запустить MVP за 2–4 недели вместо традиционных 2–3 месяцев.</p>
              <p>Архитектура строится на современном стеке (React + TypeScript + облачный backend), что обеспечивает масштабируемость. Вы начинаете с простого лендинга и наращиваете функционал по мере роста продукта и команды.</p>
              <p>AI-чат-бот на сайте стартапа заменяет менеджера по продажам на ранних этапах: отвечает на вопросы, собирает контакты, квалифицирует лиды. Интеграция с <Link to="/ai-bot-dlya-biznesa" className="text-primary hover:underline">AI-ботами</Link> доступна из коробки.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Связанные решения</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/vibe-coding" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Вайб-кодинг</p></Link>
            <Link to="/ai-automation" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">AI-автоматизация</p></Link>
            <Link to="/ai-products" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">AI-продукты</p></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Частые вопросы</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqData.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-muted-foreground">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order-form" className="py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Обсудить AI-проект</h2>
              <p className="text-muted-foreground">Расскажите о вашей идее — предложим оптимальное решение</p>
            </div>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div><label className="block text-sm font-medium mb-2">Ваше имя</label><Input placeholder="Имя" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium mb-2">Телефон или Telegram</label><Input placeholder="+7 или @username" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium mb-2">О проекте</label><Textarea placeholder="Опишите идею, целевую аудиторию и стадию проекта..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} /></div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Отправка..." : "Отправить заявку"} <ArrowRight className="h-5 w-5" /></Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIWebsiteStartup;
