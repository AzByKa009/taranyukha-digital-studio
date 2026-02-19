import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, GraduationCap, MonitorPlay, Users, CreditCard, BarChart3, Megaphone, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const faqData = [
  { q: "Чем лендинг отличается от полноценного сайта?", a: "Лендинг — одностраничный сайт, сфокусированный на одном действии: записи на курс, вебинар или бесплатный урок. Идеален для запуска и тестирования." },
  { q: "Можно ли интегрировать оплату?", a: "Да, подключаем приём платежей через ЮKassa, Tinkoff, Stripe. Ученик может оплатить курс прямо на лендинге." },
  { q: "Подходит ли для запуска с нуля?", a: "Абсолютно. Лендинг — лучший инструмент для первого запуска: быстро, недорого, с возможностью тестировать гипотезы." },
  { q: "Как лендинг помогает привлекать учеников?", a: "Через SEO, рекламу и соцсети трафик идёт на лендинг. Структура страницы ведёт посетителя к целевому действию — записи или покупке." },
  { q: "Сколько времени занимает разработка?", a: "Лендинг для онлайн-школы — 7–14 дней. Включает исследование ЦА, дизайн, вёрстку и настройку аналитики." },
];

const LandingOnlineSchool = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  useSEO({
    title: "Landing page для онлайн-школы | Лендинг под курс",
    description: "Создаём продающие лендинги для онлайн-школ и образовательных проектов. Запись на курс, интеграция оплаты, высокая конверсия. От 7 дней.",
    keywords: "лендинг для онлайн школы, landing page курс, сайт для онлайн школы, посадочная страница курс, лендинг под вебинар, landing page образование",
  }, [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Создание лендинга для онлайн-школы",
      "description": "Разработка продающих посадочных страниц для онлайн-школ и образовательных проектов.",
      "provider": { "@type": "Organization", "name": "Taranukha Digital Studio" },
      "areaServed": { "@type": "Country", "name": "Russia" },
      "serviceType": "Web Development",
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
        body: { name: formData.name, contact: formData.contact, message: formData.message, source_page: "/landing-online-school" },
      });
      toast({ title: "Заявка отправлена!", description: "Свяжемся с вами в ближайшее время." });
      setFormData({ name: "", contact: "", message: "" });
    } catch { toast({ title: "Ошибка", variant: "destructive" }); }
    setIsSubmitting(false);
  };

  const features = [
    { icon: GraduationCap, title: "Под образовательные проекты", desc: "Структура оптимизирована для онлайн-курсов, вебинаров, марафонов и интенсивов." },
    { icon: MonitorPlay, title: "Видео и демо", desc: "Встраиваем промо-видео, демо-уроки и превью курса прямо на лендинг." },
    { icon: Users, title: "Социальное доказательство", desc: "Отзывы учеников, кейсы с результатами, счётчики записавшихся." },
    { icon: CreditCard, title: "Приём оплаты", desc: "Интеграция с платёжными системами: ЮKassa, Tinkoff, Stripe, рассрочка." },
    { icon: BarChart3, title: "Аналитика конверсий", desc: "Отслеживаем каждый шаг посетителя: от клика по рекламе до оплаты курса." },
    { icon: Megaphone, title: "Готов к рекламе", desc: "Лендинг оптимизирован под трафик из таргетированной рекламы и контекста." },
  ];

  return (
    <Layout>
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">Для онлайн-школ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Лендинг для<br />онлайн-школы
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Создаём продающие посадочные страницы для курсов, вебинаров и образовательных программ. Высокая конверсия, интеграция оплаты, красивый дизайн.
            </p>
            <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Заказать лендинг <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Что включает лендинг</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Структура продающего лендинга</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Первый экран: заголовок-оффер + визуал курса + кнопка записи",
              "Для кого курс: описание целевой аудитории и её болей",
              "Программа: модули, темы, формат обучения",
              "Результаты: что получит ученик после прохождения",
              "Об авторе: экспертность, регалии, опыт",
              "Отзывы и кейсы учеников",
              "Тарифы и условия оплаты",
              "FAQ — ответы на частые вопросы",
              "Финальный блок записи с таймером или бонусом",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6">Как лендинг увеличивает продажи курса</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Главная задача лендинга для онлайн-школы — превратить посетителя в ученика. Каждый блок страницы решает конкретную задачу: привлечь внимание, объяснить ценность, снять возражения и подтолкнуть к действию.</p>
              <p>В отличие от многостраничного сайта, лендинг фокусирует внимание на одном продукте — конкретном курсе или программе. Это повышает конверсию в 2–5 раз по сравнению с общей страницей услуг.</p>
              <p>Мы проектируем лендинги на основе анализа целевой аудитории. Понимаем, какие боли закрывает курс, какие возражения мешают покупке, и строим структуру, которая последовательно ведёт к записи.</p>
              <p>Интеграция с <Link to="/ai-automation" className="text-primary hover:underline">AI-автоматизацией</Link> позволяет добавить чат-бот для ответов на вопросы и автоматическую рассылку после записи.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12 bg-card/30">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Смотрите также</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/razrabotka-sayta-pod-uslugi" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Сайт под услуги</p></Link>
            <Link to="/prodvizhenie" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Продвижение</p></Link>
            <Link to="/socseti" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Соцсети</p></Link>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Заказать лендинг для курса</h2>
              <p className="text-muted-foreground">Расскажите о вашем образовательном проекте</p>
            </div>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div><label className="block text-sm font-medium mb-2">Ваше имя</label><Input placeholder="Как к вам обращаться?" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium mb-2">Телефон или Telegram</label><Input placeholder="+7 или @username" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium mb-2">О курсе</label><Textarea placeholder="Тема курса, целевая аудитория, особенности..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} /></div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Отправка..." : "Получить предложение"} <ArrowRight className="h-5 w-5" /></Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingOnlineSchool;
