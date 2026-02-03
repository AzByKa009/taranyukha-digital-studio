import { useAdmin, AdminMode } from "@/contexts/AdminContext";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { 
  Eye, 
  Layers, 
  Save, 
  X, 
  LogOut,
  Loader2,
  Monitor,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function AdminToolbar() {
  const { mode, setMode, pendingChanges, saveChanges, discardChanges, isSaving } = useAdmin();
  const { signOut } = useAuth();

  const hasChanges = pendingChanges.size > 0;

  const handleSave = async () => {
    await saveChanges();
    toast.success("Изменения сохранены");
  };

  const handleDiscard = () => {
    discardChanges();
    toast.info("Изменения отменены");
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const modes: { id: AdminMode; label: string; icon: typeof Eye }[] = [
    { id: "visual", label: "Визуальный", icon: Eye },
    { id: "structure", label: "Структура", icon: Layers },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-14 gap-4">
        {/* Left - Logo and Mode Switcher */}
        <div className="flex items-center gap-6">
          <Link to="/admin" className="flex items-center gap-2 font-display font-semibold">
            <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AT</span>
            </div>
            <span className="hidden sm:inline">Редактор</span>
          </Link>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                  mode === m.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <m.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center - Status */}
        {hasChanges && (
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              {pendingChanges.size} несохранённых изменений
            </span>
          </div>
        )}

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden md:inline">Просмотр сайта</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>

          {hasChanges && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDiscard}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                <span className="hidden md:inline">Отменить</span>
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span className="hidden md:inline">Сохранить</span>
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
