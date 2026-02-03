import { useState, useEffect } from "react";
import { Target, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { EditableText } from "@/components/admin/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

interface ApproachPillar {
  icon: string;
  title: string;
  description: string;
  accent: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, Lightbulb, TrendingUp, Zap,
};

const defaultPillars: ApproachPillar[] = [
  { icon: "Target", title: "Стратегическое мышление", description: "Не делаю ради галочки. Каждое действие — часть плана.", accent: "Сначала — зачем, потом — как" },
  { icon: "Lightbulb", title: "Понимание бизнеса", description: "Разбираюсь в вашей нише, конкурентах, клиентах.", accent: "Вникаю в суть, а не поверхностно" },
  { icon: "TrendingUp", title: "Фокус на результат", description: "Метрики, которые можно измерить: заявки, продажи.", accent: "Цифры важнее красивых слов" },
  { icon: "Zap", title: "Системность", description: "Маркетинг как процесс, а не хаос.", accent: "Один раз настроить — долго пожинать" },
];

export function EditableApproachSection() {
  const [title, setTitle] = useState("Не просто исполнитель, а партнёр в росте");
  const [subtitle, setSubtitle] = useState("Я не беру задачи «сделать пост» или «запустить рекламу». Работаю с теми, кому нужен маркетинг как система.");
  const [pillars, setPillars] = useState<ApproachPillar[]>(defaultPillars);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "approach")
      .maybeSingle();

    if (data?.value && typeof data.value === "object") {
      const v = data.value as any;
      if (v.title) setTitle(v.title);
      if (v.subtitle) setSubtitle(v.subtitle);
      if (v.pillars) setPillars(v.pillars);
    }
  };

  const saveContent = async (updates: Partial<{ title: string; subtitle: string; pillars: ApproachPillar[] }>) => {
    const content = { title, subtitle, pillars, ...updates } as unknown as Json;
    
    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "approach").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: content }).eq("key", "approach");
    } else {
      await supabase.from("site_settings").insert([{ key: "approach", value: content }]);
    }
    toast.success("Сохранено");
  };

  const updatePillar = async (index: number, field: keyof ApproachPillar, value: string) => {
    const newPillars = [...pillars];
    newPillars[index] = { ...newPillars[index], [field]: value };
    setPillars(newPillars);
    await saveContent({ pillars: newPillars });
  };

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              Мой подход
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              <EditableText
                id="approach-title"
                value={title}
                onSave={async (v) => { setTitle(v); await saveContent({ title: v }); }}
                as="span"
              />
            </h2>
            <EditableText
              id="approach-subtitle"
              value={subtitle}
              onSave={async (v) => { setSubtitle(v); await saveContent({ subtitle: v }); }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              as="p"
              multiline
            />
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
          {pillars.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon] || Target;
            return (
              <StaggerItem key={index}>
                <PremiumCard className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <EditableText
                    id={`pillar-title-${index}`}
                    value={pillar.title}
                    onSave={(v) => updatePillar(index, "title", v)}
                    className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3"
                    as="h3"
                  />
                  <EditableText
                    id={`pillar-desc-${index}`}
                    value={pillar.description}
                    onSave={(v) => updatePillar(index, "description", v)}
                    className="text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4"
                    as="p"
                    multiline
                  />
                  <EditableText
                    id={`pillar-accent-${index}`}
                    value={pillar.accent}
                    onSave={(v) => updatePillar(index, "accent", v)}
                    className="text-xs text-primary/80 font-medium"
                    as="span"
                  />
                </PremiumCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
