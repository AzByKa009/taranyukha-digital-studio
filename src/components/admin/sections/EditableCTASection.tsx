import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
import { InlineLeadForm } from "@/components/conversion/InlineLeadForm";
import { EditableText } from "@/components/admin/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface CTAContent {
  title?: string;
  subtitle?: string;
  response_note?: string;
}

export function EditableCTASection() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("С чего начать?");
  const [subtitle, setSubtitle] = useState("Расскажите о задаче — разберёмся вместе, что нужно и как это сделать.");
  const [responseNote, setResponseNote] = useState("Отвечу в течение дня");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "cta").maybeSingle();
    if (data?.value && typeof data.value === "object") {
      const v = data.value as CTAContent;
      if (v.title) setTitle(v.title);
      if (v.subtitle) setSubtitle(v.subtitle);
      if (v.response_note) setResponseNote(v.response_note);
    }
  };

  const saveContent = async (updates: Partial<CTAContent>) => {
    const content = { title, subtitle, response_note: responseNote, ...updates };
    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "cta").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: content }).eq("key", "cta");
    } else {
      await supabase.from("site_settings").insert([{ key: "cta", value: content }]);
    }
    queryClient.invalidateQueries({ queryKey: ["site_settings", "cta"] });
    toast.success("Сохранено");
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-glow opacity-40"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-card/30" />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                <EditableText
                  id="cta-title"
                  value={title}
                  onSave={async (v) => { setTitle(v); await saveContent({ title: v }); }}
                  as="span"
                />
              </h2>
              <EditableText
                id="cta-subtitle"
                value={subtitle}
                onSave={async (v) => { setSubtitle(v); await saveContent({ subtitle: v }); }}
                className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
                as="p"
                multiline
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InlineLeadForm variant="compact" className="max-w-xl mx-auto" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="text-center mt-6">
              <EditableText
                id="cta-response-note"
                value={responseNote}
                onSave={async (v) => { setResponseNote(v); await saveContent({ response_note: v }); }}
                className="text-xs sm:text-sm text-muted-foreground"
                as="p"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
