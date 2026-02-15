import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Loader2, Film, Users, Video, Cpu, Code, Bot, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  Film,
  Users,
  Video,
  Cpu,
  Code,
  Bot,
  Globe,
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

    // Parse JSON fields
    const parsedService = {
      ...data,
      faq: data.faq ? (data.faq as unknown as FAQItem[]) : null,
      process_steps: data.process_steps ? (data.process_steps as unknown as ProcessStep[]) : null,
    };

    setService(parsedService);

    // Fetch all services to find next one
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
    fetchService();
  }, [slug]);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('service-detail-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        () => {
          fetchService();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} — Aleksey Taranukha`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", 
        service.short_description
      );
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

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.full_description || service.short_description,
    "provider": {
      "@type": "Person",
      "name": "Aleksey Taranukha",
      "url": "https://alekseytaranukha.com"
    },
    "serviceType": service.title
  };

  return (
    <Layout>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back link */}
      <div className="container pt-8">
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Все услуги
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12">
        <div className="container">
          <div className="max-w-4xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 animate-fade-in">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {service.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {service.full_description || service.short_description}
            </p>

            {/* Quick info */}
            <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {service.price_from && (
                <div className="flex items-center gap-2">
                  <span className="text-primary font-semibold text-lg">
                    от {service.price_from.toLocaleString()} ₽
                  </span>
                </div>
              )}
              {service.price_label && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{service.price_label}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Process */}
              {service.process_steps && service.process_steps.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Процесс работы
                  </h2>
                  <div className="space-y-6">
                    {service.process_steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-display font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-display font-semibold mb-1">{step.step}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {service.faq && service.faq.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Частые вопросы
                  </h2>
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
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* What's Included */}
                {service.features && service.features.length > 0 && (
                  <div className="p-6 rounded-2xl bg-card/50 border border-border animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <h3 className="font-display font-semibold text-lg mb-4">
                      Что входит
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Хотите заказать?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Обсудим вашу задачу и подготовлю предложение
                  </p>
                  <Link to="/contacts">
                    <Button variant="hero" className="w-full">
                      Обсудить проект
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <span className="text-sm text-muted-foreground mb-2 block">
                    Другая услуга
                  </span>
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
