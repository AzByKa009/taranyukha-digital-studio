import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Loader2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category_id: string | null;
  price_from: number | null;
  timeline: string | null;
  features: string[] | null;
  thumbnail: string | null;
  is_published: boolean | null;
  sort_order: number | null;
}

interface Category {
  id: string;
  title: string;
  slug: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      supabase.from("ai_products").select("*").order("sort_order"),
      supabase.from("ai_product_categories").select("id, title, slug").order("sort_order"),
    ]);

    if (!productsRes.error && productsRes.data) setProducts(productsRes.data);
    if (!categoriesRes.error && categoriesRes.data) setCategories(categoriesRes.data);
    setLoading(false);
  };

  const handleSave = async (product: Partial<Product>) => {
    if (product.id) {
      const { error } = await supabase
        .from("ai_products")
        .update(product)
        .eq("id", product.id);
      if (error) {
        toast.error("Ошибка сохранения");
        return;
      }
      toast.success("Продукт обновлён");
    } else {
      if (!product.title || !product.description) {
        toast.error("Заполните обязательные поля");
        return;
      }
      const { error } = await supabase.from("ai_products").insert([{
        title: product.title,
        description: product.description,
        category_id: product.category_id,
        price_from: product.price_from,
        timeline: product.timeline,
        features: product.features,
        thumbnail: product.thumbnail,
        is_published: product.is_published,
        slug: product.title.toLowerCase().replace(/\s+/g, "-"),
        sort_order: products.length,
      }]);
      if (error) {
        toast.error("Ошибка создания");
        return;
      }
      toast.success("Продукт создан");
    }
    fetchData();
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить продукт?")) return;
    
    const { error } = await supabase.from("ai_products").delete().eq("id", id);
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }
    toast.success("Продукт удалён");
    fetchData();
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    await supabase.from("ai_products").update({ is_published: published }).eq("id", id);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: published } : p)));
    toast.success(published ? "Продукт опубликован" : "Продукт скрыт");
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold">AI Продукты</h1>
            <p className="text-sm text-muted-foreground">Каталог AI-решений</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить продукт
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Редактировать" : "Новый продукт"}</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              categories={categories}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium">{product.title}</h3>
              {!product.is_published && (
                <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                  Скрыт
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <Switch
                checked={product.is_published ?? true}
                onCheckedChange={(checked) => handleTogglePublish(product.id, checked)}
              />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingProduct(product);
                    setIsDialogOpen(true);
                  }}
                >
                  Редактировать
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            Продукты пока не добавлены
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({
  product,
  categories,
  onSave,
  onCancel,
}: {
  product: Product | null;
  categories: Category[];
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(
    product || {
      title: "",
      description: "",
      category_id: categories[0]?.id || null,
      price_from: null,
      timeline: "",
      features: [],
      is_published: true,
    }
  );
  const [featuresText, setFeaturesText] = useState(product?.features?.join("\n") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      features: featuresText.split("\n").filter((f) => f.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Название</Label>
        <Input
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Название продукта"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Описание</Label>
        <Textarea
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Описание продукта"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Цена от</Label>
          <Input
            type="number"
            value={form.price_from || ""}
            onChange={(e) => setForm({ ...form, price_from: parseInt(e.target.value) || null })}
            placeholder="30000"
          />
        </div>
        <div className="space-y-2">
          <Label>Сроки</Label>
          <Input
            value={form.timeline || ""}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
            placeholder="1-2 недели"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Функции (каждая с новой строки)</Label>
        <Textarea
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="Автоматизация&#10;Интеграция&#10;Аналитика"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={form.is_published ?? true}
          onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
        />
        <Label>Опубликовано</Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Сохранить
        </Button>
      </div>
    </form>
  );
}
