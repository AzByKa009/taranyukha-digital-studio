import { Layout } from "@/components/layout/Layout";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { useSEO } from "@/hooks/useSEO";

const Portfolio = () => {
  useSEO({
    title: "Портфолио — монтаж, AI-видео, вайб кодинг | Aleksey Taranukha",
    description: "Видео-портфолио: монтаж вертикальных видео, AI-видео продакшен, продюсирование контента. Реальные результаты клиентов.",
    keywords: "портфолио монтаж, видео кейсы, AI-видео примеры, вайб кодинг результаты",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-10">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 animate-fade-in-up">
              Портфолио
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Видео-кейсы, которые демонстрируют результаты работы
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-28">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
