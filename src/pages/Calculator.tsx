import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

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

const Calculator = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    quantity: 1,
    urgency: "standard",
    referenceLink: "",
    budget: [10000, 100000],
    name: "",
    email: "",
    details: "",
  });

  const serviceOptions = [
    { value: "reels" as ServiceType, label: t("calc.reels"), icon: Film, unit: t("calc.videos") },
    { value: "website" as ServiceType, label: t("calc.website"), icon: Globe, unit: t("calc.pages") },
    { value: "ai-bot" as ServiceType, label: t("calc.ai_bot"), icon: Bot, unit: t("calc.scenarios") },
    { value: "content-strategy" as ServiceType, label: t("calc.content_strategy"), icon: BarChart3, unit: t("calc.months") },
    { value: "branding" as ServiceType, label: t("calc.branding"), icon: Palette, unit: t("calc.elements") },
    { value: "consulting" as ServiceType, label: t("calc.consulting"), icon: MessageSquare, unit: t("calc.hours") },
  ];

  const urgencyOptions = [
    { value: "standard", label: t("calc.standard"), description: t("calc.standard_time"), multiplier: 1 },
    { value: "fast", label: t("calc.fast"), description: t("calc.fast_time"), multiplier: 1.3 },
    { value: "urgent", label: t("calc.urgent"), description: t("calc.urgent_time"), multiplier: 1.6 },
  ];

  useSEO({
    title: language === "ru"
      ? "Калькулятор проекта — рассчитать стоимость | Aleksey Taranukha"
      : "Project Calculator — estimate cost | Aleksey Taranukha",
    description: language === "ru"
      ? "Рассчитайте стоимость проекта онлайн: монтаж Reels, AI-бот, сайт под ключ, вайб кодинг."
      : "Calculate your project cost online: Reels editing, AI bot, turnkey website, vibe coding.",
  });

  const getEstimate = () => {
    if (!formData.serviceType) return { range: "—", timeline: "—", complexity: "—" };
    
    const urgencyMultiplier = urgencyOptions.find(u => u.value === formData.urgency)?.multiplier || 1;
    
    let complexity = t("calc.complexity_medium");
    if (formData.quantity > 5) complexity = t("calc.complexity_high");
    if (formData.quantity <= 2) complexity = t("calc.complexity_low");
    
    let timeline = t("calc.standard_time");
    if (formData.urgency === "fast") timeline = t("calc.fast_time");
    if (formData.urgency === "urgent") timeline = t("calc.urgent_time");
    
    const baseEstimates: Record<ServiceType, { min: number; max: number }> = {
      "reels": { min: 5000, max: 15000 },
      "website": { min: 50000, max: 200000 },
      "ai-bot": { min: 30000, max: 150000 },
      "content-strategy": { min: 20000, max: 80000 },
      "branding": { min: 25000, max: 100000 },
      "consulting": { min: 5000, max: 20000 },
    };
    
    const base = baseEstimates[formData.serviceType];
    const min = Math.round(base.min * formData.quantity * urgencyMultiplier / 1000) * 1000;
    const max = Math.round(base.max * formData.quantity * urgencyMultiplier / 1000) * 1000;
    
    const formatPrice = (n: number) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
      if (n >= 1000) return `${Math.round(n / 1000)}K`;
      return n.toString();
    };
    
    return { range: `${formatPrice(min)} — ${formatPrice(max)} ₽`, timeline, complexity };
  };

  const estimate = getEstimate();
  const selectedService = serviceOptions.find(s => s.value === formData.serviceType);

  const handleSubmit = async () => {
    setIsSubmitting(true);
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
        <section className="min-h-[80vh] flex items-center justify-center py-12 sm:py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-scale-in">
                <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 animate-fade-in-up">
                {t("calc.request_sent")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                {t("calc.thanks")}
              </p>
              
              <div className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-lg sm:text-xl font-display font-semibold mb-4 sm:mb-6">{t("calc.your_estimate")}</h2>
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-3xl font-display font-bold text-primary mb-1 sm:mb-2">{estimate.range}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("calc.budget")}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-3xl font-display font-bold text-primary mb-1 sm:mb-2">{estimate.timeline}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("calc.timeline")}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-3xl font-display font-bold text-primary mb-1 sm:mb-2">{estimate.complexity}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("calc.complexity")}</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" onClick={() => { setIsSubmitted(false); setStep(1); }}>
                {t("calc.calculate_another")}
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6 animate-fade-in-up">
              <CalcIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">{t("nav.calculator")}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 animate-fade-in-up">
              {t("calc.title")}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t("calc.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-6 sm:pb-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-medium transition-all text-sm",
                  s === step ? "bg-primary text-primary-foreground scale-110" :
                  s < step ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {s < step ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-5 sm:p-8 rounded-xl sm:rounded-2xl">
              
              {step === 1 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">{t("calc.select_service")}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{t("calc.what_need")}</p>
                  <div className="grid gap-2 sm:gap-3">
                    {serviceOptions.map((service) => (
                      <button
                        key={service.value}
                        onClick={() => setFormData({ ...formData, serviceType: service.value })}
                        className={cn(
                          "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-left",
                          formData.serviceType === service.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors",
                          formData.serviceType === service.value ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <span className="font-medium text-sm sm:text-base">{service.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">{t("calc.volume_timing")}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{t("calc.clarify_details")}</p>
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        {t("calc.quantity")} {selectedService?.unit}: <span className="text-primary font-bold">{formData.quantity}</span>
                      </label>
                      <Slider value={[formData.quantity]} onValueChange={([v]) => setFormData({ ...formData, quantity: v })} min={1} max={20} step={1} className="py-4" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">{t("calc.urgency")}</label>
                      <div className="grid gap-2 sm:gap-3">
                        {urgencyOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFormData({ ...formData, urgency: option.value as any })}
                            className={cn(
                              "flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all",
                              formData.urgency === option.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Clock className={cn("h-4 w-4 sm:h-5 sm:w-5", formData.urgency === option.value ? "text-primary" : "text-muted-foreground")} />
                              <span className="font-medium text-sm sm:text-base">{option.label}</span>
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground">{option.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">{t("calc.references_budget")}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{t("calc.help_understand")}</p>
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("calc.reference_link")}</label>
                      <Input placeholder={t("calc.reference_placeholder")} value={formData.referenceLink} onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })} />
                      <p className="text-xs text-muted-foreground mt-2">{t("calc.reference_hint")}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">{t("calc.budget_range")}: <span className="text-primary font-bold">{formData.budget[0] >= 1000 ? `${(formData.budget[0] / 1000).toFixed(0)}K` : formData.budget[0]} — {formData.budget[1] >= 500000 ? "500K+" : `${(formData.budget[1] / 1000).toFixed(0)}K`} ₽</span></label>
                      <Slider value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })} min={1000} max={500000} step={1000} className="py-4" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fade-in-up">
                  <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">{t("calc.your_contacts")}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{t("calc.for_proposal")}</p>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("calc.your_name")} *</label>
                      <Input placeholder={t("contact.name_placeholder")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("calc.your_email")} *</label>
                      <Input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t("calc.additional_details")}</label>
                      <Textarea placeholder={t("calc.additional_placeholder")} rows={4} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <h3 className="font-display font-semibold text-sm sm:text-base">{t("calc.preliminary_estimate")}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                      <div>
                        <div className="text-lg sm:text-2xl font-display font-bold text-primary">{estimate.range}</div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t("calc.budget")}</p>
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-display font-bold text-primary">{estimate.timeline}</div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t("calc.timeline")}</p>
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-display font-bold text-primary">{estimate.complexity}</div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t("calc.complexity")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
                <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 1} className="text-sm sm:text-base">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("calc.back")}
                </Button>
                {step < 4 ? (
                  <Button variant="hero" onClick={() => setStep(step + 1)} disabled={!canProceed()} className="text-sm sm:text-base">
                    {t("calc.next")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className="text-sm sm:text-base">
                    {isSubmitting ? t("calc.getting_estimate") : t("calc.get_estimate")}
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
