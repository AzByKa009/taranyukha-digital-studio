import { ReactNode, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";
import { Settings, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EditableSectionProps {
  id: string;
  name: string;
  children: ReactNode;
  className?: string;
  isVisible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  onDelete?: () => void;
  sortOrder?: number;
}

export function EditableSection({
  id,
  name,
  children,
  className,
  isVisible = true,
  onVisibilityChange,
  onDelete,
}: EditableSectionProps) {
  const { isAdmin, mode, hoveredElement, setHoveredElement } = useAdmin();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!isAdmin) {
    return <>{children}</>;
  }

  const isHovered = hoveredElement === `section-${id}`;

  if (mode === "structure") {
    return (
      <div
        className={cn(
          "relative border rounded-xl transition-all duration-200",
          isVisible ? "border-border" : "border-dashed border-muted-foreground/30 opacity-50",
          isHovered && "border-primary"
        )}
        onMouseEnter={() => setHoveredElement(`section-${id}`)}
        onMouseLeave={() => setHoveredElement(null)}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 p-4 bg-card/50 border-b border-border rounded-t-xl">
          <div className="flex items-center gap-3">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onVisibilityChange?.(!isVisible)}
            >
              {isVisible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Настройки секции: {name}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="visibility">Видимость</Label>
                    <Switch
                      id="visibility"
                      checked={isVisible}
                      onCheckedChange={onVisibilityChange}
                    />
                  </div>
                  {onDelete && (
                    <Button
                      variant="destructive"
                      onClick={onDelete}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить секцию
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Section Preview */}
        <div className="p-4 overflow-hidden max-h-[300px]">
          <div className="transform scale-[0.5] origin-top-left w-[200%] pointer-events-none">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Visual mode
  return (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setHoveredElement(`section-${id}`)}
      onMouseLeave={() => setHoveredElement(null)}
    >
      {/* Section indicator */}
      {isHovered && (
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary rounded-full" />
      )}
      
      {/* Section label and controls */}
      {isHovered && (
        <div className="absolute -left-4 -top-10 flex items-center gap-2 z-50">
          <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-lg">
            {name}
          </span>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button size="sm" variant="secondary" className="shadow-lg">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Настройки: {name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visibility">Видимость</Label>
                  <Switch
                    id="visibility"
                    checked={isVisible}
                    onCheckedChange={onVisibilityChange}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {children}
    </div>
  );
}
