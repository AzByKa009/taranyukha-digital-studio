import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Building2, TrendingUp, Users, Clock, ShieldCheck, BarChart3, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const faqData = [
  { q: "Сколько стоит сайт для малого бизнеса?", a: "Стоимость зависит от объёма: лендинг от 30 000 ₽, многостраничный сайт от 60 000 ₽. Мы подбираем решение под ваш бюджет без переплат за ненужные функции." },
  { q: "Сколько времени занимает разработка?", a: "Лендинг — 7–10 дней, многостраничный сайт — 14–21 день. Сроки зависят от сложности и скорости согласования." },
  { q: "Нужен ли мне сайт, если есть соцсети?", a: "Да. Сайт — ваша собственная площадка, которую нельзя заблокировать. Он повышает доверие, работает на SEO и принимает заявки 24/7." },
  { q: "Что входит в разработку?", a: "Дизайн, адаптивная вёрстка, SEO-оптимизация, подключение аналитики, форм обратной связи и CRM-интеграции при необходимости." },
  { q: "Можно ли потом самому редактировать сайт?", a: "Да, мы предоставляем удобную панель управления контентом и обучаем работе с ней." },
];

const WebsiteSmallBusiness = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  useSEO({
    title: "Разработка сайта для малого бизнеса под ключ",
    description: "Создаём сайты для малого бизнеса, которые приносят заявки. Адаптивный дизайн, SEO, CRM-интеграция. Запуск от 7 дней. Без переплат.",
    keywords: "сайт для малого бизнеса, создание сайта малый бизнес, разработка сайта под ключ, заказать сайт для бизнеса, сайт для предпринимателя",
  }, [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Разработка сайта для малого бизнеса",
      "description": "Создание продающих сайтов для малого бизнеса под ключ: SEO, адаптивность, CRM-интеграция.",
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
        body: { name: formData.name, contact: formData.contact, message: formData.message, source_page: "/sayt-dlya-malogo-biznesa" },
      });
      toast({ title: "Заявка отправлена!", description: "Свяжемся с вами в течение дня." });
      setFormData({ name: "", contact: "", message: "" });
    } catch { toast({ title: "Ошибка", description: "Попробуйте ещё раз.", variant: "destructive" }); }
    setIsSubmitting(false);
  };

  const benefits = [
    { icon: TrendingUp, title: "Рост заявок на 40–200%", desc: "Сайт с правильной структурой конвертирует посетителей в клиентов. Каждый блок работает на продажу." },
    { icon: Users, title: "Доверие с первого клика", desc: "Профессиональный сайт повышает статус бизнеса. Клиенты выбирают тех, у кого есть качественный ресурс." },
    { icon: Clock, title: "Работает 24/7", desc: "Сайт принимает заявки даже ночью и в выходные, когда вы отдыхаете." },
    { icon: BarChart3, title: "Аналитика и контроль", desc: "Вы видите, откуда приходят клиенты, какие страницы читают, что их интересует." },
    { icon: ShieldCheck, title: "Независимость от площадок", desc: "Сайт — ваша собственность, в отличие от соцсетей, которые могут заблокировать в любой момент." },
    { icon: Building2, title: "Масштабирование", desc: "Начните с лендинга и дорастите до полноценного корпоративного сайта по мере роста бизнеса." },
  ];

  const processSteps = [
    { num: "01", title: "Аудит и бриф", desc: "Анализируем нишу, конкурентов, целевую аудиторию. Определяем цели сайта и ключевые метрики." },
    { num: "02", title: "Прототип", desc: "Создаём wireframe — логическую структуру страниц с учётом пользовательского пути." },
    { num: "03", title: "Дизайн", desc: "Разрабатываем визуал под ваш бренд: цвета, типографика, иконография." },
    { num: "04", title: "Разработка", desc: "Верстаем на современном стеке, обеспечиваем скорость загрузки и адаптивность." },
    { num: "05", title: "SEO и запуск", desc: "Оптимизируем мета-теги, настраиваем аналитику, публикуем сайт." },
    { num: "06", title: "Поддержка", desc: "Обучаем работе с CMS, предоставляем техническую поддержку после запуска." },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Для малого бизнеса</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Разработка сайта<br />для малого бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Создаём сайты, которые приносят реальные заявки. Без раздувания бюджета — только то, что работает на результат. Запуск от 7 дней, поддержка после сдачи.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Получить предложение <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/cases">Посмотреть кейсы</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why small business needs a website */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">Почему малому бизнесу нужен сайт</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            87% клиентов ищут товары и услуги в интернете. Без сайта вы теряете большую часть потенциальной аудитории. Сайт — это фундамент для привлечения клиентов и роста бизнеса.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we include */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Что входит в разработку</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Анализ ниши и конкурентов — понимаем, чем вы отличаетесь",
              "Адаптивный дизайн — идеальный вид на любом устройстве",
              "SEO-оптимизация — сайт виден в Google и Яндекс",
              "Формы заявок и обратной связи — клиенты оставляют контакты",
              "Интеграция с CRM и мессенджерами — заявки приходят моментально",
              "SSL-сертификат и защита данных — безопасность для вас и клиентов",
              "Подключение Яндекс.Метрики и Google Analytics",
              "Обучение работе с сайтом и техническая поддержка",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Как мы работаем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {processSteps.map((s, i) => (
              <div key={i} className="text-center glass-card p-6 rounded-2xl">
                <div className="text-3xl font-display font-bold text-primary/30 mb-2">{s.num}</div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert content block */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h2 className="text-3xl font-display font-bold mb-6">Сайт для малого бизнеса: с чего начать и на что обратить внимание</h2>
            <p className="text-muted-foreground">
              Малый бизнес в России сталкивается с уникальными вызовами: ограниченный бюджет, высокая конкуренция и необходимость быстро выйти на рынок. 
              Профессиональный сайт решает сразу несколько задач — привлекает клиентов из поисковых систем, повышает доверие и автоматизирует приём заявок.
            </p>
            <p className="text-muted-foreground">
              Ключевая ошибка — пытаться сэкономить на шаблонных решениях. Конструкторы сайтов дают быстрый старт, но ограничивают в SEO, 
              скорости и гибкости. Индивидуальная разработка окупается за 3–6 месяцев за счёт органического трафика и конверсий.
            </p>
            <p className="text-muted-foreground">
              Мы специализируемся на создании сайтов для сервисного бизнеса: салоны красоты, строительные компании, юридические фирмы, 
              медицинские клиники, образовательные проекты. Каждый проект строится на основе анализа целевой аудитории и конкурентов.
            </p>
            <h3 className="text-xl font-display font-semibold mt-8 mb-4">Типичные задачи, которые решает сайт</h3>
            <p className="text-muted-foreground">
              Автоматический приём заявок через формы и чат-боты, отображение услуг и цен, публикация отзывов клиентов, 
              запись на услуги онлайн, сбор базы email-подписчиков для рассылок. Всё это работает без вашего участия — 24 часа в сутки, 7 дней в неделю.
            </p>
            <p className="text-muted-foreground">
              Если вы хотите <Link to="/ai-automation" className="text-primary hover:underline">автоматизировать бизнес-процессы с помощью AI</Link>, 
              сайт станет основой для интеграции чат-ботов, CRM-систем и аналитических инструментов.
            </p>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Смотрите также</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/razrabotka-sayta-pod-uslugi" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors">
              <p className="font-semibold">Сайт под услуги</p>
            </Link>
            <Link to="/sayt-dlya-eksperta" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors">
              <p className="font-semibold">Сайт для эксперта</p>
            </Link>
            <Link to="/services" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors">
              <p className="font-semibold">Все услуги</p>
            </Link>
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

      {/* Order Form */}
      <section id="order-form" className="py-16 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Заказать сайт для бизнеса</h2>
              <p className="text-muted-foreground">Расскажите о вашем проекте — подготовим предложение</p>
            </div>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя</label>
                <Input placeholder="Как к вам обращаться?" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон или Telegram</label>
                <Input placeholder="+7 (___) ___-__-__ или @username" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Расскажите о проекте</label>
                <Textarea placeholder="Чем занимается ваш бизнес, какие задачи должен решить сайт..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Получить предложение"} <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebsiteSmallBusiness;
