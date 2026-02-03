import { useState, useEffect } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Quote } from "lucide-react";
import { EditableText } from "@/components/admin/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

interface Principle {
  principle: string;
  explanation: string;
}

interface ContentData {
  title?: string;
  subtitle?: string;
  quote?: string;
  principles?: Principle[];
  questions?: string[];
}

const defaultPrinciples: Principle[] = [
  { principle: "Сначала — зачем", explanation: "Любой проект начинаю с вопроса «какую бизнес-задачу решаем?»" },
  { principle: "Считаю, не угадываю", explanation: "Решения принимаю на основе данных: unit-экономика, конверсии." },
  { principle: "Простое лучше сложного", explanation: "Если можно решить задачу одним инструментом — не буду продавать пять." },
  { principle: "Честно про ограничения", explanation: "Если вижу, что моя работа не даст результата — скажу прямо." },
  { principle: "Думаю как владелец", explanation: "Ваши деньги — это ваши деньги. Не буду тратить бюджет зря." },
];

const defaultQuestions = [
  "Откуда сейчас приходят клиенты?",
  "Что мешает клиенту купить?",
  "Какой один показатель изменит всё?",
  "Что уже пробовали?",
  "Сколько стоит один клиент?",
];

export function EditableThinkingSection() {
  const [title, setTitle] = useState("Маркетинг — это бизнес-мышление");
  const [subtitle, setSubtitle] = useState("Я не верю в «волшебные таблетки» и быстрые результаты без понимания контекста.");
  const [quote, setQuote] = useState("Прежде чем говорить о решениях, мне важно понять — где вы сейчас и куда хотите прийти.");
  const [principles, setPrinciples] = useState<Principle[]>(defaultPrinciples);
  const [questions, setQuestions] = useState<string[]>(defaultQuestions);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "thinking").maybeSingle();
    if (data?.value && typeof data.value === "object") {
      const v = data.value as ContentData;
      if (v.title) setTitle(v.title);
      if (v.subtitle) setSubtitle(v.subtitle);
      if (v.quote) setQuote(v.quote);
      if (v.principles) setPrinciples(v.principles);
      if (v.questions) setQuestions(v.questions);
    }
  };

  const saveContent = async (updates: Partial<ContentData>) => {
    const content = { title, subtitle, quote, principles, questions, ...updates } as unknown as Json;
    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "thinking").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: content }).eq("key", "thinking");
    } else {
      await supabase.from("site_settings").insert([{ key: "thinking", value: content }]);
    }
    toast.success("Сохранено");
  };

  const updatePrinciple = async (index: number, field: keyof Principle, value: string) => {
    const newPrinciples = [...principles];
    newPrinciples[index] = { ...newPrinciples[index], [field]: value };
    setPrinciples(newPrinciples);
    await saveContent({ principles: newPrinciples });
  };

  const updateQuestion = async (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
    await saveContent({ questions: newQuestions });
  };

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-transparent" />
      
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-2xl mb-14 sm:mb-20">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 block">
              Как я думаю
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 sm:mb-6">
              <EditableText
                id="thinking-title"
                value={title}
                onSave={async (v) => { setTitle(v); await saveContent({ title: v }); }}
                as="span"
              />
            </h2>
            <EditableText
              id="thinking-subtitle"
              value={subtitle}
              onSave={async (v) => { setSubtitle(v); await saveContent({ subtitle: v }); }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              as="p"
              multiline
            />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
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
                  <div className="group flex items-start gap-4">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-primary/30 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <EditableText
                        id={`principle-title-${index}`}
                        value={item.principle}
                        onSave={(v) => updatePrinciple(index, "principle", v)}
                        className="text-base sm:text-lg font-display font-semibold mb-1.5"
                        as="h4"
                      />
                      <EditableText
                        id={`principle-desc-${index}`}
                        value={item.explanation}
                        onSave={(v) => updatePrinciple(index, "explanation", v)}
                        className="text-sm text-muted-foreground leading-relaxed"
                        as="p"
                        multiline
                      />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

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
                <EditableText
                  id="thinking-quote"
                  value={quote}
                  onSave={async (v) => { setQuote(v); await saveContent({ quote: v }); }}
                  className="text-base sm:text-lg text-foreground/90 italic leading-relaxed"
                  as="p"
                  multiline
                />
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-3 sm:space-y-4" staggerDelay={0.06}>
              {questions.map((question, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-border/40">
                    <span className="text-primary text-lg leading-none">?</span>
                    <EditableText
                      id={`question-${index}`}
                      value={question}
                      onSave={(v) => updateQuestion(index, v)}
                      className="text-sm sm:text-base text-foreground/80"
                      as="p"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
