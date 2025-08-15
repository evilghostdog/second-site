import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route } from "wouter";
import { CartProvider } from "@/contexts/CartContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Route path="/"><Index /></Route>
            <Route path="/shop"><Shop /></Route>
            <Route path="/checkout"><Checkout /></Route>
            <Route path="/order-success"><OrderSuccess /></Route>
            <Route path="/admin"><Admin /></Route>
            {/* Catch-all route for 404 */}
            <Route><NotFound /></Route>
          </Router>
        </TooltipProvider>
      </CartProvider>
    </OnboardingProvider>
  </QueryClientProvider>
);

export default App;
