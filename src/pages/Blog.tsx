import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Как AI меняет подход к созданию контента",
    excerpt: "Генеративный AI открывает новые возможности для маркетологов и контент-мейкеров. Разбираемся, как использовать технологии эффективно.",
    category: "AI",
    date: "15 января 2024",
    readTime: "7 мин",
  },
  {
    id: 2,
    title: "Автоматизация бизнес-процессов: с чего начать",
    excerpt: "Пошаговый гайд по внедрению автоматизации в компании. От аудита до первых результатов.",
    category: "Автоматизация",
    date: "10 января 2024",
    readTime: "10 мин",
  },
  {
    id: 3,
    title: "Тренды AI в 2024 году",
    excerpt: "Какие технологии искусственного интеллекта будут определять развитие бизнеса в этом году.",
    category: "Тренды",
    date: "5 января 2024",
    readTime: "5 мин",
  },
  {
    id: 4,
    title: "Чат-боты для бизнеса: полный гайд",
    excerpt: "Как выбрать, разработать и внедрить чат-бота, который действительно работает.",
    category: "AI",
    date: "28 декабря 2023",
    readTime: "12 мин",
  },
  {
    id: 5,
    title: "Машинное обучение в e-commerce",
    excerpt: "Практические кейсы использования ML для персонализации и увеличения продаж.",
    category: "Machine Learning",
    date: "20 декабря 2023",
    readTime: "8 мин",
  },
  {
    id: 6,
    title: "Безопасность AI-систем",
    excerpt: "Основные риски и методы защиты при работе с искусственным интеллектом.",
    category: "Безопасность",
    date: "15 декабря 2023",
    readTime: "6 мин",
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Блог — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Статьи об AI, автоматизации и цифровой трансформации. Практические гайды и аналитика трендов."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Блог
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Мысли, инсайты и практические гайды об AI и цифровых технологиях
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group glass-card rounded-2xl p-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-3">
                  {post.category}
                </div>
                
                <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-gradient transition-colors">
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
                  <span>{post.date}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="inline-flex items-center gap-1 text-sm text-foreground group-hover:text-primary transition-colors">
                    Читать
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;