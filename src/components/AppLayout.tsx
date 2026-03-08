import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Menu } from "lucide-react";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="h-12 flex items-center border-b border-border px-4 md:hidden bg-card">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-muted rounded-md">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <span className="ml-3 text-sm font-semibold text-foreground">ICA</span>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
