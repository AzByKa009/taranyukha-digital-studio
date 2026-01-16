export type CaseCategory = "montage" | "producing" | "ai-video" | "ai-products" | "vibe-coding";

export interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category: CaseCategory;
  categoryLabel: string;
  shortDescription: string;
  year: string;
  thumbnail: string;
  videoPreview?: string;
  
  // Detail page content
  challenge: string;
  solution: string;
  result: string;
  deliverables: string[];
  gallery: string[];
  tags: string[];
}

export const categoryFilters: { value: CaseCategory | "all"; label: string }[] = [
  { value: "all", label: "Все проекты" },
  { value: "montage", label: "Монтаж" },
  { value: "producing", label: "Продюсирование" },
  { value: "ai-video", label: "AI-видео" },
  { value: "ai-products", label: "AI-продукты" },
  { value: "vibe-coding", label: "Vibe coding" },
];

export const cases: CaseItem[] = [
  {
    id: "1",
    slug: "ai-assistant-fintech",
    title: "AI-ассистент для финтех-стартапа",
    category: "ai-products",
    categoryLabel: "AI-продукты",
    shortDescription: "Интеллектуальный чат-бот для автоматизации клиентской поддержки",
    year: "2024",
    thumbnail: "/placeholder.svg",
    challenge: "Финтех-стартап столкнулся с растущим потоком обращений в поддержку. Команда не справлялась с нагрузкой, а время ответа увеличивалось, что влияло на удовлетворённость клиентов и конверсию.",
    solution: "Разработал AI-ассистента на базе GPT-4 с тонкой настройкой под специфику финансовых продуктов. Система интегрирована с CRM и базой знаний компании, умеет обрабатывать типовые запросы, передавать сложные кейсы операторам и обучаться на новых данных.",
    result: "Значительное сокращение времени ответа на типовые запросы. Операторы сфокусировались на сложных кейсах, требующих экспертизы. Клиенты получают помощь 24/7 без ожидания.",
    deliverables: [
      "Архитектура AI-системы",
      "Интеграция с GPT-4 API",
      "Обучение модели на данных компании",
      "Интеграция с CRM и базой знаний",
      "Админ-панель для мониторинга",
      "Документация и обучение команды"
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    tags: ["NLP", "Python", "GPT-4", "API Integration"],
  },
  {
    id: "2",
    slug: "digital-production-platform",
    title: "Платформа цифрового продакшена",
    category: "producing",
    categoryLabel: "Продюсирование",
    shortDescription: "Комплексная система управления контентом и автоматизации маркетинга",
    year: "2024",
    thumbnail: "/placeholder.svg",
    challenge: "E-commerce компания тратила огромные ресурсы на создание и управление маркетинговым контентом. Процессы были разрозненными, а качество контента — нестабильным.",
    solution: "Создал единую платформу для управления всем циклом производства контента: от планирования до публикации. Включает AI-генерацию текстов, автоматическое ресайзинг изображений под разные форматы и интеграции с основными рекламными платформами.",
    result: "Команда маркетинга получила инструмент, который существенно ускорил производство контента. Единый стиль коммуникаций, меньше ручной работы, больше времени на стратегию.",
    deliverables: [
      "Проектирование платформы",
      "Frontend на React",
      "Backend на Node.js",
      "AI-модуль генерации контента",
      "Интеграции с Meta, Google Ads",
      "Система аналитики"
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    tags: ["React", "Node.js", "AWS", "AI Content"],
  },
  {
    id: "3",
    slug: "neural-network-analytics",
    title: "Нейросеть для анализа данных",
    category: "ai-products",
    categoryLabel: "AI-продукты",
    shortDescription: "Предиктивная аналитика для оптимизации логистики",
    year: "2023",
    thumbnail: "/placeholder.svg",
    challenge: "Логистическая компания работала реактивно — проблемы решались по факту возникновения. Не было инструментов для прогнозирования загрузки, оптимизации маршрутов и предотвращения простоев.",
    solution: "Построил систему предиктивной аналитики на базе машинного обучения. Модель анализирует исторические данные, сезонность, внешние факторы и выдаёт рекомендации по оптимизации ресурсов.",
    result: "Компания перешла от реактивного управления к проактивному. Более точное планирование ресурсов, меньше простоев, лучшее использование автопарка.",
    deliverables: [
      "Сбор и очистка данных",
      "Разработка ML-модели",
      "API для интеграции",
      "Dashboard для менеджеров",
      "Система алертов",
      "Обучение персонала"
    ],
    gallery: ["/placeholder.svg"],
    tags: ["TensorFlow", "Python", "BigQuery", "ML"],
  },
  {
    id: "4",
    slug: "ai-video-production",
    title: "AI-видеопродакшен для бренда",
    category: "ai-video",
    categoryLabel: "AI-видео",
    shortDescription: "Создание рекламных роликов с использованием генеративного AI",
    year: "2024",
    thumbnail: "/placeholder.svg",
    videoPreview: "/placeholder.svg",
    challenge: "Бренд хотел создать серию рекламных видео для социальных сетей, но бюджет не позволял организовать полноценные съёмки с актёрами и локациями.",
    solution: "Применил комбинацию AI-инструментов: генерация сценариев с GPT-4, создание визуалов с Midjourney и Runway, озвучка с ElevenLabs. Итоговый продакшен — в профессиональном видеоредакторе.",
    result: "Серия из 12 видеороликов, готовых к публикации. Качество на уровне традиционного продакшена при существенно меньших затратах времени и бюджета.",
    deliverables: [
      "Сценарии для 12 роликов",
      "AI-генерация визуалов",
      "Профессиональный монтаж",
      "AI-озвучка",
      "Адаптация под форматы",
      "Пакет готовых материалов"
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    tags: ["Midjourney", "Runway", "ElevenLabs", "Video Production"],
  },
  {
    id: "5",
    slug: "vibe-coding-startup",
    title: "MVP стартапа за 2 недели",
    category: "vibe-coding",
    categoryLabel: "Vibe coding",
    shortDescription: "Быстрая разработка работающего прототипа с помощью AI-инструментов",
    year: "2024",
    thumbnail: "/placeholder.svg",
    challenge: "Основатели стартапа хотели быстро проверить гипотезу на рынке. Традиционная разработка заняла бы месяцы и потребовала значительных инвестиций.",
    solution: "Применил подход vibe coding — разработка с активным использованием AI-ассистентов. Cursor, GPT-4, v0.dev для интерфейсов. Фокус на скорости и проверке идеи, а не на идеальном коде.",
    result: "Работающий MVP за 2 недели. Стартап получил возможность показать продукт инвесторам и собрать первую обратную связь от пользователей.",
    deliverables: [
      "Архитектура MVP",
      "Frontend на React",
      "Backend на Supabase",
      "Базовая аутентификация",
      "Ключевые фичи продукта",
      "Деплой и документация"
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    tags: ["React", "Supabase", "Cursor", "Rapid Prototyping"],
  },
  {
    id: "6",
    slug: "video-montage-course",
    title: "Монтаж онлайн-курса",
    category: "montage",
    categoryLabel: "Монтаж",
    shortDescription: "Профессиональный монтаж образовательного контента",
    year: "2023",
    thumbnail: "/placeholder.svg",
    challenge: "Эксперт записал 40 часов сырого видеоматериала для онлайн-курса. Нужно было превратить это в структурированный, вовлекающий продукт с современной подачей.",
    solution: "Полный цикл постпродакшена: структурирование материала, монтаж с динамичной нарезкой, добавление графики и анимаций, цветокоррекция, работа со звуком.",
    result: "Готовый онлайн-курс из 25 модулей. Профессиональная подача, которая удерживает внимание учеников и повышает completion rate.",
    deliverables: [
      "Структура курса",
      "Монтаж 25 модулей",
      "Графика и анимации",
      "Цветокоррекция",
      "Обработка звука",
      "Рендер в нужных форматах"
    ],
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    tags: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
];

export function getCaseBySlug(slug: string): CaseItem | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getCasesByCategory(category: CaseCategory | "all"): CaseItem[] {
  if (category === "all") return cases;
  return cases.filter((c) => c.category === category);
}
