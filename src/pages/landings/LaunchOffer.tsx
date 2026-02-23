import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";
import { Globe, Video, Cpu, Clock, ArrowRight, Sparkles, Check, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LaunchOffer = () => {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: "Запуск под ключ за 14 дней | Сайт + Видео + Автоматизация",
    description: "Полный пакет для запуска бизнеса в digital: сайт, 5 вертикальных видео, CRM и AI-автоматизация. Старт от 14 дней.",
    keywords: "запуск бизнеса, сайт под ключ, автоматизация бизнеса, AI автоматизация, видео для бизнеса",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            contact: formData.contact.trim(),
            message: formData.message.trim() || null,
            source_page: "🚀 Запуск под ключ",
            website: honeypot,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed");
      toast.success("Заявка отправлена! Свяжемся в течение 24 часов.");
      setFormData({ name: "", contact: "", message: "" });
    } catch {
      toast.error("Ошибка отправки. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const packageItems = [
    { icon: Globe, title: "Сайт", desc: "Премиальный лендинг или многостраничник с SEO" },
    { icon: Video, title: "5 видео", desc: "Вертикальные ролики для соцсетей и рекламы" },
    { icon: Cpu, title: "Автоматизация", desc: "CRM, чат-бот, воронка — всё под ключ" },
    { icon: Clock, title: "14 дней", desc: "Полный запуск от стратегии до результата" },
  ];

  const included = [
    "Аудит текущей ситуации",
    "Разработка стратегии",
    "Дизайн и вёрстка сайта",
    "Съёмка и монтаж видео",
    "Настройка CRM-системы",
    "AI-автоматизация процессов",
    "Тестирование и запуск",
    "Поддержка после запуска",
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-[150px]" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 bg-foreground/5 text-sm font-medium mb-8">
                <Rocket className="w-4 h-4" />
                Комплексный запуск
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6">
                Запуск бизнеса{" "}
                <span className="text-gradient">под ключ</span>
                <br />за 14 дней
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Сайт, видеоконтент и AI-автоматизация в одном пакете. 
                Вы получаете готовую систему привлечения клиентов.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <a href="#form">
                <motion.div
                  whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                  whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
                  className="inline-block"
                >
                  <Button variant="hero" size="lg" className="shadow-[0_0_30px_-5px_hsl(0_0%_100%/0.12)]">
                    Оставить заявку
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Package */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Что входит в пакет
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
            {packageItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 sm:p-8 rounded-2xl border border-foreground/15 bg-card hover:border-foreground/25 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Included checklist */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-10 text-center">
                Полный список работ
              </h2>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-2 gap-3 sm:gap-4" staggerDelay={0.06}>
              {included.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-foreground/10 bg-card/50">
                    <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-foreground/70" />
                    </div>
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="py-20 sm:py-28 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.02] rounded-full blur-[200px]" />
        
        <div className="container relative z-10">
          <div className="max-w-xl mx-auto">
            <FadeIn>
              <div className="relative rounded-2xl border border-foreground/20 bg-card shadow-[0_0_60px_-15px_hsl(0_0%_100%/0.08)] overflow-hidden">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
                
                <div className="p-8 sm:p-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/15 bg-foreground/5 text-xs font-medium mb-4">
                      <Sparkles className="w-3 h-3" />
                      Запуск под ключ
                    </div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold mb-2">
                      Оставьте заявку
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Расскажите о проекте — свяжемся в течение 24 часов
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 pointer-events-none h-0 w-0"
                      aria-hidden="true"
                    />
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={50}
                      className="bg-background/50 h-12"
                    />
                    <Input
                      type="text"
                      placeholder="Telegram, WhatsApp или телефон"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                      maxLength={100}
                      className="bg-background/50 h-12"
                    />
                    <Textarea
                      placeholder="Кратко опишите ваш проект (необязательно)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      maxLength={2000}
                      rows={3}
                      className="bg-background/50 resize-none"
                    />
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full shadow-[0_0_20px_-5px_hsl(0_0%_100%/0.1)]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LaunchOffer;
