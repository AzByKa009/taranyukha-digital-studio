import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import { EditableSection } from "@/components/admin/EditableSection";
import { toast } from "sonner";

import { Footer } from "@/components/layout/Footer";
import { StructurePanel } from "@/components/admin/StructurePanel";

// Lazy load editable section components so the admin homepage doesn't load everything at once
const EditableHeroSection = lazy(() => import("@/components/admin/sections/EditableHeroSection").then((m) => ({ default: m.EditableHeroSection })));
const EditableWhatIDo = lazy(() => import("@/components/admin/sections/EditableWhatIDo").then((m) => ({ default: m.EditableWhatIDo })));
const EditableApproachSection = lazy(() => import("@/components/admin/sections/EditableApproachSection").then((m) => ({ default: m.EditableApproachSection })));
const EditableFeaturedCases = lazy(() => import("@/components/admin/sections/EditableFeaturedCases").then((m) => ({ default: m.EditableFeaturedCases })));
const EditableThinkingSection = lazy(() => import("@/components/admin/sections/EditableThinkingSection").then((m) => ({ default: m.EditableThinkingSection })));
const EditableWhyTrustMe = lazy(() => import("@/components/admin/sections/EditableWhyTrustMe").then((m) => ({ default: m.EditableWhyTrustMe })));
const EditableCTASection = lazy(() => import("@/components/admin/sections/EditableCTASection").then((m) => ({ default: m.EditableCTASection })));
const EditableContactSection = lazy(() => import("@/components/admin/sections/EditableContactSection").then((m) => ({ default: m.EditableContactSection })));

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
  const [activeTab, setActiveTab] = useState<string>("hero");
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

  const visibleSections = useMemo(() => {
    return defaultSections.filter((s) => sectionVisibility[s.id] !== false);
  }, [sectionVisibility]);

  useEffect(() => {
    // Ensure active tab always points to an existing visible section
    if (sectionVisibility[activeTab] === false) {
      const firstVisible = visibleSections[0]?.id;
      if (firstVisible) setActiveTab(firstVisible);
    }
  }, [activeTab, sectionVisibility, visibleSections]);

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

  const renderActiveSection = () => {
    switch (activeTab) {
      case "hero":
        return <EditableHeroSection />;
      case "whatido":
        return <EditableWhatIDo />;
      case "approach":
        return <EditableApproachSection />;
      case "cases":
        return <EditableFeaturedCases />;
      case "thinking":
        return <EditableThinkingSection />;
      case "trust":
        return <EditableWhyTrustMe />;
      case "cta":
        return <EditableCTASection />;
      case "contact":
        return <EditableContactSection />;
      default:
        return null;
    }
  };

  const activeMeta = defaultSections.find((s) => s.id === activeTab);

  return (
    <div className="min-h-screen">

      {/* Tab bar: loads only the selected section (big perf win) */}
      <div className="sticky top-14 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {defaultSections.map((s) => {
              const isHidden = sectionVisibility[s.id] === false;
              const isActive = activeTab === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (isHidden) {
                      toast.info("Секция скрыта в режиме структуры");
                      return;
                    }
                    setActiveTab(s.id);
                  }}
                  className={
                    "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors " +
                    (isHidden
                      ? "text-muted-foreground/60 cursor-not-allowed"
                      : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground")
                  }
                  aria-current={isActive ? "page" : undefined}
                  disabled={isHidden}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Only one section is mounted at a time */}
      {activeMeta && sectionVisibility[activeMeta.id] !== false && (
        <EditableSection
          id={activeMeta.id}
          name={activeMeta.name}
          isVisible={sectionVisibility[activeMeta.id]}
          onVisibilityChange={(v) => handleVisibilityChange(activeMeta.id, v)}
        >
          <Suspense
            fallback={
              <div className="container py-16">
                <div className="h-6 w-48 rounded bg-muted animate-pulse" />
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                  <div className="h-4 w-11/12 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-9/12 rounded bg-muted animate-pulse" />
                </div>
              </div>
            }
          >
            {renderActiveSection()}
          </Suspense>
        </EditableSection>
      )}

      <Footer />
    </div>
  );
}
