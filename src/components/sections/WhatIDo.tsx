import { Link } from "react-router-dom";
import { Briefcase, Megaphone, Bot, BarChart3, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";

// Areas of expertise - not services, but competencies
const expertiseAreas = [
  {
    icon: Briefcase,
    title: "Упаковка бизнеса",
    description: "Позиционирование, смыслы, визуал. Чтобы клиент понял ценность за 3 секунды.",
    examples: ["Сайты", "Презентации", "Коммерческие предложения"],
  },
  {
    icon: Megaphone,
    title: "Продвижение",
    description: "Трафик, который конвертируется в заявки и продажи. Без слива бюджета.",
    examples: ["Таргет", "Контент-маркетинг", "SEO"],
  },
  {
    icon: Bot,
    title: "Автоматизация",
    description: "Освобождаю время команды от рутины. AI и интеграции работают за вас.",
    examples: ["Чат-боты", "CRM-интеграции", "Авторассылки"],
  },
  {
    icon: BarChart3,
    title: "Аналитика и стратегия",
    description: "Понимаю, что работает, а что — нет. Решения на основе данных, не интуиции.",
    examples: ["Аудит", "Unit-экономика", "Воронки"],
  },
];

export function WhatIDo() {
  return (
    <section className="py-20 sm:py-28 relative bg-card/30">
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              Экспертиза
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              С чем помогаю <span className="text-gradient">бизнесу расти</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Это не список услуг, а области, в которых я разбираюсь. 
              Конкретное решение подбираю под вашу задачу — после диагностики.
            </p>
          </div>
        </FadeIn>

        {/* Expertise Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12" staggerDelay={0.1}>
          {expertiseAreas.map((area) => (
            <StaggerItem key={area.title}>
              <PremiumCard
                className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-background/50 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full"
                hoverScale={1.02}
                hoverY={-4}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <area.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3">
                  {area.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {area.examples.map((example) => (
                    <span
                      key={example}
                      className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA to services */}
        <FadeIn delay={0.4}>
          <div className="text-center">
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Подробнее об услугах и ценах
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
