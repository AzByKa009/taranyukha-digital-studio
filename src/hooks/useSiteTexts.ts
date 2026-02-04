import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Default texts for the site
const defaultTexts: Record<string, string> = {
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
  "hero.title_1": "Выстраиваю маркетинг, ",
  "hero.title_2": "который приносит клиентов",
  "hero.subtitle": "Работаю с бизнесом напрямую. Упаковка, продвижение, автоматизация — как единая система, а не хаос задач.",
  "hero.cta_primary": "Обсудить задачу",
  "hero.stat_years": "года опыта",
  "hero.stat_projects": "проектов",
  "hero.stat_ai": "автоматизация",
  "hero.stat_response": "ответ",
  "hero.how_i_work": "Как я работаю",
  "hero.step_1_title": "Разбираюсь",
  "hero.step_1_desc": "Изучаю бизнес и задачу",
  "hero.step_2_title": "Планирую",
  "hero.step_2_desc": "Предлагаю решение",
  "hero.step_3_title": "Делаю",
  "hero.step_3_desc": "Беру реализацию на себя",
  "hero.step_4_title": "Развиваю",
  "hero.step_4_desc": "Помогаю масштабировать",
  
  // What I Do
  "whatido.label": "Экспертиза",
  "whatido.title": "Что я делаю",
  "whatido.subtitle": "Помогаю бизнесу расти системно — через понятный маркетинг",
  
  // Cases
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
  
  // Trust
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
  
  // Contact
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
  
  // CTA
  "cta.title": "С чего начать?",
  "cta.subtitle": "Расскажите о задаче — разберёмся вместе",
  "cta.primary": "Обсудить",
  "cta.secondary": "Посмотреть кейсы",
  
  // Footer
  "footer.rights": "Все права защищены",
  "footer.nav": "Навигация",
  "footer.services": "Услуги",
  "footer.contacts": "Контакты",
  
  // Popup
  "popup.title": "Уходите?",
  "popup.subtitle": "Оставьте контакт — расскажу, как могу помочь",
  "popup.cta": "Получить консультацию",
  "popup.close": "Нет, спасибо",
  
  // Common
  "common.from": "от",
  "common.learn_more": "Подробнее",
  "common.back": "Назад",
  "common.loading": "Загрузка...",
};

export function useSiteTexts() {
  return useQuery({
    queryKey: ["site_texts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "site_texts")
        .maybeSingle();

      if (error) {
        console.error("Error fetching site texts:", error);
        return defaultTexts;
      }

      if (data?.value) {
        const customTexts = data.value as Record<string, string>;
        return { ...defaultTexts, ...customTexts };
      }

      return defaultTexts;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useText(key: string): string {
  const { data: texts } = useSiteTexts();
  return texts?.[key] || defaultTexts[key] || key;
}

export { defaultTexts };
