export interface PortfolioVideo {
  id: string;
  youtubeId: string;
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
 * 3. Replace youtubeId with YouTube video ID (the part after /shorts/ or watch?v=)
 * 4. Update title, description, review
 * 5. Set category and categoryLabel
 */
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "1",
    youtubeId: "oI-8pTiEdHg",
    title: "Артём Бриус",
    description: "Монтаж Reels для блогера с аудиторией 1.1 млн подписчиков",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "2",
    youtubeId: "EBNgMgWv2sA",
    title: "Михаил Гребенюк",
    description: "Монтаж Reels для эксперта с аудиторией 700 тысяч",
    category: "montage",
    categoryLabel: "Reels • Instagram",
  },
  {
    id: "3",
    youtubeId: "rcQr2Zd0og8",
    title: "LEADS",
    description: "Монтаж YouTube Shorts для образовательного проекта",
    category: "montage",
    categoryLabel: "Shorts • YouTube",
  },
  {
    id: "4",
    youtubeId: "N7m2YKSSTEk",
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
