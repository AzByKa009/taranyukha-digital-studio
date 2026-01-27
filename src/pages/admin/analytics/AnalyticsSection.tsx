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
  LogIn,
  LogOut as LogOutIcon,
  Radio
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}с`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}м ${secs}с`;
}

function formatPagePath(path: string): string {
  if (path === "/") return "Главная";
  return path.replace(/^\//, "").replace(/-/g, " ");
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  subtitle,
  loading 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  subtitle?: string;
  loading?: boolean;
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
    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
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
  loading 
}: { 
  title: string; 
  items: Array<Record<string, unknown>>; 
  valueKey: string; 
  labelKey: string;
  icon: React.ElementType;
  loading?: boolean;
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

  const maxValue = Math.max(...items.map((item) => Number(item[valueKey]) || 0));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      {items.slice(0, 5).map((item, idx) => {
        const value = Number(item[valueKey]) || 0;
        const label = String(item[labelKey] || "");
        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
        
        return (
          <div key={idx} className="relative">
            <div 
              className="absolute inset-0 bg-primary/10 rounded"
              style={{ width: `${percentage}%` }}
            />
            <div className="relative flex items-center justify-between py-1.5 px-2 text-sm">
              <span className="truncate">{formatPagePath(label)}</span>
              <span className="font-medium ml-2">{value}</span>
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

export default function AnalyticsSection() {
  const [isOpen, setIsOpen] = useState(true);
  const { data, loading, refetch } = useAnalytics();

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Аналитика и активность
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
                  loading={loading}
                />
                <MetricCard
                  title="Сегодня"
                  value={data.visitors_today}
                  icon={Users}
                  subtitle={`Вчера: ${data.visitors_yesterday}`}
                  loading={loading}
                />
                <MetricCard
                  title="Просмотры"
                  value={data.total_page_views}
                  icon={Eye}
                  subtitle={`Сегодня: ${data.page_views_today}`}
                  loading={loading}
                />
                <MetricCard
                  title="Ср. сессия"
                  value={formatDuration(data.avg_session_duration)}
                  icon={Clock}
                  loading={loading}
                />
              </div>
            </div>

            {/* Behavior & Sources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ListSection
                title="Популярные страницы"
                items={data.top_pages}
                labelKey="page_path"
                valueKey="views"
                icon={Eye}
                loading={loading}
              />
              <ListSection
                title="Точки входа"
                items={data.entry_pages}
                labelKey="entry_page"
                valueKey="count"
                icon={LogIn}
                loading={loading}
              />
              <ListSection
                title="Точки выхода"
                items={data.exit_pages}
                labelKey="exit_page"
                valueKey="count"
                icon={LogOutIcon}
                loading={loading}
              />
            </div>

            {/* Sources & Devices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ListSection
                title="Источники трафика"
                items={data.traffic_sources}
                labelKey="source"
                valueKey="count"
                icon={Globe}
                loading={loading}
              />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                  <Monitor className="w-4 h-4" />
                  Устройства
                </div>
                {loading ? (
                  [1, 2].map((i) => <Skeleton key={i} className="h-8 w-full" />)
                ) : data.devices.length === 0 ? (
                  <div className="text-sm text-muted-foreground/60 py-2">Нет данных</div>
                ) : (
                  data.devices.map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded bg-muted/30">
                      <div className="flex items-center gap-2">
                        <DeviceIcon device={d.device} />
                        <span className="text-sm capitalize">{d.device}</span>
                      </div>
                      <span className="font-medium text-sm">{d.count}</span>
                    </div>
                  ))
                )}
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
