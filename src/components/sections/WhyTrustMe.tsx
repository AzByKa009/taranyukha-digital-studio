import { CheckCircle, Clock, Users, Shield } from "lucide-react";

const trustFactors = [
  {
    icon: Clock,
    title: "Работаю на результат",
    description: "Каждый проект — это решение конкретной бизнес-задачи, а не просто красивая технология",
  },
  {
    icon: Users,
    title: "Понимаю бизнес-контекст",
    description: "Опыт работы с разными отраслями позволяет находить неочевидные решения",
  },
  {
    icon: Shield,
    title: "Прозрачный процесс",
    description: "Регулярные отчёты, понятные сроки и честная коммуникация на всех этапах",
  },
  {
    icon: CheckCircle,
    title: "Поддержка после запуска",
    description: "Помогаю масштабировать решения и адаптировать их под новые задачи",
  },
];

export function WhyTrustMe() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-4 block">
              Подход
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Почему мне <span className="text-gradient">доверяют</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Я не продаю «AI ради AI». Моя задача — найти точку, где технологии 
              принесут максимальную пользу вашему бизнесу, и реализовать это решение качественно.
            </p>
            
            {/* Quote */}
            <blockquote className="border-l-2 border-primary pl-6 py-2">
              <p className="text-lg italic text-foreground/90 mb-2">
                "Хороший консультант не тот, кто знает все ответы, а тот, кто задаёт правильные вопросы"
              </p>
            </blockquote>
          </div>

          {/* Right side - Trust factors */}
          <div className="grid sm:grid-cols-2 gap-6">
            {trustFactors.map((factor, index) => (
              <div
                key={factor.title}
                className="p-6 rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <factor.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display font-semibold mb-2">{factor.title}</h3>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
