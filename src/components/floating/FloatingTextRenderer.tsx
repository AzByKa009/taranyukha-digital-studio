import { useFloatingTexts } from "@/hooks/useFloatingTexts";
import { useLocation } from "react-router-dom";

export function FloatingTextRenderer() {
  const location = useLocation();
  const { data: texts = [] } = useFloatingTexts(location.pathname);

  if (texts.length === 0) return null;

  return (
    <>
      {texts.map((text) => (
        <div
          key={text.id}
          className="fixed pointer-events-none select-none"
          style={{
            left: `${text.position_x}%`,
            top: `${text.position_y}%`,
            transform: "translate(-50%, -50%)",
            fontSize: `${text.font_size}px`,
            fontWeight: text.font_weight,
            color: text.color,
            backgroundColor: text.background_color || "transparent",
            padding: text.background_color ? "8px 16px" : 0,
            borderRadius: text.background_color ? "8px" : 0,
            zIndex: text.z_index,
            whiteSpace: "pre-wrap",
            textAlign: "center",
          }}
        >
          {text.content}
        </div>
      ))}
    </>
  );
}
