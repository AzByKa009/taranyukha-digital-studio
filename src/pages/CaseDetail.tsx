import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  category_label: string;
  short_description: string;
  year: string;
  thumbnail: string | null;
  video_preview: string | null;
  challenge: string | null;
  solution: string | null;
  result: string | null;
  deliverables: string[] | null;
  gallery: string[] | null;
  tags: string[] | null;
}

const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [nextCase, setNextCase] = useState<{ slug: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCase = async () => {
      if (!slug) return;

      // Fetch current case
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setCaseItem(data);

      // Fetch all cases to find next one
      const { data: allCases } = await supabase
        .from("cases")
        .select("slug, title, sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (allCases && allCases.length > 0) {
        const currentIndex = allCases.findIndex((c) => c.slug === slug);
        const next = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : allCases[0];
        setNextCase(next);
      }

      setLoading(false);
    };

    fetchCase();
  }, [slug]);

  useEffect(() => {
    if (caseItem) {
      document.title = `${caseItem.title} — Aleksey Taranukha`;
      document.querySelector('meta[name="description"]')?.setAttribute("content", 
        caseItem.short_description
      );
    }
  }, [caseItem]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (notFound || !caseItem) {
    return <Navigate to="/cases" replace />;
  }

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": caseItem.title,
    "description": caseItem.short_description,
    "dateCreated": caseItem.year,
    "creator": {
      "@type": "Person",
      "name": "Aleksey Taranukha",
      "url": "https://alekseytaranukha.com"
    },
    "keywords": (caseItem.tags || []).join(", "),
    "genre": caseItem.category_label,
    "image": caseItem.thumbnail
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
          to="/cases" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("case_detail.all_cases")}
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12">
        <div className="container">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                {caseItem.category_label}
              </span>
              <span className="text-muted-foreground">{caseItem.year}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {caseItem.title}
            </h1>
            
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {caseItem.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* Main image */}
      {caseItem.thumbnail && (
        <section className="pb-16">
          <div className="container">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <img
                src={caseItem.thumbnail}
                alt={caseItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content Grid */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              {caseItem.challenge && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                    {t("case_detail.task")}
                  </h2>
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {caseItem.challenge}
                  </p>
                </div>
              )}

              {/* Solution */}
              {caseItem.solution && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                  <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                    {t("case_detail.solution")}
                  </h2>
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {caseItem.solution}
                  </p>
                </div>
              )}

              {/* Result */}
              {caseItem.result && (
                <div className="p-8 rounded-2xl bg-card/50 border border-border animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                    {t("case_detail.result")}
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed">
                    {caseItem.result}
                  </p>
                </div>
              )}

              {/* Gallery */}
              {caseItem.gallery && caseItem.gallery.length > 1 && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                  <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
                    {t("case_detail.gallery")}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {caseItem.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-video rounded-xl overflow-hidden bg-muted"
                      >
                        <img
                          src={image}
                          alt={`${caseItem.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Deliverables */}
                {caseItem.deliverables && caseItem.deliverables.length > 0 && (
                  <div className="p-6 rounded-2xl bg-card/50 border border-border animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                      {t("case_detail.deliverables")}
                    </h3>
                    <ul className="space-y-3">
                      {caseItem.deliverables.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {caseItem.tags && caseItem.tags.length > 0 && (
                  <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      {t("case_detail.technologies")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {caseItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full text-sm bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {t("case_detail.want_same")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("case_detail.want_same_desc")}
                  </p>
                  <Link to="/contacts">
                    <Button variant="hero" className="w-full">
                      {t("cta.primary")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Case */}
      {nextCase && (
        <section className="py-16 border-t border-border">
          <div className="container">
            <Link 
              to={`/cases/${nextCase.slug}`}
              className="group block glass-card rounded-2xl p-8 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">
                    {t("case_detail.next_case")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-gradient transition-colors">
                    {nextCase.title}
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

export default CaseDetail;
