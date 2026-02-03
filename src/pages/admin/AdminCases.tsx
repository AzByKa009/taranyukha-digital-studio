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
import { EditableImage } from "@/components/admin/EditableImage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Case {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_label: string;
  short_description: string;
  year: string;
  thumbnail: string | null;
  challenge: string | null;
  solution: string | null;
  result: string | null;
  is_published: boolean | null;
  sort_order: number | null;
}

export default function AdminCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .order("sort_order");

    if (!error && data) setCases(data);
    setLoading(false);
  };

  const handleSave = async (caseData: Partial<Case>) => {
    if (caseData.id) {
      const { error } = await supabase
        .from("cases")
        .update(caseData)
        .eq("id", caseData.id);
      if (error) {
        toast.error("Ошибка сохранения");
        return;
      }
      toast.success("Кейс обновлён");
    } else {
      if (!caseData.title || !caseData.short_description || !caseData.category_label || !caseData.year) {
        toast.error("Заполните обязательные поля");
        return;
      }
      const { error } = await supabase.from("cases").insert([{
        title: caseData.title,
        category: caseData.category || "marketing",
        category_label: caseData.category_label,
        short_description: caseData.short_description,
        year: caseData.year,
        thumbnail: caseData.thumbnail,
        challenge: caseData.challenge,
        solution: caseData.solution,
        result: caseData.result,
        is_published: caseData.is_published,
        slug: caseData.title.toLowerCase().replace(/\s+/g, "-"),
        sort_order: cases.length,
      }]);
      if (error) {
        toast.error("Ошибка создания");
        return;
      }
      toast.success("Кейс создан");
    }
    fetchCases();
    setIsDialogOpen(false);
    setEditingCase(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить кейс?")) return;
    
    const { error } = await supabase.from("cases").delete().eq("id", id);
    if (error) {
      toast.error("Ошибка удаления");
      return;
    }
    toast.success("Кейс удалён");
    fetchCases();
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    await supabase.from("cases").update({ is_published: published }).eq("id", id);
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, is_published: published } : c)));
    toast.success(published ? "Кейс опубликован" : "Кейс скрыт");
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
            <h1 className="text-2xl font-display font-bold">Кейсы</h1>
            <p className="text-sm text-muted-foreground">Портфолио работ</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCase(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить кейс
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCase ? "Редактировать" : "Новый кейс"}</DialogTitle>
            </DialogHeader>
            <CaseForm
              caseData={editingCase}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="rounded-xl border border-border bg-card/50 overflow-hidden hover:bg-card transition-colors"
          >
            <div className="aspect-video bg-muted relative">
              {caseItem.thumbnail && (
                <img
                  src={caseItem.thumbnail}
                  alt={caseItem.title}
                  className="w-full h-full object-cover"
                />
              )}
              {!caseItem.is_published && (
                <span className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-background/80 text-muted-foreground">
                  Скрыт
                </span>
              )}
            </div>
            
            <div className="p-4">
              <div className="text-xs text-primary font-medium mb-1">{caseItem.category_label}</div>
              <h3 className="font-medium mb-2">{caseItem.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{caseItem.short_description}</p>
              
              <div className="flex items-center justify-between">
                <Switch
                  checked={caseItem.is_published ?? true}
                  onCheckedChange={(checked) => handleTogglePublish(caseItem.id, checked)}
                />
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingCase(caseItem);
                      setIsDialogOpen(true);
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(caseItem.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cases.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            Кейсы пока не добавлены
          </div>
        )}
      </div>
    </div>
  );
}

function CaseForm({
  caseData,
  onSave,
  onCancel,
}: {
  caseData: Case | null;
  onSave: (data: Partial<Case>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Case>>(
    caseData || {
      title: "",
      category: "marketing",
      category_label: "Маркетинг",
      short_description: "",
      year: new Date().getFullYear().toString(),
      thumbnail: null,
      challenge: "",
      solution: "",
      result: "",
      is_published: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Название</Label>
        <Input
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Название кейса"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Категория</Label>
          <Input
            value={form.category_label || ""}
            onChange={(e) => setForm({ ...form, category_label: e.target.value })}
            placeholder="Маркетинг"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Год</Label>
          <Input
            value={form.year || ""}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="2024"
            required
          />
        </div>
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
        <Label>Задача</Label>
        <Textarea
          value={form.challenge || ""}
          onChange={(e) => setForm({ ...form, challenge: e.target.value })}
          placeholder="Какую проблему решали"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Решение</Label>
        <Textarea
          value={form.solution || ""}
          onChange={(e) => setForm({ ...form, solution: e.target.value })}
          placeholder="Что было сделано"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Результат</Label>
        <Textarea
          value={form.result || ""}
          onChange={(e) => setForm({ ...form, result: e.target.value })}
          placeholder="Какой результат получили"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>URL изображения</Label>
        <Input
          value={form.thumbnail || ""}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          placeholder="https://..."
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
