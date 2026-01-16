import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import AIProducts from "./pages/AIProducts";
import AIAudit from "./pages/AIAudit";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ReelsMontage from "./pages/landings/ReelsMontage";
import ReelsProducer from "./pages/landings/ReelsProducer";
import AIBotCreation from "./pages/landings/AIBotCreation";
import WebsiteForServices from "./pages/landings/WebsiteForServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;