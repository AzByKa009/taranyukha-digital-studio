import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "pd_consent_152fz";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Продолжая использовать сайт, вы даёте согласие на обработку персональных данных
              в соответствии с{" "}
              <a
                href="/privacy-policy"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                Политикой конфиденциальности
              </a>{" "}
              и Федеральным законом №152-ФЗ «О персональных данных».
            </p>
            <Button onClick={accept} size="sm" className="shrink-0 whitespace-nowrap">
              Принимаю
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
