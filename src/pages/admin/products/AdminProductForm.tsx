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
import { AIImageGenerator } from "@/components/admin/AIImageGenerator";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Введите название"),
  slug: z.string().min(1, "Введите URL-slug"),
  description: z.string().min(1, "Введите описание"),
});

interface Category {
  id: string;
  title: string;
}

interface ProductForm {
  title: string;
  slug: string;
  category_id: string;
  description: string;
  price_from: number | null;
  timeline: string;
  features: string[];
  thumbnail: string;
  is_published: boolean;
  sort_order: number;
}

const defaultForm: ProductForm = {
  title: "",
  slug: "",
  category_id: "",
  description: "",
  price_from: null,
  timeline: "",
  features: [],
  thumbnail: "",
  is_published: true,
  sort_order: 0,
};

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<ProductForm>(defaultForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    fetchCategories();
    if (isEditing && id) {
      fetchProduct(id);
    } else {
      setLoading(false);
    }
  }, [id, isEditing]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("ai_product_categories")
      .select("id, title")
      .order("sort_order");
    
    setCategories(data || []);
  };

  const fetchProduct = async (productId: string) => {
    const { data, error } = await supabase
      .from("ai_products")
      .select("*")
      .eq("id", productId)
      .maybeSingle();

    if (error || !data) {
      toast.error("Продукт не найден");
      navigate("/admin/ai-products");
      return;
    }

    setForm({
      title: data.title,
      slug: data.slug,
      category_id: data.category_id || "",
      description: data.description,
      price_from: data.price_from,
      timeline: data.timeline || "",
      features: data.features || [],
      thumbnail: data.thumbnail || "",
      is_published: data.is_published,
      sort_order: data.sort_order,
    });
    setFeaturesText((data.features || []).join("\n"));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = productSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSaving(true);

    const features = featuresText.split("\n").filter((f) => f.trim());

    const productData = {
      ...form,
      features,
      category_id: form.category_id || null,
      thumbnail: form.thumbnail || null,
      timeline: form.timeline || null,
    };

    if (isEditing && id) {
      const { error } = await supabase
        .from("ai_products")
        .update(productData)
        .eq("id", id);

      if (error) {
        toast.error("Ошибка сохранения: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Продукт обновлён");
    } else {
      const { error } = await supabase.from("ai_products").insert(productData);

      if (error) {
        toast.error("Ошибка создания: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Продукт создан");
    }

    navigate("/admin/ai-products");
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
        onClick={() => navigate("/admin/ai-products")}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к списку
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Редактировать продукт" : "Новый AI-продукт"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Основная информация</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="AI Поддержка 24/7"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL-slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="ai-support-247"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Категория</Label>
            <Select 
              value={form.category_id} 
              onValueChange={(value) => setForm({ ...form, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Описание продукта..."
              rows={4}
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

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Цена и сроки</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_from">Цена от (₽)</Label>
              <Input
                id="price_from"
                type="number"
                value={form.price_from || ""}
                onChange={(e) => setForm({ ...form, price_from: e.target.value ? Number(e.target.value) : null })}
                placeholder="15000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Сроки</Label>
              <Input
                id="timeline"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                placeholder="от 3 дней"
              />
            </div>
          </div>
        </div>

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Медиа</h2>
          
          <div className="space-y-2">
            <Label>Изображение</Label>
            <ImageUpload
              value={form.thumbnail}
              onChange={(url) => setForm({ ...form, thumbnail: url })}
              folder="products"
            />
          </div>

          <AIImageGenerator
            onImageGenerated={(url) => setForm({ ...form, thumbnail: url })}
            placeholder="Например: AI-бот для автоматизации поддержки клиентов"
            folder="products"
          />
        </div>

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Особенности</h2>
          
          <div className="space-y-2">
            <Label htmlFor="features">Что входит (каждый пункт с новой строки)</Label>
            <Textarea
              id="features"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Обработка обращений 24/7&#10;Интеграция с CRM&#10;..."
              rows={6}
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
            onClick={() => navigate("/admin/ai-products")}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
