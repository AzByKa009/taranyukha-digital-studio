import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, CheckCircle2, Instagram, Lightbulb, MessageCircle, Play, Rocket, Sparkles, Target, Users } from "lucide-react";
import { useSEO, personSchema } from "@/hooks/useSEO";
import alekseyPhoto from "@/assets/aleksey-photo.png";

const About = () => {
  useSEO({
    title: "Обо мне — AI продюсер, вайб кодинг специалист | Aleksey Taranukha",
    description: "Aleksey Taranukha — AI продюсер и специалист по вайб кодингу. Создание AI продуктов, монтаж вертикальных видео, продюсирование контента, сайты под ключ.",
    keywords: "AI продюсер, вайб кодинг специалист, монтаж Reels, продюсирование контента, создание AI продукта",
  }, [personSchema]);

  const benefits = [
    "Полный цикл работы — от стратегии до готового продукта",
    "Снимаю с вас головную боль по технической реализации",
    "Прозрачная коммуникация и понятные сроки",
    "Опыт в разных нишах — понимаю специфику бизнеса",
    "Современный стек технологий и AI-инструменты",
    "Поддержка после запуска проекта",
  ];

  const expertise = [
    {
      icon: Rocket,
      title: "AI-продукты",
      description: "Чат-боты, автоматизация процессов, интеграция нейросетей в бизнес-процессы",
    },
    {
      icon: Lightbulb,
      title: "Digital Production",
      description: "Контент-стратегия, Reels, вертикальный контент для привлечения клиентов",
    },
    {
      icon: Target,
      title: "Веб-разработка",
      description: "Сайты-визитки, лендинги, корпоративные порталы под ключ",
    },
    {
      icon: Users,
      title: "Консалтинг",
      description: "AI-аудит бизнеса, стратегии автоматизации, обучение команды",
    },
  ];

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
      url: "https://youtube.com/@azbyka-qwe",
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

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
                Обо мне
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Aleksey Taranukha
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Я занимаюсь AI-решениями и цифровым продакшеном. Помогаю бизнесу 
                автоматизировать рутину, создавать контент и запускать digital-продукты.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Моя задача — снять с вас большую часть работы. Вы занимаетесь бизнесом, 
                а я беру на себя техническую реализацию: от первой встречи до запуска 
                готового продукта. Работаю прозрачно, соблюдаю сроки и всегда на связи.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" className="shadow-xl shadow-primary/20">
                    Написать в Telegram
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
                <Link to="/cases">
                  <Button variant="hero-outline">
                    Смотреть кейсы
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10">
                {/* Gradient overlay for premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10" />
                <img 
                  src={alekseyPhoto}
                  alt="Aleksey Taranukha — AI продюсер и специалист по вайб кодингу"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-3xl border border-primary/20 z-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Чем занимаюсь */}
      <section className="py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold mb-4">
              Чем я занимаюсь
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Специализируюсь на пересечении технологий и контента — там, где AI встречается с бизнесом
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {expertise.map((item, index) => (
              <div 
                key={item.title}
                className="premium-card p-7 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что вы получите */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                Что вы получите, работая со мной
              </h2>
              <p className="text-muted-foreground mb-8">
                Я беру на себя весь технический процесс — от постановки задачи до финального 
                результата. Вам не нужно разбираться в технологиях или координировать подрядчиков.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="premium-card p-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold">2+</div>
                  <div className="text-sm text-muted-foreground">года в digital</div>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  За это время я работал с разными нишами: от локального бизнеса до 
                  технологических стартапов. Понимаю, как устроен бизнес изнутри.
                </p>
                <p>
                  Мой подход — делать просто и эффективно. Без лишнего усложнения, 
                  с фокусом на результат, который можно измерить.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Медиа / Мои каналы */}
      <section className="py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold mb-4">
              Мои каналы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Делюсь опытом в AI, автоматизации и создании digital-продуктов. 
              Подписывайтесь там, где вам удобнее.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-2">
              Что публикую: AI-кейсы, гайды по автоматизации, разборы продуктов, закулисье работы
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Готовы обсудить проект?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Напишите мне, и мы разберём вашу задачу. Расскажу, как могу помочь, 
              и предложу варианты решения — без обязательств.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
                <Button variant="premium" size="lg" className="shadow-lg shadow-primary/20">
                  Написать в Telegram
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link to="/contacts">
                <Button variant="outline" size="lg">
                  Другие способы связи
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
