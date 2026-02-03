import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import { EditableSection } from "@/components/admin/EditableSection";
import { toast } from "sonner";

// Import editable section components
import { EditableHeroSection } from "@/components/admin/sections/EditableHeroSection";
import { EditableWhatIDo } from "@/components/admin/sections/EditableWhatIDo";
import { EditableApproachSection } from "@/components/admin/sections/EditableApproachSection";
import { EditableFeaturedCases } from "@/components/admin/sections/EditableFeaturedCases";
import { EditableThinkingSection } from "@/components/admin/sections/EditableThinkingSection";
import { EditableWhyTrustMe } from "@/components/admin/sections/EditableWhyTrustMe";
import { EditableCTASection } from "@/components/admin/sections/EditableCTASection";
import { EditableContactSection } from "@/components/admin/sections/EditableContactSection";
import { Footer } from "@/components/layout/Footer";
import { StructurePanel } from "@/components/admin/StructurePanel";

interface SectionVisibility {
  [key: string]: boolean;
}

const defaultSections = [
  { id: "hero", name: "Hero" },
  { id: "whatido", name: "Что я делаю" },
  { id: "approach", name: "Подход" },
  { id: "cases", name: "Кейсы" },
  { id: "thinking", name: "Мышление" },
  { id: "trust", name: "Доверие" },
  { id: "cta", name: "Призыв к действию" },
  { id: "contact", name: "Контакты" },
];

export default function AdminHomepage() {
  const { mode } = useAdmin();
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    hero: true,
    whatido: true,
    approach: true,
    cases: true,
    thinking: true,
    trust: true,
    cta: true,
    contact: true,
  });

  useEffect(() => {
    loadSectionVisibility();
  }, []);

  const loadSectionVisibility = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "homepage_sections")
        .maybeSingle();

      if (data?.value && typeof data.value === "object") {
        setSectionVisibility((prev) => ({ ...prev, ...(data.value as SectionVisibility) }));
      }
    } catch (error) {
      console.error("Error loading section visibility:", error);
    }
  };

  const handleVisibilityChange = async (sectionId: string, visible: boolean) => {
    const newVisibility = { ...sectionVisibility, [sectionId]: visible };
    setSectionVisibility(newVisibility);

    try {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", "homepage_sections")
        .maybeSingle();

      if (existing) {
        await supabase
          .from("site_settings")
          .update({ value: newVisibility })
          .eq("key", "homepage_sections");
      } else {
        await supabase
          .from("site_settings")
          .insert([{ key: "homepage_sections", value: newVisibility }]);
      }
      
      toast.success(`Секция ${visible ? "показана" : "скрыта"}`);
    } catch (error) {
      console.error("Error saving visibility:", error);
      toast.error("Ошибка сохранения");
    }
  };

  if (mode === "structure") {
    return (
      <StructurePanel
        sections={defaultSections}
        visibility={sectionVisibility}
        onVisibilityChange={handleVisibilityChange}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {sectionVisibility.hero && (
        <EditableSection
          id="hero"
          name="Hero"
          isVisible={sectionVisibility.hero}
          onVisibilityChange={(v) => handleVisibilityChange("hero", v)}
        >
          <EditableHeroSection />
        </EditableSection>
      )}

      {sectionVisibility.whatido && (
        <EditableSection
          id="whatido"
          name="Что я делаю"
          isVisible={sectionVisibility.whatido}
          onVisibilityChange={(v) => handleVisibilityChange("whatido", v)}
        >
          <EditableWhatIDo />
        </EditableSection>
      )}

      {sectionVisibility.approach && (
        <EditableSection
          id="approach"
          name="Подход"
          isVisible={sectionVisibility.approach}
          onVisibilityChange={(v) => handleVisibilityChange("approach", v)}
        >
          <EditableApproachSection />
        </EditableSection>
      )}

      {sectionVisibility.cases && (
        <EditableSection
          id="cases"
          name="Кейсы"
          isVisible={sectionVisibility.cases}
          onVisibilityChange={(v) => handleVisibilityChange("cases", v)}
        >
          <EditableFeaturedCases />
        </EditableSection>
      )}

      {sectionVisibility.thinking && (
        <EditableSection
          id="thinking"
          name="Мышление"
          isVisible={sectionVisibility.thinking}
          onVisibilityChange={(v) => handleVisibilityChange("thinking", v)}
        >
          <EditableThinkingSection />
        </EditableSection>
      )}

      {sectionVisibility.trust && (
        <EditableSection
          id="trust"
          name="Доверие"
          isVisible={sectionVisibility.trust}
          onVisibilityChange={(v) => handleVisibilityChange("trust", v)}
        >
          <EditableWhyTrustMe />
        </EditableSection>
      )}

      {sectionVisibility.cta && (
        <EditableSection
          id="cta"
          name="Призыв к действию"
          isVisible={sectionVisibility.cta}
          onVisibilityChange={(v) => handleVisibilityChange("cta", v)}
        >
          <EditableCTASection />
        </EditableSection>
      )}

      {sectionVisibility.contact && (
        <EditableSection
          id="contact"
          name="Контакты"
          isVisible={sectionVisibility.contact}
          onVisibilityChange={(v) => handleVisibilityChange("contact", v)}
        >
          <EditableContactSection />
        </EditableSection>
      )}

      <Footer />
    </div>
  );
}
