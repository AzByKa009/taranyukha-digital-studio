import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { z } from "zod";

const categories = [
  { value: "montage", label: "Монтаж" },
  { value: "producing", label: "Продюсирование" },
  { value: "ai-video", label: "AI-видео" },
  { value: "ai-products", label: "AI-продукты" },
  { value: "vibe-coding", label: "Vibe coding" },
];

const caseSchema = z.object({
  title: z.string().min(1, "Введите название"),
  slug: z.string().min(1, "Введите URL-slug"),
  category: z.string().min(1, "Выберите категорию"),
  short_description: z.string().min(1, "Введите краткое описание"),
  year: z.string().min(4, "Введите год"),
});

interface CaseForm {
  title: string;
  slug: string;
  category: string;
  category_label: string;
  short_description: string;
  year: string;
  thumbnail: string;
  video_preview: string;
  challenge: string;
  solution: string;
  result: string;
  deliverables: string[];
  tags: string[];
  is_published: boolean;
  sort_order: number;
}

const defaultForm: CaseForm = {
  title: "",
  slug: "",
  category: "",
  category_label: "",
  short_description: "",
  year: new Date().getFullYear().toString(),
  thumbnail: "",
  video_preview: "",
  challenge: "",
  solution: "",
  result: "",
  deliverables: [],
  tags: [],
  is_published: true,
  sort_order: 0,
};

export default function AdminCaseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<CaseForm>(defaultForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [deliverablesText, setDeliverablesText] = useState("");
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      fetchCase(id);
    }
  }, [id, isEditing]);

  const fetchCase = async (caseId: string) => {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("id", caseId)
      .maybeSingle();

    if (error || !data) {
      toast.error("Кейс не найден");
      navigate("/admin/cases");
      return;
    }

    setForm({
      title: data.title,
      slug: data.slug,
      category: data.category,
      category_label: data.category_label,
      short_description: data.short_description,
      year: data.year,
      thumbnail: data.thumbnail || "",
      video_preview: data.video_preview || "",
      challenge: data.challenge || "",
      solution: data.solution || "",
      result: data.result || "",
      deliverables: data.deliverables || [],
      tags: data.tags || [],
      is_published: data.is_published,
      sort_order: data.sort_order,
    });
    setDeliverablesText((data.deliverables || []).join("\n"));
    setTagsText((data.tags || []).join(", "));
    setLoading(false);
  };

  const handleCategoryChange = (value: string) => {
    const category = categories.find((c) => c.value === value);
    setForm({
      ...form,
      category: value,
      category_label: category?.label || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = caseSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSaving(true);

    const deliverables = deliverablesText.split("\n").filter((d) => d.trim());
    const tags = tagsText.split(",").map((t) => t.trim()).filter(Boolean);

    const caseData = {
      ...form,
      deliverables,
      tags,
      thumbnail: form.thumbnail || null,
      video_preview: form.video_preview || null,
    };

    if (isEditing && id) {
      const { error } = await supabase
        .from("cases")
        .update(caseData)
        .eq("id", id);

      if (error) {
        toast.error("Ошибка сохранения: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Кейс обновлён");
    } else {
      const { error } = await supabase.from("cases").insert(caseData);

      if (error) {
        toast.error("Ошибка создания: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Кейс создан");
    }

    navigate("/admin/cases");
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
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate("/admin/cases")}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к списку
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Редактировать кейс" : "Новый кейс"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Основная информация</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="AI-ассистент для финтех-стартапа"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL-slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="ai-assistant-fintech"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Категория *</Label>
              <Select value={form.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Год *</Label>
              <Input
                id="year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2024"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Краткое описание *</Label>
            <Textarea
              id="short_description"
              value={form.short_description}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              placeholder="Чат-бот для автоматизации поддержки"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="is_published"
              checked={form.is_published}
              onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
            />
            <Label htmlFor="is_published">Опубликован</Label>
          </div>
        </div>

        {/* Media */}
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Медиа</h2>
          
          <div className="space-y-2">
            <Label>Превью-изображение</Label>
            <ImageUpload
              value={form.thumbnail}
              onChange={(url) => setForm({ ...form, thumbnail: url })}
              folder="cases"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_preview">URL видео-превью</Label>
            <Input
              id="video_preview"
              value={form.video_preview}
              onChange={(e) => setForm({ ...form, video_preview: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Case Details */}
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Детали кейса</h2>
          
          <div className="space-y-2">
            <Label htmlFor="challenge">Задача</Label>
            <Textarea
              id="challenge"
              value={form.challenge}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              placeholder="Опишите проблему клиента..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Решение</Label>
            <Textarea
              id="solution"
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              placeholder="Что было сделано..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="result">Результат</Label>
            <Textarea
              id="result"
              value={form.result}
              onChange={(e) => setForm({ ...form, result: e.target.value })}
              placeholder="Какой результат получен..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliverables">Что было сделано (каждый пункт с новой строки)</Label>
            <Textarea
              id="deliverables"
              value={deliverablesText}
              onChange={(e) => setDeliverablesText(e.target.value)}
              placeholder="Архитектура AI-системы&#10;Интеграция с GPT-4 API&#10;..."
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="NLP, Python, GPT-4, API Integration"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEditing ? "Сохранить" : "Создать"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/cases")}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
