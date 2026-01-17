export interface PortfolioVideo {
  id: string;
  /** VK Video ID в формате "oid_id" (например, "-123456789_456239123") */
  vkVideoId: string;
  /** Опционально: прямая ссылка на превью изображение */
  thumbnailUrl?: string;
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
 * Чтобы добавить новый кейс:
 * 1. Скопируй один из объектов ниже
 * 2. Измени id на уникальное значение
 * 3. Замени vkVideoId на ID видео из VK (формат: "oid_id", например "-123456789_456239123")
 *    - Открой видео на VK, в URL будет что-то вроде: vk.com/video-123456789_456239123
 *    - Скопируй часть после /video (это и есть vkVideoId)
 * 4. Обнови title, description, fullDescription, stats, review
 * 5. Установи category и categoryLabel
 * 
 * Опционально: добавь thumbnailUrl для кастомного превью
 */
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "1",
    // TODO: Замени на реальный VK Video ID
    vkVideoId: "PLACEHOLDER_1",
    title: "Артём Бриус",
    description: "Монтаж Reels для блогера с аудиторией 1.1 млн подписчиков",
    fullDescription: "Создание динамичных Reels для топового блогера. Работа включала разработку визуального стиля, динамичный монтаж с акцентом на удержание внимания, цветокоррекцию и добавление графических элементов.",
    stats: "1.1M подписчиков • Instagram",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "2",
    // TODO: Замени на реальный VK Video ID
    vkVideoId: "PLACEHOLDER_2",
    title: "Михаил Гребенюк",
    description: "Монтаж Reels для эксперта с аудиторией 700 тысяч",
    fullDescription: "Серия экспертных Reels для бизнес-блогера. Фокус на подаче сложного контента в простой и вовлекающей форме. Использование субтитров, акцентной графики и профессиональной цветокоррекции.",
    stats: "700K подписчиков • Instagram",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "3",
    // TODO: Замени на реальный VK Video ID
    vkVideoId: "PLACEHOLDER_3",
    title: "LEADS",
    description: "Монтаж YouTube Shorts для образовательного проекта",
    fullDescription: "Образовательный контент в формате Shorts. Задача — сделать обучающие видео максимально понятными и вовлекающими. Добавление анимированной инфографики, субтитров и динамичных переходов.",
    stats: "2K+ подписчиков • YouTube",
    category: "montage",
    categoryLabel: "Shorts • YouTube",
  },
  {
    id: "4",
    // TODO: Замени на реальный VK Video ID
    vkVideoId: "PLACEHOLDER_4",
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
