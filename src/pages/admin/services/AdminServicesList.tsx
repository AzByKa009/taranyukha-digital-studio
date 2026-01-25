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

interface Service {
  id: string;
  slug: string;
  title: string;
  price_from: number | null;
  price_label: string | null;
  is_published: boolean;
  thumbnail: string | null;
}

export default function AdminServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, title, price_from, price_label, is_published, thumbnail")
      .order("sort_order", { ascending: true });

    if (error) {
      toast.error("Ошибка загрузки услуг");
      return;
    }

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }

    toast.success("Услуга удалена");
    fetchServices();
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("services")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return;
    }

    toast.success(currentStatus ? "Услуга скрыта" : "Услуга опубликована");
    fetchServices();
  };

  const formatPrice = (price: number | null, label: string | null) => {
    if (label) return label;
    if (price) return `от ${price.toLocaleString()} ₽`;
    return "—";
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Услуги</h1>
          <p className="text-muted-foreground mt-2">
            Управление списком услуг и ценами
          </p>
        </div>
        <Link to="/admin/services/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Добавить услугу
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <div className="premium-card p-12 text-center">
          <p className="text-muted-foreground mb-4">Услуг пока нет</p>
          <Link to="/admin/services/new">
            <Button>Создать первую услугу</Button>
          </Link>
        </div>
      ) : (
        <div className="premium-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Фото</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {service.thumbnail ? (
                      <img 
                        src={service.thumbnail} 
                        alt={service.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{formatPrice(service.price_from, service.price_label)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(service.id, service.is_published)}
                    >
                      {service.is_published ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/services/${service.id}`}>
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
                            <AlertDialogTitle>Удалить услугу?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(service.id)}>
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
