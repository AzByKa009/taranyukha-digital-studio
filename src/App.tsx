import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HeroSkeleton } from "@/components/ui/section-skeleton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AuthProvider } from "@/hooks/useAuth";

// Eager load main pages for better UX
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load other pages
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const AIProducts = lazy(() => import("./pages/AIProducts"));
const AIAudit = lazy(() => import("./pages/AIAudit"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Lazy load SEO Landing Pages
const ReelsMontage = lazy(() => import("./pages/landings/ReelsMontage"));
const ReelsProducer = lazy(() => import("./pages/landings/ReelsProducer"));
const AIBotCreation = lazy(() => import("./pages/landings/AIBotCreation"));
const WebsiteForServices = lazy(() => import("./pages/landings/WebsiteForServices"));
const AIVideoProduction = lazy(() => import("./pages/landings/AIVideoProduction"));
const VibeCodingLanding = lazy(() => import("./pages/landings/VibeCodingLanding"));
const AIAutomation = lazy(() => import("./pages/landings/AIAutomation"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminHomepage = lazy(() => import("./pages/admin/AdminHomepage"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminCases = lazy(() => import("./pages/admin/AdminCases"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Admin Layout
import { AdminLayout } from "./pages/admin/AdminLayout";

const queryClient = new QueryClient();

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSkeleton />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsTracker />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/cases/:slug" element={<CaseDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/ai-products" element={<AIProducts />} />
                <Route path="/ai-audit" element={<AIAudit />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* SEO Landing Pages */}
                <Route path="/montazh-reels" element={<ReelsMontage />} />
                <Route path="/produser-reels" element={<ReelsProducer />} />
                <Route path="/ai-bot-dlya-biznesa" element={<AIBotCreation />} />
                <Route path="/razrabotka-sayta-pod-uslugi" element={<WebsiteForServices />} />
                <Route path="/ai-video-production" element={<AIVideoProduction />} />
                <Route path="/vibe-coding" element={<VibeCodingLanding />} />
                <Route path="/ai-automation" element={<AIAutomation />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout><AdminHomepage /></AdminLayout>} />
                <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
                <Route path="/admin/cases" element={<AdminLayout><AdminCases /></AdminLayout>} />
                <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
