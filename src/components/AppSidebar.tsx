import {
  LayoutDashboard, FileStack, AlertTriangle, Building2, ShieldCheck,
  ScrollText, BarChart3, Settings, Bot, X, Globe,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const location = useLocation();
  const { t, locale, toggleLocale } = useLanguage();

  const navItems = [
    { title: t.nav.dashboard, url: "/", icon: LayoutDashboard },
    { title: t.nav.documentQueue, url: "/documents", icon: FileStack },
    { title: t.nav.exceptions, url: "/exceptions", icon: AlertTriangle },
    { title: t.nav.clientsContracts, url: "/clients", icon: Building2 },
    { title: t.nav.complianceRules, url: "/rules", icon: ShieldCheck },
    { title: t.nav.auditLogs, url: "/audit", icon: ScrollText },
    { title: t.nav.reports, url: "/reports", icon: BarChart3 },
    { title: t.nav.settings, url: "/settings", icon: Settings },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 flex flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] border-r border-[hsl(var(--sidebar-border))]
        transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-14 flex items-center justify-between px-5 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[hsl(0,0%,95%)]">ICA</span>
              <span className="text-[10px] text-[hsl(var(--sidebar-fg))] opacity-60 leading-none">{t.nav.complianceAgent}</span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1 hover:bg-[hsl(var(--sidebar-hover))] rounded">
            <X className="w-4 h-4 text-[hsl(var(--sidebar-fg))]" />
          </button>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
            return (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === "/"}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive ? "" : "text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-[hsl(0,0%,90%)]"
                }`}
                activeClassName="bg-[hsl(var(--sidebar-active))] text-[hsl(0,0%,100%)] font-medium"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 pb-2">
          <button
            onClick={toggleLocale}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-[hsl(0,0%,90%)] transition-colors"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>{locale === "en" ? "Português (BR)" : "English"}</span>
          </button>
        </div>

        <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
            <span className="text-xs text-[hsl(var(--sidebar-fg))] opacity-60">{t.nav.agentOnline}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
