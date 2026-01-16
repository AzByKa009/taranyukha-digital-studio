import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import { getServiceBySlug, services } from "@/data/services";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  // Find next service for navigation
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : services[0];

  useEffect(() => {
    if (service) {
      document.title = `${service.title} — Aleksey Taranukha`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", 
        service.tagline
      );
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Person",
      "name": "Aleksey Taranukha",
      "url": "https://alekseytaranukha.com"
    },
    "serviceType": service.shortTitle
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
              <service.icon className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {service.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {service.description}
            </p>

            {/* Quick info */}
            <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Сроки: <span className="text-foreground font-medium">{service.timeline}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Для: <span className="text-foreground font-medium">{service.idealFor}</span></span>
              </div>
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
              {/* For Whom */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Кому подходит
                </h2>
                <ul className="space-y-4">
                  {service.forWhom.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Процесс работы
                </h2>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
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

              {/* Result */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <h2 className="text-2xl font-display font-bold mb-4">
                  Результат
                </h2>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {service.result}
                </p>
              </div>

              {/* FAQ */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Частые вопросы
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {service.faqs.map((faq, index) => (
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* What's Included */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Что входит
                  </h3>
                  <ul className="space-y-3">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Хотите {service.shortTitle.toLowerCase()}?
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
    </Layout>
  );
};

export default ServiceDetail;
