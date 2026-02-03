import { Link } from "react-router-dom";
import { Mail, ArrowUpRight } from "lucide-react";
import { useSiteSettings, ContactSettings, FooterSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRealtimeServices } from "@/hooks/useRealtimeServices";

export function Footer() {
  const { data: contact } = useSiteSettings<ContactSettings>("contact");
  const { data: footer } = useSiteSettings<FooterSettings>("footer");
  const { t, language } = useLanguage();
  const { services } = useRealtimeServices({ limit: 6 });

  const navigation = {
    main: [
      { name: t("nav.cases"), href: "/cases" },
      { name: t("nav.services"), href: "/services" },
      { name: t("nav.ai_products"), href: "/ai-products" },
      { name: language === "ru" ? "Блог" : "Blog", href: "/blog" },
    ],
    company: [
      { name: t("nav.about"), href: "/about" },
      { name: t("nav.contact"), href: "/contacts" },
      { name: t("nav.faq"), href: "/faq" },
    ],
  };

  const socialLinks = [
    { name: "Telegram", href: contact?.telegram || "#" },
    { name: "Instagram", href: contact?.instagram || "#" },
    { name: "YouTube", href: contact?.youtube || "#" },
  ].filter(link => link.href && link.href !== "#");

  return (
    <footer className="border-t border-border/40 bg-card/20">
      <div className="container py-12 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-purple flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-primary-foreground font-display font-bold text-xs sm:text-sm">AT</span>
              </div>
              <span className="font-display font-semibold text-sm sm:text-base tracking-tight">
                Aleksey Taranukha
              </span>
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              {footer?.tagline || (language === "ru" 
                ? "Маркетолог. Помогаю бизнесу расти системно — через упаковку, продвижение и автоматизацию."
                : "Marketer. Helping businesses grow systematically through packaging, promotion, and automation."
              )}
            </p>
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {contact.email}
              </a>
            )}
          </div>

          <div>
            <h3 className="font-display font-semibold text-xs sm:text-sm mb-3 sm:mb-5 text-foreground/90">
              {t("footer.nav")}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-xs sm:text-sm mb-3 sm:mb-5 text-foreground/90">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    to="/services"
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {language === "ru" ? "Все услуги" : "All services"}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-xs sm:text-sm mb-3 sm:mb-5 text-foreground/90">
              {t("footer.contacts")}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {socialLinks.length > 0 && (
              <>
                <h3 className="font-display font-semibold text-xs sm:text-sm mb-3 sm:mb-5 text-foreground/90">
                  {language === "ru" ? "Соцсети" : "Social"}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3.5">
                  {socialLinks.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                      >
                        {item.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border/40">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            {footer?.copyright || `© ${new Date().getFullYear()} Aleksey Taranukha. ${t("footer.rights")}.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
