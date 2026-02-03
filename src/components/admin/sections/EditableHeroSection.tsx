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
}

export function EditableHeroSection() {
  const [content, setContent] = useState<HeroContent>({
    badge: "Маркетолог + Технологии",
    title_1: "Маркетинг ",
    title_2: "как система роста",
    subtitle: "Помогаю бизнесу расти системно — через упаковку, продвижение и автоматизацию. Работаю как стратег и партнёр, не как исполнитель.",
    cta_text: "Разобрать мой проект",
    stat_years: "2+",
    stat_projects: "10+",
    stat_ai: "AI",
    stat_response: "24ч",
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
      toast.success("Сохранено");
    } catch (error) {
      toast.error("Ошибка сохранения");
    }
  };

  const stats = [
    { value: content.stat_years || "2+", label: "лет опыта", key: "stat_years" },
    { value: content.stat_projects || "10+", label: "проектов", key: "stat_projects" },
    { value: content.stat_ai || "AI", label: "технологии", key: "stat_ai" },
    { value: content.stat_response || "24ч", label: "ответ", key: "stat_response" },
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
                  onSave={(v) => saveField(stat.key as keyof HeroContent, v)}
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-1 sm:mb-2"
                  as="div"
                />
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
