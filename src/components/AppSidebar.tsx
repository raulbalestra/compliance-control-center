import {
  LayoutDashboard, FileStack, AlertTriangle, Building2, ShieldCheck,
  ScrollText, BarChart3, Settings, Bot, X, Globe, Upload, CheckSquare,
  Clock, Users, MapPin, Briefcase, Building, Zap, Wifi, FolderOpen,
  UserCog, Shield, FileType, Sliders, ExternalLink, Activity,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/stores/AuthContext";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale, toggleLocale } = useLanguage();
  const { user, logout } = useAuth();
  const pt = locale === "pt-BR";

  const sections = [
    {
      label: pt ? "Visão Geral" : "Overview",
      items: [
        { title: pt ? "Dashboard Executivo" : "Executive Dashboard", url: "/", icon: LayoutDashboard },
        { title: pt ? "Dashboard Operacional" : "Operational Dashboard", url: "/operational", icon: Activity },
      ],
    },
    {
      label: pt ? "Documentos" : "Documents",
      items: [
        { title: pt ? "Fila de Documentos" : "Document Queue", url: "/documents", icon: FileStack },
        { title: "Upload", url: "/upload", icon: Upload },
        { title: pt ? "Validações" : "Validations", url: "/validations", icon: CheckSquare },
        { title: pt ? "Pendências" : "Pending", url: "/pending", icon: Clock },
        { title: pt ? "Exceções" : "Exceptions", url: "/exceptions", icon: AlertTriangle },
      ],
    },
    {
      label: pt ? "Cadastros" : "Registry",
      items: [
        { title: pt ? "Clientes" : "Clients", url: "/clients", icon: Building2 },
        { title: pt ? "Contratos" : "Contracts", url: "/contracts", icon: Briefcase },
        { title: "Sites", url: "/sites", icon: MapPin },
        { title: pt ? "Colaboradores" : "Workers", url: "/workers", icon: Users },
        { title: pt ? "Prestadores" : "Providers", url: "/providers", icon: Building },
        { title: pt ? "Subcontratadas" : "Subcontractors", url: "/subcontractors", icon: Building },
      ],
    },
    {
      label: pt ? "Regras & Processos" : "Rules & Processes",
      items: [
        { title: pt ? "Regras" : "Rules", url: "/rules", icon: ShieldCheck },
        { title: pt ? "Processos" : "Processes", url: "/processes", icon: FolderOpen },
        { title: pt ? "Integrações" : "Integrations", url: "/integrations", icon: Wifi },
        { title: pt ? "Automações" : "Automations", url: "/automations", icon: Zap },
      ],
    },
    {
      label: pt ? "Relatórios" : "Reports",
      items: [
        { title: pt ? "Relatórios" : "Reports", url: "/reports", icon: BarChart3 },
        { title: pt ? "Auditoria" : "Audit Logs", url: "/audit", icon: ScrollText },
      ],
    },
    {
      label: pt ? "Administração" : "Administration",
      items: [
        { title: pt ? "Usuários" : "Users", url: "/admin/users", icon: UserCog },
        { title: pt ? "Perfis" : "Roles", url: "/admin/roles", icon: Shield },
        { title: pt ? "Tipos de Documento" : "Doc Types", url: "/admin/doc-types", icon: FileType },
        { title: pt ? "Config. Sistema" : "System Settings", url: "/admin/settings", icon: Sliders },
        { title: pt ? "Configurações" : "Settings", url: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] border-r border-[hsl(var(--sidebar-border))] transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-14 flex items-center justify-between px-5 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><Bot className="w-4.5 h-4.5 text-primary-foreground" /></div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[hsl(0,0%,95%)]">ICA</span>
              <span className="text-[10px] text-[hsl(var(--sidebar-fg))] opacity-60 leading-none">{pt ? "Agente de Conformidade" : "Compliance Agent"}</span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1 hover:bg-[hsl(var(--sidebar-hover))] rounded"><X className="w-4 h-4 text-[hsl(var(--sidebar-fg))]" /></button>
        </div>

        <nav className="flex-1 py-2 px-3 overflow-y-auto space-y-3">
          {sections.map(section => (
            <div key={section.label}>
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-fg))] opacity-40">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const isActive = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
                  return (
                    <NavLink key={item.url} to={item.url} end={item.url === "/"} onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-xs transition-colors ${isActive ? "" : "text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-[hsl(0,0%,90%)]"}`}
                      activeClassName="bg-[hsl(var(--sidebar-active))] text-[hsl(0,0%,100%)] font-medium">
                      <item.icon className="w-3.5 h-3.5 shrink-0" /><span>{item.title}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 py-2 space-y-1 border-t border-[hsl(var(--sidebar-border))]">
          <button onClick={toggleLocale} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-xs text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover))] transition-colors">
            <Globe className="w-3.5 h-3.5 shrink-0" /><span>{locale === "en" ? "Português (BR)" : "English"}</span>
          </button>
          {user && (
            <div className="flex items-center justify-between px-3 py-1.5">
              <div><p className="text-[10px] font-medium text-[hsl(0,0%,90%)]">{user.name}</p><p className="text-[9px] text-[hsl(var(--sidebar-fg))] opacity-50">{user.role}</p></div>
              <button onClick={() => { logout(); navigate("/login"); }} className="text-[10px] text-destructive hover:underline">{pt ? "Sair" : "Logout"}</button>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
            <span className="text-[10px] text-[hsl(var(--sidebar-fg))] opacity-60">{pt ? "Agente Online" : "Agent Online"}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
