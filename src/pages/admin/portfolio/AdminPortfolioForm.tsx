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

const categories = [
  { value: "montage", label: "Монтаж" },
  { value: "producing", label: "Продюсирование" },
  { value: "ai-video", label: "AI-видео" },
  { value: "ai-products", label: "AI-продукты" },
  { value: "vibe-coding", label: "Vibe coding" },
];

interface VideoForm {
  title: string;
  description: string;
  full_description: string;
  video_url: string;
  thumbnail_url: string;
  stats: string;
  review: string;
  category: string;
  category_label: string;
  sort_order: number;
  is_published: boolean;
}

const defaultForm: VideoForm = {
  title: "",
  description: "",
  full_description: "",
  video_url: "",
  thumbnail_url: "",
  stats: "",
  review: "",
  category: "",
  category_label: "",
  sort_order: 0,
  is_published: true,
};

export default function AdminPortfolioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<VideoForm>(defaultForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchVideo(id);
    }
  }, [id, isEditing]);

  const fetchVideo = async (videoId: string) => {
    const { data, error } = await supabase
      .from("portfolio_videos")
      .select("*")
      .eq("id", videoId)
      .maybeSingle();

    if (error || !data) {
      toast.error("Видео не найдено");
      navigate("/admin/portfolio");
      return;
    }

    setForm({
      title: data.title,
      description: data.description || "",
      full_description: data.full_description || "",
      video_url: data.video_url,
      thumbnail_url: data.thumbnail_url || "",
      stats: data.stats || "",
      review: data.review || "",
      category: data.category,
      category_label: data.category_label,
      sort_order: data.sort_order,
      is_published: data.is_published,
    });
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

    if (!form.title || !form.video_url || !form.category) {
      toast.error("Заполните обязательные поля");
      return;
    }

    setSaving(true);

    const videoData = {
      ...form,
      thumbnail_url: form.thumbnail_url || null,
      description: form.description || null,
      full_description: form.full_description || null,
      stats: form.stats || null,
      review: form.review || null,
    };

    if (isEditing && id) {
      const { error } = await supabase
        .from("portfolio_videos")
        .update(videoData)
        .eq("id", id);

      if (error) {
        toast.error("Ошибка сохранения: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Видео обновлено");
    } else {
      const { error } = await supabase.from("portfolio_videos").insert(videoData);

      if (error) {
        toast.error("Ошибка создания: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Видео добавлено");
    }

    navigate("/admin/portfolio");
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
        onClick={() => navigate("/admin/portfolio")}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к списку
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Редактировать видео" : "Новое видео"}
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
                placeholder="Артём Бриус"
              />
            </div>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Краткое описание</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Монтаж Reels для блогера..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_description">Полное описание</Label>
            <Textarea
              id="full_description"
              value={form.full_description}
              onChange={(e) => setForm({ ...form, full_description: e.target.value })}
              placeholder="Подробное описание работы..."
              rows={4}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="is_published"
              checked={form.is_published}
              onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
            />
            <Label htmlFor="is_published">Опубликовано</Label>
          </div>
        </div>

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Медиа</h2>

          <div className="space-y-2">
            <Label htmlFor="video_url">URL видео *</Label>
            <Input
              id="video_url"
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
              placeholder="/videos/video.mp4 или https://..."
            />
            <p className="text-xs text-muted-foreground">
              Локальный путь (/videos/...) или внешняя ссылка
            </p>
          </div>

          <div className="space-y-2">
            <Label>Превью-изображение</Label>
            <ImageUpload
              value={form.thumbnail_url}
              onChange={(url) => setForm({ ...form, thumbnail_url: url })}
              folder="portfolio"
            />
          </div>
        </div>

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Дополнительно</h2>

          <div className="space-y-2">
            <Label htmlFor="stats">Статистика</Label>
            <Input
              id="stats"
              value={form.stats}
              onChange={(e) => setForm({ ...form, stats: e.target.value })}
              placeholder="1.1M подписчиков • Instagram"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Отзыв клиента</Label>
            <Textarea
              id="review"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              placeholder="Отзыв клиента о работе..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Порядок сортировки</Label>
            <Input
              id="sort_order"
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
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
            onClick={() => navigate("/admin/portfolio")}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
