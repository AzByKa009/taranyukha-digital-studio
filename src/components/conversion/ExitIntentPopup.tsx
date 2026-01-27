import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExitIntent } from "@/hooks/useExitIntent";
import { toast } from "sonner";

export function ExitIntentPopup() {
  const { showPopup, closePopup } = useExitIntent({ delayMs: 8000 });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Отлично! Свяжусь с вами в ближайшее время");
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md"
          >
            <div className="relative rounded-2xl border border-border/60 bg-card p-8 shadow-2xl">
              <button
                onClick={closePopup}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">
                    Подождите!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Бесплатная консультация
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Получите бесплатный разбор вашего проекта и рекомендации по внедрению AI-решений
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={100}
                  className="bg-background/50 h-12"
                />
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Отправка..."
                  ) : (
                    <>
                      Получить консультацию
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Никакого спама — только полезные материалы
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
