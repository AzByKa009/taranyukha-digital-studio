export interface PortfolioVideo {
  id: string;
  videoUrl: string;
  posterUrl?: string;
  title: string;
  description: string;
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
 * 3. Replace videoUrl with your video path (e.g., "/videos/my-video.mp4")
 * 4. Optional: add posterUrl for preview image
 * 5. Update title, description, review
 * 6. Set category and categoryLabel
 */
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "1",
    videoUrl: "/videos/case-1.mp4",
    posterUrl: "/placeholder.svg",
    title: "Reels для премиум-бренда",
    description: "Монтаж вертикальных видео. 2.1M просмотров за месяц.",
    review: "Алексей создал контент, который реально зацепил аудиторию",
    category: "montage",
    categoryLabel: "Монтаж",
  },
  {
    id: "2",
    videoUrl: "/videos/case-2.mp4",
    posterUrl: "/placeholder.svg",
    title: "AI-видео для косметики",
    description: "Серия роликов с AI-визуалами. Бюджет съёмок сократили в 5 раз.",
    category: "ai-video",
    categoryLabel: "AI-видео",
  },
  {
    id: "3",
    videoUrl: "/videos/case-3.mp4",
    posterUrl: "/placeholder.svg",
    title: "Контент-система для e-com",
    description: "Продюсирование 50+ единиц контента в месяц.",
    review: "Системный подход изменил наш маркетинг полностью",
    category: "producing",
    categoryLabel: "Продюсирование",
  },
  {
    id: "4",
    videoUrl: "/videos/case-4.mp4",
    posterUrl: "/placeholder.svg",
    title: "MVP стартапа",
    description: "От идеи до рабочего продукта за 14 дней.",
    category: "vibe-coding",
    categoryLabel: "Vibe coding",
  },
  {
    id: "5",
    videoUrl: "/videos/case-5.mp4",
    posterUrl: "/placeholder.svg",
    title: "AI-ассистент поддержки",
    description: "Чат-бот обрабатывает 80% обращений автоматически.",
    review: "Поддержка работает 24/7, а команда фокусируется на сложных кейсах",
    category: "ai-products",
    categoryLabel: "AI-продукты",
  },
  {
    id: "6",
    videoUrl: "/videos/case-6.mp4",
    posterUrl: "/placeholder.svg",
    title: "Видеокурс для эксперта",
    description: "40 часов материала → 25 модулей с 87% completion rate.",
    category: "montage",
    categoryLabel: "Монтаж",
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
