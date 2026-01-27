import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, CheckCircle2, Instagram, Lightbulb, MessageCircle, Play, Rocket, Sparkles, Target, Users } from "lucide-react";
import { useSEO, personSchema } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import alekseyPhoto from "@/assets/aleksey-photo.png";
import digitalExperience from "@/assets/digital-experience.jpg";
import expertiseAi from "@/assets/expertise-ai.jpg";
import expertiseProduction from "@/assets/expertise-production.jpg";
import expertiseWeb from "@/assets/expertise-web.jpg";
import expertiseConsulting from "@/assets/expertise-consulting.jpg";

const About = () => {
  const { t, language } = useLanguage();

  useSEO({
    title: language === "ru" 
      ? "Обо мне — AI продюсер, вайб кодинг специалист | Aleksey Taranukha"
      : "About — AI producer, vibe coding specialist | Aleksey Taranukha",
    description: language === "ru"
      ? "Aleksey Taranukha — AI продюсер и специалист по вайб кодингу. Создание AI продуктов, монтаж вертикальных видео, продюсирование контента, сайты под ключ."
      : "Aleksey Taranukha — AI producer and vibe coding specialist. AI product creation, vertical video editing, content production, turnkey websites.",
    keywords: "AI продюсер, вайб кодинг специалист, монтаж Reels, продюсирование контента, создание AI продукта",
  }, [personSchema]);

  const benefits = [
    t("about.benefit_1"),
    t("about.benefit_2"),
    t("about.benefit_3"),
    t("about.benefit_4"),
    t("about.benefit_5"),
    t("about.benefit_6"),
  ];

  const expertise = [
    {
      icon: Rocket,
      title: t("about.ai_products"),
      description: t("about.ai_products_desc"),
      image: expertiseAi,
    },
    {
      icon: Lightbulb,
      title: t("about.digital_production"),
      description: t("about.digital_production_desc"),
      image: expertiseProduction,
    },
    {
      icon: Target,
      title: t("about.web_dev"),
      description: t("about.web_dev_desc"),
      image: expertiseWeb,
    },
    {
      icon: Users,
      title: t("about.consulting"),
      description: t("about.consulting_desc"),
      image: expertiseConsulting,
    },
  ];

  const socialLinks = [
    {
      name: "Telegram",
      description: t("about.telegram_notes"),
      icon: MessageCircle,
      url: "https://t.me/altscalp",
      buttonText: t("about.subscribe"),
      color: "from-[#0088cc] to-[#00a6ed]",
    },
    {
      name: "YouTube",
      description: t("about.youtube_desc"),
      icon: Play,
      url: "https://youtube.com/@azbyka-qwe",
      buttonText: t("about.watch"),
      color: "from-[#ff0000] to-[#cc0000]",
    },
    {
      name: "Instagram",
      description: t("about.instagram_desc"),
      icon: Instagram,
      url: "https://www.instagram.com/azbyka.offical",
      buttonText: t("about.subscribe"),
      color: "from-[#833AB4] via-[#E1306C] to-[#F77737]",
    },
    {
      name: "TikTok",
      description: t("about.tiktok_desc"),
      icon: Sparkles,
      url: "https://www.tiktok.com/@azbyka009",
      buttonText: t("about.watch"),
      color: "from-[#000000] to-[#25F4EE]",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <p className="text-primary font-medium mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm">
                {t("about.title")}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
                Aleksey Taranukha
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {t("about.intro")}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {t("about.intro_2")}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" className="w-full sm:w-auto shadow-xl shadow-primary/20">
                    {t("about.telegram_cta")}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
                <Link to="/cases">
                  <Button variant="hero-outline" className="w-full sm:w-auto">
                    {t("about.view_cases")}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10" />
                <img 
                  src={alekseyPhoto}
                  alt="Aleksey Taranukha — AI продюсер и специалист по вайб кодингу"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-primary/20 z-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Чем занимаюсь */}
      <section className="py-16 sm:py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">
              {t("about.what_i_do")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("about.what_i_do_subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {expertise.map((item, index) => (
              <div 
                key={item.title}
                className="premium-card p-0 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 -mt-8 sm:-mt-10 relative z-10 border border-border/50 shadow-lg">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-display font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что вы получите */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 sm:mb-6">
                {t("about.what_you_get")}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                {t("about.what_you_get_desc")}
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2.5 sm:gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="premium-card p-0 overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="aspect-video overflow-hidden">
                <img 
                  src={digitalExperience}
                  alt="2+ года опыта в digital-сфере"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="p-5 sm:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-display font-bold">2+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{t("about.years_in_digital")}</div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                  <p>{t("about.experience_desc_1")}</p>
                  <p>{t("about.experience_desc_2")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Медиа / Мои каналы */}
      <section className="py-16 sm:py-20 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">
              {t("about.my_channels")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("about.channels_subtitle")}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group premium-card p-5 sm:p-6 hover-lift animate-fade-in-up flex items-start gap-4 sm:gap-5"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <social.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    {social.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors">
                    {social.buttonText}
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t("about.channel_content")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 sm:mb-6">
              {t("about.ready_to_discuss")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 leading-relaxed">
              {t("about.ready_to_discuss_desc")}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a href="https://t.me/altscalp" target="_blank" rel="noopener noreferrer">
                <Button variant="premium" size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                  {t("about.telegram_cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link to="/contacts">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t("about.other_contacts")}
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
