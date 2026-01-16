import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cases } from "@/data/cases";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FeaturedCases() {
  const featuredCases = cases.slice(0, 3);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 bg-card/30">
      <div className="container">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Избранные кейсы
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Проекты, которые демонстрируют мой подход к созданию цифровых продуктов
              </p>
            </div>
            <Link to="/cases">
              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button variant="outline" className="group">
                  Все кейсы
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </FadeIn>

        {/* Cases Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.15}>
          {featuredCases.map((caseItem) => (
            <StaggerItem key={caseItem.id}>
              <Link to={`/cases/${caseItem.slug}`}>
                <PremiumCard 
                  className="group block glass-card rounded-2xl overflow-hidden cursor-pointer"
                  hoverScale={1.02}
                  hoverY={-6}
                  glowOnHover
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <motion.img
                      src={caseItem.thumbnail}
                      alt={caseItem.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    
                    {/* Arrow */}
                    <motion.div 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur flex items-center justify-center"
                      initial={{ opacity: 0, y: 8 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                      {caseItem.categoryLabel}
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gradient transition-colors duration-300">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {caseItem.shortDescription}
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
