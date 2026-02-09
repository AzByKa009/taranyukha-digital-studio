import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  Volume2, 
  Loader2, 
  Send,
  Sparkles,
  Download,
  Copy,
  Upload,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import TTSPanel from "@/components/admin/TTSPanel";

type Message = { role: "user" | "assistant"; content: string };

export default function AdminAITools() {
  // Chat state
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Image state
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);

  // Video state
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  // Removed TTS state - now handled by TTSPanel component

  // Chat handler with streaming
  const handleChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            messages: [...chatMessages, userMessage] 
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка чата");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setChatMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Ошибка чата");
    } finally {
      setChatLoading(false);
    }
  };

  // Image generation
  const handleImageGenerate = async () => {
    if (!imagePrompt.trim()) return;

    setImageLoading(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt: imagePrompt, folder: "ai-generated", referenceImage: referenceImage || undefined }
      });

      if (error) throw error;
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success("Изображение сгенерировано!");
      }
    } catch (error) {
      console.error("Image error:", error);
      toast.error("Ошибка генерации изображения");
    } finally {
      setImageLoading(false);
    }
  };

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой (макс. 5 МБ)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setReferenceImage(result);
      setReferencePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const clearReference = () => {
    setReferenceImage(null);
    setReferencePreview(null);
  };

  // Video generation - not available via API, show info message
  const handleVideoGenerate = async () => {
    if (!videoPrompt.trim()) return;
    
    // Copy prompt to clipboard for use in Lovable chat
    await navigator.clipboard.writeText(videoPrompt);
    toast.info("Промпт скопирован! Вставьте его в чат Lovable для генерации видео.");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI-инструменты</h1>
        <p className="text-muted-foreground mt-2">
          Чат, генерация изображений, видео и озвучка
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-xl">
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Чат
          </TabsTrigger>
          <TabsTrigger value="image" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            Картинки
          </TabsTrigger>
          <TabsTrigger value="video" className="gap-2">
            <Video className="w-4 h-4" />
            Видео
          </TabsTrigger>
          <TabsTrigger value="tts" className="gap-2">
            <Volume2 className="w-4 h-4" />
            Озвучка
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI-чат
              </CardTitle>
              <CardDescription>
                Общайтесь с GPT/Gemini для генерации контента, идей и текстов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-[400px] overflow-y-auto border rounded-lg p-4 space-y-4 bg-muted/30">
                {chatMessages.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Начните диалог...
                  </p>
                )}
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-6 text-xs"
                          onClick={() => copyToClipboard(msg.content)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Копировать
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card border rounded-lg px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Введите сообщение..."
                  onKeyDown={(e) => e.key === "Enter" && !chatLoading && handleChat()}
                  disabled={chatLoading}
                />
                <Button onClick={handleChat} disabled={chatLoading || !chatInput.trim()}>
                  {chatLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Tab */}
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Генерация изображений
              </CardTitle>
              <CardDescription>
                Создавайте уникальные изображения по текстовому описанию
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Reference image upload */}
              <div className="space-y-2">
                <Label>Исходное фото (опционально)</Label>
                <div className="flex items-start gap-3">
                  {referencePreview ? (
                    <div className="relative w-32 h-32 rounded-lg border overflow-hidden shrink-0">
                      <img src={referencePreview} alt="Reference" className="w-full h-full object-cover" />
                      <button
                        onClick={clearReference}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors shrink-0">
                      <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground text-center">Загрузить фото</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleReferenceUpload} />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground pt-1">
                    Загрузите фото, чтобы AI использовал его как основу или пример стиля для генерации нового изображения.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Описание изображения</Label>
                <Textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder={referencePreview ? "Опишите, что изменить или как использовать исходное фото..." : "Опишите изображение, которое хотите создать..."}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleImageGenerate} 
                disabled={imageLoading || !imagePrompt.trim()}
                className="gap-2"
              >
                {imageLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Сгенерировать
              </Button>

              {generatedImage && (
                <div className="space-y-3">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full max-w-md rounded-lg border"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <a href={generatedImage} download target="_blank" rel="noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Генерация видео
              </CardTitle>
              <CardDescription>
                Создавайте короткие видеоролики по описанию
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground mb-3">
                  ⚡ Генерация видео доступна через чат Lovable. Напишите промпт ниже и нажмите кнопку — он скопируется в буфер обмена.
                </p>
                <p className="text-xs text-muted-foreground">
                  Затем вставьте промпт в чат Lovable и попросите сгенерировать видео.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Описание видео</Label>
                <Textarea
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  placeholder="Опишите видео, которое хотите создать. Например: 'Волны океана на закате, кинематографичный вид, slow motion'"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleVideoGenerate} 
                disabled={!videoPrompt.trim()}
                variant="outline"
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Скопировать промпт
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TTS Tab */}
        <TabsContent value="tts">
          <TTSPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
