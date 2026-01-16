import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ClipboardList, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

const budgetOptions = [
  "До 50 000 ₽",
  "50 000 - 150 000 ₽",
  "150 000 - 500 000 ₽",
  "500 000+ ₽",
  "Пока не определён"
];

const AIAudit = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    businessType: "",
    currentProcesses: "",
    painPoints: "",
    budget: "",
    goals: ""
  });

  useEffect(() => {
    document.title = "AI-аудит — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Бесплатный AI-аудит вашего бизнеса. Получите персонализированный план автоматизации."
    );
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-audit', {
        body: formData
      });

      if (error) throw error;
      
      if (data.plan) {
        setPlan(data.plan);
        setStep(6);
        toast.success("План автоматизации готов!");
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error generating audit:", error);
      toast.error("Не удалось сгенерировать план. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.businessType.length > 10;
      case 2: return formData.currentProcesses.length > 20;
      case 3: return formData.painPoints.length > 20;
      case 4: return formData.budget !== "";
      case 5: return formData.goals.length > 10;
      default: return false;
    }
  };

  return (
    <Layout>
      {/* Back link */}
      <div className="container pt-8">
        <Link 
          to="/ai-products" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          AI-продукты
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-fade-in">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 animate-fade-in-up">
              Бесплатный AI-аудит
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Ответьте на 5 вопросов о вашем бизнесе, и AI подготовит персонализированный план автоматизации
            </p>
          </div>
        </div>
      </section>

      {/* Form or Result */}
      <section className="pb-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {step < 6 ? (
              <>
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`h-2 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Form Steps */}
                <div className="glass-card rounded-2xl p-8">
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="text-lg font-display font-semibold mb-2 block">
                          1. Расскажите о вашем бизнесе
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Чем занимается компания, какой продукт/услуга, сколько человек в команде
                        </p>
                        <Textarea
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          placeholder="Например: Маркетинговое агентство, 15 человек. Занимаемся SMM и таргетированной рекламой для e-commerce..."
                          rows={4}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="text-lg font-display font-semibold mb-2 block">
                          2. Какие процессы сейчас занимают больше всего времени?
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Опишите рутинные задачи, которые хотелось бы автоматизировать
                        </p>
                        <Textarea
                          value={formData.currentProcesses}
                          onChange={(e) => setFormData({ ...formData, currentProcesses: e.target.value })}
                          placeholder="Например: Обработка заявок из форм, подготовка отчётов для клиентов, согласование контент-планов..."
                          rows={4}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="text-lg font-display font-semibold mb-2 block">
                          3. Какие боли и проблемы есть сейчас?
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Что мешает расти, где теряете деньги или время
                        </p>
                        <Textarea
                          value={formData.painPoints}
                          onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                          placeholder="Например: Теряем лиды из-за медленной обработки, команда тратит много времени на рутину, сложно масштабироваться..."
                          rows={4}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="text-lg font-display font-semibold mb-2 block">
                          4. Какой бюджет на автоматизацию?
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Примерный бюджет на внедрение решений
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {budgetOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => setFormData({ ...formData, budget: option })}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                formData.budget === option
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-background/50 hover:border-primary/50"
                              }`}
                            >
                              <span className="font-medium">{option}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="text-lg font-display font-semibold mb-2 block">
                          5. Какие цели хотите достичь?
                        </label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Что должно измениться после внедрения автоматизации
                        </p>
                        <Textarea
                          value={formData.goals}
                          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                          placeholder="Например: Сократить время на рутину на 50%, обрабатывать в 2 раза больше клиентов той же командой..."
                          rows={4}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      variant="ghost"
                      onClick={prevStep}
                      disabled={step === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Назад
                    </Button>
                    
                    <Button
                      variant="hero"
                      onClick={nextStep}
                      disabled={!canProceed() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Генерирую план...
                        </>
                      ) : step === 5 ? (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Получить план
                        </>
                      ) : (
                        <>
                          Далее
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              // Result
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold">Ваш план автоматизации готов</h2>
                    <p className="text-sm text-muted-foreground">Персонализированные рекомендации на основе ваших ответов</p>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-8 prose prose-invert max-w-none">
                  <ReactMarkdown>{plan || ""}</ReactMarkdown>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Хотите внедрить эти решения?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Обсудим детали и поможем реализовать план автоматизации
                  </p>
                  <Link to="/contacts">
                    <Button variant="hero">
                      Обсудить внедрение
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIAudit;
