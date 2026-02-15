import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Film, Users, Video, Cpu, Code, Bot, Globe, Share2, Megaphone, Briefcase, AlertTriangle, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getServiceConfig, getServiceUrl, resolveSlug } from "@/lib/service-config";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProcessStep {
  step: string;
  description: string;
}

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
  faq: FAQItem[] | null;
  process_steps: ProcessStep[] | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Film, Users, Video, Cpu, Code, Bot, Globe, Share2, Megaphone, Briefcase,
};

const ServiceDetail = ({ overrideSlug }: { overrideSlug?: string }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const rawSlug = overrideSlug || paramSlug;
  const slug = rawSlug ? resolveSlug(rawSlug) : undefined;

  const [service, setService] = useState<ServiceItem | null>(null);
  const [allServices, setAllServices] = useState<{ slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const config = slug ? getServiceConfig(slug) : undefined;

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

    const parsedService = {
      ...data,
      faq: data.faq ? (data.faq as unknown as FAQItem[]) : null,
      process_steps: data.process_steps ? (data.process_steps as unknown as ProcessStep[]) : null,
    };

    setService(parsedService);

    const { data: services } = await supabase
      .from("services")
      .select("slug, title")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (services) setAllServices(services);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setService(null);
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
      document.title = `${service.title} — Алексей Тарануха`;
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

  const IconComponent = service.icon ? (iconMap[service.icon] || Film) : Film;

  // Related services
  const relatedServices = config?.relatedSlugs
    ?.map(rs => allServices.find(s => s.slug === rs))
    .filter(Boolean) || [];

  // Next service (not current, not in related)
  const currentIndex = allServices.findIndex(s => s.slug === slug);
  const nextService = currentIndex >= 0 && allServices.length > 1
    ? allServices[(currentIndex + 1) % allServices.length]
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.full_description || service.short_description,
    "provider": { "@type": "Person", "name": "Алексей Тарануха", "url": "https://alekseytaranukha.com" },
    "serviceType": service.title,
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div className="container relative">
          <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Все услуги
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <IconComponent className="h-4 w-4" />
              <span className="text-sm font-medium">{service.title}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in-up">
              {service.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {service.full_description || service.short_description}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/contacts">
                <Button variant="hero" size="lg">
                  Обсудить проект
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      {config && (
        <section className="py-16 bg-card/30 border-y border-border/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive mb-6">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Проблема</span>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-bold leading-tight">
                {config.problem}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* What's Included */}
      {service.features && service.features.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
              Что входит в услугу
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {service.features.map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-6 rounded-2xl text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <span className="font-display font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="py-16 bg-card/30 border-y border-border/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
              Процесс работы
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 hidden sm:block" />
                <div className="space-y-8">
                  {service.process_steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-6 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 relative z-10 border-2 border-background">
                        <span className="text-primary font-display font-bold text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="pt-2">
                        <h3 className="text-lg font-display font-semibold mb-1">{step.step}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Result */}
      {config && (
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">Результат</span>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-bold leading-tight">
                {config.result}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-16 bg-card/30 border-y border-border/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
              Частые вопросы
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {service.faq.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border border-border rounded-xl px-6 data-[state=open]:bg-card/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">
              Связанные решения
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Эти инструменты усиливают результат при совместном использовании
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {relatedServices.map((rs) => (
                <Link
                  key={rs!.slug}
                  to={getServiceUrl(rs!.slug)}
                  className="group glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-gradient transition-colors">
                    {rs!.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Подробнее <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-card/30 border-t border-border/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              Готовы <span className="text-gradient">начать</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Расскажите о задаче — разберём вместе, как решить её системно и с измеримым результатом.
            </p>
            <Link to="/contacts">
              <Button variant="hero" size="lg" className="shadow-xl shadow-primary/20">
                Обсудить проект
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Next Service */}
      {nextService && nextService.slug !== slug && (
        <section className="py-16 border-t border-border">
          <div className="container">
            <Link
              to={getServiceUrl(nextService.slug)}
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
