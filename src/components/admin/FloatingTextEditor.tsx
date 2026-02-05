import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Plus, 
  Trash2, 
  Move, 
  Type, 
  Eye, 
  EyeOff,
  X,
  GripVertical,
  Palette
} from "lucide-react";
import { 
  FloatingText, 
  useFloatingTexts, 
  useCreateFloatingText, 
  useUpdateFloatingText, 
  useDeleteFloatingText 
} from "@/hooks/useFloatingTexts";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PAGES = [
  { value: "/", label: "Главная" },
  { value: "/services", label: "Услуги" },
  { value: "/cases", label: "Кейсы" },
  { value: "/ai-products", label: "AI-Продукты" },
  { value: "/about", label: "Обо мне" },
  { value: "/blog", label: "Блог" },
  { value: "/contacts", label: "Контакты" },
];

const FONT_WEIGHTS = [
  { value: "normal", label: "Обычный" },
  { value: "medium", label: "Средний" },
  { value: "semibold", label: "Полужирный" },
  { value: "bold", label: "Жирный" },
];

const PRESET_COLORS = [
  "#FFFFFF", "#000000", "#7C3AED", "#8B5CF6", "#A78BFA",
  "#EF4444", "#F97316", "#EAB308", "#22C55E", "#06B6D4",
  "#3B82F6", "#EC4899", "#F43F5E", "#14B8A6", "#6366F1"
];

export function FloatingTextEditor() {
  const { data: texts = [], isLoading } = useFloatingTexts();
  const createMutation = useCreateFloatingText();
  const updateMutation = useUpdateFloatingText();
  const deleteMutation = useDeleteFloatingText();

  const [selectedText, setSelectedText] = useState<FloatingText | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dragMode, setDragMode] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState("/");

  const handleCreate = async () => {
    try {
      await createMutation.mutateAsync({
        page_path: previewPage,
        content: "Новый текст",
        position_x: 50,
        position_y: 50,
      });
      toast.success("Текст добавлен");
    } catch {
      toast.error("Ошибка при создании");
    }
  };

  const handleUpdate = async (id: string, data: Partial<FloatingText>) => {
    try {
      await updateMutation.mutateAsync({ id, ...data });
    } catch {
      toast.error("Ошибка при обновлении");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот текст?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Текст удалён");
      setEditDialogOpen(false);
      setSelectedText(null);
    } catch {
      toast.error("Ошибка при удалении");
    }
  };

  const filteredTexts = texts.filter(t => t.page_path === previewPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Плавающие тексты</h2>
          <p className="text-white/60 text-sm mt-1">
            Добавляйте текст в любое место страницы
          </p>
        </div>
        <Button onClick={handleCreate} disabled={createMutation.isPending}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить текст
        </Button>
      </div>

      {/* Page selector */}
      <div className="flex items-center gap-4">
        <Label className="text-white/80">Страница:</Label>
        <Select value={previewPage} onValueChange={setPreviewPage}>
          <SelectTrigger className="w-48 bg-white/5 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGES.map(page => (
              <SelectItem key={page.value} value={page.value}>
                {page.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Visual Preview with live site iframe */}
      <div className="relative rounded-xl border border-white/10 overflow-hidden" style={{ height: "70vh" }}>
        {/* Live site iframe */}
        <iframe
          src={previewPage}
          className="absolute inset-0 w-full h-full pointer-events-none"
          title="Site Preview"
          style={{ 
            transform: "scale(1)",
            transformOrigin: "top left",
          }}
        />
        
        {/* Overlay for interactions */}
        <div className="absolute inset-0 bg-transparent">
          {/* Text elements */}
          {filteredTexts.map(text => (
            <DraggableText
              key={text.id}
              text={text}
              isActive={dragMode === text.id}
              onDragStart={() => setDragMode(text.id)}
              onDragEnd={(x, y) => {
                setDragMode(null);
                handleUpdate(text.id, { position_x: x, position_y: y });
              }}
              onEdit={() => {
                setSelectedText(text);
                setEditDialogOpen(true);
              }}
            />
          ))}

          {/* Empty state */}
          {filteredTexts.length === 0 && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="text-center">
                <Type className="w-12 h-12 mx-auto mb-2 text-white/50" />
                <p className="text-white/60">Нет текстов на этой странице</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={handleCreate}>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить первый
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Page indicator badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 text-white text-sm font-medium z-10">
          Превью: {PAGES.find(p => p.value === previewPage)?.label}
        </div>
        
        {/* Instruction badge */}
        <div className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 text-white/70 text-xs z-10">
          💡 Перетаскивайте тексты мышкой • Двойной клик для редактирования • Изменения сохраняются автоматически
        </div>
      </div>

      {/* Text list */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">Все тексты на странице</h3>
        {filteredTexts.map(text => (
          <div
            key={text.id}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div 
              className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0"
              style={{ backgroundColor: text.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-white truncate">{text.content}</p>
              <p className="text-white/40 text-sm">
                Позиция: {Math.round(text.position_x)}%, {Math.round(text.position_y)}%
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleUpdate(text.id, { is_visible: !text.is_visible })}
              >
                {text.is_visible ? (
                  <Eye className="w-4 h-4 text-green-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-white/40" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedText(text);
                  setEditDialogOpen(true);
                }}
              >
                <Palette className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(text.id)}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-background border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle>Редактировать текст</DialogTitle>
          </DialogHeader>
          {selectedText && (
            <TextEditForm
              text={selectedText}
              onUpdate={(data) => handleUpdate(selectedText.id, data)}
              onDelete={() => handleDelete(selectedText.id)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Draggable text component for the preview
function DraggableText({
  text,
  isActive,
  onDragStart,
  onDragEnd,
  onEdit,
}: {
  text: FloatingText;
  isActive: boolean;
  onDragStart: () => void;
  onDragEnd: (x: number, y: number) => void;
  onEdit: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: text.position_x, y: text.position_y });

  useEffect(() => {
    setPosition({ x: text.position_x, y: text.position_y });
  }, [text.position_x, text.position_y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    onDragStart();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current?.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setPosition({ x, y });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd(position.x, position.y);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, onDragEnd]);

  return (
    <div
      ref={containerRef}
      className={`absolute cursor-move group ${isDragging ? "z-50" : ""}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        opacity: text.is_visible ? 1 : 0.4,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onEdit}
    >
      <div
        className={`relative px-3 py-2 rounded-lg transition-all ${
          isDragging ? "ring-2 ring-violet-500 scale-105" : "group-hover:ring-2 group-hover:ring-white/30"
        }`}
        style={{
          fontSize: `${Math.max(12, text.font_size * 0.6)}px`,
          fontWeight: text.font_weight,
          color: text.color,
          backgroundColor: text.background_color || "rgba(0,0,0,0.5)",
        }}
      >
        <GripVertical className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        {text.content.slice(0, 30)}{text.content.length > 30 ? "..." : ""}
      </div>
    </div>
  );
}

// Edit form component
function TextEditForm({
  text,
  onUpdate,
  onDelete,
}: {
  text: FloatingText;
  onUpdate: (data: Partial<FloatingText>) => void;
  onDelete: () => void;
}) {
  const [content, setContent] = useState(text.content);
  const [color, setColor] = useState(text.color);
  const [bgColor, setBgColor] = useState(text.background_color || "");
  const [fontSize, setFontSize] = useState(text.font_size);
  const [fontWeight, setFontWeight] = useState(text.font_weight);
  const [zIndex, setZIndex] = useState(text.z_index);

  return (
    <div className="space-y-6">
      {/* Content */}
      <div className="space-y-2">
        <Label>Текст</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => onUpdate({ content })}
          className="bg-white/5 border-white/10 min-h-24"
          placeholder="Введите текст..."
        />
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <Label>Цвет текста</Label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 flex-wrap">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  color === c ? "border-white scale-110" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => {
                  setColor(c);
                  onUpdate({ color: c });
                }}
              />
            ))}
          </div>
          <Input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              onUpdate({ color: e.target.value });
            }}
            className="w-10 h-8 p-0 border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Фон</Label>
          {bgColor && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setBgColor("");
                onUpdate({ background_color: null });
              }}
            >
              <X className="w-3 h-3 mr-1" />
              Убрать
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 flex-wrap">
            {PRESET_COLORS.slice(0, 10).map(c => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  bgColor === c ? "border-white scale-110" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => {
                  setBgColor(c);
                  onUpdate({ background_color: c });
                }}
              />
            ))}
          </div>
          <Input
            type="color"
            value={bgColor || "#000000"}
            onChange={(e) => {
              setBgColor(e.target.value);
              onUpdate({ background_color: e.target.value });
            }}
            className="w-10 h-8 p-0 border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <Label>Размер шрифта: {fontSize}px</Label>
        <Slider
          value={[fontSize]}
          onValueChange={([v]) => setFontSize(v)}
          onValueCommit={([v]) => onUpdate({ font_size: v })}
          min={12}
          max={72}
          step={1}
        />
      </div>

      {/* Font Weight */}
      <div className="space-y-2">
        <Label>Толщина шрифта</Label>
        <Select
          value={fontWeight}
          onValueChange={(v) => {
            setFontWeight(v);
            onUpdate({ font_weight: v });
          }}
        >
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_WEIGHTS.map(w => (
              <SelectItem key={w.value} value={w.value}>
                {w.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Z-Index */}
      <div className="space-y-2">
        <Label>Слой (z-index): {zIndex}</Label>
        <Slider
          value={[zIndex]}
          onValueChange={([v]) => setZIndex(v)}
          onValueCommit={([v]) => onUpdate({ z_index: v })}
          min={1}
          max={100}
          step={1}
        />
      </div>

      {/* Page */}
      <div className="space-y-2">
        <Label>Страница</Label>
        <Select
          value={text.page_path}
          onValueChange={(v) => onUpdate({ page_path: v })}
        >
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGES.map(p => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Delete */}
      <Button variant="destructive" className="w-full" onClick={onDelete}>
        <Trash2 className="w-4 h-4 mr-2" />
        Удалить текст
      </Button>
    </div>
  );
}
