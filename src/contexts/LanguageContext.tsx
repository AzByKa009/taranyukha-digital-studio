import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.cases": "Кейсы",
    "nav.services": "Услуги",
    "nav.ai_products": "AI-продукты",
    "nav.calculator": "Калькулятор",
    "nav.about": "Обо мне",
    "nav.faq": "FAQ",
    "nav.contact": "Связаться",
    
    // Hero
    "hero.badge": "AI & Digital Production Expert",
    "hero.title_1": "AI-продукты",
    "hero.title_2": " и сайты, которые приносят заявки",
    "hero.subtitle": "Создаю AI-решения и премиальные сайты под услуги. Также веду продюсирование и вертикальный контент — Reels, Shorts, TikTok. Беру на себя большую часть работы.",
    "hero.cta_primary": "Обсудить проект",
    "hero.cta_secondary": "Смотреть кейсы",
    "hero.stat_years": "Года в digital",
    "hero.stat_projects": "Проектов",
    "hero.stat_ai": "В каждом решении",
    "hero.stat_response": "Ответ на заявку",
    "hero.how_i_work": "Как я работаю",
    "hero.step_1_title": "Анализ",
    "hero.step_1_desc": "Изучаю задачу и контекст",
    "hero.step_2_title": "Стратегия",
    "hero.step_2_desc": "Предлагаю решение",
    "hero.step_3_title": "Реализация",
    "hero.step_3_desc": "Создаю продукт",
    "hero.step_4_title": "Поддержка",
    "hero.step_4_desc": "Помогаю масштабировать",
    
    // What I Do
    "whatido.label": "Чем занимаюсь",
    "whatido.title": "Моя экспертиза",
    "whatido.subtitle": "Совмещаю технологии и креатив для создания продуктов, которые приносят результат",
    
    // Featured Cases
    "cases.featured_title": "Избранные кейсы",
    "cases.featured_subtitle": "Проекты, которые демонстрируют мой подход к созданию цифровых продуктов",
    "cases.all": "Все кейсы",
    "cases.title": "Кейсы",
    "cases.subtitle": "Проекты, которые демонстрируют силу AI и цифровых технологий в решении реальных задач",
    "cases.all_projects": "Все проекты",
    "cases.montage": "Монтаж",
    "cases.producing": "Продюсирование",
    "cases.ai_video": "AI-видео",
    "cases.ai_products": "AI-продукты",
    "cases.vibe_coding": "Vibe coding",
    "cases.montage_reels": "Монтаж Reels & Shorts",
    "cases.complex_projects": "Комплексные проекты",
    "cases.empty": "Проектов в этой категории пока нет",
    
    // Services
    "services.title": "Услуги",
    "services.subtitle": "От вертикального контента до AI-продуктов и сайтов. Беру на себя большую часть работы — вы занимаетесь своим делом.",
    "services.price_note": "Финальная стоимость зависит от задачи — рассчитывается индивидуально",
    "services.details": "Подробнее",
    "services.how_choose": "Как выбрать услугу?",
    "services.how_choose_subtitle": "Всё зависит от вашей задачи. Вот простая навигация:",
    "services.popular": "Популярные услуги",
    "services.quick_start": "Быстрый старт",
    "services.quick_start_subtitle": "Самые востребованные услуги с подробным описанием и примерами работ",
    
    // Why Trust Me
    "trust.label": "Подход",
    "trust.title": "Почему мне ",
    "trust.title_accent": "доверяют",
    "trust.subtitle": "Я не продаю технологии ради технологий. Моя задача — снять с вас головную боль и сделать так, чтобы вы получили результат без погружения в детали.",
    "trust.quote": "Можно оставить заявку без созвона — я сам уточню детали и предложу решение",
    "trust.item_1_title": "Беру на себя процесс",
    "trust.item_1_desc": "Вы занимаетесь своим делом — я беру на себя техническую реализацию и головную боль",
    "trust.item_2_title": "Понимаю бизнес-задачи",
    "trust.item_2_desc": "Не просто делаю, а разбираюсь зачем. Предлагаю решения, которые работают на результат",
    "trust.item_3_title": "Прозрачная работа",
    "trust.item_3_desc": "Понятные сроки, честная коммуникация и регулярные отчёты на всех этапах",
    "trust.item_4_title": "Поддержка после запуска",
    "trust.item_4_desc": "Не бросаю проект после сдачи. Помогаю развивать и адаптировать под новые задачи",
    
    // Contact
    "contact.label": "Контакты",
    "contact.title": "Давайте обсудим ",
    "contact.title_accent": "ваш проект",
    "contact.subtitle": "Расскажите о вашей задаче — я подготовлю предварительную оценку и предложу возможные решения. Консультация бесплатна.",
    "contact.name": "Имя",
    "contact.name_placeholder": "Как к вам обращаться?",
    "contact.email": "Email",
    "contact.email_placeholder": "your@email.com",
    "contact.message": "О проекте",
    "contact.message_placeholder": "Расскажите о вашей задаче, сроках и бюджете",
    "contact.submit": "Отправить заявку",
    "contact.submitting": "Отправка...",
    "contact.response_time": "Обычно отвечаю в течение 24 часов",
    "contact.success": "Сообщение отправлено! Свяжусь с вами в ближайшее время.",
    
    // CTA
    "cta.title": "Готовы начать проект?",
    "cta.subtitle": "Расскажите о вашей задаче — подготовлю предложение в течение 24 часов",
    "cta.primary": "Обсудить проект",
    "cta.secondary": "Рассчитать стоимость",
    
    // Footer
    "footer.rights": "Все права защищены",
    "footer.nav": "Навигация",
    "footer.services": "Услуги",
    "footer.contacts": "Контакты",
    
    // Exit Popup
    "popup.title": "Подождите!",
    "popup.subtitle": "Получите бесплатную консультацию по вашему проекту",
    "popup.cta": "Получить консультацию",
    "popup.close": "Нет, спасибо",
    
    // Admin
    "admin.dashboard": "Дашборд",
    "admin.content_management": "Управление контентом сайта",
    "admin.cases": "Кейсы",
    "admin.services": "Услуги",
    "admin.ai_products": "AI-продукты",
    "admin.blog": "Статьи блога",
    "admin.portfolio": "Портфолио",
    "admin.quick_actions": "Быстрые действия",
    "admin.management": "Управление",
    "admin.media_library": "Медиа-библиотека",
    "admin.site_settings": "Настройки сайта",
    "admin.seo_settings": "SEO настройки",
    "admin.logout": "Выйти",
    "admin.to_site": "На сайт",
    
    // Common
    "common.from": "от",
    "common.learn_more": "Подробнее",
    "common.back": "Назад",
    "common.loading": "Загрузка...",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.cases": "Cases",
    "nav.services": "Services",
    "nav.ai_products": "AI Products",
    "nav.calculator": "Calculator",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    
    // Hero
    "hero.badge": "AI & Digital Production Expert",
    "hero.title_1": "AI products",
    "hero.title_2": " and websites that drive leads",
    "hero.subtitle": "I create AI solutions and premium service websites. I also handle content production and vertical content — Reels, Shorts, TikTok. I take care of most of the work.",
    "hero.cta_primary": "Discuss Project",
    "hero.cta_secondary": "View Cases",
    "hero.stat_years": "Years in digital",
    "hero.stat_projects": "Projects",
    "hero.stat_ai": "In every solution",
    "hero.stat_response": "Response time",
    "hero.how_i_work": "How I work",
    "hero.step_1_title": "Analysis",
    "hero.step_1_desc": "Study the task and context",
    "hero.step_2_title": "Strategy",
    "hero.step_2_desc": "Propose a solution",
    "hero.step_3_title": "Implementation",
    "hero.step_3_desc": "Build the product",
    "hero.step_4_title": "Support",
    "hero.step_4_desc": "Help scale",
    
    // What I Do
    "whatido.label": "What I do",
    "whatido.title": "My expertise",
    "whatido.subtitle": "Combining technology and creativity to build products that deliver results",
    
    // Featured Cases
    "cases.featured_title": "Featured Cases",
    "cases.featured_subtitle": "Projects showcasing my approach to digital product creation",
    "cases.all": "All cases",
    "cases.title": "Cases",
    "cases.subtitle": "Projects demonstrating the power of AI and digital technologies in solving real problems",
    "cases.all_projects": "All projects",
    "cases.montage": "Editing",
    "cases.producing": "Production",
    "cases.ai_video": "AI Video",
    "cases.ai_products": "AI Products",
    "cases.vibe_coding": "Vibe coding",
    "cases.montage_reels": "Reels & Shorts Editing",
    "cases.complex_projects": "Complex Projects",
    "cases.empty": "No projects in this category yet",
    
    // Services
    "services.title": "Services",
    "services.subtitle": "From vertical content to AI products and websites. I handle most of the work — you focus on your business.",
    "services.price_note": "Final cost depends on the task — calculated individually",
    "services.details": "Learn more",
    "services.how_choose": "How to choose a service?",
    "services.how_choose_subtitle": "It all depends on your task. Here's a simple guide:",
    "services.popular": "Popular Services",
    "services.quick_start": "Quick Start",
    "services.quick_start_subtitle": "Most requested services with detailed descriptions and examples",
    
    // Why Trust Me
    "trust.label": "Approach",
    "trust.title": "Why clients ",
    "trust.title_accent": "trust me",
    "trust.subtitle": "I don't sell technology for technology's sake. My goal is to take the headache off your shoulders and deliver results without you diving into details.",
    "trust.quote": "You can leave a request without a call — I'll clarify the details and propose a solution myself",
    "trust.item_1_title": "I take over the process",
    "trust.item_1_desc": "You focus on your business — I handle the technical implementation and headaches",
    "trust.item_2_title": "I understand business goals",
    "trust.item_2_desc": "I don't just execute — I understand why. I propose solutions that work for results",
    "trust.item_3_title": "Transparent work",
    "trust.item_3_desc": "Clear timelines, honest communication, and regular updates at all stages",
    "trust.item_4_title": "Post-launch support",
    "trust.item_4_desc": "I don't abandon projects after delivery. I help develop and adapt to new tasks",
    
    // Contact
    "contact.label": "Contacts",
    "contact.title": "Let's discuss ",
    "contact.title_accent": "your project",
    "contact.subtitle": "Tell me about your task — I'll prepare a preliminary estimate and suggest possible solutions. Consultation is free.",
    "contact.name": "Name",
    "contact.name_placeholder": "How should I address you?",
    "contact.email": "Email",
    "contact.email_placeholder": "your@email.com",
    "contact.message": "About the project",
    "contact.message_placeholder": "Tell me about your task, timeline and budget",
    "contact.submit": "Send Request",
    "contact.submitting": "Sending...",
    "contact.response_time": "Usually respond within 24 hours",
    "contact.success": "Message sent! I'll get back to you soon.",
    
    // CTA
    "cta.title": "Ready to start a project?",
    "cta.subtitle": "Tell me about your task — I'll prepare a proposal within 24 hours",
    "cta.primary": "Discuss Project",
    "cta.secondary": "Calculate Cost",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.nav": "Navigation",
    "footer.services": "Services",
    "footer.contacts": "Contacts",
    
    // Exit Popup
    "popup.title": "Wait!",
    "popup.subtitle": "Get a free consultation on your project",
    "popup.cta": "Get Consultation",
    "popup.close": "No, thanks",
    
    // Admin
    "admin.dashboard": "Dashboard",
    "admin.content_management": "Content management",
    "admin.cases": "Cases",
    "admin.services": "Services",
    "admin.ai_products": "AI Products",
    "admin.blog": "Blog Posts",
    "admin.portfolio": "Portfolio",
    "admin.quick_actions": "Quick Actions",
    "admin.management": "Management",
    "admin.media_library": "Media Library",
    "admin.site_settings": "Site Settings",
    "admin.seo_settings": "SEO Settings",
    "admin.logout": "Logout",
    "admin.to_site": "To Site",
    
    // Common
    "common.from": "from",
    "common.learn_more": "Learn more",
    "common.back": "Back",
    "common.loading": "Loading...",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved && (saved === "ru" || saved === "en")) {
        return saved;
      }
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith("ru") ? "ru" : "en";
    }
    return "ru";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
