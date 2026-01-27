import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, ClipboardList, Loader2, MessageSquare, Zap, FileText, Layers, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  features: string[] | null;
  price_from: number | null;
  timeline: string | null;
  category_id: string | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Zap,
  FileText,
  Layers,
  BarChart3,
};

const AIProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoriesData } = await supabase
        .from("ai_product_categories")
        .select("id, slug, title, description, icon")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      const { data: productsData } = await supabase
        .from("ai_products")
        .select("id, slug, title, description, thumbnail, features, price_from, timeline, category_id")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (categoriesData) {
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
      }

      if (productsData) {
        setProducts(productsData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useSEO({
    title: language === "ru"
      ? "AI-продукты — чат-боты, автоматизация, генерация | Aleksey Taranukha"
      : "AI Products — chatbots, automation, generation | Aleksey Taranukha",
    description: language === "ru"
      ? "Готовые AI-решения для бизнеса: чат-боты, автоматизация Make/Zapier, генерация контента. Создание AI продукта под ключ."
      : "Ready-made AI solutions for business: chatbots, Make/Zapier automation, content generation. Turnkey AI product creation.",
    keywords: "AI продукты, создание AI продукта, чат-бот для бизнеса, автоматизация бизнеса, AI решения",
  });

  const getIcon = (iconName: string | null) => {
    if (!iconName) return MessageSquare;
    return iconMap[iconName] || MessageSquare;
  };

  const currentCategory = categories.find(c => c.id === activeCategory);
  const categoryProducts = products.filter(p => p.category_id === activeCategory);

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
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/5 mb-4 sm:mb-6 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm text-primary">Powered by AI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 animate-fade-in-up">
              {t("ai_products.title")}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              {t("ai_products.subtitle")}
            </p>
            
            <Link to="/ai-audit" className="inline-flex">
              <Button variant="hero" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />
                {t("ai_products.free_audit")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <section className="pb-6 sm:pb-8 sticky top-14 sm:top-16 lg:top-20 z-20 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = getIcon(category.icon);
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border"
                    )}
                  >
                    <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Category Description */}
      {currentCategory && (
        <section className="py-8 sm:py-12">
          <div className="container">
            <div className="max-w-3xl">
              {(() => {
                const IconComponent = getIcon(currentCategory.icon);
                return (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                  </div>
                );
              })()}
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4">
                {currentCategory.title}
              </h2>
              {currentCategory.description && (
                <p className="text-base sm:text-lg text-muted-foreground">
                  {currentCategory.description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="pb-12 sm:pb-16">
        <div className="container">
          <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 sm:mb-8">
            {t("ai_products.products_in_category")}
          </h3>
          {categoryProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categoryProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group glass-card rounded-xl sm:rounded-2xl overflow-hidden hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    {product.thumbnail ? (
                      <img 
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                    )}
                  </div>
                  
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <h4 className="text-lg sm:text-xl font-display font-semibold">
                        {product.title}
                      </h4>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      {product.description}
                    </p>
                    
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {product.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 rounded text-[10px] sm:text-xs bg-muted/50 text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {product.price_from && (
                        <span className="text-primary font-semibold text-sm sm:text-base">
                          {t("common.from")} {product.price_from.toLocaleString()} ₽
                        </span>
                      )}
                      <Link to="/contacts?product=demo">
                        <Button variant="outline" size="sm" className="group/btn text-xs sm:text-sm">
                          {t("ai_products.get_demo")}
                          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12">
              <p className="text-sm sm:text-base text-muted-foreground">{t("ai_products.coming_soon")}</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Audit Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/10 to-primary/5 border-y border-primary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <ClipboardList className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("ai_products.dont_know_where_to_start")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              {t("ai_products.audit_desc")}
            </p>
            <Link to="/ai-audit">
              <Button variant="hero" size="lg">
                {t("ai_products.take_audit")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">
              {t("ai_products.need_custom")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              {t("ai_products.custom_desc")}
            </p>
            <Link to="/contacts">
              <Button variant="hero-outline">
                {t("ai_products.discuss_project")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIProducts;
