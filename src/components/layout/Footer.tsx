import { Link } from "react-router-dom";
import { Mail, ArrowUpRight } from "lucide-react";

const navigation = {
  main: [
    { name: "Кейсы", href: "/cases" },
    { name: "Услуги", href: "/services" },
    { name: "AI-продукты", href: "/ai-products" },
    { name: "Блог", href: "/blog" },
    { name: "Калькулятор", href: "/calculator" },
  ],
  services: [
    { name: "Монтаж Reels", href: "/montazh-reels" },
    { name: "Продюсер Reels", href: "/produser-reels" },
    { name: "AI-бот для бизнеса", href: "/ai-bot-dlya-biznesa" },
    { name: "Сайт под услуги", href: "/razrabotka-sayta-pod-uslugi" },
  ],
  company: [
    { name: "Обо мне", href: "/about" },
    { name: "Контакты", href: "/contacts" },
    { name: "FAQ", href: "/faq" },
  ],
  social: [
    { name: "Telegram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "YouTube", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">AT</span>
              </div>
              <span className="font-display font-semibold text-lg">
                Aleksey Taranukha
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              AI & Digital Production. Создаю инновационные цифровые решения, 
              которые трансформируют бизнес.
            </p>
            <a
              href="mailto:hello@taranukha.dev"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              hello@taranukha.dev
            </a>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Разделы</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Услуги</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Компания</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-4">Соцсети</h3>
            <ul className="space-y-3">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    {item.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aleksey Taranukha. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground">
            Сделано с использованием AI
          </p>
        </div>
      </div>
    </footer>
  );
}
