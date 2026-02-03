import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Mail, MessageCircle } from "lucide-react";
import { FadeIn, PremiumCard } from "@/components/motion";
import { EditableText } from "@/components/admin/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface ContactContent {
  title?: string;
  titleAccent?: string;
  subtitle?: string;
}

export function EditableContactSection() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("Обсудим ");
  const [titleAccent, setTitleAccent] = useState("ваш проект?");
  const [subtitle, setSubtitle] = useState("Расскажите о задаче — отвечу в течение дня и предложу решение.");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "contact_section").maybeSingle();
    if (data?.value && typeof data.value === "object") {
      const v = data.value as ContactContent;
      if (v.title) setTitle(v.title);
      if (v.titleAccent) setTitleAccent(v.titleAccent);
      if (v.subtitle) setSubtitle(v.subtitle);
    }
  };

  const saveContent = async (updates: Partial<ContactContent>) => {
    const content = { title, titleAccent, subtitle, ...updates };
    const { data: existing } = await supabase.from("site_settings").select("id").eq("key", "contact_section").maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: content }).eq("key", "contact_section");
    } else {
      await supabase.from("site_settings").insert([{ key: "contact_section", value: content }]);
    }
    queryClient.invalidateQueries({ queryKey: ["site_settings", "contact_section"] });
    toast.success("Сохранено");
  };

  const socialLinks = [
    { name: "Telegram", href: "#", icon: MessageCircle },
    { name: "Email", href: "#", icon: Mail },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <FadeIn direction="right">
            <div>
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
                Контакты
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                <EditableText
                  id="contact-title"
                  value={title}
                  onSave={async (v) => { setTitle(v); await saveContent({ title: v }); }}
                  as="span"
                />
                <EditableText
                  id="contact-title-accent"
                  value={titleAccent}
                  onSave={async (v) => { setTitleAccent(v); await saveContent({ titleAccent: v }); }}
                  className="text-gradient"
                  as="span"
                />
              </h2>
              <EditableText
                id="contact-subtitle"
                value={subtitle}
                onSave={async (v) => { setSubtitle(v); await saveContent({ subtitle: v }); }}
                className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed"
                as="p"
                multiline
              />

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors text-sm sm:text-base"
                  >
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <PremiumCard className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">Имя</label>
                    <Input placeholder="Как вас зовут?" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">Email или Telegram</label>
                    <Input placeholder="@username или email" className="bg-background/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Задача</label>
                  <Textarea placeholder="Что нужно сделать?" rows={4} className="bg-background/50 resize-none" />
                </div>

                <Button type="button" variant="hero" className="w-full">
                  Отправить
                  <Send className="h-4 w-4" />
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Отвечу в течение дня
                </p>
              </form>
            </PremiumCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
