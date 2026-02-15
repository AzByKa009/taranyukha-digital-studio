import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, Globe, Share2, Megaphone, Bot, ChevronDown, Sparkles, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceDropdownItems = [
  {
    icon: Briefcase,
    title: "Упаковка бизнеса",
    href: "/services/upakovka",
    offer: "Аудит позиционирования — бесплатно",
    offerIcon: Sparkles,
  },
  {
    icon: Globe,
    title: "Сайты",
    href: "/services/sajty",
    offer: "Запуск от 14 дней",
    offerIcon: Clock,
  },
  {
    icon: Share2,
    title: "Соцсети",
    href: "/services/soccseti",
    offer: "Контент-план в подарок",
    offerIcon: Sparkles,
  },
  {
    icon: Megaphone,
    title: "Продвижение",
    href: "/services/prodvizhenie",
    offer: "Первый аудит трафика — бесплатно",
    offerIcon: Zap,
  },
  {
    icon: Bot,
    title: "Автоматизация",
    href: "/services/avtomatizaciya",
    offer: "Экономия до 20 часов в неделю",
    offerIcon: Clock,
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.cases"), href: "/cases" },
    { name: t("nav.services"), href: "/services", hasDropdown: true },
    { name: t("nav.ai_products"), href: "/ai-products" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.faq"), href: "/faq" },
  ];

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <nav className="container flex items-center justify-between h-14 sm:h-16 lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-purple flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            <span className="text-primary-foreground font-display font-bold text-xs sm:text-sm">AT</span>
          </div>
          <span className="font-display font-semibold text-sm sm:text-base hidden sm:block tracking-tight">
            Aleksey Taranukha
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navigation.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.name}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-1",
                    location.pathname.startsWith("/services")
                      ? "text-foreground bg-muted/80"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.name}
                  <ChevronDown className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )} />
                </Link>

                {/* Dropdown */}
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[340px]">
                    <div className="rounded-xl border border-border/60 bg-card shadow-2xl shadow-black/40 overflow-hidden animate-fade-in">
                      <div className="p-1.5">
                        {serviceDropdownItems.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                              <service.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-sm font-medium text-foreground block leading-tight">
                                {service.title}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-primary/80 mt-0.5">
                                <service.offerIcon className="h-3 w-3 shrink-0" />
                                {service.offer}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-border/40 px-4 py-2.5">
                        <Link
                          to="/services"
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Все услуги →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  location.pathname === item.href
                    ? "text-foreground bg-muted/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right side: CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <Link to="/contacts">
              <Button variant="premium" size="sm" className="shadow-lg shadow-primary/20">
                {t("nav.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 sm:p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-t border-border/30">
          <div className="container py-3 sm:py-4 space-y-1">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                      location.pathname.startsWith("/services")
                        ? "text-foreground bg-muted/80"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      mobileServicesOpen && "rotate-180"
                    )} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 mt-1 space-y-0.5 animate-fade-in">
                      {serviceDropdownItems.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <service.icon className="h-4 w-4 text-primary shrink-0" />
                          <div>
                            <span className="block font-medium">{service.title}</span>
                            <span className="flex items-center gap-1 text-xs text-primary/70 mt-0.5">
                              <service.offerIcon className="h-3 w-3" />
                              {service.offer}
                            </span>
                          </div>
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Все услуги →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
            <div className="pt-3 sm:pt-4 pb-2">
              <Link to="/contacts" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="premium" className="w-full shadow-lg shadow-primary/20">
                  {t("nav.contact")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
