import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, ClipboardList } from "lucide-react";
import { aiCategories, aiProducts, getProductsByCategory } from "@/data/ai-products";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

const AIProducts = () => {
  const [activeCategory, setActiveCategory] = useState(aiCategories[0].id);

  useSEO({
    title: "AI-продукты — чат-боты, автоматизация, генерация | Aleksey Taranukha",
    description: "Готовые AI-решения для бизнеса: чат-боты, автоматизация Make/Zapier, генерация контента. Создание AI продукта под ключ.",
    keywords: "AI продукты, создание AI продукта, чат-бот для бизнеса, автоматизация бизнеса, AI решения",
  });

  const currentCategory = aiCategories.find(c => c.id === activeCategory)!;
  const categoryProducts = getProductsByCategory(activeCategory);

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
      <section className="pb-8 sticky top-20 z-20 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {aiCategories.map((category) => (
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
                <category.icon className="h-4 w-4" />
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <currentCategory.icon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">
                {currentCategory.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {currentCategory.description}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card/50 border border-border">
              <h3 className="font-display font-semibold mb-4">Примеры использования</h3>
              <ul className="space-y-3">
                {currentCategory.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="container">
          <h3 className="text-2xl font-display font-bold mb-8">
            Продукты в категории
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product, index) => (
              <div
                key={product.id}
                className="group glass-card rounded-2xl p-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-display font-semibold">
                    {product.title}
                  </h4>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    product.status === "available" && "bg-green-500/10 text-green-400",
                    product.status === "beta" && "bg-yellow-500/10 text-yellow-400",
                    product.status === "coming" && "bg-muted text-muted-foreground"
                  )}>
                    {product.status === "available" ? "Доступен" : product.status === "beta" ? "Бета" : "Скоро"}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Link to="/contacts?product=demo">
                  <Button variant="outline" size="sm" className="w-full group/btn">
                    Получить демо
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Audit Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5 border-y border-primary/20">
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
