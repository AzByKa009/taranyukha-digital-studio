import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Layers, Zap, Target, Code, Palette, BarChart3, Cog } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI-решения",
    description: "Разработка и интеграция искусственного интеллекта в бизнес-процессы. Чат-боты, системы анализа данных, предиктивная аналитика.",
    features: ["Чат-боты и виртуальные ассистенты", "Анализ естественного языка", "Компьютерное зрение", "Предиктивная аналитика"],
  },
  {
    icon: Layers,
    title: "Digital Production",
    description: "Полный цикл создания цифрового контента и продуктов — от концепции до запуска и поддержки.",
    features: ["Веб-приложения", "Мобильные приложения", "Лендинги и сайты", "E-commerce решения"],
  },
  {
    icon: Zap,
    title: "Автоматизация процессов",
    description: "Оптимизация рабочих процессов с помощью современных технологий. Сокращение рутины и повышение эффективности.",
    features: ["RPA-решения", "Интеграция систем", "Автоматизация документооборота", "Workflow-оптимизация"],
  },
  {
    icon: Target,
    title: "Консалтинг",
    description: "Стратегическое консультирование по цифровой трансформации и внедрению AI-технологий.",
    features: ["Аудит процессов", "Стратегия внедрения AI", "Выбор технологий", "Обучение команды"],
  },
  {
    icon: Code,
    title: "Разработка на заказ",
    description: "Создание уникальных программных решений под специфические задачи бизнеса.",
    features: ["Backend-разработка", "API-интеграции", "Микросервисы", "Cloud-решения"],
  },
  {
    icon: Palette,
    title: "UX/UI дизайн",
    description: "Проектирование пользовательского опыта и интерфейсов для цифровых продуктов.",
    features: ["UX-исследования", "UI-дизайн", "Прототипирование", "Дизайн-системы"],
  },
  {
    icon: BarChart3,
    title: "Аналитика данных",
    description: "Сбор, обработка и визуализация данных для принятия обоснованных бизнес-решений.",
    features: ["BI-дашборды", "ETL-процессы", "Data Warehousing", "ML-модели"],
  },
  {
    icon: Cog,
    title: "Техническая поддержка",
    description: "Сопровождение и развитие существующих продуктов. Мониторинг и оптимизация.",
    features: ["24/7 мониторинг", "Оптимизация производительности", "Обновления безопасности", "Масштабирование"],
  },
];

const Services = () => {
  useEffect(() => {
    document.title = "Услуги — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "AI-решения, цифровой продакшен, автоматизация и консалтинг. Полный спектр услуг для цифровой трансформации бизнеса."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Услуги
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Комплексный подход к созданию цифровых решений — от стратегии до реализации и поддержки
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group glass-card rounded-2xl p-8 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                
                <h2 className="text-2xl font-display font-semibold mb-3">
                  {service.title}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
              Нужна консультация?
            </h2>
            <p className="text-muted-foreground mb-8">
              Обсудим ваш проект и подберём оптимальное решение
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

export default Services;