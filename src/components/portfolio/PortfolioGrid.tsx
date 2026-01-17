import { useState } from "react";
import { cn } from "@/lib/utils";
import { VideoCard } from "./VideoCard";
import { 
  portfolioVideos, 
  portfolioFilters, 
  getPortfolioByCategory,
  type PortfolioCategory 
} from "@/data/portfolio-videos";

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
  
  const filteredVideos = getPortfolioByCategory(activeFilter);
  const displayVideos = maxItems ? filteredVideos.slice(0, maxItems) : filteredVideos;

  return (
    <div className={cn("space-y-10", className)}>
      {/* Filters */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayVideos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
      </div>

      {/* Empty state */}
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
