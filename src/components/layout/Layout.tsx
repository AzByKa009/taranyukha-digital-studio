import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCanonicalUrl } from "@/hooks/useCanonicalUrl";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Update canonical URL on route change
  useCanonicalUrl();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
