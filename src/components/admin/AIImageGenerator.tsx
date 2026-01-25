import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface AIImageGeneratorProps {
  onImageGenerated: (url: string) => void;
  placeholder?: string;
  folder?: string;
  className?: string;
}

export function AIImageGenerator({ 
  onImageGenerated, 
  placeholder = "Опишите изображение, которое нужно сгенерировать...",
  folder = "generated",
  className 
}: AIImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Введите описание изображения");
      return;
    }

    setGenerating(true);
    setPreviewUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, folder }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.imageUrl) {
        setPreviewUrl(data.imageUrl);
        toast.success("Изображение сгенерировано!");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Ошибка генерации");
    } finally {
      setGenerating(false);
    }
  };

  const handleUseImage = () => {
    if (previewUrl) {
      onImageGenerated(previewUrl);
      setPreviewUrl(null);
      setPrompt("");
      toast.success("Изображение добавлено");
    }
  };

  return (
    <div className={cn("space-y-4 p-4 border border-dashed border-primary/30 rounded-lg bg-primary/5", className)}>
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="w-5 h-5" />
        <span className="font-medium">AI-генерация изображения</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ai-prompt">Описание</Label>
        <div className="flex gap-2">
          <Input
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            disabled={generating}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !generating) {
                handleGenerate();
              }
            }}
          />
          <Button 
            type="button"
            onClick={handleGenerate} 
            disabled={generating || !prompt.trim()}
            className="shrink-0"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Например: «Современный офис с AI-технологиями» или «Абстрактный фон для сервиса автоматизации»
        </p>
      </div>

      {generating && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Генерируем изображение...</p>
          </div>
        </div>
      )}

      {previewUrl && !generating && (
        <div className="space-y-3">
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Сгенерированное изображение" 
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              type="button"
              onClick={handleUseImage} 
              className="flex-1"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Использовать это изображение
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={handleGenerate}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Сгенерировать другое
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
