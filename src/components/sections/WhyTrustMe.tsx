import { CheckCircle, Clock, Users, Shield } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, PremiumCard } from "@/components/motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface TrustFactor {
  icon: string;
  title: string;
  description: string;
}

interface TrustContent {
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  quote?: string;
  factors?: TrustFactor[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, Users, Shield, CheckCircle,
};

const defaultFactors: TrustFactor[] = [
  { icon: "Clock", title: "Думаю стратегически", description: "Сначала — зачем, потом — как" },
  { icon: "Users", title: "Понимаю контекст", description: "Ниша, клиенты, конкуренты" },
  { icon: "Shield", title: "Считаю результат", description: "Цифры важнее красивых отчётов" },
  { icon: "CheckCircle", title: "Строю надолго", description: "Системы, а не разовые акции" },
];

export function WhyTrustMe() {
  const { data: trustSettings } = useSiteSettings<TrustContent>("trust");

  const title = trustSettings?.title || "Работаете ";
  const titleAccent = trustSettings?.titleAccent || "со мной напрямую";
  const subtitle = trustSettings?.subtitle || "Без менеджеров и посредников. Я лично разбираюсь в задаче и отвечаю за результат.";
  const quote = trustSettings?.quote || "Мне важно понять бизнес — иначе маркетинг не сработает";
  const factors = trustSettings?.factors || defaultFactors;

  return (
    <section className="py-16 sm:py-24 bg-card/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side - Content */}
          <FadeIn direction="right">
            <div>
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4 block">
                Подход
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
                {title}<span className="text-gradient">{titleAccent}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {subtitle}
              </p>
              
              {/* Quote */}
              <blockquote className="border-l-2 border-primary pl-4 sm:pl-6 py-2">
                <p className="text-base sm:text-lg italic text-foreground/90 mb-2">
                  "{quote}"
                </p>
              </blockquote>
            </div>
          </FadeIn>

          {/* Right side - Trust factors */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" staggerDelay={0.1}>
            {factors.map((factor, index) => {
              const IconComponent = iconMap[factor.icon] || CheckCircle;
              return (
                <StaggerItem key={index}>
                  <PremiumCard
                    className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-background/50 border border-border hover:border-primary/30 transition-colors h-full"
                    hoverScale={1.03}
                    hoverY={-4}
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
                    <h3 className="font-display font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{factor.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{factor.description}</p>
                  </PremiumCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
