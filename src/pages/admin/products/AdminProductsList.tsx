import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
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

interface Product {
  id: string;
  slug: string;
  title: string;
  price_from: number | null;
  timeline: string | null;
  is_published: boolean;
  thumbnail: string | null;
  ai_product_categories: { title: string } | null;
}

export default function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("ai_products")
      .select("id, slug, title, price_from, timeline, is_published, thumbnail, ai_product_categories(title)")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Ошибка загрузки продуктов");
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("ai_products").delete().eq("id", id);
    
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }

    toast.success("Продукт удалён");
    fetchProducts();
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("ai_products")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return;
    }

    toast.success(currentStatus ? "Продукт скрыт" : "Продукт опубликован");
    fetchProducts();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">AI-продукты</h1>
          <p className="text-muted-foreground mt-2">
            Управление AI-продуктами и решениями
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/ai-products/categories">
            <Button variant="outline">Категории</Button>
          </Link>
          <Link to="/admin/ai-products/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Добавить продукт
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <p className="text-muted-foreground mb-4">Продуктов пока нет</p>
          <Link to="/admin/ai-products/new">
            <Button>Создать первый продукт</Button>
          </Link>
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Фото</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Сроки</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.thumbnail ? (
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    {product.ai_product_categories && (
                      <Badge variant="secondary">{product.ai_product_categories.title}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.price_from ? `от ${product.price_from.toLocaleString()} ₽` : "—"}
                  </TableCell>
                  <TableCell>{product.timeline || "—"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(product.id, product.is_published)}
                    >
                      {product.is_published ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/ai-products/${product.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить продукт?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(product.id)}>
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
