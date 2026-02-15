import { useEffect, useState, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Film, Users, Video, Cpu, Code, Bot, Globe, AlertTriangle, Layers, Handshake, UserCheck, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { serviceContent } from "@/data/service-content";
import { motion, useInView } from "framer-motion";

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

/* ── Animated section wrapper ── */
const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

      {content ? (
        <article>
          {/* ═══════════ 1. HERO ═══════════ */}
          <section className="relative min-h-[70vh] flex items-end overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={content.hero.image}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
            </div>

            <div className="container relative z-10 pb-16 pt-32">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Все услуги
                </Link>
              </motion.div>

              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20 text-primary mb-6"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{service.title}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-[3.25rem] font-display font-bold mb-6 leading-[1.15]"
                >
                  {content.hero.headline}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed"
                >
                  {content.hero.subheadline}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  className="text-foreground/70 leading-relaxed mb-8 max-w-2xl"
                >
                  {content.hero.positioning}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => document.getElementById('service-cta')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Обсудить задачу
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ═══════════ 2. BUSINESS PROBLEM ═══════════ */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
            <div className="container relative">
              <AnimatedSection>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <span className="text-xs font-semibold text-destructive uppercase tracking-[0.15em]">Проблема</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
                    {content.problem.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-12 max-w-3xl">
                    {content.problem.intro}
                  </p>
                </div>
              </AnimatedSection>

              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
                {content.problem.points.map((point, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm hover:border-destructive/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-destructive/5 flex items-center justify-center">
                        <span className="text-xs font-bold text-destructive/60">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-3 pr-10">{point.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ Visual Divider ═══════════ */}
          <div className="container">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          {/* ═══════════ 3. WHAT'S INCLUDED ═══════════ */}
          <section className="py-20">
            <div className="container">
              <AnimatedSection>
                <div className="max-w-4xl mx-auto mb-12">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">Состав услуги</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">
                    {content.includes.title}
                  </h2>
                </div>
              </AnimatedSection>

              <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {content.includes.blocks.map((block, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="group relative p-6 rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)] transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-display font-semibold mb-2">{block.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{block.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ 4. HOW WE WORK ═══════════ */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/50 to-card/30" />
            <div className="container relative">
              <AnimatedSection>
                <div className="max-w-3xl mx-auto mb-14">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">Процесс</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">
                    Как строится работа
                  </h2>
                </div>
              </AnimatedSection>

              <div className="max-w-3xl mx-auto">
                {content.process.steps.map((step, i) => (
                  <AnimatedSection key={i} delay={i * 0.12}>
                    <div className="flex gap-6 mb-2">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 relative">
                          <span className="text-primary font-display font-bold">{i + 1}</span>
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl" />
                        </div>
                        {i < content.process.steps.length - 1 && (
                          <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-primary/20 to-transparent mt-3" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-10">
                        <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">{step.name}</span>
                        <h3 className="font-display font-bold text-xl mt-1 mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ 5. FORMAT OF COOPERATION ═══════════ */}
          <section className="py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Handshake className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">Формат</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-10">
                    Формат сотрудничества
                  </h2>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-5">
                  {content.cooperation.points.map((point, i) => (
                    <AnimatedSection key={i} delay={i * 0.1}>
                      <div className="flex items-start gap-4 p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/20 transition-all duration-300 h-full">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-foreground/85 leading-relaxed">{point}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ Visual Divider ═══════════ */}
          <div className="container">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          {/* ═══════════ 6. WHO THIS IS FOR ═══════════ */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
            <div className="container relative">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">Аудитория</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-10">
                    Кому подойдёт
                  </h2>
                </AnimatedSection>

                <div className="space-y-4">
                  {content.audience.items.map((item, i) => (
                    <AnimatedSection key={i} delay={i * 0.1}>
                      <div className="group flex items-start gap-5 p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/20 hover:bg-card/50 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-foreground/90 leading-relaxed text-lg pt-1.5">{item}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ 7. EXPECTED RESULT ═══════════ */}
          <section className="py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">Результат</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
                    Ожидаемый результат
                  </h2>
                  <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
                    {content.result.intro}
                  </p>
                </AnimatedSection>

                <div className="space-y-3">
                  {content.result.points.map((point, i) => (
                    <AnimatedSection key={i} delay={i * 0.08}>
                      <div className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/[0.06] to-primary/[0.02] border border-primary/10 hover:border-primary/25 hover:from-primary/[0.1] transition-all duration-300">
                        <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-foreground/90 leading-relaxed">{point}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ 8. FINAL CTA ═══════════ */}
          <section id="service-cta" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[100px]" />

            <div className="container relative">
              <AnimatedSection>
                <div className="max-w-2xl mx-auto text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Обсудить задачу
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                    Расскажите о вашей ситуации — разберём, что можно сделать и с чего начать. Это разговор, не продажа.
                  </p>
                  <Link to="/contacts">
                    <Button variant="hero" size="lg" className="text-base px-8">
                      Обсудить задачу
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </article>
      ) : (
        /* Fallback for services without structured content */
        <section className="pt-20 pb-16">
          <div className="container">
            <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />
              Все услуги
            </Link>
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

      {/* ═══════════ NEXT SERVICE ═══════════ */}
      {nextService && (
        <section className="py-16 border-t border-border/50">
          <div className="container">
            <AnimatedSection>
              <Link
                to={`/services/${nextService.slug}`}
                className="group block rounded-2xl p-8 border border-border/40 bg-card/20 hover:border-primary/20 hover:bg-card/40 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-2 block">
                      Следующая услуга
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors">
                      {nextService.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ServiceDetail;
