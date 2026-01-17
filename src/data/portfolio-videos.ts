export interface PortfolioVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  fullDescription?: string;
  stats?: string;
  review?: string;
  category: "montage" | "producing" | "ai-video" | "ai-products" | "vibe-coding";
  categoryLabel: string;
}

/**
 * PORTFOLIO VIDEOS
 * 
 * To add a new case:
 * 1. Copy one of the objects below
 * 2. Change id to unique value
 * 3. Replace youtubeId with YouTube video ID (the part after /shorts/ or watch?v=)
 * 4. Update title, description, fullDescription, stats, review
 * 5. Set category and categoryLabel
 */
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "1",
    youtubeId: "oI-8pTiEdHg",
    title: "Артём Бриус",
    description: "Монтаж Reels для блогера с аудиторией 1.1 млн подписчиков",
    fullDescription: "Создание динамичных Reels для топового блогера. Работа включала разработку визуального стиля, динамичный монтаж с акцентом на удержание внимания, цветокоррекцию и добавление графических элементов.",
    stats: "1.1M подписчиков • Instagram",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "2",
    youtubeId: "EBNgMgWv2sA",
    title: "Михаил Гребенюк",
    description: "Монтаж Reels для эксперта с аудиторией 700 тысяч",
    fullDescription: "Серия экспертных Reels для бизнес-блогера. Фокус на подаче сложного контента в простой и вовлекающей форме. Использование субтитров, акцентной графики и профессиональной цветокоррекции.",
    stats: "700K подписчиков • Instagram",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "3",
    youtubeId: "rcQr2Zd0og8",
    title: "LEADS",
    description: "Монтаж YouTube Shorts для образовательного проекта",
    fullDescription: "Образовательный контент в формате Shorts. Задача — сделать обучающие видео максимально понятными и вовлекающими. Добавление анимированной инфографики, субтитров и динамичных переходов.",
    stats: "2K+ подписчиков • YouTube",
    category: "montage",
    categoryLabel: "Shorts • YouTube",
  },
  {
    id: "4",
    youtubeId: "N7m2YKSSTEk",
    title: "SIMON",
    description: "Монтаж TikTok для личного бренда",
    fullDescription: "Контент для личного бренда в TikTok. Стилистика под платформу — быстрый темп, трендовые эффекты, цепляющие первые секунды. Работа со звуком и музыкой под тренды платформы.",
    stats: "12K в Telegram • TikTok",
    category: "montage",
    categoryLabel: "TikTok",
  },
];

export type PortfolioCategory = PortfolioVideo["category"] | "all";

export const portfolioFilters: { value: PortfolioCategory; label: string }[] = [
  { value: "all", label: "Все работы" },
  { value: "montage", label: "Монтаж" },
  { value: "producing", label: "Продюсирование" },
  { value: "ai-video", label: "AI-видео" },
  { value: "ai-products", label: "AI-продукты" },
  { value: "vibe-coding", label: "Vibe coding" },
];

export function getPortfolioByCategory(category: PortfolioCategory): PortfolioVideo[] {
  if (category === "all") return portfolioVideos;
  return portfolioVideos.filter((v) => v.category === category);
}
