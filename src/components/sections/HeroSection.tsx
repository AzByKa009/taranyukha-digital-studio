import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI & Digital Production</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Создаю цифровые продукты,{" "}
            <span className="text-gradient">которые меняют правила</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Aleksey Taranukha — эксперт в области AI и цифрового продакшена. 
            Помогаю бизнесу внедрять инновационные технологии и создавать продукты будущего.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/cases">
              <Button variant="hero">
                Смотреть кейсы
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contacts">
              <Button variant="hero-outline">
                Обсудить проект
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-border animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Проектов</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient">10+</div>
              <div className="text-sm text-muted-foreground mt-1">Лет опыта</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient">AI</div>
              <div className="text-sm text-muted-foreground mt-1">Технологии</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
