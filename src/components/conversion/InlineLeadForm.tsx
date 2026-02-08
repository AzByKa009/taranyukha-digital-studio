import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useABTest } from "@/hooks/useABTest";
import { useLanguage } from "@/contexts/LanguageContext";

interface InlineLeadFormProps {
  variant?: "default" | "compact";
  className?: string;
}

export function InlineLeadForm({ variant = "default", className = "" }: InlineLeadFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { variant: ctaVariant, trackConversion } = useABTest("cta_lead_form");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setIsSubmitting(true);
    trackConversion();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            contact: contact.trim(),
            source_page: window.location.pathname,
            website: honeypot,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      toast.success(t("lead.success"));
      setName("");
      setContact("");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(t("lead.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const ctaText = ctaVariant === "A" ? t("lead.submit_a") : t("lead.submit_b");

  if (variant === "compact") {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-2 sm:gap-3 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
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
          placeholder={t("lead.name_placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={50}
          className="bg-card/50 border-border/60 h-10 sm:h-12 flex-1 text-sm sm:text-base"
        />
        <Input
          type="text"
          placeholder={t("lead.contact_placeholder")}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          maxLength={100}
          className="bg-card/50 border-border/60 h-10 sm:h-12 flex-1 text-sm sm:text-base"
        />
        <motion.div
          whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
          whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
        >
          <Button
            type="submit"
            variant="hero"
            className="h-10 sm:h-12 whitespace-nowrap w-full sm:w-auto text-sm sm:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("lead.sending") : ctaText}
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </motion.div>
      </motion.form>
    );
  }

  return (
    <motion.div
      className={`p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg sm:text-xl font-display font-bold mb-1.5 sm:mb-2">
        {t("lead.title")}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        {t("lead.subtitle")}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            type="text"
            placeholder={t("lead.name_placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
            className="bg-background/50 h-10 sm:h-12 text-sm sm:text-base"
          />
          <Input
            type="text"
            placeholder={t("lead.contact_placeholder")}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength={100}
            className="bg-background/50 h-10 sm:h-12 text-sm sm:text-base"
          />
        </div>
        <motion.div
          whileHover={!prefersReducedMotion ? { scale: 1.01 } : undefined}
          whileTap={!prefersReducedMotion ? { scale: 0.99 } : undefined}
        >
          <Button
            type="submit"
            variant="hero"
            className="w-full sm:w-auto text-sm sm:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("lead.submitting") : ctaText}
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
