import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Кейсы", href: "/cases" },
  { name: "Услуги", href: "/services" },
  { name: "AI-продукты", href: "/ai-products" },
  { name: "Калькулятор", href: "/blog" },
  { name: "Обо мне", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <nav className="container flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <span className="text-primary-foreground font-display font-bold text-sm">AT</span>
          </div>
          <span className="font-display font-semibold text-base hidden sm:block tracking-tight">
            Aleksey Taranukha
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                location.pathname === item.href
                  ? "text-foreground bg-muted/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/contacts">
            <Button variant="premium" size="sm" className="shadow-lg shadow-primary/20">
              Связаться
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-t border-border/30">
          <div className="container py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                  location.pathname === item.href
                    ? "text-foreground bg-muted/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link to="/contacts" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="premium" className="w-full shadow-lg shadow-primary/20">
                  Связаться
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
