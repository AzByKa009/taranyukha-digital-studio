import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg",
        "text-sm font-medium transition-all duration-300",
        "bg-card/60 border border-border/50 hover:border-primary/30",
        "text-muted-foreground hover:text-foreground"
      )}
      aria-label={`Switch to ${language === "ru" ? "English" : "Russian"}`}
    >
      <span className={cn(
        "transition-opacity duration-200",
        language === "ru" ? "opacity-100" : "opacity-50"
      )}>
        RU
      </span>
      <span className="text-border">/</span>
      <span className={cn(
        "transition-opacity duration-200",
        language === "en" ? "opacity-100" : "opacity-50"
      )}>
        EN
      </span>
    </button>
  );
}
