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
    shortDescription: "Чат-бот для автоматизации поддержки — быстрые ответы 24/7",
    year: "2024",
    thumbnail: "/placeholder.svg",
    challenge: "Растущий поток обращений в поддержку. Команда не справлялась, время ответа увеличивалось, клиенты уходили к конкурентам.",
    solution: "Разработал AI-ассистента на базе GPT-4, интегрированного с CRM и базой знаний. Система обрабатывает типовые запросы и передаёт сложные кейсы операторам.",
    result: "Клиенты получают помощь мгновенно в любое время. Операторы сфокусировались на сложных кейсах. Лучшее удержание клиентов.",
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
    title: "Система продакшена для e-commerce",
    category: "producing",
    categoryLabel: "Продюсирование",
    shortDescription: "Единая система производства контента — больше публикаций, меньше хаоса",
    year: "2024",
    thumbnail: "/placeholder.svg",
    challenge: "Хаотичное производство маркетингового контента. Разрозненные процессы, нестабильное качество, много ручной работы.",
    solution: "Создал систему управления циклом производства контента: от планирования до публикации. AI-генерация текстов, автоматический ресайзинг, интеграции с рекламными платформами.",
    result: "Команда производит контент значительно быстрее. Единый стиль коммуникаций, меньше рутины, больше времени на стратегию.",
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
    title: "Предиктивная аналитика для логистики",
    category: "ai-products",
    categoryLabel: "AI-продукты",
    shortDescription: "AI-система прогнозирования — меньше простоев, лучше планирование",
    year: "2023",
    thumbnail: "/placeholder.svg",
    challenge: "Реактивное управление — проблемы решались по факту. Не было инструментов для прогнозирования загрузки и оптимизации маршрутов.",
    solution: "Построил систему предиктивной аналитики на ML. Модель анализирует данные, сезонность, внешние факторы и выдаёт рекомендации по оптимизации.",
    result: "Переход от реактивного управления к проактивному. Более точное планирование, меньше простоев, эффективнее использование ресурсов.",
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
    title: "AI-видео для бренда косметики",
    category: "ai-video",
    categoryLabel: "AI-видео",
    shortDescription: "Серия роликов с AI-визуалами — вау-эффект без дорогих съёмок",
    year: "2024",
    thumbnail: "/placeholder.svg",
    videoPreview: "/placeholder.svg",
    challenge: "Нужна серия рекламных видео для соцсетей, но бюджет не позволял организовать съёмки с моделями и локациями.",
    solution: "Применил AI-инструменты: сценарии с GPT-4, визуалы с Midjourney и Runway, озвучка с ElevenLabs. Финальный продакшен — в профессиональном редакторе.",
    result: "12 видеороликов с качеством дорогого продакшена. Контент, который выделяется в ленте и привлекает внимание к бренду.",
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
    shortDescription: "Рабочий прототип за 14 дней — быстрая проверка идеи",
    year: "2024",
    thumbnail: "/placeholder.svg",
    challenge: "Основатели хотели проверить идею на рынке. Традиционная разработка заняла бы месяцы и потребовала больших инвестиций.",
    solution: "Применил vibe coding — разработка с AI-ассистентами. Cursor, GPT-4, v0.dev для интерфейсов. Фокус на скорости и проверке идеи.",
    result: "Работающий MVP за 2 недели. Стартап показал продукт инвесторам и собрал первую обратную связь от реальных пользователей.",
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
    title: "Монтаж онлайн-курса для эксперта",
    category: "montage",
    categoryLabel: "Монтаж",
    shortDescription: "40 часов материала → 25 модулей с высоким completion rate",
    year: "2023",
    thumbnail: "/placeholder.svg",
    challenge: "Эксперт записал 40 часов сырого материала. Нужно превратить это в структурированный, вовлекающий курс с современной подачей.",
    solution: "Полный цикл постпродакшена: структурирование, динамичная нарезка, графика и анимации, цветокоррекция, работа со звуком.",
    result: "Готовый курс из 25 модулей. Профессиональная подача, которая удерживает внимание учеников. Высокий процент прохождения курса.",
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