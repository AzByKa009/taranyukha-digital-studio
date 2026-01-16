import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Briefcase, GraduationCap, Lightbulb } from "lucide-react";

const About = () => {
  useEffect(() => {
    document.title = "Обо мне — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Aleksey Taranukha — эксперт в области AI и цифрового продакшена с 10+ годами опыта в IT-индустрии."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Aleksey Taranukha
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                AI & Digital Production Expert
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Более 10 лет помогаю бизнесу внедрять инновационные технологии и создавать 
                цифровые продукты, которые меняют правила игры. Специализируюсь на AI-решениях, 
                автоматизации и комплексном цифровом продакшене.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contacts">
                  <Button variant="hero">
                    Связаться
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cases">
                  <Button variant="hero-outline">
                    Смотреть кейсы
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-border">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-5xl font-display font-bold text-primary-foreground">AT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            Опыт и экспертиза
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in-up">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Лет в IT</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Проектов</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Наград</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold mb-1">AI</div>
              <div className="text-sm text-muted-foreground">Специализация</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Ключевые компетенции
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Искусственный интеллект",
                "Machine Learning",
                "Natural Language Processing",
                "Computer Vision",
                "Digital Production",
                "Web Development",
                "Автоматизация процессов",
                "Cloud Solutions",
                "Data Analytics",
                "Product Management",
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Философия работы
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              «Технологии должны служить людям, а не наоборот. Мой подход — находить простые 
              решения для сложных задач, создавая продукты, которые действительно работают 
              и приносят измеримый результат бизнесу.»
            </p>
            <div className="flex justify-center">
              <Link to="/contacts">
                <Button variant="premium">
                  Обсудить сотрудничество
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;