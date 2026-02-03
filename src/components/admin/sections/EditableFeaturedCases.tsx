import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { EditableText } from "@/components/admin/EditableText";
import { EditableImage } from "@/components/admin/EditableImage";
import { toast } from "sonner";

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category_label: string;
  short_description: string;
  thumbnail: string | null;
}

export function EditableFeaturedCases() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("Избранные кейсы");
  const [sectionSubtitle, setSectionSubtitle] = useState("Реальные проекты с измеримыми результатами");

  useEffect(() => {
    fetchCases();
    loadSectionContent();
  }, []);

  const fetchCases = async () => {
    const { data, error } = await supabase
      .from("cases")
      .select("id, slug, title, category_label, short_description, thumbnail")
      .eq("is_published", true)
      .order("sort_order")
      .limit(3);

    if (!error && data) setCases(data);
    setLoading(false);
  };

  const loadSectionContent = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "featured_cases").maybeSingle();
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

    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "featured_cases").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: content }).eq("key", "featured_cases");
    } else {
      await supabase.from("site_settings").insert([{ key: "featured_cases", value: content }]);
    }
    toast.success("Сохранено");
  };

  const updateCase = async (id: string, field: string, value: string) => {
    await supabase.from("cases").update({ [field]: value }).eq("id", id);
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    toast.success("Кейс обновлён");
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-28 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-10 animate-pulse">
            <div>
              <div className="h-8 w-48 bg-muted rounded mb-3" />
              <div className="h-5 w-64 bg-muted rounded" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-64 bg-muted/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28 bg-card/20 border-y border-border/30">
      <div className="container">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <EditableText
                id="cases-title"
                value={sectionTitle}
                onSave={(v) => saveSectionContent("title", v)}
                className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4"
                as="h2"
              />
              <EditableText
                id="cases-subtitle"
                value={sectionSubtitle}
                onSave={(v) => saveSectionContent("subtitle", v)}
                className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed"
                as="p"
              />
            </div>
            <Link to="/admin/cases">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Управление кейсами
              </Button>
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.15}>
          {cases.map((caseItem) => (
            <StaggerItem key={caseItem.id}>
              <PremiumCard className="group block premium-card overflow-hidden cursor-pointer">
                <EditableImage
                  id={`case-thumb-${caseItem.id}`}
                  src={caseItem.thumbnail}
                  alt={caseItem.title}
                  onSave={(url) => updateCase(caseItem.id, "thumbnail", url)}
                  aspectRatio="4/3"
                />

                <div className="p-5 sm:p-7">
                  <EditableText
                    id={`case-category-${caseItem.id}`}
                    value={caseItem.category_label}
                    onSave={(v) => updateCase(caseItem.id, "category_label", v)}
                    className="text-xs text-primary font-medium uppercase tracking-wider mb-2 sm:mb-3"
                    as="div"
                  />
                  <EditableText
                    id={`case-title-${caseItem.id}`}
                    value={caseItem.title}
                    onSave={(v) => updateCase(caseItem.id, "title", v)}
                    className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3"
                    as="h3"
                  />
                  <EditableText
                    id={`case-desc-${caseItem.id}`}
                    value={caseItem.short_description}
                    onSave={(v) => updateCase(caseItem.id, "short_description", v)}
                    className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2"
                    as="p"
                    multiline
                  />
                </div>
              </PremiumCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
