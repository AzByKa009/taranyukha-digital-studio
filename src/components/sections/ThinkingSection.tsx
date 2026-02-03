import { Link } from "react-router-dom";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Quote } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface ThinkingPrinciple {
  principle: string;
  explanation: string;
}

interface ThinkingContent {
  label?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  quote?: string;
  principles?: ThinkingPrinciple[];
  questions?: string[];
}

const defaultPrinciples: ThinkingPrinciple[] = [
  { principle: "Сначала — зачем", explanation: "Любой проект начинаю с вопроса «какую бизнес-задачу решаем?». Красивый сайт без понимания цели — пустая трата денег." },
  { principle: "Считаю, не угадываю", explanation: "Решения принимаю на основе данных: unit-экономика, конверсии, стоимость привлечения. Интуиция — плохой советчик в маркетинге." },
  { principle: "Простое лучше сложного", explanation: "Если можно решить задачу одним инструментом — не буду продавать пять. Сложность ≠ эффективность." },
  { principle: "Честно про ограничения", explanation: "Если вижу, что моя работа не даст результата без изменений в продукте или продажах — скажу прямо, а не возьму деньги." },
  { principle: "Думаю как владелец", explanation: "Ваши деньги — это ваши деньги. Не буду тратить бюджет на эксперименты ради экспериментов." },
];

const defaultQuestions = [
  "Откуда сейчас приходят клиенты и почему именно оттуда?",
  "Что мешает клиенту купить прямо сейчас?",
  "Какой один показатель изменит всё?",
  "Что уже пробовали и почему не сработало?",
  "Сколько стоит один клиент и сколько он приносит?",
];

export function ThinkingSection() {
  const { data: thinkingSettings } = useSiteSettings<ThinkingContent>("thinking");

  const label = thinkingSettings?.label || "Как я думаю";
  const title = thinkingSettings?.title || "Маркетинг — это ";
  const titleAccent = thinkingSettings?.titleAccent || "бизнес-мышление";
  const subtitle = thinkingSettings?.subtitle || "Я не верю в «волшебные таблетки» и быстрые результаты без понимания контекста. Прежде чем что-то делать — разбираюсь, как устроен ваш бизнес.";
  const quote = thinkingSettings?.quote || "Прежде чем говорить о решениях, мне важно понять — где вы сейчас и куда хотите прийти. Без этого любой маркетинг — стрельба с закрытыми глазами.";
  const principles = thinkingSettings?.principles || defaultPrinciples;
  const questions = thinkingSettings?.questions || defaultQuestions;

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
      
      <div className="container relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="max-w-2xl mb-14 sm:mb-20">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 block">
              {label}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 sm:mb-6">
              {title}<span className="text-gradient">{titleAccent}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Principles */}
          <div>
            <FadeIn delay={0.1}>
              <h3 className="text-lg sm:text-xl font-display font-semibold mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                Принципы работы
              </h3>
            </FadeIn>
            
            <StaggerContainer className="space-y-5 sm:space-y-6" staggerDelay={0.08}>
              {principles.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl sm:text-3xl font-display font-bold text-primary/30 group-hover:text-primary/50 transition-colors duration-300 leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-display font-semibold mb-1.5">
                          {item.principle}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right - Questions I ask */}
          <div>
            <FadeIn delay={0.2}>
              <h3 className="text-lg sm:text-xl font-display font-semibold mb-6 sm:mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                Вопросы, которые задаю
              </h3>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card/50 border border-border/60 mb-6 sm:mb-8">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-base sm:text-lg text-foreground/90 italic leading-relaxed mb-4">
                  «{quote}»
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-3 sm:space-y-4" staggerDelay={0.06}>
              {questions.map((question, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-border/40 hover:border-primary/30 transition-colors duration-300">
                    <span className="text-primary text-lg leading-none">?</span>
                    <p className="text-sm sm:text-base text-foreground/80">
                      {question}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Bottom note */}
        <FadeIn delay={0.5}>
          <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-border/40">
            <p className="text-center text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Если ищете человека, который будет думать о вашем результате — 
              <Link to="/contacts" className="text-primary hover:text-primary/80 ml-1 transition-colors">
                напишите
              </Link>.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
