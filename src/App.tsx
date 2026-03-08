import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/stores/AuthContext";
import { AppProvider } from "@/stores/AppStore";
import { ProtectedRoute, PortalRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import OperationalDashboard from "@/pages/OperationalDashboard";
import DocumentQueue from "@/pages/DocumentQueue";
import UploadPage from "@/pages/Upload";
import ValidationsPage from "@/pages/Validations";
import PendingPage from "@/pages/Pending";
import Exceptions from "@/pages/Exceptions";
import ClientsPage from "@/pages/Clients";
import ClientDetail from "@/pages/ClientDetail";
import ContractsPage from "@/pages/Contracts";
import ContractDetail from "@/pages/ContractDetail";
import SitesPage from "@/pages/Sites";
import WorkersPage from "@/pages/Workers";
import WorkerDetail from "@/pages/WorkerDetail";
import ProvidersPage from "@/pages/Providers";
import SubcontractorsPage from "@/pages/Subcontractors";
import ComplianceRules from "@/pages/ComplianceRules";
import ProcessesPage from "@/pages/Processes";
import IntegrationsPage from "@/pages/Integrations";
import AutomationsPage from "@/pages/Automations";
import AuditLogs from "@/pages/AuditLogs";
import Reports from "@/pages/Reports";
import SettingsPage from "@/pages/SettingsPage";
import AdminUsers from "@/pages/admin/Users";
import AdminRoles from "@/pages/admin/Roles";
import AdminDocTypes from "@/pages/admin/DocTypes";
import AdminSystemSettings from "@/pages/admin/SystemSettings";
import PortalDashboard from "@/pages/portal/PortalDashboard";
import PortalUpload from "@/pages/portal/PortalUpload";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/operational" element={<OperationalDashboard />} />
                    <Route path="/documents" element={<DocumentQueue />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/validations" element={<ValidationsPage />} />
                    <Route path="/pending" element={<PendingPage />} />
                    <Route path="/exceptions" element={<Exceptions />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/clients/:id" element={<ClientDetail />} />
                    <Route path="/contracts" element={<ContractsPage />} />
                    <Route path="/contracts/:id" element={<ContractDetail />} />
                    <Route path="/sites" element={<SitesPage />} />
                    <Route path="/workers" element={<WorkersPage />} />
                    <Route path="/workers/:id" element={<WorkerDetail />} />
                    <Route path="/providers" element={<ProvidersPage />} />
                    <Route path="/subcontractors" element={<SubcontractorsPage />} />
                    <Route path="/rules" element={<ComplianceRules />} />
                    <Route path="/processes" element={<ProcessesPage />} />
                    <Route path="/integrations" element={<IntegrationsPage />} />
                    <Route path="/automations" element={<AutomationsPage />} />
                    <Route path="/audit" element={<AuditLogs />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/roles" element={<AdminRoles />} />
                    <Route path="/admin/doc-types" element={<AdminDocTypes />} />
                    <Route path="/admin/settings" element={<AdminSystemSettings />} />
                  </Route>
                  <Route element={<PortalRoute />}>
                    <Route path="/portal" element={<PortalDashboard />} />
                    <Route path="/portal/upload" element={<PortalUpload />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
