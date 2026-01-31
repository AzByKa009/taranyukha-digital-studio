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
    "nav.ai_products": "AI-решения",
    "nav.calculator": "Калькулятор",
    "nav.about": "Обо мне",
    "nav.faq": "FAQ",
    "nav.contact": "Оставить заявку",
    
    // Hero - marketer positioning
    "hero.badge": "Маркетолог · Системный подход · Результат",
    "hero.title_1": "Превращаю маркетинг в систему, ",
    "hero.title_2": "которая растит бизнес",
    "hero.subtitle": "Упаковка, соцсети, продвижение, автоматизация — выстраиваю маркетинг как предсказуемый процесс, а не хаос из разовых задач.",
    "hero.cta_primary": "Обсудить задачу",
    "hero.stat_years": "года в маркетинге",
    "hero.stat_projects": "бизнесов",
    "hero.stat_ai": "автоматизация",
    "hero.stat_response": "ответ",
    "hero.how_i_work": "Что входит в системный подход",
    "hero.step_1_title": "Аудит",
    "hero.step_1_desc": "Нахожу точки роста и слабые места",
    "hero.step_2_title": "Стратегия",
    "hero.step_2_desc": "Составляю план с приоритетами",
    "hero.step_3_title": "Внедрение",
    "hero.step_3_desc": "Реализую или координирую",
    "hero.step_4_title": "Масштаб",
    "hero.step_4_desc": "Автоматизирую и усиливаю",
    
    // What I Do
    "whatido.label": "Специализация",
    "whatido.title": "Что я делаю",
    "whatido.subtitle": "Помогаю бизнесу в сфере услуг получать больше клиентов через сайт и AI-автоматизацию",
    
    // Featured Cases
    "cases.featured_title": "Примеры работ",
    "cases.featured_subtitle": "Сайты и AI-решения, которые уже работают и приносят результат",
    "cases.all": "Все проекты",
    "cases.title": "Кейсы",
    "cases.subtitle": "Реальные проекты с измеримыми результатами",
    "cases.all_projects": "Все",
    "cases.montage": "Видео",
    "cases.producing": "Продюсирование",
    "cases.ai_video": "AI-видео",
    "cases.ai_products": "AI-решения",
    "cases.vibe_coding": "Сайты",
    "cases.montage_reels": "Видеопродакшн",
    "cases.complex_projects": "Сайты и AI",
    "cases.empty": "Проекты скоро появятся",
    
    // Services
    "services.title": "Услуги",
    "services.subtitle": "Сайты под услуги и AI-решения — основной фокус. Видеопродакшн — дополнительно.",
    "services.price_note": "Стоимость зависит от задачи — рассчитываю индивидуально",
    "services.details": "Подробнее",
    "services.how_choose": "Что выбрать?",
    "services.how_choose_subtitle": "Зависит от вашей задачи:",
    "services.popular": "Популярное",
    "services.quick_start": "С чего начать",
    "services.quick_start_subtitle": "Самые частые запросы",
    
    // Why Trust Me - expert positioning
    // Why Trust Me - personal brand
    "trust.label": "Почему со мной",
    "trust.title": "Вы работаете ",
    "trust.title_accent": "с человеком, не сервисом",
    "trust.subtitle": "Никаких менеджеров и скриптов. Я лично погружаюсь в вашу задачу, думаю над стратегией и отвечаю за результат. Это не конвейер — это партнёрство.",
    "trust.quote": "Мне важно понять ваш бизнес, а не просто выполнить ТЗ",
    "trust.item_1_title": "Стратег, не исполнитель",
    "trust.item_1_desc": "Сначала думаю — зачем, потом делаю — как",
    "trust.item_2_title": "Понимаю бизнес",
    "trust.item_2_desc": "Разбираюсь в нише, конкурентах, клиентах",
    "trust.item_3_title": "Работаю на результат",
    "trust.item_3_desc": "Метрики важнее красивых презентаций",
    "trust.item_4_title": "Долгосрочно",
    "trust.item_4_desc": "Строю системы, которые работают годами",
    
    // Contact
    "contact.label": "Контакт",
    "contact.title": "Расскажите ",
    "contact.title_accent": "о задаче",
    "contact.subtitle": "Опишите, что нужно — отвечу в течение дня с предложением и примерной стоимостью.",
    "contact.name": "Имя",
    "contact.name_placeholder": "Как вас зовут?",
    "contact.email": "Email или Telegram",
    "contact.email_placeholder": "@username или email",
    "contact.message": "Задача",
    "contact.message_placeholder": "Что нужно сделать? Например: сайт для юридической фирмы с формой записи",
    "contact.submit": "Отправить",
    "contact.submitting": "Отправка...",
    "contact.response_time": "Отвечу в течение дня",
    "contact.success": "Получил! Свяжусь с вами сегодня.",
    
    // CTA - clear value proposition
    "cta.title": "Нужен сайт, который приносит заявки?",
    "cta.subtitle": "Расскажите о задаче — предложу решение в течение дня",
    "cta.primary": "Написать",
    "cta.secondary": "Посмотреть примеры",
    
    // Footer
    "footer.rights": "Все права защищены",
    "footer.nav": "Навигация",
    "footer.services": "Услуги",
    "footer.contacts": "Контакты",
    
    // Exit Popup
    "popup.title": "Уходите?",
    "popup.subtitle": "Оставьте контакт — расскажу, как сделать сайт, который приносит заявки",
    "popup.cta": "Получить консультацию",
    "popup.close": "Нет, спасибо",
    
    // Admin
    "admin.dashboard": "Дашборд",
    "admin.content_management": "Управление контентом",
    "admin.cases": "Кейсы",
    "admin.services": "Услуги",
    "admin.ai_products": "AI-решения",
    "admin.blog": "Блог",
    "admin.portfolio": "Портфолио",
    "admin.quick_actions": "Быстрые действия",
    "admin.management": "Управление",
    "admin.media_library": "Медиа",
    "admin.site_settings": "Настройки",
    "admin.seo_settings": "SEO",
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
  // Always use Russian as the default language
  const [language] = useState<Language>("ru");

  const setLanguage = (_lang: Language) => {
    // Language switching disabled - always Russian
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
