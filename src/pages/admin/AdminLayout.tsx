import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  LayoutDashboard, 
  FolderOpen, 
  Wrench, 
  Bot, 
  FileText, 
  LogOut,
  Home,
  Settings,
  Search,
  Image,
  Video,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { href: "/admin", label: "admin.dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/cases", label: "admin.cases", icon: FolderOpen },
  { href: "/admin/services", label: "admin.services", icon: Wrench },
  { href: "/admin/ai-products", label: "admin.ai_products", icon: Bot },
  { href: "/admin/blog", label: "admin.blog", icon: FileText },
  { href: "/admin/portfolio", label: "admin.portfolio", icon: Video },
  { href: "/admin/media", label: "admin.media_library", icon: Image },
  { href: "/admin/ai-tools", label: "AI-инструменты", icon: Sparkles, isRaw: true },
  { href: "/admin/settings", label: "admin.site_settings", icon: Settings },
  { href: "/admin/seo", label: "admin.seo_settings", icon: Search },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const getLabel = (item: typeof navItems[0]) => {
    if (item.isRaw) return item.label;
    return t(item.label);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-card/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <span className="font-semibold text-sm">Админ-панель</span>
        <div className="w-9" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card/50 flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 lg:p-6 border-b border-border mt-14 lg:mt-0">
          <div>
            <h1 className="text-lg lg:text-xl font-bold">{t("admin.dashboard")}</h1>
            <p className="text-xs lg:text-sm text-muted-foreground mt-1 truncate">{user.email}</p>
          </div>
        </div>
        
        <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-colors text-sm",
                isActive(item.href, item.exact)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
              <span className="truncate">{getLabel(item)}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 lg:p-4 border-t border-border space-y-2">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
          >
            <Home className="w-4 h-4 lg:w-5 lg:h-5" />
            {t("admin.to_site")}
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sm"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
            {t("admin.logout")}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
