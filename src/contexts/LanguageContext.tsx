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
  "nav.about": "Обо мне",
  "nav.faq": "FAQ",
  "nav.contact": "Связаться",
  
  // Hero
  "hero.badge": "Маркетолог · Системный подход",
  "hero.title_1": "Клиенты заходят — ",
  "hero.title_2": "но не покупают?",
  "hero.subtitle": "Делаю продающие сайты, вертикальный контент и автоматизацию, которые превращают трафик в заявки.",
  "hero.cta_primary": "Обсудить задачу",
  "hero.stat_years": "1+ год опыта",
  "hero.stat_projects": "10+ проектов",
  "hero.stat_ai": "AI и автоматизация",
  "hero.stat_response": "Ответ в течение дня",
  "hero.how_i_work": "Как я работаю",
  "hero.step_1_title": "Разбираюсь",
  "hero.step_1_desc": "Погружаюсь в бизнес, продукт, клиентов и цели.",
  "hero.step_2_title": "Планирую",
  "hero.step_2_desc": "Предлагаю конкретное решение с понятной логикой.",
  "hero.step_3_title": "Реализую",
  "hero.step_3_desc": "Беру реализацию на себя: сайт, контент, автоматизация.",
  "hero.step_4_title": "Развиваю",
  "hero.step_4_desc": "Оптимизирую и масштабирую то, что работает.",
  
  // What I Do
  "whatido.label": "Экспертиза",
  "whatido.title": "Что я делаю",
  "whatido.subtitle": "Помогаю бизнесу расти системно — через понятный маркетинг",
  
  // Featured Cases
  "cases.featured_title": "Проекты",
  "cases.featured_subtitle": "Примеры того, как это работает",
  "cases.all": "Все проекты",
  "cases.title": "Кейсы",
  "cases.subtitle": "Реальные проекты с результатами",
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
  "services.subtitle": "Сайты, AI-решения и продвижение. Стоимость — по задаче.",
  "services.price_note": "Рассчитываю индивидуально",
  "services.details": "Подробнее",
  "services.how_choose": "Что выбрать?",
  "services.how_choose_subtitle": "Зависит от задачи",
  "services.popular": "Популярное",
  "services.quick_start": "С чего начать",
  "services.quick_start_subtitle": "Частые запросы",
  
  // Why Trust Me - personal, direct
  "trust.label": "Подход",
  "trust.title": "Работаете ",
  "trust.title_accent": "со мной напрямую",
  "trust.subtitle": "Без менеджеров и посредников. Я лично разбираюсь в задаче и отвечаю за результат.",
  "trust.quote": "Мне важно понять бизнес — иначе маркетинг не сработает",
  "trust.item_1_title": "Думаю стратегически",
  "trust.item_1_desc": "Сначала — зачем, потом — как",
  "trust.item_2_title": "Понимаю контекст",
  "trust.item_2_desc": "Ниша, клиенты, конкуренты",
  "trust.item_3_title": "Считаю результат",
  "trust.item_3_desc": "Цифры важнее красивых отчётов",
  "trust.item_4_title": "Строю надолго",
  "trust.item_4_desc": "Системы, а не разовые акции",
  
  // Contact - simple, inviting
  "contact.label": "Контакт",
  "contact.title": "Расскажите ",
  "contact.title_accent": "о задаче",
  "contact.subtitle": "Опишите, что нужно — отвечу в течение дня.",
  "contact.name": "Имя",
  "contact.name_placeholder": "Как вас зовут?",
  "contact.email": "Email или Telegram",
  "contact.email_placeholder": "@username или email",
  "contact.message": "Задача",
  "contact.message_placeholder": "Что нужно сделать?",
  "contact.submit": "Отправить",
  "contact.submitting": "Отправка...",
  "contact.response_time": "Отвечу в течение дня",
  "contact.success": "Получил! Свяжусь сегодня.",
  
  // Approach
  "approach.label": "Мой подход",
  "approach.title": "Не просто исполнитель, ",
  "approach.title_accent": "а партнёр в росте",
  "approach.subtitle": "Работаю с маркетингом как с системой, а не набором разрозненных задач.",
  "approach.card_1_title": "Стратегическое мышление",
  "approach.card_1_desc": "Каждое действие — часть плана, работающего на вашу цель.",
  "approach.card_1_accent": "Сначала — зачем, потом — как",
  "approach.card_2_title": "Понимание бизнеса",
  "approach.card_2_desc": "Разбираюсь в нише, конкурентах и клиентах.",
  "approach.card_2_accent": "Вникаю в суть",
  "approach.card_3_title": "Фокус на результате",
  "approach.card_3_desc": "Заявки, продажи, рост. Красивые отчёты без результата — не мой подход.",
  "approach.card_3_accent": "Цифры важнее слов",
  "approach.card_4_title": "Системный подход",
  "approach.card_4_desc": "Выстраиваю систему, которая работает предсказуемо и масштабируется.",
  "approach.card_4_accent": "Один раз настроить — долго пожинать",

  // Services Preview
  "services_preview.title": "Чем я могу помочь",
  "services_preview.subtitle": "AI-продукты, сайты под услуги и вертикальный контент. Беру на себя большую часть работы.",
  "services_preview.details": "Подробнее",
  "services_preview.all": "Все услуги",

  // WhatIDo cards
  "whatido.card_1_title": "Упаковка бизнеса",
  "whatido.card_1_desc": "Позиционирование и упаковка, чтобы клиент понял ценность за 3 секунды.",
  "whatido.card_1_tags": "Сайты,Презентации,Коммерческие предложения",
  "whatido.card_2_title": "Продвижение",
  "whatido.card_2_desc": "Трафик и вертикальный контент, которые конвертируются в заявки.",
  "whatido.card_2_tags": "Таргет,Контент-маркетинг,SEO",
  "whatido.card_3_title": "Автоматизация",
  "whatido.card_3_desc": "AI и автоматизация процессов: меньше рутины, больше результата.",
  "whatido.card_3_tags": "Чат-боты,CRM-интеграции,Авторассылки",
  "whatido.card_4_title": "Аналитика и стратегия",
  "whatido.card_4_desc": "Цифры, воронки и unit-экономика вместо догадок.",
  "whatido.card_4_tags": "Аудит,Unit-экономика,Воронки",

  // Thinking
  "thinking.label": "Как я думаю",
  "thinking.title": "Маркетинг — это ",
  "thinking.title_accent": "бизнес-мышление",
  "thinking.subtitle": "Я не верю в «волшебные таблетки» и быстрые результаты без понимания контекста. Прежде чем что-то делать — разбираюсь, как устроен ваш бизнес.",
  "thinking.principles_title": "Принципы работы",
  "thinking.questions_title": "Вопросы, которые задаю",
  "thinking.quote": "Прежде чем говорить о решениях, мне важно понять — где вы сейчас и куда хотите прийти. Без этого любой маркетинг — стрельба с закрытыми глазами.",
  "thinking.bottom_note": "Если ищете человека, который будет думать о вашем результате — ",
  "thinking.bottom_link": "напишите",
  "thinking.principle_1": "Сначала — зачем",
  "thinking.principle_1_desc": "Любой проект начинаю с вопроса «какую бизнес-задачу решаем?». Красивый сайт без понимания цели — пустая трата денег.",
  "thinking.principle_2": "Считаю, не угадываю",
  "thinking.principle_2_desc": "Решения принимаю на основе данных: unit-экономика, конверсии, стоимость привлечения. Интуиция — плохой советчик в маркетинге.",
  "thinking.principle_3": "Простое лучше сложного",
  "thinking.principle_3_desc": "Если можно решить задачу одним инструментом — не буду продавать пять. Сложность ≠ эффективность.",
  "thinking.principle_4": "Честно про ограничения",
  "thinking.principle_4_desc": "Если вижу, что моя работа не даст результата без изменений в продукте или продажах — скажу прямо, а не возьму деньги.",
  "thinking.principle_5": "Думаю как владелец",
  "thinking.principle_5_desc": "Ваши деньги — это ваши деньги. Не буду тратить бюджет на эксперименты ради экспериментов.",
  "thinking.question_1": "Откуда сейчас приходят клиенты и почему именно оттуда?",
  "thinking.question_2": "Что мешает клиенту купить прямо сейчас?",
  "thinking.question_3": "Какой один показатель изменит всё?",
  "thinking.question_4": "Что уже пробовали и почему не сработало?",
  "thinking.question_5": "Сколько стоит один клиент и сколько он приносит?",

  // CTA
  "cta.title": "Готовы обсудить ",
  "cta.title_accent": "задачу?",
  "cta.subtitle": "Напишите в Telegram или оставьте контакт — отвечу в тот же день.",
  "cta.primary": "Обсудить задачу",
  "cta.secondary": "Посмотреть кейсы",
  "cta.response_time": "Отвечу в тот же день",

  // Lead form
  "lead.title": "Расскажите о задаче",
  "lead.subtitle": "Оставьте контакт — разберём вместе, с чего начать",
  "lead.name_placeholder": "Ваше имя",
  "lead.contact_placeholder": "Telegram или Email",
  "lead.submit_a": "Обсудить",
  "lead.submit_b": "Начать разговор",
  "lead.submitting": "Отправка...",
  "lead.sending": "...",
  "lead.success": "Заявка отправлена! Свяжусь в течение 24 часов",
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
  "popup.subtitle": "Оставьте контакт — расскажу, как могу помочь",
  "popup.cta": "Получить консультацию",
  "popup.close": "Нет, спасибо",
  "popup.consultation": "Бесплатная консультация",
  "popup.email_placeholder": "Ваш email",
  "popup.sending": "Отправка...",
  "popup.success": "Отлично! Свяжусь с вами в ближайшее время",
  "popup.no_spam": "Никакого спама — только полезные материалы",
  
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
