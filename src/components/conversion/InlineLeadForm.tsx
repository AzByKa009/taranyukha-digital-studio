import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useABTest } from "@/hooks/useABTest";

interface InlineLeadFormProps {
  variant?: "default" | "compact";
  className?: string;
}

export function InlineLeadForm({ variant = "default", className = "" }: InlineLeadFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { variant: ctaVariant, trackConversion } = useABTest("cta_lead_form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setIsSubmitting(true);
    trackConversion();
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Заявка отправлена! Свяжусь в течение 24 часов");
    setIsSubmitting(false);
    setName("");
    setContact("");
  };

  const ctaText = ctaVariant === "A" 
    ? "Получить предложение" 
    : "Начать проект";

  if (variant === "compact") {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={50}
          className="bg-card/50 border-border/60 h-12 flex-1"
        />
        <Input
          type="text"
          placeholder="Telegram или Email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          maxLength={100}
          className="bg-card/50 border-border/60 h-12 flex-1"
        />
        <motion.div
          whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
          whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
        >
          <Button
            type="submit"
            variant="hero"
            className="h-12 whitespace-nowrap"
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : ctaText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.form>
    );
  }

  return (
    <motion.div
      className={`p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-display font-bold mb-2">
        Готовы обсудить проект?
      </h3>
      <p className="text-muted-foreground mb-6">
        Оставьте контакт — свяжусь в течение 24 часов
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
            className="bg-background/50 h-12"
          />
          <Input
            type="text"
            placeholder="Telegram или Email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength={100}
            className="bg-background/50 h-12"
          />
        </div>
        <motion.div
          whileHover={!prefersReducedMotion ? { scale: 1.01 } : undefined}
          whileTap={!prefersReducedMotion ? { scale: 0.99 } : undefined}
        >
          <Button
            type="submit"
            variant="hero"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : ctaText}
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
