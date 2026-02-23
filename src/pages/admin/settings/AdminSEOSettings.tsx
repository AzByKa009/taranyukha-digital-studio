import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Loader2, Save, Search, Eye, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SEOSetting {
  id: string;
  page_key: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
}

const pageLabels: Record<string, string> = {
  home: "Главная",
  services: "Услуги",
  cases: "Кейсы",
  "ai-products": "AI-продукты",
  about: "Обо мне",
  contacts: "Контакты",
  blog: "Блог",
  faq: "FAQ",
};

const protectedPages = new Set(Object.keys(pageLabels));

export default function AdminSEOSettings() {
  const [settings, setSettings] = useState<SEOSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("seo_settings")
      .select("*")
      .order("page_key");

    if (error) {
      toast.error("Ошибка загрузки настроек SEO");
      return;
    }

    setSettings(data || []);
    setLoading(false);
  };

  const updateSetting = (pageKey: string, field: keyof SEOSetting, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.page_key === pageKey ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async (setting: SEOSetting) => {
    setSaving(setting.page_key);

    const { error } = await supabase
      .from("seo_settings")
      .upsert(
        {
          page_key: setting.page_key,
          title: setting.title,
          description: setting.description,
          keywords: setting.keywords,
          og_title: setting.og_title,
          og_description: setting.og_description,
          og_image: setting.og_image,
        },
        { onConflict: "page_key" }
      );

    if (error) {
      toast.error("Ошибка сохранения: " + error.message);
    } else {
      toast.success(`SEO для "${pageLabels[setting.page_key] || setting.page_key}" сохранено`);
    }

    setSaving(null);
  };

  const handleAddPage = async () => {
    const pageKey = prompt("Введите ключ страницы (например: new-page):");
    if (!pageKey) return;

    const { error } = await supabase.from("seo_settings").insert({
      page_key: pageKey,
      title: "",
      description: "",
    });

    if (error) {
      toast.error("Ошибка создания: " + error.message);
      return;
    }

    toast.success("Страница добавлена");
    fetchSettings();
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
          <h1 className="text-3xl font-bold">SEO настройки</h1>
          <p className="text-muted-foreground mt-1">
            Meta-теги и Open Graph для каждой страницы
          </p>
        </div>
        <Button onClick={handleAddPage} variant="outline" className="gap-2">
          <Search className="w-4 h-4" />
          Добавить страницу
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {settings.map((setting) => (
          <AccordionItem
            key={setting.page_key}
            value={setting.page_key}
            className="premium-card px-6"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-primary" />
                <span className="font-semibold">
                  {pageLabels[setting.page_key] || setting.page_key}
                </span>
                <span className="text-xs text-muted-foreground">/{setting.page_key}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              {/* SERP Preview */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Превью в поисковой выдаче</span>
                </div>
                <div className="font-sans">
                  <div className="text-[13px] text-muted-foreground truncate">
                    taranukha.dev › {setting.page_key === "home" ? "" : setting.page_key}
                  </div>
                  <div className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] leading-tight truncate cursor-pointer hover:underline">
                    {setting.title || "Заголовок не задан"}
                  </div>
                  <div className="text-[13px] text-muted-foreground line-clamp-2 leading-snug mt-0.5">
                    {setting.description || "Описание не задано. Заполните поле Description, чтобы увидеть превью."}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title (до 60 символов)</Label>
                <Input
                  value={setting.title || ""}
                  onChange={(e) => updateSetting(setting.page_key, "title", e.target.value)}
                  placeholder="Заголовок страницы"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {(setting.title || "").length}/60
                </p>
              </div>

              <div className="space-y-2">
                <Label>Description (до 160 символов)</Label>
                <Textarea
                  value={setting.description || ""}
                  onChange={(e) => updateSetting(setting.page_key, "description", e.target.value)}
                  placeholder="Описание страницы для поисковиков"
                  rows={2}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {(setting.description || "").length}/160
                </p>
              </div>

              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  value={setting.keywords || ""}
                  onChange={(e) => updateSetting(setting.page_key, "keywords", e.target.value)}
                  placeholder="ключевое слово, другое слово"
                />
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <h4 className="font-medium mb-3">Open Graph (для соцсетей)</h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>OG Title</Label>
                    <Input
                      value={setting.og_title || ""}
                      onChange={(e) => updateSetting(setting.page_key, "og_title", e.target.value)}
                      placeholder="Заголовок для соцсетей"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Description</Label>
                    <Textarea
                      value={setting.og_description || ""}
                      onChange={(e) =>
                        updateSetting(setting.page_key, "og_description", e.target.value)
                      }
                      placeholder="Описание для соцсетей"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Image (1200x630)</Label>
                    <ImageUpload
                      value={setting.og_image || ""}
                      onChange={(url) => updateSetting(setting.page_key, "og_image", url)}
                      folder="seo"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button
                  onClick={() => handleSave(setting)}
                  disabled={saving === setting.page_key}
                  className="gap-2"
                >
                  {saving === setting.page_key ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Сохранить
                </Button>
                {!protectedPages.has(setting.page_key) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={async () => {
                      if (!confirm(`Удалить SEO-настройки для «${setting.page_key}»?`)) return;
                      const { error } = await supabase
                        .from("seo_settings")
                        .delete()
                        .eq("id", setting.id);
                      if (error) {
                        toast.error("Ошибка удаления: " + error.message);
                      } else {
                        toast.success("Удалено");
                        fetchSettings();
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Удалить
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
