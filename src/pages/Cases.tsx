import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  {
    id: 1,
    title: "AI-ассистент для финтех-стартапа",
    category: "Искусственный интеллект",
    description: "Разработка интеллектуального чат-бота для автоматизации клиентской поддержки. Снижение нагрузки на саппорт на 60%.",
    tags: ["NLP", "Python", "GPT-4"],
    year: "2024",
  },
  {
    id: 2,
    title: "Платформа цифрового продакшена",
    category: "Digital Production",
    description: "Комплексная система управления контентом и автоматизации маркетинга для e-commerce компании.",
    tags: ["React", "Node.js", "AWS"],
    year: "2024",
  },
  {
    id: 3,
    title: "Нейросеть для анализа данных",
    category: "Machine Learning",
    description: "Предиктивная аналитика для оптимизации бизнес-процессов в логистической компании.",
    tags: ["TensorFlow", "Python", "BigQuery"],
    year: "2023",
  },
  {
    id: 4,
    title: "Автоматизация документооборота",
    category: "Автоматизация",
    description: "Внедрение AI-системы распознавания и обработки документов для банка.",
    tags: ["OCR", "NLP", "Cloud"],
    year: "2023",
  },
  {
    id: 5,
    title: "Генеративный AI для контента",
    category: "Генеративный AI",
    description: "Разработка системы автоматической генерации маркетингового контента.",
    tags: ["GPT-4", "Stable Diffusion", "API"],
    year: "2024",
  },
  {
    id: 6,
    title: "Голосовой ассистент",
    category: "Voice AI",
    description: "Создание голосового помощника для умного дома с интеграцией IoT устройств.",
    tags: ["Speech-to-Text", "IoT", "Python"],
    year: "2023",
  },
];

const Cases = () => {
  useEffect(() => {
    document.title = "Кейсы — Aleksey Taranukha";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Портфолио проектов в области AI, машинного обучения и цифрового продакшена. Реальные кейсы трансформации бизнеса."
    );
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Кейсы
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Проекты, которые демонстрируют силу AI и цифровых технологий в решении реальных бизнес-задач
            </p>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((caseItem, index) => (
              <Link
                key={caseItem.id}
                to={`/cases/${caseItem.id}`}
                className="group block glass-card rounded-2xl p-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                      {caseItem.category}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {caseItem.year}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-display font-semibold mb-3 group-hover:text-gradient transition-colors">
                  {caseItem.title}
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  {caseItem.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cases;