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
  "whatido.title": "С чем помогаю ",
  "whatido.title_accent": "бизнесу расти",
  "whatido.subtitle": "Это не список услуг, а области, в которых я разбираюсь. Конкретное решение подбираю под вашу задачу — после диагностики.",
  "whatido.card_1_title": "Упаковка бизнеса",
  "whatido.card_1_desc": "Позиционирование, смыслы, визуал. Чтобы клиент понял ценность за 3 секунды.",
  "whatido.card_1_tags": "Сайты,Презентации,Коммерческие предложения",
  "whatido.card_2_title": "Продвижение",
  "whatido.card_2_desc": "Трафик, который конвертируется в заявки и продажи. Без слива бюджета.",
  "whatido.card_2_tags": "Таргет,Контент-маркетинг,SEO",
  "whatido.card_3_title": "Автоматизация",
  "whatido.card_3_desc": "Освобождаю время команды от рутины. AI и интеграции работают за вас.",
  "whatido.card_3_tags": "Чат-боты,CRM-интеграции,Авторассылки",
  "whatido.card_4_title": "Аналитика и стратегия",
  "whatido.card_4_desc": "Понимаю, что работает, а что — нет. Решения на основе данных, не интуиции.",
  "whatido.card_4_tags": "Аудит,Unit-экономика,Воронки",

  // Approach
  "approach.label": "Мой подход",
  "approach.title": "Не просто исполнитель, ",
  "approach.title_accent": "а партнёр в росте",
  "approach.subtitle": "Я не беру задачи «сделать пост» или «запустить рекламу». Работаю с теми, кому нужен маркетинг как система — с пониманием целей и ответственностью за результат.",
  "approach.card_1_title": "Стратегическое мышление",
  "approach.card_1_desc": "Не делаю ради галочки. Каждое действие — часть плана, работающего на вашу цель: рост, продажи, узнаваемость.",
  "approach.card_1_accent": "Сначала — зачем, потом — как",
  "approach.card_2_title": "Понимание бизнеса",
  "approach.card_2_desc": "Разбираюсь в вашей нише, конкурентах, клиентах. Маркетинг без контекста — просто трата бюджета.",
  "approach.card_2_accent": "Вникаю в суть, а не поверхностно",
  "approach.card_3_title": "Фокус на результат",
  "approach.card_3_desc": "Метрики, которые можно измерить: заявки, продажи, рост аудитории. Красивые отчёты без результата — не мой подход.",
  "approach.card_3_accent": "Цифры важнее красивых слов",
  "approach.card_4_title": "Системность",
  "approach.card_4_desc": "Маркетинг как процесс, а не хаос. Выстраиваю систему, которая работает предсказуемо и масштабируется.",
  "approach.card_4_accent": "Один раз настроить — долго пожинать",

  // Services Preview
  "services_preview.title": "Чем я могу помочь",
  "services_preview.subtitle": "AI-продукты, сайты под услуги и вертикальный контент. Беру на себя большую часть работы.",
  "services_preview.details": "Подробнее",
  "services_preview.all": "Все услуги",

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
  
  // UTP / Offer
  "utp.badge": "Под ключ",
  "utp.title": "Полный пакет: сайт + 5 вертикальных видео + автоматизация",
  "utp.feature_1": "Продающий сайт",
  "utp.feature_2": "5 вертикальных видео",
  "utp.feature_3": "AI-автоматизация",
  "utp.timeline": "Старт под ключ от 14 дней",

  // CTA
  "cta.title": "С чего ",
  "cta.title_accent": "начать?",
  "cta.subtitle": "Расскажите о задаче — разберёмся вместе, что нужно и как это сделать.",
  "cta.primary": "Обсудить",
  "cta.secondary": "Посмотреть кейсы",
  "cta.response_time": "Отвечу в течение дня",

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
  
  // Popup
  "popup.title": "Уходите?",
  "popup.subtitle": "Оставьте контакт — расскажу, как могу помочь",
  "popup.cta": "Получить консультацию",
  "popup.close": "Нет, спасибо",
  "popup.consultation": "Бесплатная консультация",
  "popup.email_placeholder": "Ваш email",
  "popup.sending": "Отправка...",
  "popup.success": "Отлично! Свяжусь с вами в ближайшее время",
  "popup.no_spam": "Никакого спама — только полезные материалы",
  
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
    staleTime: 1000 * 60 * 5,
  });
}

export function useText(key: string): string {
  const { data: texts } = useSiteTexts();
  return texts?.[key] || defaultTexts[key] || key;
}

export { defaultTexts };
