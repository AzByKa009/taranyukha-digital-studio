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
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t, language } = useLanguage();

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
    { question: t("faq.q7"), answer: t("faq.a7") },
    { question: t("faq.q8"), answer: t("faq.a8") },
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

  useSEO({
    title: language === "ru"
      ? "FAQ — вопросы про AI-продукты, вайб кодинг, монтаж | Aleksey Taranukha"
      : "FAQ — questions about AI products, vibe coding, editing | Aleksey Taranukha",
    description: language === "ru"
      ? "Ответы на частые вопросы: цены на монтаж Reels, что такое вайб кодинг, сроки создания AI продукта, стоимость премиального лендинга."
      : "Answers to common questions: Reels editing prices, what is vibe coding, AI product timelines, premium landing costs.",
    keywords: "FAQ AI продукты, вопросы про вайб кодинг, цены на монтаж Reels, сколько стоит сайт под ключ",
  }, [faqSchema]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 animate-fade-in-up">
              {t("faq.title")}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t("faq.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-12 sm:pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-xl sm:rounded-2xl px-5 sm:px-6 border-none animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <AccordionTrigger className="text-left font-display font-semibold py-5 sm:py-6 hover:no-underline text-sm sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-5 sm:pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-card/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("faq.not_found")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              {t("faq.not_found_desc")}
            </p>
            <Link to="/contacts">
              <Button variant="hero">
                {t("faq.contact_btn")}
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
