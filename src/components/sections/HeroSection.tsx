import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Scene3D } from "@/components/3d/Scene3D";

const processSteps = [
  { number: "01", title: "Анализ", description: "Изучаю задачу и контекст" },
  { number: "02", title: "Стратегия", description: "Предлагаю решение" },
  { number: "03", title: "Реализация", description: "Создаю продукт" },
  { number: "04", title: "Поддержка", description: "Помогаю масштабировать" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* 3D Scene */}
      <Scene3D />
      
      <div className="container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI & Digital Production Expert</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Превращаю идеи в{" "}
              <span className="text-gradient">AI-продукты</span>{" "}
              и цифровой контент
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Помогаю бизнесу внедрять нейросети, автоматизировать процессы 
              и создавать продукты, которые решают реальные задачи
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/contacts">
                <Button variant="hero" size="lg">
                  Обсудить проект
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cases">
                <Button variant="hero-outline" size="lg">
                  <Play className="h-4 w-4" />
                  Смотреть кейсы
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Stats (visible on larger screens) */}
          <div className="hidden lg:block" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-border/50 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">10+</div>
            <div className="text-sm text-muted-foreground">Лет в digital</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Проектов</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">AI</div>
            <div className="text-sm text-muted-foreground">Технологии</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">24ч</div>
            <div className="text-sm text-muted-foreground">Ответ на заявку</div>
          </div>
        </div>

        {/* How I Work */}
        <div className="mt-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Как я работаю
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="group p-6 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-3xl font-display font-bold text-primary/50 mb-3">
                  {step.number}
                </div>
                <h4 className="text-lg font-display font-semibold mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
