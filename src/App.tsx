import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Forum from "./pages/Forum";
import Documentation from "./pages/Documentation";
import Backlog from "./pages/Backlog";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sistema" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notificacoes" element={<Notifications />} />
          <Route path="/documentacao" element={<Documentation />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/forum" element={<Forum />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
