import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PortalRoute } from "@/components/ProtectedRoute";
import { AuthProvider, useAuth } from "@/stores/AuthContext";
import { LanguageProvider } from "@/i18n/LanguageContext";

beforeEach(() => {
  localStorage.clear();
});

function renderRoute(
  route: string,
  authUser: { role: string; [key: string]: unknown } | null = null
) {
  if (authUser) {
    localStorage.setItem(
      "ica_user",
      JSON.stringify({
        id: "test",
        name: "Test User",
        email: "test@test.com",
        active: true,
        lastAccess: "2024-01-01",
        createdAt: "2024-01-01",
        ...authUser,
      })
    );
  }

  return render(
    <LanguageProvider>
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/" element={<div>Home Page</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            </Route>
            <Route element={<PortalRoute />}>
              <Route path="/portal" element={<div>Portal Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

describe("ProtectedRoute", () => {
  it("redirects to /login when not authenticated", () => {
    renderRoute("/dashboard");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard Page")).not.toBeInTheDocument();
  });

  it("renders child route when authenticated", () => {
    renderRoute("/dashboard", { role: "admin" });
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});

describe("PortalRoute", () => {
  it("redirects to /login when not authenticated", () => {
    renderRoute("/portal");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to / when authenticated but not provider role", () => {
    renderRoute("/portal", { role: "admin" });
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.queryByText("Portal Page")).not.toBeInTheDocument();
  });

  it("renders portal when authenticated as provider", () => {
    renderRoute("/portal", { role: "provider" });
    expect(screen.getByText("Portal Page")).toBeInTheDocument();
  });
});
