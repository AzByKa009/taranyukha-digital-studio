import { cn } from "@/lib/utils";
import type { PortfolioVideo } from "@/data/portfolio-videos";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

interface VideoCardProps {
  video: PortfolioVideo;
  index?: number;
  onClick?: () => void;
}

export function VideoCard({ video, index = 0, onClick }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border/30 cursor-pointer",
        "transition-all duration-500 hover:border-border/60",
        "hover:shadow-2xl hover:shadow-primary/5",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Video - 9:16 aspect ratio for vertical video */}
      <div className="relative aspect-[9/16] max-h-[500px] overflow-hidden bg-muted">
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Play button overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isHovered ? "bg-black/10" : "bg-black/30"
        )}>
          <div className={cn(
            "w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all duration-300",
            isHovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}>
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
