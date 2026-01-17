import { cn } from "@/lib/utils";
import type { PortfolioVideo } from "@/data/portfolio-videos";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: PortfolioVideo;
  index?: number;
  onClick?: () => void;
}

export function VideoCard({ video, index = 0, onClick }: VideoCardProps) {
  // YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border/30 cursor-pointer",
        "transition-all duration-500 hover:border-border/60",
        "hover:shadow-2xl hover:shadow-primary/5",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Video Thumbnail - 9:16 aspect ratio for vertical video */}
      <div className="relative aspect-[9/16] max-h-[500px] overflow-hidden bg-muted">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="h-7 w-7 text-black ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground border border-border/30">
            {video.categoryLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {video.title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {video.description}
        </p>

        {/* Optional review */}
        {video.review && (
          <blockquote className="pt-3 border-t border-border/30">
            <p className="text-sm italic text-muted-foreground/80 line-clamp-2">
              "{video.review}"
            </p>
          </blockquote>
        )}
      </div>
    </article>
  );
}