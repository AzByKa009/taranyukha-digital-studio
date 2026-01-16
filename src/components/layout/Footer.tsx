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
    <footer className="border-t border-border/40 bg-card/20">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-primary-foreground font-display font-bold text-sm">AT</span>
              </div>
              <span className="font-display font-semibold text-base tracking-tight">
                Aleksey Taranukha
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              AI & Digital Production. Создаю инновационные цифровые решения, 
              которые трансформируют бизнес.
            </p>
            <a
              href="mailto:taranyha1245@gmail.com"
              className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <Mail className="h-4 w-4" />
              taranyha1245@gmail.com
            </a>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-5 text-foreground/90">Разделы</h3>
            <ul className="space-y-3.5">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-5 text-foreground/90">Услуги</h3>
            <ul className="space-y-3.5">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Social */}
          <div>
            <h3 className="font-display font-semibold text-sm mb-5 text-foreground/90">Компания</h3>
            <ul className="space-y-3.5 mb-8">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-display font-semibold text-sm mb-5 text-foreground/90">Соцсети</h3>
            <ul className="space-y-3.5">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                  >
                    {item.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aleksey Taranukha. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground/60">
            Сделано с использованием AI
          </p>
        </div>
      </div>
    </footer>
  );
}
