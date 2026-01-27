import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Volume2, Loader2, Play, Square, Headphones } from "lucide-react";

export default function TTSPanel() {
  const [ttsText, setTtsText] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load voices
  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    // Filter English voices
    const englishVoices = availableVoices.filter(v => 
      v.lang.startsWith("en")
    );
    
    if (englishVoices.length > 0) {
      setVoices(englishVoices);
      if (!selectedVoice) {
        // Prefer Google or Microsoft voices
        const preferredVoice = englishVoices.find(v => 
          v.name.includes("Google") || v.name.includes("Microsoft")
        ) || englishVoices[0];
        setSelectedVoice(preferredVoice.name);
      }
    }
  }, [selectedVoice]);

  useEffect(() => {
    // Initial load
    loadVoices();
    
    // Chrome loads voices async
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Fallback for browsers that don't fire the event
    const interval = setInterval(() => {
      if (voices.length === 0) {
        loadVoices();
      }
    }, 100);

    setTimeout(() => clearInterval(interval), 2000);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, [loadVoices, voices.length]);

  // Preview voice with sample text
  const previewVoice = (voiceName: string) => {
    window.speechSynthesis.cancel();
    
    const voice = voices.find(v => v.name === voiceName);
    if (!voice) return;

    const utterance = new SpeechSynthesisUtterance("Hello! This is a preview of this voice.");
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    window.speechSynthesis.speak(utterance);
    toast.success(`Предпрослушивание: ${voice.name}`);
  };

  // Main TTS function
  const handleSpeak = () => {
    if (!ttsText.trim()) {
      toast.error("Введите текст для озвучки");
      return;
    }

    window.speechSynthesis.cancel();
    setTtsLoading(true);
    setIsPlaying(true);

    const voice = voices.find(v => v.name === selectedVoice);
    const utterance = new SpeechSynthesisUtterance(ttsText);
    
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      setTtsLoading(false);
      setIsPlaying(false);
      toast.success("Озвучка завершена!");
    };

    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setTtsLoading(false);
      setIsPlaying(false);
      toast.error("Ошибка озвучки");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setTtsLoading(false);
    setIsPlaying(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Озвучка текста (English)
        </CardTitle>
        <CardDescription>
          Web Speech API — бесплатно, работает в браузере без API ключей
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-2">
          <Label>Голос ({voices.length} доступно)</Label>
          <div className="flex gap-2">
            <select
              className="flex-1 p-2 border rounded-lg bg-card text-foreground"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              {voices.length === 0 ? (
                <option>Загрузка голосов...</option>
              ) : (
                voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))
              )}
            </select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => previewVoice(selectedVoice)}
              disabled={!selectedVoice || voices.length === 0}
              title="Прослушать голос"
            >
              <Headphones className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <Label>Скорость: {rate.toFixed(1)}x</Label>
          <Slider
            value={[rate]}
            onValueChange={([v]) => setRate(v)}
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Pitch Control */}
        <div className="space-y-2">
          <Label>Тон: {pitch.toFixed(1)}</Label>
          <Slider
            value={[pitch]}
            onValueChange={([v]) => setPitch(v)}
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <Label>Текст для озвучки</Label>
          <Textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="Enter text in English to speak..."
            rows={5}
            className="resize-none"
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={handleSpeak}
            disabled={ttsLoading || !ttsText.trim() || voices.length === 0}
            className="gap-2"
          >
            {ttsLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Озвучить
          </Button>
          
          {isPlaying && (
            <Button variant="destructive" onClick={handleStop} className="gap-2">
              <Square className="w-4 h-4" />
              Стоп
            </Button>
          )}
        </div>

        {/* Info */}
        <p className="text-xs text-muted-foreground">
          Использует встроенный синтез речи браузера. Количество и качество голосов зависит от вашей операционной системы.
        </p>
      </CardContent>
    </Card>
  );
}
