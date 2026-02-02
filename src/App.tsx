import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/onboarding/Welcome";
import NameSelection from "./pages/onboarding/NameSelection";
import IntentionSelection from "./pages/onboarding/IntentionSelection";
import Questionnaire from "./pages/Questionnaire";
import Home from "./pages/Home";
import Pillars from "./pages/Pillars";
import PillarDetail from "./pages/PillarDetail";
import Exercises from "./pages/Exercises";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Onboarding */}
          <Route path="/onboarding" element={<Welcome />} />
          <Route path="/onboarding/name" element={<NameSelection />} />
          <Route path="/onboarding/intention" element={<IntentionSelection />} />
          
          {/* Main App */}
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pillars" element={<Pillars />} />
          <Route path="/pillars/:id" element={<PillarDetail />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
