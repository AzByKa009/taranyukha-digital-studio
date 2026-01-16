import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts, categories, getPostsByCategory } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const filteredPosts = getPostsByCategory(activeCategory);

  useEffect(() => {
    document.title = "Блог — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Статьи об AI, автоматизации и цифровой трансформации. Практические гайды и аналитика трендов."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Блог
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Практические гайды по контенту, AI и автоматизации для бизнеса
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-8">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => {
              const formattedDate = new Date(post.date).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              
              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group glass-card rounded-2xl p-6 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-xs text-primary font-medium uppercase tracking-wider mb-3">
                    {post.category}
                  </div>
                  
                  <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-gradient transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formattedDate}
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1 text-sm text-foreground group-hover:text-primary transition-colors">
                      Читать статью
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Статьи в этой категории пока не опубликованы</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Хотите получать новые статьи?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Подпишитесь на рассылку и получайте практические гайды по автоматизации и AI
          </p>
          <Button asChild size="lg">
            <Link to="/contacts">Связаться со мной</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;