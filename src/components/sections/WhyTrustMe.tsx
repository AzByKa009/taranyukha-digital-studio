import { CheckCircle, Clock, Users, Shield } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";

const trustFactors = [
  {
    icon: Clock,
    title: "Беру на себя процесс",
    description: "Вы занимаетесь своим делом — я беру на себя техническую реализацию и головную боль",
  },
  {
    icon: Users,
    title: "Понимаю бизнес-задачи",
    description: "Не просто делаю, а разбираюсь зачем. Предлагаю решения, которые работают на результат",
  },
  {
    icon: Shield,
    title: "Прозрачная работа",
    description: "Понятные сроки, честная коммуникация и регулярные отчёты на всех этапах",
  },
  {
    icon: CheckCircle,
    title: "Поддержка после запуска",
    description: "Не бросаю проект после сдачи. Помогаю развивать и адаптировать под новые задачи",
  },
];

export function WhyTrustMe() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <FadeIn direction="right">
            <div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider mb-4 block">
                Подход
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                Почему мне <span className="text-gradient">доверяют</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Я не продаю технологии ради технологий. Моя задача — снять с вас головную боль 
                и сделать так, чтобы вы получили результат без погружения в детали.
              </p>
              
              {/* Quote */}
              <blockquote className="border-l-2 border-primary pl-6 py-2">
                <p className="text-lg italic text-foreground/90 mb-2">
                  "Можно оставить заявку без созвона — я сам уточню детали и предложу решение"
                </p>
              </blockquote>
            </div>
          </FadeIn>

          {/* Right side - Trust factors */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {trustFactors.map((factor) => (
              <StaggerItem key={factor.title}>
                <PremiumCard
                  className="p-6 rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-colors h-full"
                  hoverScale={1.03}
                  hoverY={-4}
                >
                  <factor.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold mb-2">{factor.title}</h3>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </PremiumCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
