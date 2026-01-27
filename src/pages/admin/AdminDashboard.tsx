import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FolderOpen, Wrench, Bot, FileText, Plus, Video, Image, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      title: "Кейсы", 
      count: stats.cases, 
      icon: FolderOpen, 
      href: "/admin/cases",
      addHref: "/admin/cases/new"
    },
    { 
      title: "Услуги", 
      count: stats.services, 
      icon: Wrench, 
      href: "/admin/services",
      addHref: "/admin/services/new"
    },
    { 
      title: "AI-продукты", 
      count: stats.products, 
      icon: Bot, 
      href: "/admin/ai-products",
      addHref: "/admin/ai-products/new"
    },
    { 
      title: "Статьи блога", 
      count: stats.posts, 
      icon: FileText, 
      href: "/admin/blog",
      addHref: "/admin/blog/new"
    },
    { 
      title: "Портфолио", 
      count: stats.videos, 
      icon: Video, 
      href: "/admin/portfolio",
      addHref: "/admin/portfolio/new"
    },
  ];

  const quickLinks = [
    { title: "Медиа-библиотека", icon: Image, href: "/admin/media" },
    { title: "Настройки сайта", icon: Settings, href: "/admin/settings" },
    { title: "SEO настройки", icon: Search, href: "/admin/seo" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Дашборд</h1>
        <p className="text-muted-foreground mt-2">
          Управление контентом сайта
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {cards.map((card) => (
          <Link 
            key={card.href} 
            to={card.href}
            className="premium-card p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-bold">
                {loading ? "..." : card.count}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{card.title}</h3>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="premium-card p-6">
          <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            {cards.map((card) => (
              <Link key={card.addHref} to={card.addHref}>
                <Button variant="outline" className="w-full gap-2" size="sm">
                  <Plus className="w-4 h-4" />
                  {card.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="premium-card p-6">
          <h2 className="text-xl font-semibold mb-4">Управление</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <link.icon className="w-5 h-5 text-primary" />
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
