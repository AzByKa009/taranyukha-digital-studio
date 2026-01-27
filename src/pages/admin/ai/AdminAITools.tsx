import { useState } from "react";
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
  Copy
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  // Video state
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  // TTS state
  const [ttsText, setTtsText] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsResult, setTtsResult] = useState<string | null>(null);

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
        body: { prompt: imagePrompt, folder: "ai-generated" }
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

  // Video generation (placeholder - uses existing videogen)
  const handleVideoGenerate = async () => {
    if (!videoPrompt.trim()) return;

    setVideoLoading(true);
    toast.info("Генерация видео запущена. Это может занять несколько минут...");

    // Note: Video generation would use the videogen tool
    // For now, show a placeholder message
    setTimeout(() => {
      setVideoLoading(false);
      toast.success("Для генерации видео используйте встроенный инструмент Lovable");
    }, 2000);
  };

  // TTS state extended - English voices only
  const [ttsVoices, setTtsVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  // Load available English voices
  useState(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      // Filter only English voices
      const englishVoices = allVoices.filter(v => v.lang.startsWith("en"));
      setTtsVoices(englishVoices);
      // Default to first English voice
      if (englishVoices.length > 0) setSelectedVoice(englishVoices[0].name);
    };
    
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  });

  // TTS handler using Web Speech API
  const handleTTS = () => {
    if (!ttsText.trim()) return;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    setTtsLoading(true);
    setTtsResult(null);

    const utterance = new SpeechSynthesisUtterance(ttsText);
    const voice = ttsVoices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    
    utterance.onend = () => {
      setTtsLoading(false);
      setTtsResult("Озвучка завершена");
      toast.success("Текст озвучен!");
    };
    
    utterance.onerror = (e) => {
      console.error("TTS error:", e);
      setTtsLoading(false);
      toast.error("Ошибка озвучки");
    };

    speechSynthesis.speak(utterance);
  };

  const stopTTS = () => {
    speechSynthesis.cancel();
    setTtsLoading(false);
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
              <div className="space-y-2">
                <Label>Описание изображения</Label>
                <Textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Опишите изображение, которое хотите создать..."
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
              <div className="space-y-2">
                <Label>Описание видео</Label>
                <Textarea
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  placeholder="Опишите видео, которое хотите создать..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleVideoGenerate} 
                disabled={videoLoading || !videoPrompt.trim()}
                className="gap-2"
              >
                {videoLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Сгенерировать
              </Button>

              <p className="text-sm text-muted-foreground">
                Примечание: Генерация видео доступна через встроенные инструменты Lovable
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TTS Tab */}
        <TabsContent value="tts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Озвучка текста
              </CardTitle>
              <CardDescription>
                Преобразуйте текст в речь (Web Speech API — работает в браузере)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Голос</Label>
                <select
                  className="w-full p-2 border rounded-lg bg-background"
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                >
                  {ttsVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Текст для озвучки</Label>
                <Textarea
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  placeholder="Введите текст на любом языке..."
                  rows={5}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleTTS} 
                  disabled={ttsLoading || !ttsText.trim()}
                  className="gap-2"
                >
                  {ttsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                  Озвучить
                </Button>
                {ttsLoading && (
                  <Button variant="outline" onClick={stopTTS}>
                    Остановить
                  </Button>
                )}
              </div>

              {ttsResult && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{ttsResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
