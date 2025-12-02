import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useClickTracking, useScrollTracking } from "@/lib/mixpanel";
import NotFound from "@/pages/not-found";

import { ProductLandingPage } from "@/pages/ProductLandingPage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={ProductLandingPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Global analytics tracking component
function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useClickTracking();  // Track all clicks for heatmap
  useScrollTracking(); // Track scroll depth milestones
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnalyticsProvider>
          <Toaster />
          <Router />
        </AnalyticsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
