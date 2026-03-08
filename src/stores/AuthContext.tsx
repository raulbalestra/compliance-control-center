import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AppUser, UserRole, DEMO_USERS } from "@/types";

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  hasPermission: (module: string, action?: "read" | "write" | "delete") => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["*"],
  coordinator: ["dashboard", "operational", "documents", "upload", "validations", "pending", "exceptions", "clients", "contracts", "sites", "workers", "providers", "subcontractors", "rules", "processes", "reports", "audit", "integrations", "automations"],
  analyst: ["dashboard", "operational", "documents", "upload", "validations", "pending", "exceptions", "reports"],
  provider: ["portal", "portal-documents", "portal-upload"],
  auditor: ["dashboard", "documents", "audit", "reports"],
  viewer: ["dashboard", "documents", "reports"],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem("ica_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("ica_user", JSON.stringify(user));
    else localStorage.removeItem("ica_user");
  }, [user]);

  const login = useCallback((email: string, password: string) => {
    const demo = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (!demo) return { success: false, error: "Invalid credentials" };
    const appUser: AppUser = {
      id: crypto.randomUUID(),
      name: demo.name,
      email: demo.email,
      role: demo.role,
      active: true,
      lastAccess: new Date().toISOString(),
      createdAt: "2024-01-01",
    };
    setUser(appUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ica_user");
  }, []);

  const hasPermission = useCallback((module: string, _action?: "read" | "write" | "delete") => {
    if (!user) return false;
    const perms = ROLE_PERMISSIONS[user.role];
    return perms.includes("*") || perms.includes(module);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
