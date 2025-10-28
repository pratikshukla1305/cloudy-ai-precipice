import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Model from "./pages/Model";
import Predictions from "./pages/Predictions";
import HowItWorks from "./pages/HowItWorks";
import CaseStudies from "./pages/CaseStudies";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/model" element={<Model />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
