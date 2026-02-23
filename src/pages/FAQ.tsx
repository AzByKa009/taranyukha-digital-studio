import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";

const faqs = [
  {
    question: "Какие услуги вы предоставляете?",
    answer: "Я специализируюсь на создании AI-продуктов, вайб кодинге (быстрая разработка MVP), монтаже вертикальных видео и продюсировании контента. Также создаю премиальные лендинги и сайты под ключ для бизнеса в сфере услуг.",
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Стоимость зависит от сложности проекта. Монтаж Reels — от 3000₽, продюсирование — от 5000₽, AI-видео — от 7000₽, создание AI продукта — от 8000₽, премиальный лендинг — от 25000₽. Напишите для точной оценки.",
  },
  {
    question: "Как долго занимает разработка проекта?",
    answer: "Монтаж вертикальных видео — 2-5 дней. Вайб кодинг MVP — 1-2 недели. AI-продукт — 2-4 недели. Премиальный лендинг или сайт под ключ — 2-4 недели. Сроки согласовываем индивидуально.",
  },
  {
    question: "Что такое вайб кодинг?",
    answer: "Вайб кодинг — это современный подход к быстрой разработке веб-приложений с использованием AI-инструментов. Позволяет создать работающий MVP за недели вместо месяцев, экономя время и бюджет.",
  },
  {
    question: "Работаете ли вы с проектами под ключ?",
    answer: "Да, я предоставляю полный цикл услуг — от концепции до запуска. Создание AI продукта, продюсирование контента, разработка сайта под ключ — всё в одном месте без координации множества подрядчиков.",
  },
  {
    question: "Какие AI-продукты вы создаёте?",
    answer: "Чат-боты для бизнеса, автоматизации на Make/Zapier, системы генерации контента, AI-ассистенты для обработки заявок. Любые решения на базе современных нейросетей для автоматизации бизнес-процессов.",
  },
  {
    question: "Можно ли доработать существующий продукт?",
    answer: "Конечно. Работаю как с проектами с нуля, так и с доработкой существующих решений. Провожу аудит, выявляю узкие места и предлагаю план улучшений.",
  },
  {
    question: "Как начать сотрудничество?",
    answer: "Напишите мне через форму на странице контактов или в Telegram. Опишите вашу задачу — монтаж видео, AI-продукт, сайт или что-то другое. Отвечу в течение 24 часов.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const FAQ = () => {
  useSEO({
    title: "FAQ — вопросы про AI-продукты, вайб кодинг, монтаж | Aleksey Taranukha",
    description: "Ответы на частые вопросы: цены на монтаж Reels, что такое вайб кодинг, сроки создания AI продукта, стоимость премиального лендинга.",
    keywords: "FAQ AI продукты, вопросы про вайб кодинг, цены на монтаж Reels, сколько стоит сайт под ключ",
  }, [faqSchema]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              FAQ
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Ответы на часто задаваемые вопросы о моих услугах и процессе работы
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-2xl px-6 border-none animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <AccordionTrigger className="text-left font-display font-semibold py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Не нашли ответ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Свяжитесь со мной, и я с удовольствием отвечу на любые вопросы
            </p>
            <Link to="/contacts">
              <Button variant="hero">
                Связаться
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;