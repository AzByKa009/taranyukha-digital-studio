import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default Russian translations
const defaultTranslations: Record<string, string> = {
  // Navigation
  "nav.home": "Главная",
  "nav.cases": "Кейсы",
  "nav.services": "Услуги",
  "nav.ai_products": "AI-решения",
  "nav.about": "О нас",
  "nav.faq": "FAQ",
  "nav.contact": "Связаться",
  
  // Hero
  "hero.badge": "Системы роста для бизнеса",
  "hero.title_1": "Сайты и AI-системы, ",
  "hero.title_2": "которые приносят заявки и автоматизируют бизнес",
  "hero.subtitle": "Разработка, внедрение CRM и автоматизация процессов для малого и среднего бизнеса.",
  "hero.cta_primary": "Получить аудит",
  "hero.cta_secondary": "Посмотреть кейсы",
  "hero.check_1": "Запуск от 14 дней",
  "hero.check_2": "AI-автоматизация заявок",
  "hero.check_3": "Интеграция CRM",
  "hero.check_4": "Прозрачный процесс работы",
  "hero.stat_years": "год на рынке",
  "hero.stat_projects": "реализованных проектов",
  "hero.stat_ai": "AI и автоматизация",
  "hero.stat_response": "Ответ в течение дня",
  "hero.how_i_work": "Как мы работаем",
  "hero.step_1_title": "Аудит и стратегия",
  "hero.step_1_desc": "Анализируем воронку, сайт и процессы. Находим точки роста.",
  "hero.step_2_title": "Разработка и внедрение",
  "hero.step_2_desc": "Создаём сайт, настраиваем CRM, подключаем автоматизацию.",
  "hero.step_3_title": "Оптимизация и масштабирование",
  "hero.step_3_desc": "Улучшаем конверсию, масштабируем то, что приносит результат.",
  
  // Problems
  "problems.label": "Проблема",
  "problems.title": "Почему бизнес ",
  "problems.title_accent": "теряет заявки?",
  "problems.item_1": "Нет системы обработки клиентов",
  "problems.item_1_desc": "Заявки приходят — но никто не отвечает вовремя, клиент уходит к конкуренту",
  "problems.item_2": "Заявки теряются",
  "problems.item_2_desc": "Нет единой CRM — менеджеры ведут клиентов в блокнотах и мессенджерах",
  "problems.item_3": "Менеджеры работают вручную",
  "problems.item_3_desc": "Рутинные задачи отнимают время вместо того, чтобы продавать",
  "problems.item_4": "Нет аналитики",
  "problems.item_4_desc": "Не понятно, откуда приходят клиенты и что работает, а что нет",
  "problems.item_5": "Сайт не конвертирует",
  "problems.item_5_desc": "Трафик есть — заявок нет. Сайт не продаёт, а просто существует",

  // What I Do (Solutions)
  "whatido.label": "Решения",
  "whatido.title": "Что мы создаём",
  "whatido.title_accent": "",
  "whatido.subtitle": "Не набор услуг, а готовые системы для роста бизнеса",
  "whatido.card_1_title": "Система привлечения клиентов",
  "whatido.card_1_desc": "Конверсионный сайт + воронка продаж. Превращаем трафик в заявки с измеримым результатом.",
  "whatido.card_1_tags": "Лендинги,Воронки,A/B тесты",
  "whatido.card_2_title": "Автоматизация обработки заявок",
  "whatido.card_2_desc": "AI-боты + CRM + интеграции. Заявки обрабатываются мгновенно, без потерь.",
  "whatido.card_2_tags": "AI-боты,CRM,Авторассылки",
  "whatido.card_3_title": "Цифровая инфраструктура бизнеса",
  "whatido.card_3_desc": "Аналитика, процессы, масштабирование. Управляйте ростом на основе данных.",
  "whatido.card_3_tags": "Аналитика,Дашборды,Автоматизация",
  
  // Featured Cases
  "cases.featured_title": "Кейсы",
  "cases.featured_subtitle": "Реальные проекты с измеримым результатом",
  "cases.all": "Все кейсы",
  "cases.title": "Кейсы",
  "cases.subtitle": "Реальные проекты с результатами",
  "cases.all_projects": "Все",
  "cases.packaging": "Привлечение",
  "cases.promotion": "Автоматизация",
  "cases.automation": "Инфраструктура",
  "cases.analytics": "Аналитика",
  "cases.empty": "Кейсы скоро появятся",
  
  // Services
  "services.title": "Услуги",
  "services.subtitle": "Сайты, AI-системы и автоматизация. Стоимость — по задаче.",
  "services.price_note": "Рассчитываю индивидуально",
  "services.details": "Подробнее",
  "services.how_choose": "Что выбрать?",
  "services.how_choose_subtitle": "Зависит от задачи",
  "services.popular": "Популярное",
  "services.quick_start": "С чего начать",
  "services.quick_start_subtitle": "Частые запросы",
  
  // Why Trust Me
  "trust.label": "Почему мы",
  "trust.title": "Работаете ",
  "trust.title_accent": "с командой напрямую",
  "trust.subtitle": "Без посредников и субподрядчиков. Мы лично разбираемся в задаче и отвечаем за результат.",
  "trust.quote": "Нам важно понять бизнес — иначе система не сработает",
  "trust.item_1_title": "Считаем в цифрах",
  "trust.item_1_desc": "Заявки, конверсия, стоимость клиента",
  "trust.item_2_title": "Понимаем контекст",
  "trust.item_2_desc": "Ниша, клиенты, конкуренты",
  "trust.item_3_title": "Строим системы",
  "trust.item_3_desc": "Не разовые акции, а предсказуемый рост",
  "trust.item_4_title": "Отвечаем за результат",
  "trust.item_4_desc": "Прозрачные сроки и KPI",
  
  // UTP / Offer
  "utp.badge": "Под ключ",
  "utp.title": "Полная система: сайт + CRM + AI-автоматизация",
  "utp.feature_1": "Конверсионный сайт",
  "utp.feature_2": "CRM и интеграции",
  "utp.feature_3": "AI-автоматизация",
  "utp.timeline": "Запуск системы от 14 дней",

  // Target Audience Filter
  "target.label": "Для кого",
  "target.title": "Кому подойдёт, ",
  "target.title_accent": "а кому — нет",
  "target.fit_title": "Кому подойдёт",
  "target.fit_1": "Сервисный бизнес",
  "target.fit_1_desc": "Салоны, клиники, ремонт, строительство",
  "target.fit_2": "Онлайн-проекты",
  "target.fit_2_desc": "Онлайн-школы, эксперты, коучи",
  "target.fit_3": "Малый и средний бизнес",
  "target.fit_3_desc": "Компании, которым нужен системный рост",
  "target.nofit_title": "Кому не подойдёт",
  "target.nofit_1": "Тем, кому нужен просто «красивый сайт»",
  "target.nofit_1_desc": "Мы строим системы, а не визитки",
  "target.nofit_2": "Проекты без готового продукта",
  "target.nofit_2_desc": "Сначала продукт, потом маркетинг",

  // Contact
  "contact.label": "Контакт",
  "contact.title": "Расскажите ",
  "contact.title_accent": "о задаче",
  "contact.subtitle": "Опишите, что нужно — ответим в течение дня.",
  "contact.name": "Имя",
  "contact.name_placeholder": "Как вас зовут?",
  "contact.email": "Email или Telegram",
  "contact.email_placeholder": "@username или email",
  "contact.message": "Задача",
  "contact.message_placeholder": "Что нужно сделать?",
  "contact.submit": "Отправить",
  "contact.submitting": "Отправка...",
  "contact.response_time": "Ответим в течение дня",
  "contact.success": "Получили! Свяжемся сегодня.",
  
  // Approach
  "approach.label": "Наш подход",
  "approach.title": "Не просто исполнители, ",
  "approach.title_accent": "а партнёры в росте",
  "approach.subtitle": "Работаем с маркетингом как с системой, а не набором задач.",
  "approach.card_1_title": "Считаем unit-экономику",
  "approach.card_1_desc": "Каждое решение подкреплено цифрами: стоимость заявки, конверсия, ROI.",
  "approach.card_1_accent": "Цифры, а не догадки",
  "approach.card_2_title": "Строим воронки",
  "approach.card_2_desc": "От первого касания до повторной покупки — вся цепочка под контролем.",
  "approach.card_2_accent": "Полная цепочка",
  "approach.card_3_title": "Автоматизируем рутину",
  "approach.card_3_desc": "AI-боты, авторассылки, CRM — чтобы менеджеры занимались продажами.",
  "approach.card_3_accent": "Меньше ручной работы",
  "approach.card_4_title": "Масштабируем результат",
  "approach.card_4_desc": "Выстраиваем систему, которая работает предсказуемо и растёт с бизнесом.",
  "approach.card_4_accent": "Предсказуемый рост",

  // Services Preview
  "services_preview.title": "Что мы делаем",
  "services_preview.subtitle": "Сайты, AI-системы и автоматизация процессов под ключ.",
  "services_preview.details": "Подробнее",
  "services_preview.all": "Все услуги",

  // Thinking
  "thinking.label": "Наш подход к работе",
  "thinking.title": "Системный подход — ",
  "thinking.title_accent": "измеримый результат",
  "thinking.subtitle": "Не верим в «волшебные таблетки». Каждое решение основано на данных и проверено цифрами.",
  "thinking.principles_title": "Принципы работы",
  "thinking.questions_title": "Вопросы, которые мы задаём",
  "thinking.quote": "Прежде чем говорить о решениях, важно понять — где вы сейчас и куда хотите прийти. Без этого любой маркетинг — стрельба вслепую.",
  "thinking.bottom_note": "Если ищете команду, которая будет думать о вашем результате — ",
  "thinking.bottom_link": "напишите",
  "thinking.principle_1": "Сначала аудит",
  "thinking.principle_1_desc": "Любой проект начинаем с анализа: воронка, сайт, конкуренты, unit-экономика. Без понимания текущей ситуации — не работаем.",
  "thinking.principle_2": "Считаем, не угадываем",
  "thinking.principle_2_desc": "Решения принимаем на основе данных: конверсии, стоимость заявки, ROI. Интуиция — плохой советчик.",
  "thinking.principle_3": "Простое лучше сложного",
  "thinking.principle_3_desc": "Если можно решить задачу одним инструментом — не будем продавать пять.",
  "thinking.principle_4": "Честно про ограничения",
  "thinking.principle_4_desc": "Если видим, что наша работа не даст результата — скажем прямо, а не возьмём деньги.",
  "thinking.principle_5": "Думаем как владельцы",
  "thinking.principle_5_desc": "Ваши деньги — это ваши деньги. Каждый рубль бюджета должен работать на результат.",
  "thinking.question_1": "Откуда сейчас приходят заявки и сколько стоит одна заявка?",
  "thinking.question_2": "Что мешает клиенту оставить заявку прямо сейчас?",
  "thinking.question_3": "Какой один показатель изменит всё?",
  "thinking.question_4": "Что уже пробовали и почему не сработало?",
  "thinking.question_5": "Сколько стоит один клиент и сколько он приносит за год?",

  // CTA
  "cta.title": "Получите аудит вашей ",
  "cta.title_accent": "системы привлечения заявок",
  "cta.subtitle": "Разберём воронку, сайт и процессы. Покажем точки роста.",
  "cta.primary": "Записаться на аудит",
  "cta.secondary": "Посмотреть кейсы",
  "cta.response_time": "Ответим в тот же день",

  // Lead form
  "lead.title": "Расскажите о задаче",
  "lead.subtitle": "Оставьте контакт — разберём вместе, с чего начать",
  "lead.name_placeholder": "Ваше имя",
  "lead.contact_placeholder": "Telegram или Email",
  "lead.submit_a": "Получить аудит",
  "lead.submit_b": "Записаться",
  "lead.submitting": "Отправка...",
  "lead.sending": "...",
  "lead.success": "Заявка отправлена! Свяжемся в течение 24 часов",
  "lead.error": "Ошибка отправки. Попробуйте ещё раз",
  
  // Footer
  "footer.rights": "Все права защищены",
  "footer.nav": "Навигация",
  "footer.services": "Услуги",
  "footer.contacts": "Контакты",
  "footer.blog": "Блог",
  "footer.all_services": "Все услуги",
  "footer.social": "Соцсети",
  
  // Exit Popup
  "popup.title": "Уходите?",
  "popup.subtitle": "Оставьте контакт — покажем, как увеличить заявки",
  "popup.cta": "Получить аудит",
  "popup.close": "Нет, спасибо",
  "popup.consultation": "Бесплатный аудит",
  "popup.email_placeholder": "Ваш email",
  "popup.sending": "Отправка...",
  "popup.success": "Отлично! Свяжемся в ближайшее время",
  "popup.no_spam": "Никакого спама — только конкретика",
  
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
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language] = useState<Language>("ru");
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  // Fetch custom texts from database
  const { data: dbTexts } = useQuery({
    queryKey: ["site_texts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "site_texts")
        .maybeSingle();

      if (error) {
        console.error("Error fetching site texts:", error);
        return {};
      }

      return (data?.value as Record<string, string>) || {};
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("site_texts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
          filter: "key=eq.site_texts",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["site_texts"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  useEffect(() => {
    if (dbTexts) {
      setCustomTexts(dbTexts);
    }
  }, [dbTexts]);

  const setLanguage = (_lang: Language) => {
    // Language switching disabled - always Russian
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    // First check custom texts from DB, then fallback to defaults
    return customTexts[key] || defaultTranslations[key] || key;
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
