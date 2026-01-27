import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MapPin, 
  Send, 
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Target,
  Calendar,
  Clock,
  Handshake,
  Rocket
} from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Contacts = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    task: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workProcess = [
    {
      step: "01",
      title: t("contacts.step1_title"),
      description: t("contacts.step1_desc"),
      icon: Handshake,
    },
    {
      step: "02",
      title: t("contacts.step2_title"),
      description: t("contacts.step2_desc"),
      icon: FileText,
    },
    {
      step: "03",
      title: t("contacts.step3_title"),
      description: t("contacts.step3_desc"),
      icon: Rocket,
    },
  ];

  const whatToPrepare = [
    {
      icon: Target,
      title: t("contacts.prepare1_title"),
      description: t("contacts.prepare1_desc"),
    },
    {
      icon: Calendar,
      title: t("contacts.prepare2_title"),
      description: t("contacts.prepare2_desc"),
    },
    {
      icon: FileText,
      title: t("contacts.prepare3_title"),
      description: t("contacts.prepare3_desc"),
    },
  ];

  useSEO({
    title: language === "ru"
      ? "Контакты — заказать AI-продукт, монтаж, сайт | Aleksey Taranukha"
      : "Contact — order AI product, editing, website | Aleksey Taranukha",
    description: language === "ru"
      ? "Свяжитесь для обсуждения проекта: AI-продукты, монтаж вертикальных видео, вайб кодинг, премиальный лендинг. Ответ в течение 24 часов."
      : "Contact to discuss your project: AI products, vertical video editing, vibe coding, premium landing. Response within 24 hours.",
    keywords: "контакты, заказать монтаж Reels, заказать AI продукт, заказать сайт под ключ, вайб кодинг заказать",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Contact form submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success(t("contact.success"));
    setFormData({ name: "", contact: "", task: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-14">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-5 animate-fade-in-up">
              {t("contacts.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              {t("contacts.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="pb-10 sm:pb-14">
        <div className="container">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <a
              href="https://t.me/azbyka009"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/20 hover:bg-[#229ED9]/15 hover:border-[#229ED9]/40 transition-all duration-400"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#229ED9] flex items-center justify-center shadow-lg shadow-[#229ED9]/30">
                <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">{t("contacts.telegram")}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t("contacts.telegram_desc")}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300 ml-auto" />
            </a>

            <a
              href="https://www.instagram.com/azbyka.offical"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#833AB4]/20 hover:from-[#833AB4]/15 hover:via-[#FD1D1D]/15 hover:to-[#F77737]/15 transition-all duration-400"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center shadow-lg shadow-[#FD1D1D]/30">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">{t("contacts.instagram")}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t("contacts.instagram_desc")}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300 ml-auto" />
            </a>

            <a
              href="mailto:taranyha1245@gmail.com"
              className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 hover:border-primary/40 transition-all duration-400"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">Email</div>
                <div className="text-xs sm:text-sm text-muted-foreground">taranyha1245@gmail.com</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300 ml-auto" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="pb-16 sm:pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <form onSubmit={handleSubmit} className="premium-card p-5 sm:p-8 md:p-10">
                <h2 className="text-xl sm:text-2xl font-display font-semibold mb-1 sm:mb-2">
                  {t("contacts.leave_request")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {t("contacts.leave_request_desc")}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
                      {t("contacts.your_name")} *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("contact.name_placeholder")}
                      required
                      maxLength={100}
                      className="bg-background/60 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
                      {t("contacts.how_contact")} *
                    </label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder={t("contacts.contact_placeholder")}
                      required
                      maxLength={100}
                      className="bg-background/60 border-border/50 h-11 sm:h-12 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="mb-6 sm:mb-8">
                  <label htmlFor="task" className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
                    {t("contacts.about_task")} *
                  </label>
                  <Textarea
                    id="task"
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                    placeholder={t("contacts.task_placeholder")}
                    rows={5}
                    required
                    maxLength={2000}
                    className="bg-background/60 border-border/50 resize-none text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-2 sm:mt-2.5">
                    {t("contacts.detail_hint")}
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full shadow-xl shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contacts.sending") : t("contacts.send_request")}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="premium-card p-5 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm sm:text-base">{t("contacts.response_time")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("contacts.up_to_24h")}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("contacts.response_note")}
                </p>
              </div>
              
              <div className="premium-card p-5 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm sm:text-base">{t("contacts.location")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("contacts.remote")}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t("contacts.location_note")}
                </p>
              </div>
              
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1 sm:mb-1.5 text-sm sm:text-base">{t("contacts.no_obligation")}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t("contacts.no_obligation_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Work Happens */}
      <section className="py-16 sm:py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("contacts.how_work")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("contacts.how_work_subtitle")}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 max-w-4xl mx-auto">
            {workProcess.map((item, index) => (
              <div 
                key={item.step}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < workProcess.length - 1 && (
                  <div className="hidden sm:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                )}
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-primary/10">
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-2.5">{t("contacts.step")} {item.step}</div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-2.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Prepare */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("contacts.what_to_prepare")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("contacts.what_to_prepare_subtitle")}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {whatToPrepare.map((item, index) => (
              <div 
                key={item.title}
                className="premium-card p-5 sm:p-7 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-semibold mb-2 sm:mb-2.5">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-10">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("contacts.dont_worry")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
