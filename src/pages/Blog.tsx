import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, MessageCircle, Play, Sparkles } from "lucide-react";

const Blog = () => {
  useEffect(() => {
    document.title = "Медиа — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Мой контент об AI, автоматизации и digital-продакшене. Подписывайтесь на Telegram, YouTube и Instagram."
    );
  }, []);

  const socialLinks = [
    {
      name: "Telegram",
      description: "Заметки о работе, инсайты и закулисье проектов",
      icon: MessageCircle,
      url: "https://t.me/altscalp",
      buttonText: "Подписаться",
      color: "from-[#0088cc] to-[#00a6ed]",
    },
    {
      name: "YouTube",
      description: "Разборы кейсов, гайды по AI и автоматизации",
      icon: Play,
      url: "https://youtube.com/@azbyka-qwe?si=P84A3B2a9ilHVk_Q",
      buttonText: "Смотреть",
      color: "from-[#ff0000] to-[#cc0000]",
    },
    {
      name: "Instagram",
      description: "Вертикальный контент, процесс работы",
      icon: Instagram,
      url: "https://www.instagram.com/azbyka.offical",
      buttonText: "Подписаться",
      color: "from-[#833AB4] via-[#E1306C] to-[#F77737]",
    },
    {
      name: "TikTok",
      description: "Короткие видео, тренды и эксперименты",
      icon: Sparkles,
      url: "https://www.tiktok.com/@azbyka009",
      buttonText: "Смотреть",
      color: "from-[#000000] to-[#25F4EE]",
    },
  ];

  const topics = [
    {
      title: "AI-продукты для бизнеса",
      description: "Как использовать нейросети для автоматизации и роста",
    },
    {
      title: "Вертикальный контент",
      description: "Reels, Shorts, TikTok — что работает и как снимать",
    },
    {
      title: "Сайты под услуги",
      description: "Веб-разработка, которая приносит клиентов",
    },
    {
      title: "Автоматизация процессов",
      description: "Боты, интеграции и оптимизация рутины",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Мой контент
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Делюсь опытом в AI, автоматизации и создании digital-продуктов. 
              Подписывайтесь там, где вам удобнее.
            </p>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-8">Где меня найти</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group premium-card p-6 hover-lift animate-fade-in-up flex items-start gap-5"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <social.icon className="h-7 w-7 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {social.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-foreground group-hover:text-primary transition-colors">
                    {social.buttonText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-display font-bold mb-4">О чём я пишу и снимаю</h2>
            <p className="text-muted-foreground">
              Основные темы моего контента — практические знания, которые можно применить в бизнесе
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topics.map((topic, index) => (
              <div
                key={topic.title}
                className="glass-card rounded-2xl p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="font-display font-semibold mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Кому полезен мой контент</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Предпринимателям</strong>, которые хотят использовать AI 
                  для автоматизации рутины и масштабирования бизнеса.
                </p>
                <p>
                  <strong className="text-foreground">Маркетологам и SMM-специалистам</strong>, которым нужны 
                  практические гайды по созданию контента.
                </p>
                <p>
                  <strong className="text-foreground">Фрилансерам и продюсерам</strong>, которые развивают 
                  навыки в digital-продакшене.
                </p>
                <p>
                  <strong className="text-foreground">Всем, кто интересуется технологиями</strong> и хочет 
                  быть в курсе трендов AI и автоматизации.
                </p>
              </div>
            </div>
            
            <div className="premium-card p-8">
              <h3 className="text-xl font-display font-semibold mb-4">Хотите не пропустить?</h3>
              <p className="text-muted-foreground mb-6">
                Самый оперативный контент выходит в Telegram — заметки, инсайты и анонсы новых проектов.
              </p>
              <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
                <Button variant="premium" className="shadow-lg shadow-primary/20">
                  Подписаться на Telegram
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Есть вопрос или предложение?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Пишите напрямую — отвечаю на все сообщения
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" className="shadow-xl shadow-primary/20">
                Написать в Telegram
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <Button asChild variant="outline" size="lg">
              <a href="/contacts">Все контакты</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
