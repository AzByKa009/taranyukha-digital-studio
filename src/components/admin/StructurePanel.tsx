import { Eye, EyeOff, GripVertical, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Section {
  id: string;
  name: string;
}

interface StructurePanelProps {
  sections: Section[];
  visibility: Record<string, boolean>;
  onVisibilityChange: (id: string, visible: boolean) => void;
  onReorder?: (sections: Section[]) => void;
}

export function StructurePanel({
  sections,
  visibility,
  onVisibilityChange,
}: StructurePanelProps) {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-2">Структура страницы</h1>
        <p className="text-muted-foreground">
          Управляйте секциями, порядком и видимостью элементов
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/admin/services">
          <div className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors">
            <h3 className="font-medium mb-1">Услуги</h3>
            <p className="text-xs text-muted-foreground">Управление услугами</p>
          </div>
        </Link>
        <Link to="/admin/cases">
          <div className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors">
            <h3 className="font-medium mb-1">Кейсы</h3>
            <p className="text-xs text-muted-foreground">Портфолио работ</p>
          </div>
        </Link>
        <Link to="/admin/products">
          <div className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors">
            <h3 className="font-medium mb-1">AI Продукты</h3>
            <p className="text-xs text-muted-foreground">Каталог продуктов</p>
          </div>
        </Link>
        <Link to="/admin/settings">
          <div className="p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors">
            <h3 className="font-medium mb-1">Настройки</h3>
            <p className="text-xs text-muted-foreground">Контакты, SEO</p>
          </div>
        </Link>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        <h2 className="text-lg font-display font-semibold mb-4">Секции главной страницы</h2>
        {sections.map((section, index) => {
          const isVisible = visibility[section.id] !== false;
          return (
            <div
              key={section.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all",
                isVisible
                  ? "border-border bg-card/50"
                  : "border-dashed border-muted-foreground/30 bg-card/20 opacity-60"
              )}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab shrink-0" />
              
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-primary/50 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{section.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onVisibilityChange(section.id, !isVisible)}
                  className={cn(!isVisible && "text-muted-foreground")}
                >
                  {isVisible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Button */}
      <Button variant="outline" className="w-full mt-4 gap-2">
        <Plus className="h-4 w-4" />
        Добавить секцию
      </Button>
    </div>
  );
}
