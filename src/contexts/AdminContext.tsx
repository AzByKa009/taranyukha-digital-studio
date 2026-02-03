import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type AdminMode = "visual" | "structure";

interface EditableElement {
  id: string;
  type: "text" | "image" | "section" | "button" | "link";
  path: string;
  value: any;
}

interface AdminContextType {
  isAdmin: boolean;
  mode: AdminMode;
  setMode: (mode: AdminMode) => void;
  selectedElement: EditableElement | null;
  setSelectedElement: (element: EditableElement | null) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  hoveredElement: string | null;
  setHoveredElement: (id: string | null) => void;
  pendingChanges: Map<string, any>;
  setPendingChange: (path: string, value: any) => void;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
  isSaving: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AdminMode>("visual");
  const [selectedElement, setSelectedElement] = useState<EditableElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Map<string, any>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

  const setPendingChange = useCallback((path: string, value: any) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(path, value);
      return next;
    });
  }, []);

  const saveChanges = useCallback(async () => {
    setIsSaving(true);
    try {
      // Save all pending changes to Supabase
      // This will be implemented in individual editable components
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPendingChanges(new Map());
    } finally {
      setIsSaving(false);
    }
  }, []);

  const discardChanges = useCallback(() => {
    setPendingChanges(new Map());
    setSelectedElement(null);
    setIsEditing(false);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAdmin: true,
        mode,
        setMode,
        selectedElement,
        setSelectedElement,
        isEditing,
        setIsEditing,
        hoveredElement,
        setHoveredElement,
        pendingChanges,
        setPendingChange,
        saveChanges,
        discardChanges,
        isSaving,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
