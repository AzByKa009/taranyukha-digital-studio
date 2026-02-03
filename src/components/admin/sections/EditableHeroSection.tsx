import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Scene3D } from "@/components/3d/Scene3D";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";
import { EditableText } from "@/components/admin/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface HeroContent {
  badge?: string;
  title_1?: string;
  title_2?: string;
  subtitle?: string;
  cta_text?: string;
  stat_years?: string;
  stat_projects?: string;
  stat_ai?: string;
  stat_response?: string;
  step_1_title?: string;
  step_1_desc?: string;
  step_2_title?: string;
  step_2_desc?: string;
  step_3_title?: string;
  step_3_desc?: string;
  step_4_title?: string;
  step_4_desc?: string;
  how_i_work?: string;
}

export function EditableHeroSection() {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<HeroContent>({
    badge: "Маркетолог · Системный подход",
    title_1: "Выстраиваю маркетинг, ",
    title_2: "который приносит клиентов",
    subtitle: "Работаю с бизнесом напрямую. Упаковка, продвижение, автоматизация — как единая система, а не хаос задач.",
    cta_text: "Обсудить задачу",
    stat_years: "2+",
    stat_projects: "10+",
    stat_ai: "AI",
    stat_response: "24ч",
    step_1_title: "Разбираюсь",
    step_1_desc: "Изучаю бизнес и задачу",
    step_2_title: "Планирую",
    step_2_desc: "Предлагаю решение",
    step_3_title: "Делаю",
    step_3_desc: "Беру реализацию на себя",
    step_4_title: "Развиваю",
    step_4_desc: "Помогаю масштабировать",
    how_i_work: "Как я работаю",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "hero")
      .maybeSingle();

    if (data?.value && typeof data.value === "object") {
      setContent((prev) => ({ ...prev, ...(data.value as HeroContent) }));
    }
  };

  const saveField = async (field: keyof HeroContent, value: string) => {
    const newContent = { ...content, [field]: value };
    setContent(newContent);

    try {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", "hero")
        .maybeSingle();

      if (existing) {
        await supabase.from("site_settings").update({ value: newContent }).eq("key", "hero");
      } else {
        await supabase.from("site_settings").insert([{ key: "hero", value: newContent }]);
      }
      
      // Invalidate query so public site updates
      queryClient.invalidateQueries({ queryKey: ["site_settings", "hero"] });
      toast.success("Сохранено");
    } catch (error) {
      toast.error("Ошибка сохранения");
    }
  };

  const stats = [
    { value: content.stat_years || "2+", label: "года опыта", key: "stat_years" as const },
    { value: content.stat_projects || "10+", label: "проектов", key: "stat_projects" as const },
    { value: content.stat_ai || "AI", label: "автоматизация", key: "stat_ai" as const },
    { value: content.stat_response || "24ч", label: "ответ", key: "stat_response" as const },
  ];

  const processSteps = [
    { number: "01", titleKey: "step_1_title" as const, descKey: "step_1_desc" as const },
    { number: "02", titleKey: "step_2_title" as const, descKey: "step_2_desc" as const },
    { number: "03", titleKey: "step_3_title" as const, descKey: "step_3_desc" as const },
    { number: "04", titleKey: "step_4_title" as const, descKey: "step_4_desc" as const },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/5 to-transparent" />
      <Scene3D />
      
      <div className="container relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm mb-6 sm:mb-10">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <EditableText
                  id="hero-badge"
                  value={content.badge || ""}
                  onSave={(v) => saveField("badge", v)}
                  className="text-xs sm:text-sm text-muted-foreground font-medium"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] sm:leading-[1.08] mb-5 sm:mb-7">
                <EditableText
                  id="hero-title-1"
                  value={content.title_1 || ""}
                  onSave={(v) => saveField("title_1", v)}
                  className="text-gradient"
                  as="span"
                />
                <EditableText
                  id="hero-title-2"
                  value={content.title_2 || ""}
                  onSave={(v) => saveField("title_2", v)}
                  as="span"
                />
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <EditableText
                id="hero-subtitle"
                value={content.subtitle || ""}
                onSave={(v) => saveField("subtitle", v)}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-12 leading-relaxed"
                as="p"
                multiline
              />
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link to="/contacts" className="inline-block">
                <Button variant="hero" size="lg" className="shadow-xl shadow-primary/25">
                  <EditableText
                    id="hero-cta"
                    value={content.cta_text || ""}
                    onSave={(v) => saveField("cta_text", v)}
                  />
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </FadeIn>
          </div>

          <div className="hidden lg:block" />
        </div>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-border/40">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.key}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <EditableText
                  id={`hero-${stat.key}`}
                  value={stat.value}
                  onSave={(v) => saveField(stat.key, v)}
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-1 sm:mb-2"
                  as="div"
                />
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* How I Work */}
        <FadeIn delay={0.5}>
          <div className="mt-16 sm:mt-24">
            <EditableText
              id="hero-how-i-work"
              value={content.how_i_work || "Как я работаю"}
              onSave={(v) => saveField("how_i_work", v)}
              className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 sm:mb-10"
              as="h3"
            />
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5" staggerDelay={0.1}>
              {processSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="group p-4 sm:p-7 rounded-xl sm:rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/30 transition-all duration-400">
                    <div className="text-xl sm:text-3xl font-display font-bold text-primary/50 mb-2 sm:mb-4 group-hover:text-primary/70 transition-colors duration-400">
                      {step.number}
                    </div>
                    <EditableText
                      id={`hero-${step.titleKey}`}
                      value={content[step.titleKey] || ""}
                      onSave={(v) => saveField(step.titleKey, v)}
                      className="text-sm sm:text-lg font-display font-semibold mb-1 sm:mb-2"
                      as="h4"
                    />
                    <EditableText
                      id={`hero-${step.descKey}`}
                      value={content[step.descKey] || ""}
                      onSave={(v) => saveField(step.descKey, v)}
                      className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                      as="p"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
