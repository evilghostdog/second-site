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
import Lab from "./pages/Lab";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Route path="/" component={Index} />
            <Route path="/shop" component={Shop} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/order-success" component={OrderSuccess} />
            <Route path="/admin" component={Admin} />
            <Route path="/lab" component={Lab} />
            <Route path="/lab/*" component={Lab} />
            <Route path="/*" component={NotFound} />
          </Router>
        </TooltipProvider>
      </CartProvider>
    </OnboardingProvider>
  </QueryClientProvider>
);

export default App;
