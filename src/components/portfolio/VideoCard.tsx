import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { PortfolioVideo } from "@/data/portfolio-videos";

interface VideoCardProps {
  video: PortfolioVideo;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Lazy load video when in viewport
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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article
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
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={video.posterUrl}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full object-cover",
            "transition-transform duration-700 ease-out",
            "group-hover:scale-105"
          )}
        >
          {isVisible && !hasError && (
            <source src={video.videoUrl} type="video/mp4" />
          )}
        </video>

        {/* Fallback for error */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center text-muted-foreground p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">{video.title}</p>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
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
