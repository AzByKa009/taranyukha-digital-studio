import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Trash2, Loader2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: string;
  slug: string;
  title: string;
  description: string | null;
}

export default function AdminCategoriesList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: "", slug: "", description: "" });
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("ai_product_categories")
      .select("id, slug, title, description")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Ошибка загрузки категорий");
      return;
    }

    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("ai_product_categories").delete().eq("id", id);
    
    if (error) {
      toast.error("Ошибка удаления. Возможно, есть связанные продукты.");
      return;
    }

    toast.success("Категория удалена");
    fetchCategories();
  };

  const handleCreate = async () => {
    if (!newCategory.title || !newCategory.slug) {
      toast.error("Заполните название и slug");
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("ai_product_categories").insert({
      title: newCategory.title,
      slug: newCategory.slug,
      description: newCategory.description || null,
    });

    if (error) {
      toast.error("Ошибка создания: " + error.message);
      setSaving(false);
      return;
    }

    toast.success("Категория создана");
    setNewCategory({ title: "", slug: "", description: "" });
    setDialogOpen(false);
    setSaving(false);
    fetchCategories();
  };

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate("/admin/ai-products")}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к продуктам
      </Button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Категории AI-продуктов</h1>
          <p className="text-muted-foreground mt-2">
            Управление категориями для группировки продуктов
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Добавить категорию
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая категория</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cat-title">Название *</Label>
                <Input
                  id="cat-title"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  placeholder="Чат-боты и ассистенты"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-slug">URL-slug *</Label>
                <Input
                  id="cat-slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="chatbots"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-desc">Описание</Label>
                <Textarea
                  id="cat-desc"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Описание категории..."
                  rows={3}
                />
              </div>
              <Button onClick={handleCreate} disabled={saving} className="w-full gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : categories.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <p className="text-muted-foreground mb-4">Категорий пока нет</p>
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.title}</TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {category.description || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить категорию?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Все продукты в этой категории также будут удалены.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)}>
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
