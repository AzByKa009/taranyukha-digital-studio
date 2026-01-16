import { useEffect } from "react";
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

const faqs = [
  {
    question: "Какие услуги вы предоставляете?",
    answer: "Я специализируюсь на AI-решениях, цифровом продакшене, автоматизации процессов и консалтинге по цифровой трансформации. Это включает разработку чат-ботов, систем машинного обучения, веб-приложений, а также стратегическое консультирование по внедрению технологий.",
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Стоимость зависит от масштаба и сложности проекта. Для небольших задач работаю по почасовой ставке, для крупных проектов — по фиксированной стоимости. Напишите мне с описанием задачи, и я подготовлю индивидуальное предложение.",
  },
  {
    question: "Как долго занимает разработка проекта?",
    answer: "Сроки варьируются в зависимости от сложности. Простой чат-бот может быть готов за 2-3 недели, комплексная AI-система — за 2-4 месяца. На этапе обсуждения всегда согласовываем реалистичные сроки и этапы работ.",
  },
  {
    question: "Работаете ли вы с проектами 'под ключ'?",
    answer: "Да, я предоставляю полный цикл услуг — от концепции и проектирования до разработки, тестирования, запуска и поддержки. Вы получаете готовое решение без необходимости координировать множество подрядчиков.",
  },
  {
    question: "Какие технологии вы используете?",
    answer: "Для AI-проектов: Python, TensorFlow, PyTorch, OpenAI API, LangChain. Для веб-разработки: React, Node.js, TypeScript. Для инфраструктуры: AWS, GCP, Docker, Kubernetes. Всегда выбираю технологии исходя из задач проекта.",
  },
  {
    question: "Можно ли доработать существующий продукт?",
    answer: "Конечно. Работаю как с проектами с нуля, так и с доработкой и оптимизацией существующих решений. Провожу аудит, выявляю узкие места и предлагаю план улучшений.",
  },
  {
    question: "Предоставляете ли вы поддержку после запуска?",
    answer: "Да, после завершения проекта предлагаю различные варианты поддержки: от разовых консультаций до регулярного технического сопровождения с SLA.",
  },
  {
    question: "Как начать сотрудничество?",
    answer: "Напишите мне через форму на странице контактов или в Telegram. Опишите вашу задачу, и я свяжусь с вами для обсуждения деталей. Первая консультация — бесплатно.",
  },
];

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Ответы на часто задаваемые вопросы об услугах AI-разработки, ценах, сроках и процессе работы."
    );

    // Add FAQPage Schema
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

    const existingScript = document.querySelector('script[data-schema="faq"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.querySelector('script[data-schema="faq"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

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
      <section className="py-16 bg-card/30">
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