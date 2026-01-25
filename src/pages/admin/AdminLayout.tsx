import { useEffect } from "react";
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
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Дашборд", icon: LayoutDashboard, exact: true },
  { href: "/admin/cases", label: "Кейсы", icon: FolderOpen },
  { href: "/admin/services", label: "Услуги", icon: Wrench },
  { href: "/admin/ai-products", label: "AI-продукты", icon: Bot },
  { href: "/admin/blog", label: "Блог", icon: FileText },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading, signOut } = useAuth();

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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold">Админ-панель</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive(item.href, item.exact)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Home className="w-5 h-5" />
            На сайт
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
