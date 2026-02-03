import { useState, useRef, useEffect, ReactNode } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";
import { Pencil, Check, X } from "lucide-react";

interface EditableTextProps {
  id: string;
  value: string;
  onSave: (value: string) => Promise<void>;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  multiline?: boolean;
  children?: ReactNode;
}

export function EditableText({
  id,
  value,
  onSave,
  className,
  as: Component = "span",
  multiline = false,
  children,
}: EditableTextProps) {
  const { isAdmin, hoveredElement, setHoveredElement, isEditing } = useAdmin();
  const [localEditing, setLocalEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (localEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [localEditing]);

  const handleSave = async () => {
    if (localValue !== value) {
      setIsSaving(true);
      try {
        await onSave(localValue);
      } catch (error) {
        setLocalValue(value);
      } finally {
        setIsSaving(false);
      }
    }
    setLocalEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setLocalEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isAdmin) {
    return <Component className={className}>{children || value}</Component>;
  }

  const isHovered = hoveredElement === id;

  if (localEditing) {
    return (
      <div className="relative inline-flex items-center gap-2">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 min-w-[200px] resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              className
            )}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "bg-primary/10 border border-primary/30 rounded-lg px-3 py-1 min-w-[100px]",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              className
            )}
          />
        )}
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Component
      className={cn(
        className,
        "relative cursor-pointer transition-all duration-200",
        isHovered && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background rounded-lg"
      )}
      onMouseEnter={() => setHoveredElement(id)}
      onMouseLeave={() => setHoveredElement(null)}
      onClick={(e) => {
        e.stopPropagation();
        setLocalEditing(true);
      }}
    >
      {children || value}
      {isHovered && (
        <span className="absolute -top-2 -right-2 p-1 rounded-full bg-primary text-primary-foreground shadow-lg">
          <Pencil className="h-3 w-3" />
        </span>
      )}
    </Component>
  );
}
