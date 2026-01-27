import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HeroSkeleton } from "@/components/ui/section-skeleton";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

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
const Calculator = lazy(() => import("./pages/Calculator"));

// Lazy load SEO Landing Pages
const ReelsMontage = lazy(() => import("./pages/landings/ReelsMontage"));
const ReelsProducer = lazy(() => import("./pages/landings/ReelsProducer"));
const AIBotCreation = lazy(() => import("./pages/landings/AIBotCreation"));
const WebsiteForServices = lazy(() => import("./pages/landings/WebsiteForServices"));
const AIVideoProduction = lazy(() => import("./pages/landings/AIVideoProduction"));
const VibeCodingLanding = lazy(() => import("./pages/landings/VibeCodingLanding"));
const AIAutomation = lazy(() => import("./pages/landings/AIAutomation"));

// Lazy load Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCasesList = lazy(() => import("./pages/admin/cases/AdminCasesList"));
const AdminCaseForm = lazy(() => import("./pages/admin/cases/AdminCaseForm"));
const AdminServicesList = lazy(() => import("./pages/admin/services/AdminServicesList"));
const AdminServiceForm = lazy(() => import("./pages/admin/services/AdminServiceForm"));
const AdminProductsList = lazy(() => import("./pages/admin/products/AdminProductsList"));
const AdminProductForm = lazy(() => import("./pages/admin/products/AdminProductForm"));
const AdminCategoriesList = lazy(() => import("./pages/admin/products/AdminCategoriesList"));
const AdminBlogList = lazy(() => import("./pages/admin/blog/AdminBlogList"));
const AdminBlogForm = lazy(() => import("./pages/admin/blog/AdminBlogForm"));
const AdminSiteSettings = lazy(() => import("./pages/admin/settings/AdminSiteSettings"));
const AdminSEOSettings = lazy(() => import("./pages/admin/settings/AdminSEOSettings"));
const AdminMediaLibrary = lazy(() => import("./pages/admin/media/AdminMediaLibrary"));
const AdminPortfolioList = lazy(() => import("./pages/admin/portfolio/AdminPortfolioList"));
const AdminPortfolioForm = lazy(() => import("./pages/admin/portfolio/AdminPortfolioForm"));
const AdminAITools = lazy(() => import("./pages/admin/ai/AdminAITools"));

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
    <LanguageProvider>
      <AuthProvider>
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
                <Route path="/calculator" element={<Calculator />} />
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
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="cases" element={<AdminCasesList />} />
                  <Route path="cases/new" element={<AdminCaseForm />} />
                  <Route path="cases/:id" element={<AdminCaseForm />} />
                  <Route path="services" element={<AdminServicesList />} />
                  <Route path="services/new" element={<AdminServiceForm />} />
                  <Route path="services/:id" element={<AdminServiceForm />} />
                  <Route path="ai-products" element={<AdminProductsList />} />
                  <Route path="ai-products/new" element={<AdminProductForm />} />
                  <Route path="ai-products/:id" element={<AdminProductForm />} />
                  <Route path="ai-products/categories" element={<AdminCategoriesList />} />
                  <Route path="blog" element={<AdminBlogList />} />
                  <Route path="blog/new" element={<AdminBlogForm />} />
                  <Route path="blog/:id" element={<AdminBlogForm />} />
                  <Route path="portfolio" element={<AdminPortfolioList />} />
                  <Route path="portfolio/new" element={<AdminPortfolioForm />} />
                  <Route path="portfolio/:id" element={<AdminPortfolioForm />} />
                  <Route path="settings" element={<AdminSiteSettings />} />
                  <Route path="seo" element={<AdminSEOSettings />} />
                  <Route path="media" element={<AdminMediaLibrary />} />
                  <Route path="ai-tools" element={<AdminAITools />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
