import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category_label: string;
  short_description: string;
  thumbnail: string | null;
}

interface CasesContent {
  title?: string;
  subtitle?: string;
  allText?: string;
}

export function FeaturedCases() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const { data: casesSettings } = useSiteSettings<CasesContent>("featured_cases");

  const title = casesSettings?.title || "Проекты";
  const subtitle = casesSettings?.subtitle || "Примеры того, как это работает";
  const allText = casesSettings?.allText || "Все проекты";

  const fetchCases = async () => {
    const { data, error } = await supabase
      .from("cases")
      .select("id, slug, title, category_label, short_description, thumbnail")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .limit(3);

    if (!error && data) {
      setCases(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('featured-cases-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cases'
        },
        () => {
          fetchCases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-20 sm:py-28 bg-card/20 border-y border-border/30">
        <div className="container">
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 bg-card/20 border-y border-border/30">
      <div className="container">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
                {subtitle}
              </p>
            </div>
            <Link to="/cases">
              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button variant="outline" className="group text-sm">
                  {allText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>

        {/* Cases Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.15}>
          {cases.map((caseItem) => (
            <StaggerItem key={caseItem.id}>
              <Link to={`/cases/${caseItem.slug}`}>
                <PremiumCard 
                  className="group block premium-card overflow-hidden cursor-pointer"
                  hoverScale={1.02}
                  hoverY={-6}
                  glowOnHover
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {caseItem.thumbnail ? (
                      <motion.img
                        src={caseItem.thumbnail}
                        alt={caseItem.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
                    
                    {/* Arrow */}
                    <motion.div 
                      className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center"
                      initial={{ opacity: 0, y: 8 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-7">
                    <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2 sm:mb-3">
                      {caseItem.category_label}
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 sm:mb-3 group-hover:text-gradient transition-colors duration-400">
                      {caseItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {caseItem.short_description}
                    </p>
                  </div>
                </PremiumCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
