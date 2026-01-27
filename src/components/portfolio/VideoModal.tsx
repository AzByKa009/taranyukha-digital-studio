import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { PortfolioVideo } from "@/data/portfolio-videos";
import { useRef, useEffect } from "react";

interface VideoModalProps {
  video: PortfolioVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen]);

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 gap-0 bg-card border-border/50 overflow-hidden">
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Video */}
          <div className="lg:w-1/2 bg-black flex items-center justify-center">
            <div className="relative w-full aspect-[9/16] max-h-[70vh] lg:max-h-[80vh]">
              <video
                ref={videoRef}
                src={video.videoUrl}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
            {/* Category badge */}
            <span className="inline-flex w-fit px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
              {video.categoryLabel}
            </span>

            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">
              {video.title}
            </h2>

            {video.stats && (
              <p className="text-sm text-muted-foreground mb-4">
                {video.stats}
              </p>
            )}

            <p className="text-muted-foreground leading-relaxed mb-6">
              {video.fullDescription || video.description}
            </p>

            {video.review && (
              <blockquote className="border-l-2 border-primary/50 pl-4 py-2 mb-6">
                <p className="italic text-muted-foreground">
                  "{video.review}"
                </p>
              </blockquote>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">
                Хотите такой же результат?
              </p>
              <a
                href="https://t.me/altscalp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Обсудить проект
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
