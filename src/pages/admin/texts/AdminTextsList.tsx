import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Search, ChevronDown, ChevronRight, Edit2, Check, X } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

interface TextItem {
  key: string;
  value: string;
  category: string;
}

// Default texts organized by category
const defaultTexts: Record<string, Record<string, string>> = {
  hero: {
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
  },
  navigation: {
    "nav.home": "Главная",
    "nav.cases": "Кейсы",
    "nav.services": "Услуги",
    "nav.ai_products": "AI-решения",
    "nav.about": "Обо мне",
    "nav.faq": "FAQ",
    "nav.contact": "Связаться",
  },
  whatido: {
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
  },
  approach: {
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
  },
  services_preview: {
    "services_preview.title": "Чем я могу помочь",
    "services_preview.subtitle": "AI-продукты, сайты под услуги и вертикальный контент. Беру на себя большую часть работы.",
    "services_preview.details": "Подробнее",
    "services_preview.all": "Все услуги",
  },
  thinking: {
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
  },
  cases: {
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
  },
  services: {
    "services.title": "Услуги",
    "services.subtitle": "Сайты, AI-решения и продвижение. Стоимость — по задаче.",
    "services.price_note": "Рассчитываю индивидуально",
    "services.details": "Подробнее",
    "services.how_choose": "Что выбрать?",
    "services.how_choose_subtitle": "Зависит от задачи",
    "services.popular": "Популярное",
    "services.quick_start": "С чего начать",
    "services.quick_start_subtitle": "Частые запросы",
  },
  trust: {
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
  },
  contact: {
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
  },
  cta: {
    "cta.title": "С чего ",
    "cta.title_accent": "начать?",
    "cta.subtitle": "Расскажите о задаче — разберёмся вместе, что нужно и как это сделать.",
    "cta.primary": "Обсудить",
    "cta.secondary": "Посмотреть кейсы",
    "cta.response_time": "Отвечу в течение дня",
  },
  lead: {
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
  },
  footer: {
    "footer.rights": "Все права защищены",
    "footer.nav": "Навигация",
    "footer.services": "Услуги",
    "footer.contacts": "Контакты",
    "footer.blog": "Блог",
    "footer.all_services": "Все услуги",
    "footer.social": "Соцсети",
  },
  popup: {
    "popup.title": "Уходите?",
    "popup.subtitle": "Оставьте контакт — расскажу, как могу помочь",
    "popup.cta": "Получить консультацию",
    "popup.close": "Нет, спасибо",
    "popup.consultation": "Бесплатная консультация",
    "popup.email_placeholder": "Ваш email",
    "popup.sending": "Отправка...",
    "popup.success": "Отлично! Свяжусь с вами в ближайшее время",
    "popup.no_spam": "Никакого спама — только полезные материалы",
  },
  common: {
    "common.from": "от",
    "common.learn_more": "Подробнее",
    "common.back": "Назад",
    "common.loading": "Загрузка...",
  },
};

const categoryLabels: Record<string, string> = {
  hero: "Главный экран (Hero)",
  navigation: "Навигация",
  whatido: "Экспертиза (Что я делаю)",
  approach: "Подход (4 карточки)",
  services_preview: "Превью услуг",
  thinking: "Как я думаю",
  cases: "Кейсы",
  services: "Услуги",
  trust: "Почему доверять",
  contact: "Контакты",
  cta: "Призыв к действию",
  lead: "Форма заявки",
  footer: "Подвал сайта",
  popup: "Всплывающие окна",
  common: "Общие тексты",
};

export default function AdminTextsList() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["hero"]));
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    setLoading(true);
    
    // Initialize with defaults
    const allTexts: Record<string, string> = {};
    Object.entries(defaultTexts).forEach(([, categoryTexts]) => {
      Object.entries(categoryTexts).forEach(([key, value]) => {
        allTexts[key] = value;
      });
    });

    // Fetch custom texts from database
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("key", "site_texts")
      .maybeSingle();

    if (!error && data?.value) {
      const customTexts = data.value as Record<string, string>;
      Object.entries(customTexts).forEach(([key, value]) => {
        allTexts[key] = value;
      });
    }

    setTexts(allTexts);
    setLoading(false);
  };

  const handleStartEdit = (key: string) => {
    setEditingKey(key);
    setEditValue(texts[key] || "");
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const handleSaveText = async (key: string) => {
    setSaving(true);
    
    const updatedTexts = { ...texts, [key]: editValue };
    setTexts(updatedTexts);
    
    // Save to database
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "site_texts")
      .maybeSingle();

    let error;
    if (existing) {
      const result = await supabase
        .from("site_settings")
        .update({ value: updatedTexts as unknown as Json })
        .eq("key", "site_texts");
      error = result.error;
    } else {
      const result = await supabase
        .from("site_settings")
        .insert([{ key: "site_texts", value: updatedTexts as unknown as Json }]);
      error = result.error;
    }

    if (error) {
      toast.error(`Ошибка сохранения: ${error.message}`);
    } else {
      toast.success("Текст сохранён");
    }
    
    setEditingKey(null);
    setEditValue("");
    setSaving(false);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filterTexts = (categoryTexts: Record<string, string>) => {
    if (!searchQuery) return categoryTexts;
    
    const filtered: Record<string, string> = {};
    Object.entries(categoryTexts).forEach(([key, value]) => {
      const currentValue = texts[key] || value;
      if (
        key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currentValue.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        filtered[key] = value;
      }
    });
    return filtered;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Тексты сайта</h1>
          <p className="text-muted-foreground mt-1">
            Редактируйте любой текст на сайте
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по текстам..."
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {Object.entries(defaultTexts).map(([category, categoryTexts]) => {
          const filteredTexts = filterTexts(categoryTexts);
          const hasResults = Object.keys(filteredTexts).length > 0;
          
          if (searchQuery && !hasResults) return null;
          
          const isExpanded = expandedCategories.has(category) || !!searchQuery;

          return (
            <div key={category} className="premium-card overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-semibold">{categoryLabels[category] || category}</h3>
                    <p className="text-xs text-muted-foreground">
                      {Object.keys(categoryTexts).length} текстов
                    </p>
                  </div>
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-border">
                  {Object.entries(filteredTexts).map(([key, defaultValue]) => {
                    const currentValue = texts[key] || defaultValue;
                    const isEditing = editingKey === key;
                    const isMultiline = currentValue.length > 60;

                    return (
                      <div
                        key={key}
                        className={cn(
                          "px-4 py-3 border-b border-border/50 last:border-b-0",
                          isEditing && "bg-muted/30"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-muted-foreground font-mono mb-1">
                              {key}
                            </div>
                            {isEditing ? (
                              <div className="space-y-2">
                                {isMultiline ? (
                                  <Textarea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    rows={3}
                                    className="text-sm"
                                    autoFocus
                                  />
                                ) : (
                                  <Input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="text-sm"
                                    autoFocus
                                  />
                                )}
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleSaveText(key)}
                                    disabled={saving}
                                    className="gap-1"
                                  >
                                    {saving ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <Check className="w-3 h-3" />
                                    )}
                                    Сохранить
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="w-3 h-3" />
                                    Отмена
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-foreground break-words">
                                {currentValue}
                              </p>
                            )}
                          </div>
                          {!isEditing && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStartEdit(key)}
                              className="shrink-0"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
