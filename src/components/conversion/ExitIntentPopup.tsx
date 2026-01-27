import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExitIntent } from "@/hooks/useExitIntent";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export function ExitIntentPopup() {
  const { showPopup, closePopup } = useExitIntent({ delayMs: 8000 });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(language === "ru" ? "Отлично! Свяжусь с вами в ближайшее время" : "Great! I'll contact you soon");
    setIsSubmitting(false);
    closePopup();
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={closePopup}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] sm:w-[90vw] max-w-md px-4 sm:px-0"
          >
            <div className="relative rounded-xl sm:rounded-2xl border border-border/60 bg-card p-5 sm:p-8 shadow-2xl">
              <button
                onClick={closePopup}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label={language === "ru" ? "Закрыть" : "Close"}
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10">
                  <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold">
                    {t("popup.title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {language === "ru" ? "Бесплатная консультация" : "Free consultation"}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {t("popup.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <Input
                  type="email"
                  placeholder={language === "ru" ? "Ваш email" : "Your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={100}
                  className="bg-background/50 h-10 sm:h-12 text-sm sm:text-base"
                />
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    language === "ru" ? "Отправка..." : "Sending..."
                  ) : (
                    <>
                      {t("popup.cta")}
                      <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">
                {language === "ru" ? "Никакого спама — только полезные материалы" : "No spam — only useful content"}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
