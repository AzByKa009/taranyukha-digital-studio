import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Film, Users, Video, Cpu, Code, Bot, Globe, AlertTriangle, Target, Layers, Handshake, UserCheck, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { serviceContent } from "@/data/service-content";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string | null;
  icon: string | null;
  thumbnail: string | null;
  price_from: number | null;
  price_label: string | null;
  features: string[] | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Film, Users, Video, Cpu, Code, Bot, Globe,
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [nextService, setNextService] = useState<{ slug: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchService = async () => {
    if (!slug) return;

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setService(data);

    const { data: allServices } = await supabase
      .from("services")
      .select("slug, title, sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (allServices && allServices.length > 0) {
      const currentIndex = allServices.findIndex((s) => s.slug === slug);
      const next = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : allServices[0];
      setNextService(next);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchService();
  }, [slug]);

  useEffect(() => {
    const channel = supabase
      .channel('service-detail-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => fetchService())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [slug]);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} — Aleksey Taranukha`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", service.short_description);
    }
  }, [service]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (notFound || !service) {
    return <Navigate to="/services" replace />;
  }

  const content = slug ? serviceContent[slug] : null;
  const IconComponent = service.icon ? (iconMap[service.icon] || Film) : Film;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": content?.hero.subheadline || service.short_description,
    "provider": { "@type": "Person", "name": "Aleksey Taranukha", "url": "https://alekseytaranukha.com" },
    "serviceType": service.title,
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Back link */}
      <div className="container pt-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Все услуги
        </Link>
      </div>

      {content ? (
        <article>
          {/* 1. Hero */}
          <section className="pt-10 pb-16">
            <div className="container">
              <div className="max-w-3xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <IconComponent className="h-7 w-7 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
                  {content.hero.headline}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {content.hero.subheadline}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {content.hero.positioning}
                </p>
              </div>
            </div>
          </section>

          {/* 2. Business Problem */}
          <section className="py-16 bg-card/30 border-y border-border/50">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Проблема</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  {content.problem.title}
                </h2>
                <p className="text-muted-foreground mb-10 text-lg">
                  {content.problem.intro}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.problem.points.map((point, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-background border border-border/50">
                      <h3 className="font-display font-semibold mb-2">{point.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. What's Included */}
          <section className="py-16">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Состав</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
                  {content.includes.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.includes.blocks.map((block, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/30">
                      <h3 className="font-display font-semibold mb-2">{block.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{block.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. How We Work */}
          <section className="py-16 bg-card/30 border-y border-border/50">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Процесс</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
                  Как строится работа
                </h2>
                <div className="space-y-8">
                  {content.process.steps.map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-display font-bold text-sm">{i + 1}</span>
                        </div>
                        {i < content.process.steps.length - 1 && (
                          <div className="w-px flex-1 bg-border/50 mt-2" />
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">{step.name}</span>
                        <h3 className="font-display font-semibold text-lg mt-1 mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. Format of Cooperation */}
          <section className="py-16">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Handshake className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Формат</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
                  Формат сотрудничества
                </h2>
                <div className="space-y-4">
                  {content.cooperation.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-card/20">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Who This Is For */}
          <section className="py-16 bg-card/30 border-y border-border/50">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Аудитория</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
                  Кому подойдёт
                </h2>
                <div className="space-y-4">
                  {content.audience.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-background">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-foreground/90 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. Expected Result */}
          <section className="py-16">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Результат</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Ожидаемый результат
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  {content.result.intro}
                </p>
                <div className="space-y-3">
                  {content.result.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 8. Final CTA */}
          <section className="py-20">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Обсудить задачу
                </h2>
                <p className="text-muted-foreground mb-8">
                  Расскажите о вашей ситуации — разберём, что можно сделать и с чего начать
                </p>
                <Link to="/contacts">
                  <Button variant="hero" size="lg">
                    Обсудить задачу
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </article>
      ) : (
        /* Fallback for services without structured content */
        <section className="pt-8 pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {service.full_description || service.short_description}
              </p>
              <Link to="/contacts">
                <Button variant="hero" size="lg">
                  Обсудить задачу
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Next Service */}
      {nextService && (
        <section className="py-16 border-t border-border">
          <div className="container">
            <Link
              to={`/services/${nextService.slug}`}
              className="group block glass-card rounded-2xl p-8 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Другая услуга</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-gradient transition-colors">
                    {nextService.title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ServiceDetail;
