import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, ClipboardList, Loader2, MessageSquare, Zap, FileText, Layers, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const fetchData = async () => {
    // Fetch categories
    const { data: categoriesData } = await supabase
      .from("ai_product_categories")
      .select("id, slug, title, description, icon")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    // Fetch products
    const { data: productsData } = await supabase
      .from("ai_products")
      .select("id, slug, title, description, thumbnail, features, price_from, timeline, category_id")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (categoriesData) {
      setCategories(categoriesData);
      if (categoriesData.length > 0 && !activeCategory) {
        setActiveCategory(categoriesData[0].id);
      }
    }

    if (productsData) {
      setProducts(productsData);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Subscribe to real-time updates for categories
  useEffect(() => {
    const channel = supabase
      .channel('ai-categories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_product_categories'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Subscribe to real-time updates for products
  useEffect(() => {
    const channel = supabase
      .channel('ai-products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_products'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useSEO({
    title: "AI-продукты — чат-боты, автоматизация, генерация | Aleksey Taranukha",
    description: "Готовые AI-решения для бизнеса: чат-боты, автоматизация Make/Zapier, генерация контента. Создание AI продукта под ключ.",
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
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Powered by AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              AI-продукты
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Готовые решения на основе искусственного интеллекта. 
              Не нужно изобретать велосипед — берите работающие инструменты и адаптируйте под себя.
            </p>
            
            {/* AI Audit CTA */}
            <Link to="/ai-audit" className="inline-flex">
              <Button variant="hero" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <ClipboardList className="h-5 w-5" />
                Бесплатный AI-аудит
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <section className="pb-8 sticky top-20 z-20" style={{ background: 'linear-gradient(to bottom, hsl(var(--background)) 60%, transparent)' }}>
          <div className="container">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = getIcon(category.icon);
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border"
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
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
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl">
              {(() => {
                const IconComponent = getIcon(currentCategory.icon);
                return (
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                );
              })()}
              <h2 className="text-3xl font-display font-bold mb-4">
                {currentCategory.title}
              </h2>
              {currentCategory.description && (
                <p className="text-lg text-muted-foreground">
                  {currentCategory.description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="pb-16">
        <div className="container">
          <h3 className="text-2xl font-display font-bold mb-8">
            Продукты в категории
          </h3>
          {categoryProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group glass-card rounded-2xl overflow-hidden hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Product Image */}
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
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-display font-semibold">
                        {product.title}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {product.price_from && (
                        <span className="text-primary font-semibold">
                          от {product.price_from.toLocaleString()} ₽
                        </span>
                      )}
                      <Link to="/contacts?product=demo">
                        <Button variant="outline" size="sm" className="group/btn">
                          Получить демо
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Продукты в этой категории скоро появятся</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Audit Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <ClipboardList className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Не знаете, с чего начать?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Пройдите бесплатный AI-аудит — заполните короткую анкету о вашем бизнесе, 
              и я подготовлю персональный план автоматизации с конкретными рекомендациями.
            </p>
            <Link to="/ai-audit">
              <Button variant="hero" size="lg">
                Пройти AI-аудит
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Вопросы об AI-решениях
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Нужны ли технические знания для использования AI-продуктов?",
                  a: "Нет. Все решения создаются с простым интерфейсом — вы работаете через привычные инструменты: мессенджеры, CRM, дашборды. Техническую настройку и интеграцию беру на себя полностью.",
                },
                {
                  q: "Как AI-бот отличается от обычного чат-бота?",
                  a: "Обычный бот работает по жёстким сценариям и «ломается» на нестандартных вопросах. AI-бот понимает контекст, ведёт естественный диалог, квалифицирует лида и передаёт горячие заявки менеджеру. Конверсия в 2–3 раза выше.",
                },
                {
                  q: "Можно ли интегрировать AI с моей текущей CRM?",
                  a: "Да, интегрирую с любой популярной CRM: Bitrix24, AmoCRM, HubSpot и другие. Также настраиваю связки через Make/Zapier с любыми сервисами, которые вы уже используете.",
                },
                {
                  q: "Что если AI-решение не подойдёт моему бизнесу?",
                  a: "Перед разработкой провожу бесплатный AI-аудит вашего бизнеса. Если автоматизация не даст ощутимого результата — скажу об этом честно и предложу альтернативу.",
                },
                {
                  q: "Как быстро окупается внедрение AI?",
                  a: "Типичный срок окупаемости — 1–3 месяца. AI-бот, который обрабатывает 50 заявок в день вместо менеджера, экономит от 30 000₽/мес. А рост конверсии за счёт мгновенного ответа увеличивает выручку с первого месяца.",
                },
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`ai-faq-${i}`}
                  className="glass-card rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-display font-semibold py-6 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Нужно кастомное решение?
            </h2>
            <p className="text-muted-foreground mb-8">
              Разработаем AI-продукт под ваши специфические задачи
            </p>
            <Link to="/contacts">
              <Button variant="hero-outline">
                Обсудить проект
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
