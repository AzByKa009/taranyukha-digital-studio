import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Video, GripVertical } from "lucide-react";

interface PortfolioVideo {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  category: string;
  category_label: string;
  is_published: boolean;
  sort_order: number;
}

export default function AdminPortfolioList() {
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("portfolio_videos")
      .select("*")
      .order("sort_order");

    if (error) {
      toast.error("Ошибка загрузки видео");
      return;
    }

    setVideos(data || []);
    setLoading(false);
  };

  const togglePublished = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("portfolio_videos")
      .update({ is_published: !current })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка обновления");
      return;
    }

    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, is_published: !current } : v))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить это видео?")) return;

    const { error } = await supabase.from("portfolio_videos").delete().eq("id", id);

    if (error) {
      toast.error("Ошибка удаления: " + error.message);
      return;
    }

    toast.success("Видео удалено");
    fetchVideos();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Портфолио видео</h1>
          <p className="text-muted-foreground mt-1">{videos.length} видео</p>
        </div>
        <Link to="/admin/portfolio/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Добавить видео
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="premium-card p-4 flex items-center gap-4"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />

            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Video className="w-6 h-6 text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{video.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {video.category_label}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {video.video_url}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Switch
                checked={video.is_published}
                onCheckedChange={() => togglePublished(video.id, video.is_published)}
              />

              <Link to={`/admin/portfolio/${video.id}`}>
                <Button variant="ghost" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleDelete(video.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Нет видео в портфолио
        </div>
      )}
    </div>
  );
}
