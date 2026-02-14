import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  Monitor, 
  Smartphone,
  Tablet,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  LogIn,
  LogOut as LogOutIcon,
  Radio,
  Target,
  MousePointerClick,
  Layers,
  MessageSquare,
  Info
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}с`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}м ${secs}с`;
}

function formatPagePath(path: string): string {
  if (path === "/") return "Главная";
  const clean = path.replace(/^\//, "").replace(/-/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

const SOURCE_LABELS: Record<string, { label: string; description: string }> = {
  direct: { label: "Прямой заход", description: "Ввели адрес в браузере или из закладок" },
  search: { label: "Поиск (Google/Яндекс)", description: "Пришли из поисковой выдачи (SEO)" },
  social: { label: "Соцсети", description: "Из VK, Telegram, Instagram и т.д." },
  referral: { label: "Ссылка с сайта", description: "Перешли по ссылке с другого сайта" },
  "yandex-direct": { label: "Яндекс.Директ", description: "Платная реклама Яндекс.Директ" },
  "google-ads": { label: "Google Ads", description: "Платная реклама Google" },
  email: { label: "Email-рассылка", description: "Перешли из письма" },
  telegram: { label: "Telegram", description: "Из Telegram-канала или бота" },
  vk: { label: "ВКонтакте", description: "Из VK" },
  instagram: { label: "Instagram", description: "Из Instagram" },
};

function formatSource(source: string): string {
  return SOURCE_LABELS[source]?.label || source;
}

function getSourceDescription(source: string): string {
  return SOURCE_LABELS[source]?.description || "";
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[220px] text-xs">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  subtitle,
  tooltip,
  trend,
  loading,
  accent
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  subtitle?: string;
  tooltip?: string;
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
  accent?: boolean;
}) {
  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-16" />
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 rounded-lg border transition-colors",
      accent ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border/50"
    )}>
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        <Icon className={cn("w-4 h-4", accent && "text-primary")} />
        <span className="text-sm">{title}</span>
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {trend === "up" && <TrendingUp className="w-4 h-4 text-primary" />}
        {trend === "down" && <TrendingDown className="w-4 h-4 text-destructive" />}
      </div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </div>
  );
}

function ListSection({ 
  title, 
  items, 
  valueKey, 
  labelKey,
  icon: Icon,
  loading,
  tooltip
}: { 
  title: string; 
  items: Array<Record<string, any>>; 
  valueKey: string; 
  labelKey: string;
  icon: React.ElementType;
  loading?: boolean;
  tooltip?: string;
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <Icon className="w-4 h-4" />
          {title}
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <Icon className="w-4 h-4" />
          {title}
        </div>
        <div className="text-sm text-muted-foreground/60 py-2">Нет данных</div>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + (Number(item[valueKey]) || 0), 0);
  const maxValue = Math.max(...items.map((item) => Number(item[valueKey]) || 0));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
        <Icon className="w-4 h-4" />
        {title}
        {tooltip && <InfoTooltip text={tooltip} />}
      </div>
      {items.slice(0, 5).map((item, idx) => {
        const value = Number(item[valueKey]) || 0;
        const label = String(item[labelKey] || "");
        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
        const share = total > 0 ? Math.round(value / total * 100) : 0;
        
        return (
          <div key={idx} className="relative">
            <div 
              className="absolute inset-0 bg-primary/10 rounded"
              style={{ width: `${percentage}%` }}
            />
            <div className="relative flex items-center justify-between py-1.5 px-2 text-sm">
              <span className="truncate">{formatPagePath(label)}</span>
              <span className="font-medium ml-2 flex items-center gap-1.5">
                {value}
                <span className="text-xs text-muted-foreground">({share}%)</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DeviceIcon({ device }: { device: string }) {
  switch (device.toLowerCase()) {
    case "mobile":
      return <Smartphone className="w-4 h-4" />;
    case "tablet":
      return <Tablet className="w-4 h-4" />;
    default:
      return <Monitor className="w-4 h-4" />;
  }
}

const DEVICE_COLORS = ["hsl(var(--primary))", "hsl(var(--primary) / 0.6)", "hsl(var(--primary) / 0.3)"];

function DailyChart({ data, loading }: { data: Array<{ date: string; visitors: number; page_views: number }>; loading: boolean }) {
  if (loading) return <Skeleton className="h-48 w-full" />;
  if (!data || data.length === 0) return <div className="text-sm text-muted-foreground/60 py-8 text-center">Нет данных</div>;

  const chartData = data.map(d => ({
    date: d.date,
    label: format(parseISO(d.date), "d MMM", { locale: ru }),
    visitors: d.visitors,
    views: d.page_views,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary) / 0.5)" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="hsl(var(--primary) / 0.5)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="label" fontSize={11} stroke="hsl(var(--muted-foreground))" tickLine={false} />
        <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
        <RechartsTooltip
          contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value: number, name: string) => [value, name === "visitors" ? "Посетители" : "Просмотры"]}
        />
        <Area type="monotone" dataKey="views" stroke="hsl(var(--primary) / 0.4)" fill="url(#colorViews)" strokeWidth={1.5} name="views" />
        <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" fill="url(#colorVisitors)" strokeWidth={2} name="visitors" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function DevicePieChart({ data, loading }: { data: Array<{ device: string; count: number }>; loading: boolean }) {
  if (loading) return <Skeleton className="h-32 w-32 rounded-full mx-auto" />;
  if (!data || data.length === 0) return <div className="text-sm text-muted-foreground/60 py-4 text-center">Нет данных</div>;

  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={120} height={120}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="device" cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: DEVICE_COLORS[i % DEVICE_COLORS.length] }} />
            <DeviceIcon device={d.device} />
            <span className="capitalize">{d.device}</span>
            <span className="text-muted-foreground ml-auto">{total > 0 ? Math.round(d.count / total * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsSection() {
  const [isOpen, setIsOpen] = useState(true);
  const { data, loading, refetch } = useAnalytics();

  const visitorsTrend = data.visitors_today > data.visitors_yesterday ? "up" : data.visitors_today < data.visitors_yesterday ? "down" : "neutral";

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Аналитика и активность
                <span className="text-xs font-normal text-muted-foreground ml-2">за 7 дней</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    refetch();
                  }}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                </Button>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Real-time */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Radio className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">В реальном времени</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold">{loading ? "..." : data.online_now}</div>
                  <div className="text-sm text-muted-foreground">Сейчас на сайте</div>
                </div>
                {data.active_pages.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Просматривают:</div>
                    {data.active_pages.slice(0, 3).map((p, i) => (
                      <div key={i} className="text-sm truncate">
                        {formatPagePath(p.page_path)} ({p.viewers})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Key conversion metrics */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Ключевые показатели
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard
                  title="Конверсия"
                  value={`${data.conversion_rate}%`}
                  icon={Target}
                  tooltip="Процент посетителей, оставивших заявку за последние 7 дней"
                  subtitle={`${data.leads_7d} заявок за 7д`}
                  loading={loading}
                  accent
                />
                <MetricCard
                  title="Отказы"
                  value={`${data.bounce_rate}%`}
                  icon={MousePointerClick}
                  tooltip="Процент сессий, где посетитель посмотрел только 1 страницу и ушёл"
                  loading={loading}
                />
                <MetricCard
                  title="Стр/сессия"
                  value={data.pages_per_session}
                  icon={Layers}
                  tooltip="Сколько страниц в среднем просматривает посетитель за одну сессию"
                  loading={loading}
                />
                <MetricCard
                  title="Ср. сессия"
                  value={formatDuration(data.avg_session_duration)}
                  icon={Clock}
                  tooltip="Среднее время, которое посетитель проводит на сайте"
                  loading={loading}
                />
              </div>
            </div>

            {/* Daily chart */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Динамика за 14 дней
                <InfoTooltip text="График посетителей и просмотров по дням" />
              </h4>
              <DailyChart data={data.daily_visitors} loading={loading} />
            </div>

            {/* Traffic metrics */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Трафик
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard
                  title="Всего посетителей"
                  value={data.total_visitors}
                  icon={Users}
                  tooltip="Уникальные посетители за всё время"
                  loading={loading}
                />
                <MetricCard
                  title="Сегодня"
                  value={data.visitors_today}
                  icon={Users}
                  subtitle={`Вчера: ${data.visitors_yesterday}`}
                  trend={visitorsTrend}
                  loading={loading}
                />
                <MetricCard
                  title="За 7 дней"
                  value={data.unique_visitors_7d}
                  icon={Users}
                  tooltip="Уникальные посетители за последнюю неделю"
                  loading={loading}
                />
                <MetricCard
                  title="Просмотры"
                  value={data.total_page_views}
                  icon={Eye}
                  subtitle={`Сегодня: ${data.page_views_today}`}
                  loading={loading}
                />
              </div>
            </div>

            {/* Top pages with unique sessions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ListSection
                title="Популярные страницы"
                items={data.top_pages}
                labelKey="page_path"
                valueKey="views"
                icon={Eye}
                loading={loading}
                tooltip="Просмотры страниц за 7 дней. В скобках — % от общего числа"
              />
              <ListSection
                title="Точки входа"
                items={data.entry_pages}
                labelKey="entry_page"
                valueKey="count"
                icon={LogIn}
                loading={loading}
                tooltip="На какую страницу попадают посетители первой"
              />
              <ListSection
                title="Точки выхода"
                items={data.exit_pages}
                labelKey="exit_page"
                valueKey="count"
                icon={LogOutIcon}
                loading={loading}
                tooltip="С какой страницы посетители уходят с сайта"
              />
            </div>

            {/* Sources & Devices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <Globe className="w-4 h-4" />
                    Источники трафика
                    <InfoTooltip text="Откуда приходят посетители. Для отслеживания рекламы используйте UTM-метки в ссылках" />
                  </div>
                  {loading ? (
                    [1, 2, 3].map((i) => <Skeleton key={i} className="h-8 w-full" />)
                  ) : !data.traffic_sources || data.traffic_sources.length === 0 ? (
                    <div className="text-sm text-muted-foreground/60 py-2">Нет данных</div>
                  ) : (() => {
                    const total = data.traffic_sources.reduce((s, d) => s + d.count, 0);
                    const maxVal = Math.max(...data.traffic_sources.map(d => d.count));
                    return data.traffic_sources.slice(0, 7).map((item, idx) => {
                      const pct = maxVal > 0 ? (item.count / maxVal) * 100 : 0;
                      const share = total > 0 ? Math.round(item.count / total * 100) : 0;
                      const desc = getSourceDescription(item.source);
                      return (
                        <TooltipProvider key={idx}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="relative cursor-help">
                                <div className="absolute inset-0 bg-primary/10 rounded" style={{ width: `${pct}%` }} />
                                <div className="relative flex items-center justify-between py-1.5 px-2 text-sm">
                                  <span className="truncate font-medium">{formatSource(item.source)}</span>
                                  <span className="font-medium ml-2 flex items-center gap-1.5">
                                    {item.count}
                                    <span className="text-xs text-muted-foreground">({share}%)</span>
                                  </span>
                                </div>
                              </div>
                            </TooltipTrigger>
                            {desc && (
                              <TooltipContent side="left" className="max-w-[250px] text-xs">
                                {desc}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      );
                    });
                  })()}
                  <div className="pt-2 border-t border-border/30 mt-3">
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
                      💡 Чтобы отслеживать Яндекс.Директ, добавьте в ссылку: <code className="bg-muted px-1 rounded text-[10px]">?utm_source=yandex-direct</code>
                    </p>
                  </div>
                </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                  <Monitor className="w-4 h-4" />
                  Устройства
                  <InfoTooltip text="Распределение посетителей по типам устройств за 7 дней" />
                </div>
                <DevicePieChart data={data.devices} loading={loading} />
              </div>

              <ListSection
                title="Браузеры"
                items={data.browsers}
                labelKey="browser"
                valueKey="count"
                icon={Globe}
                loading={loading}
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
