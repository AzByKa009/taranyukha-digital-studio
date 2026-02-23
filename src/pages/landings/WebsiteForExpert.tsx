import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, UserCheck, Star, Award, Globe, Lightbulb, Target, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const faqData = [
  { q: "Зачем эксперту персональный сайт?", a: "Личный сайт — это ваша визитка, портфолио и воронка продаж в одном. Он работает на репутацию, собирает заявки и выделяет среди конкурентов." },
  { q: "Какие разделы нужны на сайте эксперта?", a: "Обо мне, услуги, кейсы/портфолио, отзывы, блог, контакты и форма записи. Точный набор зависит от вашей специализации." },
  { q: "Сколько стоит сайт для эксперта?", a: "Персональный сайт — от 40 000 ₽. Включает дизайн, вёрстку, SEO, подключение аналитики и обучение." },
  { q: "Могу ли я сам вести блог на сайте?", a: "Да, мы настраиваем удобную панель управления, где вы можете добавлять статьи, кейсы и обновлять информацию." },
  { q: "Как сайт поможет привлечь клиентов?", a: "Через SEO-оптимизацию сайт появится в поиске по запросам вашей ниши. Клиенты сами находят вас и оставляют заявки." },
];

const WebsiteForExpert = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });

  useSEO({
    title: "Сайт для эксперта — персональный сайт под ключ",
    description: "Создаём персональные сайты для экспертов, коучей и консультантов. Личный бренд, портфолио, блог и онлайн-запись. Запуск от 10 дней.",
    keywords: "сайт для эксперта, персональный сайт, сайт для коуча, сайт для консультанта, личный бренд сайт, создание сайта специалиста",
  }, [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Создание персонального сайта для эксперта",
      "description": "Разработка персональных сайтов для экспертов, коучей и консультантов.",
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
        body: { name: formData.name, contact: formData.contact, message: formData.message, source_page: "/sayt-dlya-eksperta" },
      });
      toast({ title: "Заявка отправлена!", description: "Свяжемся с вами в течение дня." });
      setFormData({ name: "", contact: "", message: "" });
    } catch { toast({ title: "Ошибка", description: "Попробуйте ещё раз.", variant: "destructive" }); }
    setIsSubmitting(false);
  };

  const benefits = [
    { icon: UserCheck, title: "Личный бренд", desc: "Сайт формирует ваш образ эксперта. Клиенты видят опыт, кейсы и отзывы — доверие растёт ещё до первого контакта." },
    { icon: Star, title: "Портфолио и кейсы", desc: "Показывайте результаты работы: до/после, отзывы, цифры. Это убеждает лучше любой рекламы." },
    { icon: Award, title: "Экспертный контент", desc: "Блог на сайте привлекает органический трафик и укрепляет позицию эксперта в глазах аудитории." },
    { icon: Globe, title: "Глобальная доступность", desc: "Клиенты из любого города или страны могут узнать о вас и записаться на консультацию." },
    { icon: Lightbulb, title: "Уникальное позиционирование", desc: "Индивидуальный дизайн отражает вашу личность и выделяет среди конкурентов с шаблонными сайтами." },
    { icon: Target, title: "Воронка продаж", desc: "Сайт ведёт посетителя от знакомства до записи: контент → кейсы → отзывы → запись." },
  ];

  return (
    <Layout>
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm font-medium">Для экспертов и специалистов</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Персональный сайт<br />для эксперта
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Создаём сайты, которые работают на ваш личный бренд. Портфолио, блог, онлайн-запись, кейсы — всё, что нужно эксперту для привлечения клиентов.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Обсудить проект <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/cases">Примеры работ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Что даёт персональный сайт</h2>
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

      {/* For whom */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Для кого мы создаём сайты</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Коучи и тренеры", desc: "Личные коучи, бизнес-тренеры, фитнес-инструкторы — все, кто продаёт свою экспертизу." },
              { title: "Консультанты", desc: "Финансовые, юридические, маркетинговые консультанты и независимые эксперты." },
              { title: "Психологи и терапевты", desc: "Специалисты, которым важно создать доверительный образ и упростить запись на приём." },
              { title: "Дизайнеры и креаторы", desc: "Фотографы, дизайнеры, копирайтеры — все, кому нужно яркое портфолио." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-xl">
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6">Почему эксперту не обойтись без сайта</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Соцсети — отличный инструмент продвижения, но они не заменяют персональный сайт. Instagram может ограничить охваты, Telegram-канал сложно найти в поиске, а аккаунт на любой платформе могут заблокировать без предупреждения.</p>
              <p>Персональный сайт — это пространство, которое полностью под вашим контролем. Здесь вы выстраиваете свою экспертность через структурированный контент: статьи, кейсы, видео, отзывы клиентов. Поисковые системы индексируют этот контент и приводят к вам целевых клиентов бесплатно.</p>
              <p>Хороший сайт эксперта — это не просто визитка, а полноценная система привлечения клиентов. Посетитель проходит путь от «интересно» до «хочу записаться» благодаря правильной структуре: знакомство → экспертиза → доказательства → действие.</p>
              <p>Мы создаём сайты, которые отражают вашу уникальность, а не выглядят как очередной шаблон. Каждый элемент — от типографики до анимаций — работает на ваш <Link to="/upakovka-biznesa" className="text-primary hover:underline">личный бренд</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-display font-bold text-center mb-8">Связанные услуги</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link to="/razrabotka-sayta-pod-uslugi" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Сайт под услуги</p></Link>
            <Link to="/sayt-dlya-malogo-biznesa" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Сайт для бизнеса</p></Link>
            <Link to="/upakovka-biznesa" className="glass-card p-4 rounded-xl text-center hover:bg-primary/5 transition-colors"><p className="font-semibold">Упаковка бизнеса</p></Link>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Заказать персональный сайт</h2>
              <p className="text-muted-foreground">Расскажите о себе — подготовим индивидуальное предложение</p>
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
                <label className="block text-sm font-medium mb-2">Ваша специализация</label>
                <Textarea placeholder="В какой области вы эксперт, какие задачи должен решить сайт..." rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
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

export default WebsiteForExpert;
