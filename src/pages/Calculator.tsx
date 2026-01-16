import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator as CalcIcon, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Clock, 
  Sparkles,
  MessageSquare,
  Film,
  Globe,
  Bot,
  Palette,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceType = "reels" | "website" | "ai-bot" | "content-strategy" | "branding" | "consulting";

interface FormData {
  serviceType: ServiceType | "";
  quantity: number;
  urgency: "standard" | "fast" | "urgent";
  referenceLink: string;
  budget: number[];
  name: string;
  email: string;
  details: string;
}

const serviceOptions: { value: ServiceType; label: string; icon: React.ElementType; unit: string }[] = [
  { value: "reels", label: "Монтаж Reels / видео", icon: Film, unit: "видео" },
  { value: "website", label: "Разработка сайта", icon: Globe, unit: "страниц" },
  { value: "ai-bot", label: "AI-бот / автоматизация", icon: Bot, unit: "сценариев" },
  { value: "content-strategy", label: "Контент-стратегия", icon: BarChart3, unit: "месяцев" },
  { value: "branding", label: "Брендинг / дизайн", icon: Palette, unit: "элементов" },
  { value: "consulting", label: "Консалтинг", icon: MessageSquare, unit: "часов" },
];

const urgencyOptions = [
  { value: "standard", label: "Стандартный", description: "2-4 недели", multiplier: 1 },
  { value: "fast", label: "Ускоренный", description: "1-2 недели", multiplier: 1.3 },
  { value: "urgent", label: "Срочный", description: "до 1 недели", multiplier: 1.6 },
];

const getEstimate = (data: FormData): { range: string; timeline: string; complexity: string } => {
  if (!data.serviceType) return { range: "—", timeline: "—", complexity: "—" };
  
  const urgencyMultiplier = urgencyOptions.find(u => u.value === data.urgency)?.multiplier || 1;
  const budgetMid = (data.budget[0] + data.budget[1]) / 2;
  
  let complexity = "Средняя";
  if (data.quantity > 5) complexity = "Высокая";
  if (data.quantity <= 2) complexity = "Низкая";
  
  let timeline = "2-4 недели";
  if (data.urgency === "fast") timeline = "1-2 недели";
  if (data.urgency === "urgent") timeline = "3-7 дней";
  
  const baseEstimates: Record<ServiceType, { min: number; max: number }> = {
    "reels": { min: 5000, max: 15000 },
    "website": { min: 50000, max: 200000 },
    "ai-bot": { min: 30000, max: 150000 },
    "content-strategy": { min: 20000, max: 80000 },
    "branding": { min: 25000, max: 100000 },
    "consulting": { min: 5000, max: 20000 },
  };
  
  const base = baseEstimates[data.serviceType];
  const min = Math.round(base.min * data.quantity * urgencyMultiplier / 1000) * 1000;
  const max = Math.round(base.max * data.quantity * urgencyMultiplier / 1000) * 1000;
  
  const formatPrice = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${Math.round(n / 1000)}K`;
    return n.toString();
  };
  
  return {
    range: `${formatPrice(min)} — ${formatPrice(max)} ₽`,
    timeline,
    complexity,
  };
};

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    quantity: 1,
    urgency: "standard",
    referenceLink: "",
    budget: [50000, 150000],
    name: "",
    email: "",
    details: "",
  });

  useEffect(() => {
    document.title = "Рассчитать проект — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Калькулятор стоимости проекта. Получите предварительную оценку для вашего проекта: видео, сайт, AI-бот, контент-стратегия."
    );
  }, []);

  const estimate = getEstimate(formData);
  const selectedService = serviceOptions.find(s => s.value === formData.serviceType);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call / save to database
    console.log("Form submitted:", formData);
    console.log("Estimate:", estimate);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.serviceType;
      case 2: return formData.quantity > 0;
      case 3: return true;
      case 4: return formData.name && formData.email;
      default: return true;
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 animate-scale-in">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-fade-in-up">
                Заявка отправлена!
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Спасибо за интерес к сотрудничеству. Я свяжусь с вами в течение 24 часов для обсуждения деталей.
              </p>
              
              <div className="glass-card p-8 rounded-2xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-xl font-display font-semibold mb-6">Ваша предварительная оценка</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">{estimate.range}</div>
                    <p className="text-muted-foreground">Бюджет</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">{estimate.timeline}</div>
                    <p className="text-muted-foreground">Сроки</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">{estimate.complexity}</div>
                    <p className="text-muted-foreground">Сложность</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-display font-semibold mb-4">Что дальше?</h3>
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">1</span>
                    </div>
                    <p className="text-muted-foreground">Я изучу вашу заявку и подготовлю детальное предложение</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">2</span>
                    </div>
                    <p className="text-muted-foreground">Созвонимся для обсуждения деталей и уточнения требований</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-medium">3</span>
                    </div>
                    <p className="text-muted-foreground">Согласуем финальную стоимость, сроки и приступим к работе</p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-8"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setFormData({
                    serviceType: "",
                    quantity: 1,
                    urgency: "standard",
                    referenceLink: "",
                    budget: [50000, 150000],
                    name: "",
                    email: "",
                    details: "",
                  });
                }}
              >
                Рассчитать другой проект
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in-up">
              <CalcIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Калькулятор проекта</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 animate-fade-in-up">
              Рассчитать проект
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Заполните бриф и получите предварительную оценку стоимости и сроков
            </p>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="pb-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full font-medium transition-all",
                    s === step ? "bg-primary text-primary-foreground scale-110" :
                    s < step ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  )}
                >
                  {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 rounded-2xl">
              
              {/* Step 1: Service Type */}
              {step === 1 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-display font-bold mb-2">Выберите тип услуги</h2>
                  <p className="text-muted-foreground mb-6">Что вам нужно?</p>
                  
                  <div className="grid gap-3">
                    {serviceOptions.map((service) => (
                      <button
                        key={service.value}
                        onClick={() => setFormData({ ...formData, serviceType: service.value })}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                          formData.serviceType === service.value 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50 hover:bg-card/50"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          formData.serviceType === service.value ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <service.icon className="h-6 w-6" />
                        </div>
                        <span className="font-medium">{service.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Quantity & Urgency */}
              {step === 2 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-display font-bold mb-2">Объём и сроки</h2>
                  <p className="text-muted-foreground mb-6">Уточните детали проекта</p>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Количество {selectedService?.unit || "единиц"}: <span className="text-primary font-bold">{formData.quantity}</span>
                      </label>
                      <Slider
                        value={[formData.quantity]}
                        onValueChange={([value]) => setFormData({ ...formData, quantity: value })}
                        min={1}
                        max={20}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1</span>
                        <span>20+</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3">Срочность</label>
                      <div className="grid gap-3">
                        {urgencyOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFormData({ ...formData, urgency: option.value as any })}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                              formData.urgency === option.value 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Clock className={cn(
                                "h-5 w-5",
                                formData.urgency === option.value ? "text-primary" : "text-muted-foreground"
                              )} />
                              <span className="font-medium">{option.label}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{option.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Reference & Budget */}
              {step === 3 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-display font-bold mb-2">Референсы и бюджет</h2>
                  <p className="text-muted-foreground mb-6">Помогите мне лучше понять задачу</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ссылка на пример (необязательно)</label>
                      <Input 
                        placeholder="https://example.com или ссылка на видео"
                        value={formData.referenceLink}
                        onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Покажите, что вам нравится — это поможет точнее оценить проект
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Планируемый бюджет: <span className="text-primary font-bold">{(formData.budget[0] / 1000).toFixed(0)}K — {(formData.budget[1] / 1000).toFixed(0)}K ₽</span>
                      </label>
                      <Slider
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        min={10000}
                        max={500000}
                        step={10000}
                        className="py-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>10K ₽</span>
                        <span>500K+ ₽</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Details */}
              {step === 4 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-display font-bold mb-2">Контактные данные</h2>
                  <p className="text-muted-foreground mb-6">Как с вами связаться?</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                      <Input 
                        placeholder="Как к вам обращаться?"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input 
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Дополнительные детали</label>
                      <Textarea 
                        placeholder="Расскажите подробнее о проекте, если хотите..."
                        rows={4}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  {/* Preview estimate */}
                  <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-display font-semibold">Предварительная оценка</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-display font-bold text-primary">{estimate.range}</div>
                        <p className="text-sm text-muted-foreground">Бюджет</p>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-primary">{estimate.timeline}</div>
                        <p className="text-sm text-muted-foreground">Сроки</p>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-primary">{estimate.complexity}</div>
                        <p className="text-sm text-muted-foreground">Сложность</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      * Финальная стоимость определяется после обсуждения деталей
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад
                </Button>
                
                {step < 4 ? (
                  <Button
                    variant="hero"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                  >
                    Далее
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    disabled={!canProceed() || isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calculator;
