import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getPostBySlug, getRelatedPosts, BlogSection } from "@/data/blog-posts";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TableOfContents = ({ sections }: { sections: BlogSection[] }) => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="glass-card rounded-xl p-6 sticky top-24">
      <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
        Содержание
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className={`text-left w-full text-sm hover:text-primary transition-colors ${
                section.level === 3 ? "pl-4 text-muted-foreground" : "font-medium"
              }`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => getPostBySlug(slug || ""), [slug]);
  const relatedPosts = useMemo(
    () => (post ? getRelatedPosts(post.relatedPosts) : []),
    [post]
  );

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Aleksey Taranukha`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", post.excerpt);
    }
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">
            Статья не найдена
          </h1>
          <p className="text-muted-foreground mb-8">
            К сожалению, запрошенная статья не существует.
          </p>
          <Button asChild>
            <Link to="/blog">Вернуться в блог</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Person",
      name: "Aleksey Taranukha",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://alekseytaranukha.com/blog/${post.slug}`,
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-12 pb-8">
        <div className="container">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад в блог
          </Link>

          <div className="max-w-3xl">
            <div className="text-sm text-primary font-medium uppercase tracking-wider mb-4">
              {post.category}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in-up">
              {post.title}
            </h1>

            <p
              className="text-xl text-muted-foreground mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {post.excerpt}
            </p>

            <div
              className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} чтения
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Article Content */}
            <article className="prose prose-lg prose-invert max-w-none">
              {post.content.map((section) => {
                const Tag = section.level === 2 ? "h2" : "h3";
                return (
                  <div key={section.id} id={section.id} className="scroll-mt-24">
                    <Tag
                      className={`font-display font-bold ${
                        section.level === 2
                          ? "text-2xl md:text-3xl mt-12 mb-4"
                          : "text-xl md:text-2xl mt-8 mb-3"
                      }`}
                    >
                      {section.title}
                    </Tag>
                    {section.content.split("\n\n").map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-muted-foreground leading-relaxed mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                );
              })}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents sections={post.content} />
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container">
            <h2 className="text-2xl font-display font-bold mb-8">
              Читайте также
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group glass-card rounded-xl p-6 hover-lift"
                >
                  <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                    {relatedPost.category}
                  </div>
                  <h3 className="font-display font-semibold mb-2 group-hover:text-gradient transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {relatedPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-foreground group-hover:text-primary transition-colors">
                    Читать
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Нужна помощь с контентом или автоматизацией?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Обсудим вашу задачу и найдём оптимальное решение
          </p>
          <Button asChild size="lg">
            <Link to="/contacts">Связаться</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
