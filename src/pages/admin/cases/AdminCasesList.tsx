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
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Video } from "lucide-react";
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

interface Case {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_label: string;
  year: string;
  is_published: boolean;
  thumbnail: string | null;
  video_preview: string | null;
}

export default function AdminCasesList() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    const { data, error } = await supabase
      .from("cases")
      .select("id, slug, title, category, category_label, year, is_published, thumbnail, video_preview")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Ошибка загрузки кейсов");
      return;
    }

    setCases(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("cases").delete().eq("id", id);
    
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }

    toast.success("Кейс удалён");
    fetchCases();
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("cases")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return;
    }

    toast.success(currentStatus ? "Кейс скрыт" : "Кейс опубликован");
    fetchCases();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Кейсы</h1>
          <p className="text-muted-foreground mt-2">
            Управление портфолио проектов
          </p>
        </div>
        <Link to="/admin/cases/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Добавить кейс
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : cases.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <p className="text-muted-foreground mb-4">Кейсов пока нет</p>
          <Link to="/admin/cases/new">
            <Button>Создать первый кейс</Button>
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
                <TableHead>Год</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell>
                    <div className="relative">
                      {caseItem.thumbnail ? (
                        <img 
                          src={caseItem.thumbnail} 
                          alt={caseItem.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {caseItem.video_preview && <Video className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      )}
                      {caseItem.video_preview && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Video className="w-2.5 h-2.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{caseItem.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{caseItem.category_label}</Badge>
                  </TableCell>
                  <TableCell>{caseItem.year}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(caseItem.id, caseItem.is_published)}
                    >
                      {caseItem.is_published ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/cases/${caseItem.id}`}>
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
                            <AlertDialogTitle>Удалить кейс?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Кейс будет удалён навсегда.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(caseItem.id)}>
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
