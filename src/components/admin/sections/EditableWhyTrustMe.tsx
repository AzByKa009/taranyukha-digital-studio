import { useState, useEffect } from "react";
import { CheckCircle, Clock, Users, Shield } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { EditableText } from "@/components/admin/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Json } from "@/integrations/supabase/types";

interface TrustFactor {
  icon: string;
  title: string;
  description: string;
}

interface TrustContent {
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  quote?: string;
  factors?: TrustFactor[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, Users, Shield, CheckCircle,
};

const defaultFactors: TrustFactor[] = [
  { icon: "Clock", title: "Думаю стратегически", description: "Сначала — зачем, потом — как" },
  { icon: "Users", title: "Понимаю контекст", description: "Ниша, клиенты, конкуренты" },
  { icon: "Shield", title: "Считаю результат", description: "Цифры важнее красивых отчётов" },
  { icon: "CheckCircle", title: "Строю надолго", description: "Системы, а не разовые акции" },
];

export function EditableWhyTrustMe() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("Работаете ");
  const [titleAccent, setTitleAccent] = useState("со мной напрямую");
  const [subtitle, setSubtitle] = useState("Без менеджеров и посредников. Я лично разбираюсь в задаче и отвечаю за результат.");
  const [quote, setQuote] = useState("Мне важно понять бизнес — иначе маркетинг не сработает");
  const [factors, setFactors] = useState<TrustFactor[]>(defaultFactors);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "trust").maybeSingle();
    if (data?.value && typeof data.value === "object") {
      const v = data.value as TrustContent;
      if (v.title) setTitle(v.title);
      if (v.titleAccent) setTitleAccent(v.titleAccent);
      if (v.subtitle) setSubtitle(v.subtitle);
      if (v.quote) setQuote(v.quote);
      if (v.factors) setFactors(v.factors);
    }
  };

  const saveContent = async (updates: Partial<TrustContent>) => {
    const content = { title, titleAccent, subtitle, quote, factors, ...updates };
    const jsonValue = JSON.parse(JSON.stringify(content)) as Json;
    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "trust").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: jsonValue }).eq("key", "trust");
    } else {
      await supabase.from("site_settings").insert([{ key: "trust", value: jsonValue }]);
    }
    queryClient.invalidateQueries({ queryKey: ["site_settings", "trust"] });
    toast.success("Сохранено");
  };

  const updateFactor = async (index: number, field: keyof TrustFactor, value: string) => {
    const newFactors = [...factors];
    newFactors[index] = { ...newFactors[index], [field]: value };
    setFactors(newFactors);
    await saveContent({ factors: newFactors });
  };

  return (
    <section className="py-16 sm:py-24 bg-card/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn direction="right">
            <div>
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
                Подход
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                <EditableText
                  id="trust-title"
                  value={title}
                  onSave={async (v) => { setTitle(v); await saveContent({ title: v }); }}
                  as="span"
                />
                <EditableText
                  id="trust-title-accent"
                  value={titleAccent}
                  onSave={async (v) => { setTitleAccent(v); await saveContent({ titleAccent: v }); }}
                  className="text-gradient"
                  as="span"
                />
              </h2>
              <EditableText
                id="trust-subtitle"
                value={subtitle}
                onSave={async (v) => { setSubtitle(v); await saveContent({ subtitle: v }); }}
                className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed"
                as="p"
                multiline
              />
              
              <blockquote className="border-l-2 border-primary pl-4 sm:pl-6 py-2">
                <EditableText
                  id="trust-quote"
                  value={quote}
                  onSave={async (v) => { setQuote(v); await saveContent({ quote: v }); }}
                  className="text-base sm:text-lg italic text-foreground/90"
                  as="p"
                  multiline
                />
              </blockquote>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" staggerDelay={0.1}>
            {factors.map((factor, index) => {
              const IconComponent = iconMap[factor.icon] || CheckCircle;
              return (
                <StaggerItem key={index}>
                  <PremiumCard className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-colors h-full">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
                    <EditableText
                      id={`trust-factor-title-${index}`}
                      value={factor.title}
                      onSave={(v) => updateFactor(index, "title", v)}
                      className="font-display font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base"
                      as="h3"
                    />
                    <EditableText
                      id={`trust-factor-desc-${index}`}
                      value={factor.description}
                      onSave={(v) => updateFactor(index, "description", v)}
                      className="text-xs sm:text-sm text-muted-foreground"
                      as="p"
                      multiline
                    />
                  </PremiumCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
