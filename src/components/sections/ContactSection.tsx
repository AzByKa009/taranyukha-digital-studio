import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Mail, MessageCircle } from "lucide-react";
import { FadeIn, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteSettings, ContactSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/contexts/LanguageContext";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { data: contact } = useSiteSettings<ContactSettings>("contact");
  const { t } = useLanguage();

  const socialLinks = [
    { name: "Telegram", href: contact?.telegram || "#", icon: MessageCircle },
    { name: "Email", href: contact?.email ? `mailto:${contact.email}` : "#", icon: Mail },
  ].filter(link => link.href !== "#");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success(t("contact.success"));
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <FadeIn direction="right">
            <div>
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
                {t("contact.label")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                {t("contact.title")}<span className="text-gradient">{t("contact.title_accent")}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {t("contact.subtitle")}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.name === "Email" ? undefined : "_blank"}
                    rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors text-sm sm:text-base"
                    whileHover={!prefersReducedMotion ? { scale: 1.03, y: -2 } : undefined}
                    whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <PremiumCard 
              className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8"
              hoverScale={1}
              hoverY={0}
              glowOnHover
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">
                      {t("contact.name")}
                    </label>
                    <Input
                      name="name"
                      placeholder={t("contact.name_placeholder")}
                      required
                      maxLength={100}
                      className="bg-background/50 transition-all duration-200 focus:ring-2 focus:ring-primary/20 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-foreground">
                      {t("contact.email")}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t("contact.email_placeholder")}
                      required
                      maxLength={100}
                      className="bg-background/50 transition-all duration-200 focus:ring-2 focus:ring-primary/20 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">
                    {t("contact.message")}
                  </label>
                  <Textarea
                    name="message"
                    placeholder={t("contact.message_placeholder")}
                    rows={4}
                    required
                    maxLength={2000}
                    className="bg-background/50 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 text-sm sm:text-base"
                  />
                </div>

                <motion.div
                  whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t("contact.submitting")
                    ) : (
                      <>
                        {t("contact.submit")}
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <p className="text-xs text-muted-foreground text-center">
                  {t("contact.response_time")}
                </p>
              </form>
            </PremiumCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
