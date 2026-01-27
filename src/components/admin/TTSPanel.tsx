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
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voiceFilter, setVoiceFilter] = useState<"all" | "en" | "ru">("all");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const visibleVoices = allVoices.filter((v) => {
    if (voiceFilter === "all") return true;
    return v.lang?.toLowerCase().startsWith(voiceFilter);
  });

  const selectedVoiceObj = visibleVoices.find((v) => v.name === selectedVoice);

  const pickDefaultVoice = useCallback(
    (voices: SpeechSynthesisVoice[]) => {
      if (voices.length === 0) return;
      if (selectedVoice && voices.some((v) => v.name === selectedVoice)) return;

      // Prefer Google/Microsoft voices when available
      const preferred =
        voices.find((v) => v.name.includes("Google") || v.name.includes("Microsoft")) ||
        voices[0];
      setSelectedVoice(preferred.name);
    },
    [selectedVoice]
  );

  // Load voices
  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setAllVoices(availableVoices);
  }, []);

  useEffect(() => {
    // Initial load
    loadVoices();
    
    // Chrome loads voices async
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Fallback for browsers that don't fire the event
    const interval = setInterval(() => {
      if (allVoices.length === 0) {
        loadVoices();
      }
    }, 100);

    setTimeout(() => clearInterval(interval), 2000);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
    };
  }, [loadVoices, allVoices.length]);

  // Ensure we always have a selected voice for the current filter
  useEffect(() => {
    pickDefaultVoice(visibleVoices);
  }, [pickDefaultVoice, visibleVoices, voiceFilter]);

  // Preview voice with sample text
  const previewVoice = (voiceName: string) => {
    window.speechSynthesis.cancel();
    
    const voice = visibleVoices.find(v => v.name === voiceName);
    if (!voice) return;

    const sample = voice.lang?.toLowerCase().startsWith("ru")
      ? "Привет! Это пример звучания этого голоса."
      : "Hello! This is a preview of this voice.";

    const utterance = new SpeechSynthesisUtterance(sample);
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

    const voice = selectedVoiceObj;
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
          Озвучка текста (RU/EN)
        </CardTitle>
        <CardDescription>
          Web Speech API — бесплатно, работает в браузере без API ключей
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label>Голос ({visibleVoices.length} доступно)</Label>
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">Язык</Label>
              <select
                className="p-1.5 border rounded-md bg-card text-foreground"
                value={voiceFilter}
                onChange={(e) => setVoiceFilter(e.target.value as typeof voiceFilter)}
              >
                <option value="all">Все</option>
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="flex-1 p-2 border rounded-lg bg-card text-foreground"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              {visibleVoices.length === 0 ? (
                <option>
                  Нет голосов (установите голоса в системе/браузере)
                </option>
              ) : (
                visibleVoices.map((voice) => (
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
              disabled={!selectedVoice || visibleVoices.length === 0}
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
            placeholder="Введите текст на русском или английском..."
            rows={5}
            className="resize-none"
          />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={handleSpeak}
            disabled={ttsLoading || !ttsText.trim() || visibleVoices.length === 0}
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
          Использует встроенный синтез речи браузера. Если список пустой — это значит, что в вашей ОС/браузере не установлены голоса.
        </p>
      </CardContent>
    </Card>
  );
}
