import { Target, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";

const approachPillars = [
  {
    icon: Target,
    title: "Стратегическое мышление",
    description: "Не делаю ради галочки. Каждое действие — часть плана, работающего на вашу цель: рост, продажи, узнаваемость.",
    accent: "Сначала — зачем, потом — как",
  },
  {
    icon: Lightbulb,
    title: "Понимание бизнеса",
    description: "Разбираюсь в вашей нише, конкурентах, клиентах. Маркетинг без контекста — просто трата бюджета.",
    accent: "Вникаю в суть, а не поверхностно",
  },
  {
    icon: TrendingUp,
    title: "Фокус на результат",
    description: "Метрики, которые можно измерить: заявки, продажи, рост аудитории. Красивые отчёты без результата — не мой подход.",
    accent: "Цифры важнее красивых слов",
  },
  {
    icon: Zap,
    title: "Системность",
    description: "Маркетинг как процесс, а не хаос. Выстраиваю систему, которая работает предсказуемо и масштабируется.",
    accent: "Один раз настроить — долго пожинать",
  },
];

export function ApproachSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              Мой подход
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              Не просто исполнитель, <br />
              <span className="text-gradient">а партнёр в росте</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Я не беру задачи «сделать пост» или «запустить рекламу». 
              Работаю с теми, кому нужен маркетинг как система — с пониманием целей и ответственностью за результат.
            </p>
          </div>
        </FadeIn>

        {/* Approach Cards */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
          {approachPillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <PremiumCard
                className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full"
                hoverScale={1.02}
                hoverY={-4}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <pillar.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                  {pillar.description}
                </p>
                <span className="text-xs text-primary/80 font-medium">
                  {pillar.accent}
                </span>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
