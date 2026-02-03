import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { AIImageGenerator } from "@/components/admin/AIImageGenerator";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";

const serviceSchema = z.object({
  title: z.string().min(1, "Введите название"),
  slug: z.string().min(1, "Введите URL-slug"),
  short_description: z.string().min(1, "Введите краткое описание"),
});

interface FAQItem {
  question: string;
  answer: string;
}

interface ProcessStep {
  step: string;
  description: string;
}

interface ServiceForm {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  price_from: number | null;
  price_label: string;
  features: string[];
  process_steps: ProcessStep[];
  faq: FAQItem[];
  thumbnail: string;
  is_published: boolean;
  sort_order: number;
}

const defaultForm: ServiceForm = {
  title: "",
  slug: "",
  short_description: "",
  full_description: "",
  icon: "",
  price_from: null,
  price_label: "",
  features: [],
  process_steps: [],
  faq: [],
  thumbnail: "",
  is_published: true,
  sort_order: 0,
};

export default function AdminServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<ServiceForm>(defaultForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      fetchService(id);
    }
  }, [id, isEditing]);

  const fetchService = async (serviceId: string) => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .maybeSingle();

    if (error || !data) {
      toast.error("Услуга не найдена");
      navigate("/admin/services");
      return;
    }

    setForm({
      title: data.title,
      slug: data.slug,
      short_description: data.short_description,
      full_description: data.full_description || "",
      icon: data.icon || "",
      price_from: data.price_from,
      price_label: data.price_label || "",
      features: data.features || [],
      process_steps: (data.process_steps as unknown as ProcessStep[]) || [],
      faq: (data.faq as unknown as FAQItem[]) || [],
      thumbnail: data.thumbnail || "",
      is_published: data.is_published ?? true,
      sort_order: data.sort_order ?? 0,
    });
    setFeaturesText((data.features || []).join("\n"));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = serviceSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSaving(true);

    const features = featuresText.split("\n").filter((f) => f.trim());

    const serviceData = {
      title: form.title,
      slug: form.slug,
      short_description: form.short_description,
      full_description: form.full_description || null,
      icon: form.icon || null,
      price_from: form.price_from,
      price_label: form.price_label || null,
      features,
      process_steps: form.process_steps as unknown as Json,
      faq: form.faq as unknown as Json,
      thumbnail: form.thumbnail || null,
      is_published: form.is_published,
      sort_order: form.sort_order,
    };

    if (isEditing && id) {
      const { error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", id);

      if (error) {
        toast.error("Ошибка сохранения: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Услуга обновлена");
    } else {
      const { error } = await supabase.from("services").insert(serviceData);

      if (error) {
        toast.error("Ошибка создания: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Услуга создана");
    }

    navigate("/admin/services");
  };

  // Process Steps handlers
  const addProcessStep = () => {
    setForm({
      ...form,
      process_steps: [...form.process_steps, { step: "", description: "" }],
    });
  };

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    const updated = [...form.process_steps];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, process_steps: updated });
  };

  const removeProcessStep = (index: number) => {
    setForm({
      ...form,
      process_steps: form.process_steps.filter((_, i) => i !== index),
    });
  };

  // FAQ handlers
  const addFAQ = () => {
    setForm({
      ...form,
      faq: [...form.faq, { question: "", answer: "" }],
    });
  };

  const updateFAQ = (index: number, field: keyof FAQItem, value: string) => {
    const updated = [...form.faq];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, faq: updated });
  };

  const removeFAQ = (index: number) => {
    setForm({
      ...form,
      faq: form.faq.filter((_, i) => i !== index),
    });
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
        onClick={() => navigate("/admin/services")}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к списку
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Редактировать услугу" : "Новая услуга"}
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
                placeholder="Упаковка бизнеса"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL-slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="upakovka-biznesa"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Краткое описание (проблема, которую решаем) *</Label>
            <Textarea
              id="short_description"
              value={form.short_description}
              onChange={(e) => setForm({ ...form, short_description: e.target.value })}
              placeholder="Клиенты не понимают, чем вы лучше конкурентов"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description">Полное описание (решение)</Label>
            <Textarea
              id="full_description"
              value={form.full_description}
              onChange={(e) => setForm({ ...form, full_description: e.target.value })}
              placeholder="Позиционирование → понятное предложение → больше конверсий. Упаковка — фундамент всего маркетинга."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Порядок сортировки</Label>
              <Input
                id="sort_order"
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                id="is_published"
                checked={form.is_published}
                onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
              />
              <Label htmlFor="is_published">Опубликована</Label>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Цена</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_from">Цена от (₽)</Label>
              <Input
                id="price_from"
                type="number"
                value={form.price_from || ""}
                onChange={(e) => setForm({ ...form, price_from: e.target.value ? Number(e.target.value) : null })}
                placeholder="3000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_label">Или текст цены</Label>
              <Input
                id="price_label"
                value={form.price_label}
                onChange={(e) => setForm({ ...form, price_label: e.target.value })}
                placeholder="По договорённости"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Медиа</h2>
          
          <div className="space-y-2">
            <Label>Изображение</Label>
            <ImageUpload
              value={form.thumbnail}
              onChange={(url) => setForm({ ...form, thumbnail: url })}
              folder="services"
            />
          </div>

          <AIImageGenerator
            onImageGenerated={(url) => setForm({ ...form, thumbnail: url })}
            placeholder="Например: Профессиональная упаковка бизнеса"
            folder="services"
          />

          <div className="space-y-2">
            <Label htmlFor="icon">Иконка (название Lucide)</Label>
            <Input
              id="icon"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="Briefcase, Globe, Bot, Megaphone, Share2..."
            />
            <p className="text-xs text-muted-foreground">
              Доступные: Briefcase, Globe, Share2, Megaphone, Bot, Code, Brain, Layers, Zap, BarChart3, Target
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Что входит</h2>
          
          <div className="space-y-2">
            <Label htmlFor="features">Каждый пункт с новой строки</Label>
            <Textarea
              id="features"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Позиционирование&#10;Ценностное предложение&#10;Коммерческие материалы"
              rows={6}
            />
          </div>
        </div>

        {/* Process Steps */}
        <div className="premium-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Процесс работы</h2>
            <Button type="button" variant="outline" size="sm" onClick={addProcessStep}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить шаг
            </Button>
          </div>
          
          {form.process_steps.length === 0 ? (
            <p className="text-muted-foreground text-sm">Шаги процесса не добавлены</p>
          ) : (
            <div className="space-y-4">
              {form.process_steps.map((step, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Шаг {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProcessStep(index)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <Input
                    value={step.step}
                    onChange={(e) => updateProcessStep(index, "step", e.target.value)}
                    placeholder="Название шага"
                  />
                  <Textarea
                    value={step.description}
                    onChange={(e) => updateProcessStep(index, "description", e.target.value)}
                    placeholder="Описание шага"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="premium-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Частые вопросы (FAQ)</h2>
            <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить вопрос
            </Button>
          </div>
          
          {form.faq.length === 0 ? (
            <p className="text-muted-foreground text-sm">Вопросы не добавлены</p>
          ) : (
            <div className="space-y-4">
              {form.faq.map((item, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Вопрос {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFAQ(index)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <Input
                    value={item.question}
                    onChange={(e) => updateFAQ(index, "question", e.target.value)}
                    placeholder="Вопрос"
                  />
                  <Textarea
                    value={item.answer}
                    onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                    placeholder="Ответ"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
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
            onClick={() => navigate("/admin/services")}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
