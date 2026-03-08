import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Menu, Globe, LogOut } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/stores/AuthContext";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 flex items-center justify-between border-b border-border px-4 md:hidden bg-card">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-muted rounded-md">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <span className="ml-3 text-sm font-semibold text-foreground">ICA</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLocale} className="p-1.5 hover:bg-muted rounded-md flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="w-4 h-4" />
              {locale === "en" ? "PT" : "EN"}
            </button>
            <button onClick={() => { logout(); navigate("/login"); }} className="p-1.5 hover:bg-muted rounded-md">
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
