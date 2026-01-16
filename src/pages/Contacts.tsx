import { useEffect, useState } from "react";
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

const workProcess = [
  {
    step: "01",
    title: "Знакомство",
    description: "Созваниваемся на 15-30 минут. Вы рассказываете о задаче, я задаю уточняющие вопросы",
    icon: Handshake,
  },
  {
    step: "02",
    title: "Предложение",
    description: "В течение 24-48 часов готовлю детальное предложение со сроками и стоимостью",
    icon: FileText,
  },
  {
    step: "03",
    title: "Старт работы",
    description: "После согласования начинаем работу. Вы получаете доступ к процессу и промежуточные результаты",
    icon: Rocket,
  },
];

const whatToPrepare = [
  {
    icon: Target,
    title: "Опишите задачу",
    description: "Что нужно сделать? Какую проблему решаем? Чем конкретнее — тем точнее оценка",
  },
  {
    icon: Calendar,
    title: "Определите сроки",
    description: "Есть ли дедлайн? Это влияет на приоритизацию и возможность взяться за проект",
  },
  {
    icon: FileText,
    title: "Соберите примеры",
    description: "Референсы, которые нравятся. Ссылки на конкурентов. Это ускорит понимание",
  },
];

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    task: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Контакты — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Свяжитесь со мной для обсуждения проекта. Telegram, форма обратной связи. Ответ в течение 24 часов."
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    console.log("Contact form submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Заявка отправлена! Свяжусь с вами в ближайшее время.");
    setFormData({ name: "", contact: "", task: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Давайте обсудим ваш проект
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Напишите мне — отвечу в течение 24 часов. Без обязательств, просто разберёмся, чем могу помочь.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <a
              href="https://t.me/alekseytaranukha"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/20 hover:bg-[#229ED9]/20 hover:border-[#229ED9]/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#229ED9] flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">Telegram</div>
                <div className="text-sm text-muted-foreground">Быстрый ответ</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://instagram.com/alekseytaranukha"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#833AB4]/20 hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">Instagram</div>
                <div className="text-sm text-muted-foreground">Direct сообщения</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="mailto:hello@taranukha.dev"
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">hello@taranukha.dev</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-display font-semibold mb-2">
                  Оставить заявку
                </h2>
                <p className="text-muted-foreground mb-6">
                  Расскажите о задаче — я свяжусь для обсуждения деталей
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Как вас зовут? *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Имя"
                      required
                      maxLength={100}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium mb-2">
                      Как связаться? *
                    </label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="Telegram, email или телефон"
                      required
                      maxLength={100}
                      className="bg-background"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="task" className="block text-sm font-medium mb-2">
                    Расскажите о задаче *
                  </label>
                  <Textarea
                    id="task"
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                    placeholder="Что нужно сделать? Какие сроки? Есть ли референсы?"
                    rows={5}
                    required
                    maxLength={2000}
                    className="bg-background resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Чем подробнее опишете — тем точнее смогу оценить
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Время ответа</h3>
                    <p className="text-sm text-muted-foreground">до 24 часов</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Обычно отвечаю быстрее. В выходные возможна задержка.
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Локация</h3>
                    <p className="text-sm text-muted-foreground">Удалённо</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Работаю с клиентами по всему миру. Созвоны в удобное для вас время.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Без обязательств</p>
                    <p className="text-sm text-muted-foreground">
                      Первый разговор — это просто знакомство. Вы ничего не должны, 
                      пока сами не решите работать.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Work Happens */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Как происходит работа
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Простой и прозрачный процесс от первого контакта до результата
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {workProcess.map((item, index) => (
              <div 
                key={item.step}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < workProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">Шаг {item.step}</div>
                  <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Prepare */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Что подготовить до старта
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Эти вещи помогут быстрее понять задачу и дать точную оценку
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whatToPrepare.map((item, index) => (
              <div 
                key={item.title}
                className="glass-card rounded-2xl p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Не переживайте, если чего-то нет — разберёмся вместе
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
