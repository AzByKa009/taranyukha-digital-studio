import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, categories } from "@/data/blog-posts";
import { useSEO } from "@/hooks/useSEO";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Все");

  useSEO({
    title: "Блог — экспертные статьи о сайтах, AI и бизнесе",
    description: "Статьи о создании сайтов, автоматизации бизнеса, AI-решениях и digital-стратегиях. Практические гайды и экспертные материалы.",
    keywords: "блог разработка сайтов, статьи AI автоматизация, создание сайтов советы, digital маркетинг",
  });

  const filtered = activeCategory === "Все"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="pt-16 pb-10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-fade-in-up">
              Экспертные статьи
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Практические материалы о создании сайтов, автоматизации и digital-стратегиях
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block glass-card rounded-2xl p-6 hover:bg-primary/5 transition-colors group"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Читать <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
