import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { VideoCard } from "./VideoCard";
import { Loader2 } from "lucide-react";

interface PortfolioVideo {
  id: string;
  title: string;
  description: string | null;
  full_description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  stats: string | null;
  review: string | null;
  category: string;
  category_label: string;
  sort_order: number;
  is_published: boolean;
}

const portfolioFilters = [
  { value: "all", label: "Все работы" },
  { value: "montage", label: "Монтаж" },
  { value: "producing", label: "Продюсирование" },
  { value: "ai-video", label: "AI-видео" },
  { value: "ai-products", label: "AI-продукты" },
  { value: "vibe-coding", label: "Vibe coding" },
];

type PortfolioCategory = string;

interface PortfolioGridProps {
  showFilters?: boolean;
  maxItems?: number;
  className?: string;
}

export function PortfolioGrid({ 
  showFilters = true, 
  maxItems,
  className 
}: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("all");
  
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["portfolio_videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_videos")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");

      if (error) throw error;
      return data as PortfolioVideo[];
    },
  });

  const filteredVideos = activeFilter === "all" 
    ? videos 
    : videos.filter((v) => v.category === activeFilter);
  const displayVideos = maxItems ? filteredVideos.slice(0, maxItems) : filteredVideos;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-10", className)}>
      {showFilters && (
        <div className="flex flex-wrap gap-2.5">
          {portfolioFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayVideos.map((video, index) => (
          <VideoCard 
            key={video.id} 
            video={{
              id: video.id,
              videoUrl: video.video_url,
              thumbnailUrl: video.thumbnail_url || undefined,
              title: video.title,
              description: video.description || "",
              fullDescription: video.full_description || undefined,
              stats: video.stats || undefined,
              review: video.review || undefined,
              category: video.category as "montage" | "producing" | "ai-video" | "ai-products" | "vibe-coding",
              categoryLabel: video.category_label,
            }} 
            index={index} 
          />
        ))}
      </div>

      {displayVideos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Проектов в этой категории пока нет
          </p>
        </div>
      )}
    </div>
  );
}
