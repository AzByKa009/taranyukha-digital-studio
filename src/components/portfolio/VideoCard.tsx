import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { PortfolioVideo } from "@/data/portfolio-videos";

interface VideoCardProps {
  video: PortfolioVideo;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load iframe when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // YouTube embed URL with autoplay, mute, loop
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=0&playsinline=1&rel=0&showinfo=0&modestbranding=1`;

  return (
    <article
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border/30",
        "transition-all duration-500 hover:border-border/60",
        "hover:shadow-2xl hover:shadow-primary/5",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Video Container - 9:16 aspect ratio for vertical video */}
      <div className="relative aspect-[9/16] max-h-[500px] overflow-hidden bg-muted">
        {isVisible ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            style={{ 
              transform: 'scale(1.2)',
              transformOrigin: 'center center'
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-muted-foreground animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        )}

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