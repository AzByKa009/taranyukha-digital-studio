import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Megaphone, Bot, BarChart3, Code, Brain, Layers, Zap, Globe, Share2, Target, Plus, Loader2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { supabase } from "@/integrations/supabase/client";
import { EditableText } from "@/components/admin/EditableText";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, Megaphone, Bot, BarChart3, Code, Brain, Layers, Zap, Globe, Share2, Target,
};

interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  icon: string | null;
  features: string[] | null;
}

export function EditableWhatIDo() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("С чем помогаю бизнесу расти");
  const [sectionSubtitle, setSectionSubtitle] = useState("Это не список услуг, а области, в которых я разбираюсь. Конкретное решение подбираю под вашу задачу — после диагностики.");

  useEffect(() => {
    fetchServices();
    loadSectionContent();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, title, short_description, icon, features")
      .eq("is_published", true)
      .order("sort_order")
      .limit(4);

    if (!error && data) setServices(data);
    setLoading(false);
  };

  const loadSectionContent = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "whatido")
      .maybeSingle();

    if (data?.value && typeof data.value === "object") {
      const v = data.value as any;
      if (v.title) setSectionTitle(v.title);
      if (v.subtitle) setSectionSubtitle(v.subtitle);
    }
  };

  const saveSectionContent = async (field: string, value: string) => {
    const content = { title: sectionTitle, subtitle: sectionSubtitle, [field]: value };
    if (field === "title") setSectionTitle(value);
    if (field === "subtitle") setSectionSubtitle(value);

    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "whatido").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: content }).eq("key", "whatido");
    } else {
      await supabase.from("site_settings").insert([{ key: "whatido", value: content }]);
    }
    toast.success("Сохранено");
  };

  const updateService = async (id: string, field: string, value: string) => {
    await supabase.from("services").update({ [field]: value }).eq("id", id);
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    toast.success("Услуга обновлена");
  };

  const getIcon = (iconName: string | null, index: number) => {
    if (iconName && iconMap[iconName]) return iconMap[iconName];
    const defaultIcons = [Briefcase, Megaphone, Bot, BarChart3];
    return defaultIcons[index % defaultIcons.length];
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-28 relative bg-card/30">
        <div className="container">
          <div className="max-w-2xl mb-12 animate-pulse">
            <div className="h-4 w-24 bg-muted rounded mb-4" />
            <div className="h-10 w-3/4 bg-muted rounded mb-4" />
            <div className="h-6 w-full bg-muted rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-48 bg-muted/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28 relative bg-card/30">
      <div className="container relative z-10">
        <FadeIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
              Экспертиза
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
              <EditableText
                id="whatido-title"
                value={sectionTitle}
                onSave={(v) => saveSectionContent("title", v)}
                as="span"
              />
            </h2>
            <EditableText
              id="whatido-subtitle"
              value={sectionSubtitle}
              onSave={(v) => saveSectionContent("subtitle", v)}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
              as="p"
              multiline
            />
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12" staggerDelay={0.1}>
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon, index);
            return (
              <StaggerItem key={service.id}>
                <PremiumCard className="group p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-border bg-background/50 hover:bg-card hover:border-primary/30 transition-colors duration-300 h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <EditableText
                    id={`service-title-${service.id}`}
                    value={service.title}
                    onSave={(v) => updateService(service.id, "title", v)}
                    className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-3"
                    as="h3"
                  />
                  <EditableText
                    id={`service-desc-${service.id}`}
                    value={service.short_description}
                    onSave={(v) => updateService(service.id, "short_description", v)}
                    className="text-sm text-muted-foreground leading-relaxed mb-4"
                    as="p"
                    multiline
                  />
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </PremiumCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="flex justify-center">
          <Link to="/admin/services">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Управление услугами
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
