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
import { format } from "date-fns";
import { ru } from "date-fns/locale";
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

interface Post {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  thumbnail: string | null;
}

export default function AdminBlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, category, is_published, published_at, thumbnail")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Ошибка загрузки статей");
      return;
    }

    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }

    toast.success("Статья удалена");
    fetchPosts();
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const updateData: { is_published: boolean; published_at?: string | null } = {
      is_published: !currentStatus,
    };
    
    if (!currentStatus) {
      updateData.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return;
    }

    toast.success(currentStatus ? "Статья скрыта" : "Статья опубликована");
    fetchPosts();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Блог</h1>
          <p className="text-muted-foreground mt-2">
            Управление статьями блога
          </p>
        </div>
        <Link to="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Добавить статью
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <p className="text-muted-foreground mb-4">Статей пока нет</p>
          <Link to="/admin/blog/new">
            <Button>Создать первую статью</Button>
          </Link>
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Фото</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    {post.thumbnail ? (
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.category && <Badge variant="secondary">{post.category}</Badge>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {post.published_at 
                      ? format(new Date(post.published_at), "d MMM yyyy", { locale: ru })
                      : "Не опубликована"
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(post.id, post.is_published)}
                    >
                      {post.is_published ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/blog/${post.id}`}>
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
                            <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(post.id)}>
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
