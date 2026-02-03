import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { AdminToolbar } from "@/components/admin/AdminToolbar";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { mode } = useAdmin();

  return (
    <div className="min-h-screen bg-background">
      <AdminToolbar />
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
