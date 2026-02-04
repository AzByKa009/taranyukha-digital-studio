import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { MessageSquare, User, Phone, Calendar, ExternalLink, Check, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  contact: string;
  message: string | null;
  source_page: string | null;
  status: string;
  created_at: string;
}

export default function AdminLeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      toast.error("Ошибка загрузки заявок");
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления статуса");
    } else {
      toast.success("Статус обновлён");
      fetchLeads();
    }
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Ошибка удаления");
    } else {
      toast.success("Заявка удалена");
      fetchLeads();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default" className="bg-primary">Новая</Badge>;
      case "processing":
        return <Badge variant="secondary">В работе</Badge>;
      case "done":
        return <Badge variant="outline" className="text-primary border-primary">Завершено</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Заявки</h1>
        <p className="text-muted-foreground mt-1">
          Всего заявок: {leads.length} | Новых: {leads.filter(l => l.status === "new").length}
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Заявок пока нет</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`premium-card p-4 sm:p-6 ${lead.status === "new" ? "border-primary/50" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    {getStatusBadge(lead.status)}
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(lead.created_at), "d MMMM yyyy, HH:mm", { locale: ru })}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{lead.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{lead.contact}</span>
                    </div>
                  </div>

                  {lead.message && (
                    <div className="flex gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-sm text-muted-foreground">{lead.message}</p>
                    </div>
                  )}

                  {lead.source_page && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ExternalLink className="w-3 h-3" />
                      <span>{lead.source_page}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">
                  {lead.status === "new" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(lead.id, "processing")}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      В работу
                    </Button>
                  )}
                  {lead.status === "processing" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(lead.id, "done")}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Завершить
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Это действие нельзя отменить.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteLead(lead.id)}>
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
