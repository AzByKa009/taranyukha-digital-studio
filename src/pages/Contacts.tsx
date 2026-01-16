import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Контакты — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Свяжитесь со мной для обсуждения проекта. Email, Telegram, форма обратной связи."
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Сообщение отправлено! Свяжусь с вами в ближайшее время.");
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Контакты
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Готов обсудить ваш проект. Напишите мне, и я отвечу в течение 24 часов.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in-up">
              <div className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-1">Email</h3>
                <a href="mailto:hello@taranukha.dev" className="text-muted-foreground hover:text-foreground transition-colors">
                  hello@taranukha.dev
                </a>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-1">Telegram</h3>
                <a href="https://t.me/alekseytaranukha" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  @alekseytaranukha
                </a>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-1">Локация</h3>
                <p className="text-muted-foreground">
                  Удалённо, по всему миру
                </p>
              </div>
              
              <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Время ответа:</strong> обычно в течение 24 часов в рабочие дни
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-display font-semibold mb-6">
                  Отправить сообщение
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Имя *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Компания
                  </label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Название компании"
                    className="bg-background"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите о вашем проекте или задаче..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;