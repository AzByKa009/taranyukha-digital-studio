import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cases } from "@/data/cases";

export function FeaturedCases() {
  // Show first 3 cases
  const featuredCases = cases.slice(0, 3);

  return (
    <section className="py-24 bg-card/30">
      <div className="container">
        {/* Header */}
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
            <Button variant="outline" className="group">
              Все кейсы
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCases.map((caseItem, index) => (
            <Link
              key={caseItem.id}
              to={`/cases/${caseItem.slug}`}
              className="group block glass-card rounded-2xl overflow-hidden hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img
                  src={caseItem.thumbnail}
                  alt={caseItem.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                  {caseItem.categoryLabel}
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gradient transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {caseItem.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
