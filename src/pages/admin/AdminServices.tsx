import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical, Loader2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string | null;
  icon: string | null;
  price_from: number | null;
  price_label: string | null;
  features: string[] | null;
  is_published: boolean | null;
  sort_order: number | null;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");

    if (!error && data) setServices(data);
    setLoading(false);
  };

  const handleSave = async (service: Partial<Service>) => {
    if (service.id) {
      const { error } = await supabase
        .from("services")
        .update(service)
        .eq("id", service.id);
      if (error) {
        toast.error("Ошибка сохранения");
        return;
      }
      toast.success("Услуга обновлена");
    } else {
      if (!service.title || !service.short_description) {
        toast.error("Заполните обязательные поля");
        return;
      }
      const { error } = await supabase.from("services").insert([{
        title: service.title,
        short_description: service.short_description,
        full_description: service.full_description,
        icon: service.icon,
        price_from: service.price_from,
        price_label: service.price_label,
        features: service.features,
        is_published: service.is_published,
        slug: service.title.toLowerCase().replace(/\s+/g, "-"),
        sort_order: services.length,
      }]);
      if (error) {
        toast.error("Ошибка создания");
        return;
      }
      toast.success("Услуга создана");
    }
    fetchServices();
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить услугу?")) return;
    
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }
    toast.success("Услуга удалена");
    fetchServices();
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    await supabase.from("services").update({ is_published: published }).eq("id", id);
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, is_published: published } : s)));
    toast.success(published ? "Услуга опубликована" : "Услуга скрыта");
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
            <h1 className="text-2xl font-display font-bold">Услуги</h1>
            <p className="text-sm text-muted-foreground">Управление списком услуг</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить услугу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? "Редактировать" : "Новая услуга"}</DialogTitle>
            </DialogHeader>
            <ServiceForm
              service={editingService}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab shrink-0" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary/50 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-medium truncate">{service.title}</h3>
                {!service.is_published && (
                  <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                    Скрыта
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{service.short_description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Switch
                checked={service.is_published ?? true}
                onCheckedChange={(checked) => handleTogglePublish(service.id, checked)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingService(service);
                  setIsDialogOpen(true);
                }}
              >
                Редактировать
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(service.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Услуги пока не добавлены
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service | null;
  onSave: (service: Partial<Service>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Service>>(
    service || {
      title: "",
      short_description: "",
      full_description: "",
      icon: "Briefcase",
      price_from: null,
      price_label: "",
      features: [],
      is_published: true,
    }
  );
  const [featuresText, setFeaturesText] = useState(service?.features?.join("\n") || "");

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
          placeholder="Название услуги"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Краткое описание</Label>
        <Textarea
          value={form.short_description || ""}
          onChange={(e) => setForm({ ...form, short_description: e.target.value })}
          placeholder="Краткое описание для карточки"
          rows={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Полное описание</Label>
        <Textarea
          value={form.full_description || ""}
          onChange={(e) => setForm({ ...form, full_description: e.target.value })}
          placeholder="Подробное описание услуги"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Иконка</Label>
          <Input
            value={form.icon || ""}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="Briefcase, Bot, Globe..."
          />
        </div>
        <div className="space-y-2">
          <Label>Цена от</Label>
          <Input
            type="number"
            value={form.price_from || ""}
            onChange={(e) => setForm({ ...form, price_from: parseInt(e.target.value) || null })}
            placeholder="50000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Теги (каждый с новой строки)</Label>
        <Textarea
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="Сайты&#10;Лендинги&#10;Дизайн"
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
