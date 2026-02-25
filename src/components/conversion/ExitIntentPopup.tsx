import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExitIntent } from "@/hooks/useExitIntent";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const TIMER_DURATION = 15 * 60; // 15 minutes in seconds

function CountdownTimer() {
  const [seconds, setSeconds] = useState(TIMER_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isUrgent = seconds < 5 * 60; // last 5 minutes

  return (
    <div className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg ${isUrgent ? "bg-destructive/10 border border-destructive/20" : "bg-primary/5 border border-primary/10"} transition-colors`}>
      <Clock className={`h-4 w-4 ${isUrgent ? "text-destructive animate-pulse" : "text-primary"}`} />
      <span className={`text-xs font-medium ${isUrgent ? "text-destructive" : "text-muted-foreground"}`}>
        Предложение действует:
      </span>
      <div className="flex items-center gap-1 font-mono">
        <span className={`text-lg font-bold tabular-nums ${isUrgent ? "text-destructive" : "text-foreground"}`}>
          {String(mins).padStart(2, "0")}
        </span>
        <span className={`text-lg font-bold ${isUrgent ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>:</span>
        <span className={`text-lg font-bold tabular-nums ${isUrgent ? "text-destructive" : "text-foreground"}`}>
          {String(secs).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function ExitIntentPopup() {
  const { showPopup, closePopup } = useExitIntent({ delayMs: 30000 });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            name: "Попап-заявка",
            contact: email.trim(),
            message: "Заявка из exit-intent попапа (15 мин оффер)",
            source_page: "exit-popup",
          }),
        }
      );

      if (response.ok) {
        toast.success(t("popup.success"));
      } else {
        toast.error("Ошибка при отправке. Попробуйте позже.");
      }
    } catch {
      toast.error("Ошибка сети. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
      closePopup();
    }
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            onClick={closePopup}
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-x-0 bottom-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[60] sm:w-[90vw] sm:max-w-md"
          >
            <div className="relative rounded-t-2xl sm:rounded-2xl border border-border/60 bg-card p-5 pb-8 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
              <button
                onClick={closePopup}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label={t("popup.close")}
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10">
                  <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold">
                    {t("popup.title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("popup.consultation")}
                  </p>
                </div>
              </div>

              <CountdownTimer />

              <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 mb-4 sm:mb-5 leading-relaxed">
                {t("popup.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <Input
                  type="text"
                  placeholder="Email, Telegram или телефон"
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
                    t("popup.sending")
                  ) : (
                    <>
                      {t("popup.cta")}
                      <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">
                {t("popup.no_spam")}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
