import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Mail, MessageCircle } from "lucide-react";

const socialLinks = [
  { name: "Telegram", href: "https://t.me/", icon: MessageCircle },
  { name: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Сообщение отправлено! Свяжусь с вами в ближайшее время.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Info */}
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-4 block">
              Контакты
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Давайте обсудим <span className="text-gradient">ваш проект</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Расскажите о вашей задаче — я подготовлю предварительную оценку 
              и предложу возможные решения. Консультация бесплатна.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors"
                >
                  <link.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="glass-card rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Имя
                  </label>
                  <Input
                    name="name"
                    placeholder="Как к вам обращаться?"
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  О проекте
                </label>
                <Textarea
                  name="message"
                  placeholder="Расскажите о вашей задаче, сроках и бюджете"
                  rows={5}
                  required
                  className="bg-background/50 resize-none"
                />
              </div>

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
                    Отправить заявку
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Обычно отвечаю в течение 24 часов
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
