import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingTextRenderer } from "@/components/floating/FloatingTextRenderer";
import { CosmicBackground } from "@/components/background/CosmicBackground";

interface LayoutProps {
  children: ReactNode;
}

const BASE_URL = "https://taranukha.dev";

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Scroll to top and update canonical URL on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const canonicalUrl = `${BASE_URL}${location.pathname}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    }
    
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) {
      ogUrl.content = canonicalUrl;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <CosmicBackground />
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <FloatingTextRenderer />
    </div>
  );
}
