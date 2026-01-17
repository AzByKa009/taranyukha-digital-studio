import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, CheckCircle2, Send } from "lucide-react";

type ServiceType = "reels" | "website" | "ai-bot" | "consulting" | "";
type UrgencyType = "standard" | "fast" | "urgent" | "";

const Blog = () => {
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [quantity, setQuantity] = useState<string>("");
  const [urgency, setUrgency] = useState<UrgencyType>("");
  const [exampleLink, setExampleLink] = useState("");
  const [budget, setBudget] = useState(50);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimate, setEstimate] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Калькулятор проекта — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Рассчитайте стоимость проекта: Reels, сайты, AI-боты и консалтинг. Получите предварительную оценку онлайн."
    );
  }, []);

  const serviceOptions = [
    { value: "reels", label: "Reels / Вертикальное видео" },
    { value: "website", label: "Сайт / Лендинг" },
    { value: "ai-bot", label: "AI-бот / Автоматизация" },
    { value: "consulting", label: "Консалтинг / Аудит" },
  ];

  const urgencyOptions = [
    { value: "standard", label: "Стандартно (2-4 недели)" },
    { value: "fast", label: "Быстро (1-2 недели)" },
    { value: "urgent", label: "Срочно (до 1 недели)" },
  ];

  const calculateEstimate = () => {
    if (!serviceType || !quantity || !urgency) return null;

    const qty = parseInt(quantity) || 1;
    let baseText = "";
    let timeText = "";

    switch (serviceType) {
      case "reels":
        baseText = qty <= 5 ? "Базовый пакет" : qty <= 15 ? "Стандартный пакет" : "Премиум пакет";
        break;
      case "website":
        baseText = qty <= 3 ? "Лендинг" : qty <= 10 ? "Многостраничный сайт" : "Корпоративный портал";
        break;
      case "ai-bot":
        baseText = qty <= 3 ? "Базовый бот" : "Продвинутая автоматизация";
        break;
      case "consulting":
        baseText = qty <= 2 ? "Экспресс-аудит" : "Полный консалтинг";
        break;
    }

    switch (urgency) {
      case "standard":
        timeText = "стандартные сроки";
        break;
      case "fast":
        timeText = "ускоренная работа (+20-30% к стоимости)";
        break;
      case "urgent":
        timeText = "срочная работа (+50% к стоимости)";
        break;
    }

    return `${baseText} • ${timeText}`;
  };

  const handleCalculate = () => {
    const result = calculateEstimate();
    setEstimate(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="pt-20 pb-32">
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-fade-in-up">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Заявка отправлена!
              </h1>
              <p className="text-lg text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Спасибо за интерес к сотрудничеству. Я свяжусь с вами в ближайшее время 
                для обсуждения деталей проекта.
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" className="shadow-xl shadow-primary/20">
                    Написать в Telegram
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
                <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)}>
                  Новый расчёт
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-fade-in-up">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Рассчитать проект
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Заполните форму, чтобы получить предварительную оценку. 
              После отправки я свяжусь с вами для уточнения деталей.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="container">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="premium-card p-8 md:p-10 space-y-8">
              
              {/* Service Type */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Тип услуги
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                >
                  <option value="">Выберите услугу</option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Количество {serviceType === "reels" ? "видео" : serviceType === "website" ? "страниц" : serviceType === "ai-bot" ? "ботов/интеграций" : "часов консалтинга"}
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Например: 10"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              {/* Urgency */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Срочность
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as UrgencyType)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                >
                  <option value="">Выберите сроки</option>
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Example Link */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Ссылка-пример <span className="text-muted-foreground">(опционально)</span>
                </label>
                <input
                  type="url"
                  value={exampleLink}
                  onChange={(e) => setExampleLink(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <p className="text-xs text-muted-foreground">
                  Ссылка на похожий проект или референс, который вам нравится
                </p>
              </div>

              {/* Budget Range */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Бюджет: <span className="text-primary font-semibold">{budget}K ₽</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10K ₽</span>
                  <span>250K ₽</span>
                  <span>500K ₽</span>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleCalculate}
                  disabled={!serviceType || !quantity || !urgency}
                >
                  Показать предварительную оценку
                </Button>
              </div>

              {/* Estimate Result */}
              {estimate && (
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 animate-fade-in-up">
                  <p className="text-sm text-muted-foreground mb-1">Предварительная оценка:</p>
                  <p className="text-lg font-medium text-foreground">{estimate}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Точная стоимость будет определена после обсуждения деталей
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full shadow-lg shadow-primary/20"
                >
                  <Send className="h-5 w-5" />
                  Отправить заявку
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 border-t border-border/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold mb-4">
              Как это работает?
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Заполняете форму с параметрами проекта
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Я связываюсь для уточнения деталей
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Получаете точное КП и сроки
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
