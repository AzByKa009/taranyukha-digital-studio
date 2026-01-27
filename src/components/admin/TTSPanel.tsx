import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Volume2, Loader2, Play, Square, Headphones, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export default function TTSPanel() {
  const [ttsText, setTtsText] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voiceFilter, setVoiceFilter] = useState<"all" | "en" | "ru">("all");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Filter voices - handle different lang code formats (en, en-US, en_US, etc.)
  const visibleVoices = allVoices.filter((v) => {
    if (voiceFilter === "all") return true;
    const lang = (v.lang || "").toLowerCase().replace("_", "-");
    return lang.startsWith(voiceFilter);
  });

  // Count by language for debug info
  const langCounts = allVoices.reduce((acc, v) => {
    const lang = (v.lang || "unknown").split(/[-_]/)[0].toLowerCase();
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const selectedVoiceObj = visibleVoices.find((v) => v.name === selectedVoice);

  const pickDefaultVoice = useCallback(
    (voices: SpeechSynthesisVoice[]) => {
      if (voices.length === 0) return;
      if (selectedVoice && voices.some((v) => v.name === selectedVoice)) return;

      // Prefer Google/Microsoft/Apple voices when available
      const preferred =
        voices.find((v) => 
          v.name.includes("Google") || 
          v.name.includes("Microsoft") ||
          v.name.includes("Samantha") ||
          v.name.includes("Alex")
        ) || voices[0];
      setSelectedVoice(preferred.name);
    },
    [selectedVoice]
  );

  // Load voices
  const loadVoices = useCallback(() => {
    if (!window.speechSynthesis) {
      console.error("Speech Synthesis not supported");
      return;
    }
    const availableVoices = window.speechSynthesis.getVoices();
    console.log("Loaded voices:", availableVoices.length, availableVoices.map(v => `${v.name} (${v.lang})`));
    setAllVoices(availableVoices);
  }, []);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!window.speechSynthesis) {
      toast.error("Ваш браузер не поддерживает синтез речи");
      return;
    }

    // Initial load
    loadVoices();
    
    // Chrome loads voices async
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Fallback polling for browsers that don't fire the event
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAllVoices(voices);
        clearInterval(interval);
      }
      if (attempts > 50) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [loadVoices]);

  // Ensure we always have a selected voice for the current filter
  useEffect(() => {
    pickDefaultVoice(visibleVoices);
  }, [pickDefaultVoice, visibleVoices, voiceFilter]);

  // Manual refresh
  const handleRefreshVoices = () => {
    loadVoices();
    toast.success(`Загружено ${window.speechSynthesis.getVoices().length} голосов`);
  };

  // Preview voice with sample text
  const previewVoice = (voiceName: string) => {
    window.speechSynthesis.cancel();
    
    const voice = visibleVoices.find(v => v.name === voiceName);
    if (!voice) return;

    const lang = (voice.lang || "").toLowerCase();
    const sample = lang.startsWith("ru")
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
            <Label>Голос ({visibleVoices.length} из {allVoices.length})</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshVoices}
                title="Обновить список голосов"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <select
                className="p-1.5 border rounded-md bg-card text-foreground"
                value={voiceFilter}
                onChange={(e) => setVoiceFilter(e.target.value as typeof voiceFilter)}
              >
                <option value="all">Все ({allVoices.length})</option>
                <option value="ru">RU ({langCounts["ru"] || 0})</option>
                <option value="en">EN ({langCounts["en"] || 0})</option>
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
                  Нет голосов для выбранного языка
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

        {/* Debug Info */}
        <div className="border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className="gap-2 text-muted-foreground"
          >
            {showDebug ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Отладка ({allVoices.length} голосов в системе)
          </Button>
          
          {showDebug && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg text-xs space-y-2">
              <p><strong>Голоса по языкам:</strong></p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(langCounts).sort((a, b) => b[1] - a[1]).map(([lang, count]) => (
                  <span key={lang} className="px-2 py-1 bg-card rounded border">
                    {lang.toUpperCase()}: {count}
                  </span>
                ))}
              </div>
              
              {allVoices.length === 0 && (
                <div className="mt-3 p-3 bg-destructive/10 rounded text-destructive">
                  <p><strong>Голоса не найдены!</strong></p>
                  <p className="mt-1">Возможные причины:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>В системе не установлены голоса TTS</li>
                    <li>Браузер не поддерживает Web Speech API</li>
                    <li>Попробуйте другой браузер (Chrome рекомендуется)</li>
                  </ul>
                  <p className="mt-2"><strong>Windows:</strong> Параметры → Время и язык → Речь → Добавить голоса</p>
                  <p><strong>macOS:</strong> Системные настройки → Универсальный доступ → Речь</p>
                </div>
              )}
              
              <p className="text-muted-foreground mt-2">
                Web Speech API — единственный бесплатный вариант без API-ключей. 
                Для профессиональных голосов нужен ElevenLabs API.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
