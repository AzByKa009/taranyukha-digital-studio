import { useState } from "react";
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
import { useSEO } from "@/hooks/useSEO";

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

  useSEO({
    title: "Контакты — заказать AI-продукт, монтаж, сайт | Aleksey Taranukha",
    description: "Свяжитесь для обсуждения проекта: AI-продукты, монтаж вертикальных видео, вайб кодинг, премиальный лендинг. Ответ в течение 24 часов.",
    keywords: "контакты, заказать монтаж Reels, заказать AI продукт, заказать сайт под ключ, вайб кодинг заказать",
  });

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
      <section className="pt-16 pb-14">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 animate-fade-in-up">
              Давайте обсудим ваш проект
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Напишите мне — отвечу в течение 24 часов. Без обязательств, просто разберёмся, чем могу помочь.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="pb-14">
        <div className="container">
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <a
              href="https://t.me/azbyka009"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-5 rounded-2xl bg-[#229ED9]/10 border border-[#229ED9]/20 hover:bg-[#229ED9]/15 hover:border-[#229ED9]/40 transition-all duration-400"
            >
              <div className="w-11 h-11 rounded-xl bg-[#229ED9] flex items-center justify-center shadow-lg shadow-[#229ED9]/30">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">Telegram</div>
                <div className="text-sm text-muted-foreground">Быстрый ответ</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="https://www.instagram.com/azbyka.offical"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 py-5 rounded-2xl bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#833AB4]/20 hover:from-[#833AB4]/15 hover:via-[#FD1D1D]/15 hover:to-[#F77737]/15 transition-all duration-400"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center shadow-lg shadow-[#FD1D1D]/30">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium">Instagram</div>
                <div className="text-sm text-muted-foreground">Direct сообщения</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="mailto:taranyha1245@gmail.com"
              className="group flex items-center gap-4 px-6 py-5 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 hover:border-primary/40 transition-all duration-400"
            >
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">taranyha1245@gmail.com</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <form onSubmit={handleSubmit} className="premium-card p-8 md:p-10">
                <h2 className="text-2xl font-display font-semibold mb-2">
                  Оставить заявку
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Расскажите о задаче — я свяжусь для обсуждения деталей
                </p>
                
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2.5">
                      Как вас зовут? *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Имя"
                      required
                      maxLength={100}
                      className="bg-background/60 border-border/50 h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium mb-2.5">
                      Как связаться? *
                    </label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="Telegram, email или телефон"
                      required
                      maxLength={100}
                      className="bg-background/60 border-border/50 h-12"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="task" className="block text-sm font-medium mb-2.5">
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
                    className="bg-background/60 border-border/50 resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2.5">
                    Чем подробнее опишете — тем точнее смогу оценить
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full shadow-xl shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-2 space-y-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="premium-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Время ответа</h3>
                    <p className="text-sm text-muted-foreground">до 24 часов</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Обычно отвечаю быстрее. В выходные возможна задержка.
                </p>
              </div>
              
              <div className="premium-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">Локация</h3>
                    <p className="text-sm text-muted-foreground">Удалённо</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Работаю с клиентами по всему миру. Созвоны в удобное для вас время.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1.5">Без обязательств</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
      <section className="py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Как происходит работа
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Простой и прозрачный процесс от первого контакта до результата
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {workProcess.map((item, index) => (
              <div 
                key={item.step}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < workProcess.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2.5">Шаг {item.step}</div>
                  <h3 className="text-xl font-display font-semibold mb-2.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Prepare */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Что подготовить до старта
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Эти вещи помогут быстрее понять задачу и дать точную оценку
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {whatToPrepare.map((item, index) => (
              <div 
                key={item.title}
                className="premium-card p-7 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
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
