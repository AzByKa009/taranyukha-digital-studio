import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Введите заголовок"),
  slug: z.string().min(1, "Введите URL-slug"),
});

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  read_time: number;
  is_published: boolean;
}

const defaultForm: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  thumbnail: "",
  category: "",
  tags: [],
  read_time: 5,
  is_published: false,
};

export default function AdminBlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<PostForm>(defaultForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      fetchPost(id);
    }
  }, [id, isEditing]);

  const fetchPost = async (postId: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .maybeSingle();

    if (error || !data) {
      toast.error("Статья не найдена");
      navigate("/admin/blog");
      return;
    }

    setForm({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || "",
      content: data.content || "",
      thumbnail: data.thumbnail || "",
      category: data.category || "",
      tags: data.tags || [],
      read_time: data.read_time || 5,
      is_published: data.is_published,
    });
    setTagsText((data.tags || []).join(", "));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = postSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSaving(true);

    const tags = tagsText.split(",").map((t) => t.trim()).filter(Boolean);

    const postData: Record<string, unknown> = {
      ...form,
      tags,
      thumbnail: form.thumbnail || null,
      excerpt: form.excerpt || null,
      content: form.content || null,
      category: form.category || null,
    };

    // Set published_at when publishing for the first time
    if (form.is_published && !isEditing) {
      postData.published_at = new Date().toISOString();
    }

    if (isEditing && id) {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", id);

      if (error) {
        toast.error("Ошибка сохранения: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Статья обновлена");
    } else {
      const { error } = await supabase.from("blog_posts").insert(postData as never);

      if (error) {
        toast.error("Ошибка создания: " + error.message);
        setSaving(false);
        return;
      }

      toast.success("Статья создана");
    }

    navigate("/admin/blog");
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
        onClick={() => navigate("/admin/blog")}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к списку
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Редактировать статью" : "Новая статья"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Основная информация</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Как AI меняет бизнес"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL-slug *</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="how-ai-changes-business"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="AI, Бизнес, Автоматизация..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="read_time">Время чтения (мин)</Label>
              <Input
                id="read_time"
                type="number"
                value={form.read_time}
                onChange={(e) => setForm({ ...form, read_time: Number(e.target.value) })}
                min={1}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Краткое описание (excerpt)</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Краткое описание для превью..."
              rows={2}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="is_published"
              checked={form.is_published}
              onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
            />
            <Label htmlFor="is_published">Опубликована</Label>
          </div>
        </div>

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Изображение</h2>
          
          <ImageUpload
            value={form.thumbnail}
            onChange={(url) => setForm({ ...form, thumbnail: url })}
            folder="blog"
          />
        </div>

        <div className="premium-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Контент</h2>
          
          <div className="space-y-2">
            <Label htmlFor="content">Текст статьи (Markdown)</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="# Заголовок&#10;&#10;Текст статьи...&#10;&#10;## Подзаголовок..."
              rows={20}
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Теги (через запятую)</Label>
            <Input
              id="tags"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="AI, автоматизация, бизнес"
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
            onClick={() => navigate("/admin/blog")}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
