import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <>
          <Route path="/">
            {() => <Index />}
          </Route>
          <Route path="/shop">
            {() => <Shop />}
          </Route>
          <Route path="/checkout">
            {() => <Checkout />}
          </Route>
          <Route path="/order-success">
            {() => <OrderSuccess />}
          </Route>
          <Route path="/admin">
            {() => <Admin />}
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route>
            {() => <NotFound />}
          </Route>
        </>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
