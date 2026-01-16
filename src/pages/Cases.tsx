import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { cases, categoryFilters, CaseCategory } from "@/data/cases";
import { cn } from "@/lib/utils";

const Cases = () => {
  const [activeFilter, setActiveFilter] = useState<CaseCategory | "all">("all");
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);

  const filteredCases = activeFilter === "all" 
    ? cases 
    : cases.filter((c) => c.category === activeFilter);

  useEffect(() => {
    document.title = "Кейсы — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Портфолио проектов: монтаж, продюсирование, AI-видео, AI-продукты и vibe coding. Реальные кейсы с результатами."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-10">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 animate-fade-in-up">
              Кейсы
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Проекты, которые демонстрируют силу AI и цифровых технологий в решении реальных задач
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-10 sticky top-16 lg:top-18 z-20 bg-background/90 backdrop-blur-xl border-b border-border/30">
        <div className="container">
          <div className="flex flex-wrap gap-2.5 animate-fade-in-up py-2" style={{ animationDelay: "0.2s" }}>
            {categoryFilters.map((filter) => (
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
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 pb-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
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
                  <img
                    src={caseItem.thumbnail}
                    alt={caseItem.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-70" />
                  
                  {/* Play button for video cases */}
                  {caseItem.videoPreview && (
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-400",
                      hoveredCase === caseItem.id ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="w-16 h-16 rounded-full bg-primary/95 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-primary/30">
                        <Play className="h-6 w-6 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border/30">
                      {caseItem.categoryLabel}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className={cn(
                    "absolute top-5 right-5 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center transition-all duration-400",
                    hoveredCase === caseItem.id 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-2"
                  )}>
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{caseItem.year}</span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-display font-semibold mb-3 group-hover:text-gradient transition-colors duration-400">
                    {caseItem.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {caseItem.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg text-xs bg-muted/60 text-muted-foreground border border-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {caseItem.tags.length > 3 && (
                      <span className="px-3 py-1.5 rounded-lg text-xs bg-muted/60 text-muted-foreground border border-border/30">
                        +{caseItem.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredCases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Проектов в этой категории пока нет
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cases;
