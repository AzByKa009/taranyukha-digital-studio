import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Copy, Search, Image, Video, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  name: string;
  id: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export default function AdminMediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("uploads").list("", {
      limit: 500,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      toast.error("Ошибка загрузки файлов");
      return;
    }

    const allFiles: MediaFile[] = [];

    for (const item of data || []) {
      if (item.id) {
        allFiles.push({
          name: item.name,
          id: item.id,
          metadata: item.metadata,
          created_at: item.created_at,
        });
      } else {
        const { data: folderFiles } = await supabase.storage
          .from("uploads")
          .list(item.name, { limit: 100 });

        folderFiles?.forEach((f) => {
          if (f.id) {
            allFiles.push({
              name: `${item.name}/${f.name}`,
              id: f.id,
              metadata: f.metadata,
              created_at: f.created_at,
            });
          }
        });
      }
    }

    setFiles(allFiles);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setUploading(true);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const ext = file.name.split(".").pop();
      const fileName = `media/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

      const { error } = await supabase.storage.from("uploads").upload(fileName, file);

      if (error) {
        toast.error(`Ошибка загрузки ${file.name}: ${error.message}`);
      }
    }

    toast.success("Файлы загружены");
    setUploading(false);
    fetchFiles();
  };

  const handleDelete = async (path: string) => {
    if (!confirm("Удалить этот файл?")) return;

    const { error } = await supabase.storage.from("uploads").remove([path]);

    if (error) {
      toast.error("Ошибка удаления: " + error.message);
      return;
    }

    toast.success("Файл удалён");
    fetchFiles();
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Удалить ${selectedFiles.size} файлов?`)) return;

    const { error } = await supabase.storage.from("uploads").remove([...selectedFiles]);

    if (error) {
      toast.error("Ошибка удаления: " + error.message);
      return;
    }

    toast.success("Файлы удалены");
    setSelectedFiles(new Set());
    fetchFiles();
  };

  const copyUrl = (path: string) => {
    const { data } = supabase.storage.from("uploads").getPublicUrl(path);
    navigator.clipboard.writeText(data.publicUrl);
    toast.success("URL скопирован");
  };

  const getFileIcon = (mimetype: string | undefined) => {
    if (mimetype?.startsWith("image/")) return Image;
    if (mimetype?.startsWith("video/")) return Video;
    return File;
  };

  const getFileUrl = (path: string) => {
    const { data } = supabase.storage.from("uploads").getPublicUrl(path);
    return data.publicUrl;
  };

  const toggleSelect = (path: string) => {
    const newSet = new Set(selectedFiles);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    setSelectedFiles(newSet);
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number | undefined) => {
    if (!bytes) return "—";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
          <h1 className="text-3xl font-bold">Медиа-библиотека</h1>
          <p className="text-muted-foreground mt-1">{files.length} файлов</p>
        </div>
        <div className="flex gap-3">
          {selectedFiles.size > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Удалить ({selectedFiles.size})
            </Button>
          )}
          <Input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            id="media-upload"
            accept="image/*,video/*"
          />
          <label htmlFor="media-upload">
            <Button asChild disabled={uploading} className="gap-2">
              <span>
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                Загрузить
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск файлов..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file) => {
          const mimetype = file.metadata?.mimetype as string | undefined;
          const size = file.metadata?.size as number | undefined;
          const FileIcon = getFileIcon(mimetype);
          const isImage = mimetype?.startsWith("image/");
          const isSelected = selectedFiles.has(file.name);

          return (
            <div
              key={file.name}
              className={cn(
                "premium-card p-2 group cursor-pointer transition-all",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => toggleSelect(file.name)}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2 flex items-center justify-center">
                {isImage ? (
                  <img
                    src={getFileUrl(file.name)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileIcon className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <p className="text-xs truncate" title={file.name}>
                {file.name.split("/").pop()}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatSize(size)}
              </p>
              <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(file.name);
                  }}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.name);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {search ? "Ничего не найдено" : "Нет загруженных файлов"}
        </div>
      )}
    </div>
  );
}
