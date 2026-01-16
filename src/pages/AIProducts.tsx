import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Sparkles, FileText, Image, MessageSquare, Mic } from "lucide-react";

const products = [
  {
    icon: Bot,
    title: "AI Чат-бот",
    description: "Интеллектуальный ассистент для автоматизации клиентской поддержки и продаж",
    status: "Доступен",
    features: ["Интеграция с CRM", "Мультиканальность", "Обучение на ваших данных", "Аналитика"],
  },
  {
    icon: Sparkles,
    title: "AI Генератор контента",
    description: "Автоматическое создание текстов, заголовков и описаний для маркетинга",
    status: "Доступен",
    features: ["Генерация статей", "SEO-оптимизация", "Мультиязычность", "Тональность бренда"],
  },
  {
    icon: FileText,
    title: "Document AI",
    description: "Система распознавания и обработки документов с использованием OCR и NLP",
    status: "Бета",
    features: ["OCR-распознавание", "Извлечение данных", "Классификация", "API-интеграция"],
  },
  {
    icon: Image,
    title: "Image AI",
    description: "Генерация и редактирование изображений с помощью нейросетей",
    status: "В разработке",
    features: ["Генерация изображений", "Улучшение качества", "Удаление фона", "Стилизация"],
  },
  {
    icon: MessageSquare,
    title: "Sentiment Analyzer",
    description: "Анализ тональности отзывов и сообщений для мониторинга репутации",
    status: "Доступен",
    features: ["Анализ отзывов", "Мониторинг соцсетей", "Отчёты", "Алерты"],
  },
  {
    icon: Mic,
    title: "Voice AI",
    description: "Транскрибация и анализ голосовых сообщений и звонков",
    status: "Бета",
    features: ["Speech-to-Text", "Анализ звонков", "Саммаризация", "Интеграция с колл-центром"],
  },
];

const AIProducts = () => {
  useEffect(() => {
    document.title = "AI-продукты — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Готовые AI-решения для бизнеса: чат-боты, генераторы контента, системы анализа документов и изображений."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Powered by AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              AI-продукты
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Готовые решения на основе искусственного интеллекта для автоматизации и масштабирования бизнеса
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product.title}
                className="group glass-card rounded-2xl p-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <product.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === "Доступен" 
                      ? "bg-green-500/10 text-green-400"
                      : product.status === "Бета"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {product.status}
                  </span>
                </div>
                
                <h2 className="text-xl font-display font-semibold mb-2">
                  {product.title}
                </h2>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="sm" className="w-full group/btn">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Нужно кастомное AI-решение?
            </h2>
            <p className="text-muted-foreground mb-8">
              Разработаем AI-продукт под ваши специфические задачи
            </p>
            <Link to="/contacts">
              <Button variant="hero">
                Обсудить проект
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIProducts;