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
    videoUrl: "/videos/artem-brius.mp4",
    title: "Артём Бриус",
    description: "Монтаж Reels для блогера с аудиторией 1.1 млн подписчиков",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "2",
    videoUrl: "/videos/mikhail-grebenyuk.mp4",
    title: "Михаил Гребенюк",
    description: "Монтаж Reels для эксперта с аудиторией 700 тысяч",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "3",
    videoUrl: "/videos/leads.mp4",
    title: "LEADS",
    description: "Монтаж YouTube Shorts для образовательного проекта",
    category: "montage",
    categoryLabel: "Shorts • YouTube",
  },
  {
    id: "4",
    videoUrl: "/videos/simon.mp4",
    title: "SIMON",
    description: "Монтаж TikTok для личного бренда",
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
