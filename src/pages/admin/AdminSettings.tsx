import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import type { Json } from "@/integrations/supabase/types";

interface ContactSettings {
  email: string;
  telegram: string;
  instagram: string;
  youtube: string;
}

interface FooterSettings {
  copyright: string;
  tagline: string;
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [contact, setContact] = useState<ContactSettings>({
    email: "",
    telegram: "",
    instagram: "",
    youtube: "",
  });
  
  const [footer, setFooter] = useState<FooterSettings>({
    copyright: "",
    tagline: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const [contactRes, footerRes] = await Promise.all([
      supabase.from("site_settings").select("value").eq("key", "contact").maybeSingle(),
      supabase.from("site_settings").select("value").eq("key", "footer").maybeSingle(),
    ]);

    if (contactRes.data?.value && typeof contactRes.data.value === "object" && !Array.isArray(contactRes.data.value)) {
      const val = contactRes.data.value as Record<string, unknown>;
      setContact((prev) => ({ 
        ...prev, 
        email: String(val.email || ""),
        telegram: String(val.telegram || ""),
        instagram: String(val.instagram || ""),
        youtube: String(val.youtube || ""),
      }));
    }
    if (footerRes.data?.value && typeof footerRes.data.value === "object" && !Array.isArray(footerRes.data.value)) {
      const val = footerRes.data.value as Record<string, unknown>;
      setFooter((prev) => ({ 
        ...prev, 
        copyright: String(val.copyright || ""),
        tagline: String(val.tagline || ""),
      }));
    }
    
    setLoading(false);
  };

  const saveSettings = async (key: string, value: unknown) => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from("site_settings")
        .select("id")
        .eq("key", key)
        .maybeSingle();

      if (existing) {
        await supabase.from("site_settings").update({ value: value as Json }).eq("key", key);
      } else {
        await supabase.from("site_settings").insert([{ key, value: value as Json }]);
      }
      
      toast.success("Настройки сохранены");
    } catch (error) {
      toast.error("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Настройки сайта</h1>
          <p className="text-sm text-muted-foreground">Контакты и глобальные параметры</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Contact Settings */}
        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h2 className="text-lg font-display font-semibold mb-4">Контакты</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="email@example.com"
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
            <Button
              onClick={() => saveSettings("contact", contact)}
              disabled={saving}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Сохранить контакты
            </Button>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h2 className="text-lg font-display font-semibold mb-4">Футер</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Слоган</Label>
              <Textarea
                value={footer.tagline}
                onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
                placeholder="Маркетолог. Помогаю бизнесу расти системно."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Copyright</Label>
              <Input
                value={footer.copyright}
                onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                placeholder="© 2024 Aleksey Taranukha. Все права защищены."
              />
            </div>
            <Button
              onClick={() => saveSettings("footer", footer)}
              disabled={saving}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Сохранить настройки футера
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
