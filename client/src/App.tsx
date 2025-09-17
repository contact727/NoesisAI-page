import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CalendlyProvider } from "@/contexts/CalendlyContext";
import CalendlyModal from "@/components/CalendlyModal";
import { useCalendlyContext } from "@/contexts/CalendlyContext";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Cases from "@/pages/Cases";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/cases" component={Cases} />
      <Route path="/contact" component={Contact} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { isCalendlyOpen, closeCalendlyModal } = useCalendlyContext();
  
  return (
    <>
      <Toaster />
      <Router />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendlyModal} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CalendlyProvider>
          <AppContent />
        </CalendlyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
