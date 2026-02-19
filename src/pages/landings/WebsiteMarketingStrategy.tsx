import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Target, TrendingUp, PieChart, Layers, Search, Users, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const faqData = [
  { q: "Чем сайт под стратегию отличается от обычного?", a: "Обычный сайт — это набор страниц. Сайт под маркетинговую стратегию — это инструмент, где каждый элемент работает на конкретную бизнес-цель: привлечение, конвертация, удержание." },
  { q: "Нужна ли готовая маркетинговая стратегия?", a: "Нет. Мы помогаем сформулировать цели и строим сайт как инструмент их достижения. Если стратегия уже есть — тем лучше." },
  { q: "Какие метрики отслеживаются?", a: "Конверсия форм, стоимость лида, поведение на сайте, источники трафика, ROI маркетинговых каналов." },
  { q: "Можно ли потом масштабировать?", a: "Да. Архитектура позволяет добавлять новые посадочные страницы, блог, каталог продуктов и интеграции без переделки." },
  { q: "Сколько это стоит?", a: "От 60 000 ₽ за лендинг с аналитикой до 200 000 ₽ за многостраничный сайт с полной маркетинговой системой." },
];

const WebsiteMarketingStrategy = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  useSEO({
    title: "Сайт под маркетинговую стратегию | Разработка",
    description: "Разрабатываем сайты как инструмент маркетинговой стратегии. Воронки продаж, аналитика, A/B тесты, CRM-интеграция. Сайт, который работает на ROI.",
    keywords: "сайт под маркетинговую стратегию, сайт для маркетинга, разработка сайта стратегия, маркетинговый сайт, digital стратегия сайт, сайт воронка продаж",
  }, [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Разработка сайта под маркетинговую стратегию",
      "description": "Создание сайтов как инструмента маркетинговой стратегии с воронками продаж и аналитикой.",
      "provider": { "@type": "Organization", "name": "Taranukha Digital Studio" },
      "areaServed": { "@type": "Country", "name": "Russia" },
      "serviceType": "Strategic Web Development",
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
        body: { name: formData.name, contact: formData.contact, message: formData.message, source_page: "/sayt-marketing-strategiya" },
      });
      toast({ title: "Заявка отправлена!", description: "Подготовим предложение." });
      setFormData({ name: "", contact: "", message: "" });
    } catch { toast({ title: "Ошибка", variant: "destructive" }); }
    setIsSubmitting(false);
  };

  const pillars = [
    { icon: Target, title: "Чёткие цели", desc: "Каждая страница сайта привязана к конкретной маркетинговой цели: генерация лидов, повышение узнаваемости, конвертация трафика." },
    { icon: TrendingUp, title: "Воронки продаж", desc: "Структура сайта строится как воронка: от привлечения внимания до конверсии. Каждый элемент подталкивает к целевому действию." },
    { icon: PieChart, title: "Аналитика ROI", desc: "Отслеживаем эффективность каждого канала привлечения, стоимость лида и конверсию на каждом этапе воронки." },
    { icon: Layers, title: "Мультиканальность", desc: "Сайт интегрируется с рекламными кабинетами, CRM, email-маркетингом и соцсетями в единую систему." },
    { icon: Search, title: "SEO-фундамент", desc: "Семантическое ядро, техническая оптимизация и контент-стратегия обеспечивают органический трафик." },
    { icon: Users, title: "Сегментация аудитории", desc: "Разные страницы и офферы для разных сегментов ЦА. Персонализация повышает конверсию." },
  ];

  return (
    <Layout>
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Стратегический подход</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Сайт под маркетинговую<br />стратегию
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Создаём сайты, которые работают как маркетинговый инструмент: воронки продаж, аналитика, A/B тесты, CRM-интеграции. Не просто красиво — эффективно.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить стратегию <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/cases">Кейсы</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">6 столпов стратегического сайта</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Сайт — это не просто набор страниц. Это система, где каждый элемент подчинён маркетинговым целям вашего бизнеса.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><p.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="text-lg font-display font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Что вы получаете</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Сайт, спроектированный на основе маркетинговых целей",
              "Встроенные воронки продаж с отслеживанием конверсий",
              "Интеграция с CRM для моментальной обработки заявок",
              "A/B тестирование заголовков и офферов",
              "SEO-оптимизация для органического трафика",
              "Подключение Яндекс.Метрики с настройкой целей",
              "Посадочные страницы под рекламные кампании",
              "Ретаргетинг-пиксели и UTM-разметка",
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
            <h2 className="text-3xl font-display font-bold mb-6">Сайт как центр маркетинговой экосистемы</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Большинство бизнесов создают сайт «для галочки»: красивый дизайн, стандартные разделы, контакты. Но сайт без маркетинговой логики — это потерянные деньги. Трафик приходит и уходит, не конвертируясь в клиентов.</p>
              <p>Мы строим сайты как центр маркетинговой системы. Каждая страница решает конкретную задачу: привлечь определённый сегмент аудитории, ответить на их вопросы, снять возражения и подвести к целевому действию.</p>
              <p>Это значит, что сайт работает в связке с <Link to="/prodvizhenie" className="text-primary hover:underline">продвижением</Link>: рекламные кампании ведут на специализированные посадочные страницы, <Link to="/socseti" className="text-primary hover:underline">соцсети</Link> прогревают аудиторию, а сайт конвертирует её в заявки.</p>
              <p>Результат: вместо абстрактного «красивого сайта» вы получаете измеримый маркетинговый инструмент с чёткими KPI и возможностью оптимизации на основе данных.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12 bg-card/30">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Смотрите также</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/prodvizhenie" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Продвижение</p></Link>
            <Link to="/sayt-dlya-malogo-biznesa" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Сайт для бизнеса</p></Link>
            <Link to="/ai-automation" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">AI-автоматизация</p></Link>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Обсудить стратегический сайт</h2>
              <p className="text-muted-foreground">Расскажите о бизнесе и маркетинговых целях</p>
            </div>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div><label className="block text-sm font-medium mb-2">Ваше имя</label><Input placeholder="Имя" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium mb-2">Телефон или Telegram</label><Input placeholder="+7 или @username" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} required /></div>
              <div><label className="block text-sm font-medium mb-2">О проекте</label><Textarea placeholder="Какие маркетинговые цели стоят перед бизнесом, какой бюджет на продвижение..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} /></div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Отправка..." : "Получить предложение"} <ArrowRight className="h-5 w-5" /></Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebsiteMarketingStrategy;
