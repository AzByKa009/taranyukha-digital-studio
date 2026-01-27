import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowUpRight, Play, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { VideoCard } from "@/components/portfolio/VideoCard";
import { VideoModal } from "@/components/portfolio/VideoModal";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import { PortfolioVideo } from "@/data/portfolio-videos";
import { useLanguage } from "@/contexts/LanguageContext";

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_label: string;
  short_description: string;
  year: string;
  thumbnail: string | null;
  video_preview: string | null;
  tags: string[] | null;
}

const Cases = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  const categoryFilters = [
    { value: "all", label: t("cases.all_projects") },
    { value: "montage", label: t("cases.montage") },
    { value: "producing", label: t("cases.producing") },
    { value: "ai-video", label: t("cases.ai_video") },
    { value: "ai-products", label: t("cases.ai_products") },
    { value: "vibe-coding", label: t("cases.vibe_coding") },
  ];

  useEffect(() => {
    const fetchCases = async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("id, slug, title, category, category_label, short_description, year, thumbnail, video_preview, tags")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setCases(data);
      }
      setLoading(false);
    };

    fetchCases();
  }, []);

  // Separate video cases (vertical montage) from regular cases
  const videoCases = cases.filter(c => c.video_preview && c.category === "montage");
  const regularCases = cases.filter(c => !c.video_preview || c.category !== "montage");

  const filteredCases = activeFilter === "all" 
    ? regularCases 
    : regularCases.filter((c) => c.category === activeFilter);

  // Show video montage cases when "all" or "montage" is selected
  const showVideoMontage = activeFilter === "all" || activeFilter === "montage";
  const filteredVideoCases = showVideoMontage ? videoCases : [];

  // Convert case to PortfolioVideo format for modal
  const caseToPortfolioVideo = (caseItem: CaseItem): PortfolioVideo => ({
    id: caseItem.id,
    videoUrl: caseItem.video_preview || "",
    title: caseItem.title,
    description: caseItem.short_description,
    category: caseItem.category as any,
    categoryLabel: caseItem.category_label,
  });

  useSEO({
    title: language === "ru" 
      ? "Кейсы — монтаж, AI-продукты, вайб кодинг | Aleksey Taranukha"
      : "Cases — editing, AI products, vibe coding | Aleksey Taranukha",
    description: language === "ru"
      ? "Портфолио проектов: монтаж вертикальных видео, продюсирование контента, AI-продукты и вайб кодинг. Реальные кейсы с результатами."
      : "Project portfolio: vertical video editing, content production, AI products and vibe coding. Real cases with results.",
    keywords: "кейсы монтаж, портфолио AI, примеры вайб кодинг, кейсы продюсирование, портфолио Reels",
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-5 animate-fade-in-up">
              {t("cases.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              {t("cases.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 sm:pb-10 sticky top-14 sm:top-16 lg:top-18 z-20 bg-background/90 backdrop-blur-xl border-b border-border/30">
        <div className="container">
          <div className="flex flex-wrap gap-2 animate-fade-in-up py-2" style={{ animationDelay: "0.2s" }}>
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300",
                  activeFilter === filter.value
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Montage Cases */}
      {filteredVideoCases.length > 0 && (
        <section className="py-8 sm:py-12">
          <div className="container">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-6 sm:mb-8 animate-fade-in-up">
              {t("cases.montage_reels")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredVideoCases.map((caseItem, index) => (
                <VideoCard 
                  key={caseItem.id} 
                  video={caseToPortfolioVideo(caseItem)} 
                  index={index} 
                  onClick={() => setSelectedVideo(caseToPortfolioVideo(caseItem))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      <VideoModal 
        video={selectedVideo} 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />

      {/* Cases Grid */}
      <section className="py-10 sm:py-16 pb-20 sm:pb-28">
        <div className="container">
          {filteredVideoCases.length > 0 && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-6 sm:mb-8 animate-fade-in-up">
              {t("cases.complex_projects")}
            </h2>
          )}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredCases.map((caseItem, index) => (
              <Link
                key={caseItem.id}
                to={`/cases/${caseItem.slug}`}
                className="group block premium-card overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onMouseEnter={() => setHoveredCase(caseItem.id)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                {/* Video/Image Preview */}
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {caseItem.thumbnail ? (
                    <img
                      src={caseItem.thumbnail}
                      alt={caseItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-70" />
                  
                  {/* Play button for video cases */}
                  {caseItem.video_preview && (
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-400",
                      hoveredCase === caseItem.id ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/95 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-primary/30">
                        <Play className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground ml-0.5 sm:ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                    <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border/30">
                      {caseItem.category_label}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className={cn(
                    "absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center transition-all duration-400",
                    hoveredCase === caseItem.id 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-2"
                  )}>
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-7">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                    <span>{caseItem.year}</span>
                  </div>
                  
                  <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-2 sm:mb-3 group-hover:text-gradient transition-colors duration-400">
                    {caseItem.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-3 sm:mb-5 line-clamp-2 leading-relaxed">
                    {caseItem.short_description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(caseItem.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs bg-muted/60 text-muted-foreground border border-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {(caseItem.tags || []).length > 3 && (
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs bg-muted/60 text-muted-foreground border border-border/30">
                        +{(caseItem.tags || []).length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredCases.length === 0 && filteredVideoCases.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-sm sm:text-lg text-muted-foreground">
                {t("cases.empty")}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cases;
