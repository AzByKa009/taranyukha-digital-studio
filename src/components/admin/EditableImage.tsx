import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";
import { ImageIcon, Upload, Sparkles, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditableImageProps {
  id: string;
  src: string | null;
  alt: string;
  onSave: (url: string) => Promise<void>;
  className?: string;
  aspectRatio?: string;
}

export function EditableImage({
  id,
  src,
  alt,
  onSave,
  className,
  aspectRatio = "4/3",
}: EditableImageProps) {
  const { isAdmin, hoveredElement, setHoveredElement } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      await onSave(urlData.publicUrl);
      toast.success("Изображение загружено");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Ошибка загрузки изображения");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Введите описание изображения");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: aiPrompt },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setGeneratedPreview(data.imageUrl);
        toast.success("Изображение сгенерировано");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Ошибка генерации изображения");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyGenerated = async () => {
    if (!generatedPreview) return;

    try {
      await onSave(generatedPreview);
      toast.success("Изображение применено");
      setIsDialogOpen(false);
      setGeneratedPreview(null);
      setAiPrompt("");
    } catch (error) {
      toast.error("Ошибка применения изображения");
    }
  };

  if (!isAdmin) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
      </div>
    );
  }

  const isHovered = hoveredElement === id;

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-200",
          isHovered && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background rounded-lg",
          className
        )}
        style={{ aspectRatio }}
        onMouseEnter={() => setHoveredElement(id)}
        onMouseLeave={() => setHoveredElement(null)}
        onClick={() => setIsDialogOpen(true)}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        
        {isHovered && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex items-center gap-2 text-primary font-medium">
              <ImageIcon className="h-5 w-5" />
              Изменить изображение
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Изменить изображение</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Загрузить
              </TabsTrigger>
              <TabsTrigger value="generate" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Сгенерировать
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  {isUploading ? (
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  ) : (
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isUploading ? "Загрузка..." : "Нажмите для выбора файла"}
                  </span>
                </label>
              </div>
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Опишите желаемое изображение на английском языке..."
                rows={3}
              />
              
              <Button
                onClick={handleGenerateImage}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Сгенерировать
                  </>
                )}
              </Button>

              {generatedPreview && (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={generatedPreview}
                      alt="Сгенерированное изображение"
                      className="w-full"
                    />
                    <button
                      onClick={() => setGeneratedPreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Button onClick={handleApplyGenerated} className="w-full">
                    Применить изображение
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
