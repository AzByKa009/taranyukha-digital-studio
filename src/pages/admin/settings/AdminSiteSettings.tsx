import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface ContactSettings {
  email: string;
  telegram: string;
  instagram: string;
  youtube: string;
}

interface HeroSettings {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  cta_link: string;
}

interface FooterSettings {
  copyright: string;
  tagline: string;
}

export default function AdminSiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [contact, setContact] = useState<ContactSettings>({
    email: "",
    telegram: "",
    instagram: "",
    youtube: "",
  });

  const [hero, setHero] = useState<HeroSettings>({
    title: "",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_link: "",
  });

  const [footer, setFooter] = useState<FooterSettings>({
    copyright: "",
    tagline: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      toast.error("Ошибка загрузки настроек");
      return;
    }

    data?.forEach((item) => {
      const value = item.value as Record<string, unknown>;
      if (item.key === "contact") setContact(value as unknown as ContactSettings);
      if (item.key === "hero") setHero(value as unknown as HeroSettings);
      if (item.key === "footer") setFooter(value as unknown as FooterSettings);
    });

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const updates = [
      { key: "contact", value: contact },
      { key: "hero", value: hero },
      { key: "footer", value: footer },
    ];

    for (const update of updates) {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", update.key)
        .maybeSingle();

      let error;
      if (existing) {
        const result = await supabase
          .from("site_settings")
          .update({ value: update.value as unknown as Json })
          .eq("key", update.key);
        error = result.error;
      } else {
        const result = await supabase
          .from("site_settings")
          .insert([{ key: update.key, value: update.value as unknown as Json }]);
        error = result.error;
      }

      if (error) {
        toast.error(`Ошибка сохранения: ${error.message}`);
        setSaving(false);
        return;
      }
    }

    toast.success("Настройки сохранены");
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Настройки сайта</h1>
          <p className="text-muted-foreground mt-1">
            Глобальные настройки контента
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Сохранить всё
        </Button>
      </div>

      <div className="space-y-8">
        <div className="premium-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Главный экран (Hero)</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Заголовок</Label>
              <Input
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                placeholder="AI продюсер"
              />
            </div>
            <div className="space-y-2">
              <Label>Подзаголовок</Label>
              <Input
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                placeholder="Aleksey Taranukha"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Описание</Label>
            <Textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Текст кнопки CTA</Label>
              <Input
                value={hero.cta_text}
                onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
                placeholder="Обсудить проект"
              />
            </div>
            <div className="space-y-2">
              <Label>Ссылка CTA</Label>
              <Input
                value={hero.cta_link}
                onChange={(e) => setHero({ ...hero, cta_link: e.target.value })}
                placeholder="/contacts"
              />
            </div>
          </div>
        </div>

        <div className="premium-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Контакты</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="hello@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Telegram</Label>
              <Input
                value={contact.telegram}
                onChange={(e) => setContact({ ...contact, telegram: e.target.value })}
                placeholder="https://t.me/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input
                value={contact.instagram}
                onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
                placeholder="https://instagram.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label>YouTube</Label>
              <Input
                value={contact.youtube}
                onChange={(e) => setContact({ ...contact, youtube: e.target.value })}
                placeholder="https://youtube.com/@channel"
              />
            </div>
          </div>
        </div>

        <div className="premium-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Подвал (Footer)</h2>

          <div className="space-y-2">
            <Label>Копирайт</Label>
            <Input
              value={footer.copyright}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
              placeholder="© 2024 Name. Все права защищены."
            />
          </div>

          <div className="space-y-2">
            <Label>Слоган</Label>
            <Input
              value={footer.tagline}
              onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
              placeholder="AI продюсер • Вайб кодинг"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
