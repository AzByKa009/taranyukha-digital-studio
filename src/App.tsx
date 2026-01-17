import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HeroSkeleton } from "@/components/ui/section-skeleton";

// Eager load main pages for better UX
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load other pages
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const AIProducts = lazy(() => import("./pages/AIProducts"));
const AIAudit = lazy(() => import("./pages/AIAudit"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Calculator = lazy(() => import("./pages/Calculator"));

// Lazy load SEO Landing Pages
const ReelsMontage = lazy(() => import("./pages/landings/ReelsMontage"));
const ReelsProducer = lazy(() => import("./pages/landings/ReelsProducer"));
const AIBotCreation = lazy(() => import("./pages/landings/AIBotCreation"));
const WebsiteForServices = lazy(() => import("./pages/landings/WebsiteForServices"));

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:slug" element={<CaseDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/ai-products" element={<AIProducts />} />
            <Route path="/ai-audit" element={<AIAudit />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calculator" element={<Calculator />} />
            {/* SEO Landing Pages */}
            <Route path="/montazh-reels" element={<ReelsMontage />} />
            <Route path="/produser-reels" element={<ReelsProducer />} />
            <Route path="/ai-bot-dlya-biznesa" element={<AIBotCreation />} />
            <Route path="/razrabotka-sayta-pod-uslugi" element={<WebsiteForServices />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
