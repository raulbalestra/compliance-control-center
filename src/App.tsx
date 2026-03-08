import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import DocumentQueue from "@/pages/DocumentQueue";
import Exceptions from "@/pages/Exceptions";
import ClientsContracts from "@/pages/ClientsContracts";
import ComplianceRules from "@/pages/ComplianceRules";
import AuditLogs from "@/pages/AuditLogs";
import Reports from "@/pages/Reports";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/documents" element={<DocumentQueue />} />
              <Route path="/exceptions" element={<Exceptions />} />
              <Route path="/clients" element={<ClientsContracts />} />
              <Route path="/rules" element={<ComplianceRules />} />
              <Route path="/audit" element={<AuditLogs />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
