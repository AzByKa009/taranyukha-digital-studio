import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Wrench, Bot, FileText, Plus, Video, Image, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

const AnalyticsSection = lazy(() => import("./analytics/AnalyticsSection"));

interface Stats {
  cases: number;
  services: number;
  products: number;
  posts: number;
  videos: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ cases: 0, services: 0, products: 0, posts: 0, videos: 0 });
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchStats = async () => {
      const [casesRes, servicesRes, productsRes, postsRes, videosRes] = await Promise.all([
        supabase.from("cases").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("ai_products").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_videos").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        cases: casesRes.count ?? 0,
        services: servicesRes.count ?? 0,
        products: productsRes.count ?? 0,
        posts: postsRes.count ?? 0,
        videos: videosRes.count ?? 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    { 
      title: t("admin.cases"), 
      count: stats.cases, 
      icon: FolderOpen, 
      href: "/admin/cases",
      addHref: "/admin/cases/new"
    },
    { 
      title: t("admin.services"), 
      count: stats.services, 
      icon: Wrench, 
      href: "/admin/services",
      addHref: "/admin/services/new"
    },
    { 
      title: t("admin.ai_products"), 
      count: stats.products, 
      icon: Bot, 
      href: "/admin/ai-products",
      addHref: "/admin/ai-products/new"
    },
    { 
      title: t("admin.blog"), 
      count: stats.posts, 
      icon: FileText, 
      href: "/admin/blog",
      addHref: "/admin/blog/new"
    },
    { 
      title: t("admin.portfolio"), 
      count: stats.videos, 
      icon: Video, 
      href: "/admin/portfolio",
      addHref: "/admin/portfolio/new"
    },
  ];

  const quickLinks = [
    { title: t("admin.media_library"), icon: Image, href: "/admin/media" },
    { title: t("admin.site_settings"), icon: Settings, href: "/admin/settings" },
    { title: t("admin.seo_settings"), icon: Search, href: "/admin/seo" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">{t("admin.dashboard")}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
          {t("admin.content_management")}
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-48 sm:h-64 w-full mb-6" />}>
        <AnalyticsSection />
      </Suspense>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {cards.map((card) => (
          <Link 
            key={card.href} 
            to={card.href}
            className="premium-card p-4 sm:p-6 group"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold">
                {loading ? "..." : card.count}
              </span>
            </div>
            <h3 className="font-semibold text-sm sm:text-lg truncate">{card.title}</h3>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="premium-card p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("admin.quick_actions")}</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {cards.map((card) => (
              <Link key={card.addHref} to={card.addHref}>
                <Button variant="outline" className="w-full gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10" size="sm">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="truncate">{card.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="premium-card p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t("admin.management")}</h2>
          <div className="space-y-1.5 sm:space-y-2">
            {quickLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href}
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-sm sm:text-base">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
