import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AuthProvider, useAuth } from "@/stores/AuthContext";
import { LanguageProvider } from "@/i18n/LanguageContext";

beforeEach(() => {
  localStorage.clear();
});

function AuthTestConsumer() {
  const { user, isAuthenticated, login, logout, hasPermission } = useAuth();
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? "authenticated" : "unauthenticated"}</span>
      <span data-testid="user-name">{user?.name || "none"}</span>
      <span data-testid="user-role">{user?.role || "none"}</span>
      <span data-testid="perm-dashboard">{hasPermission("dashboard") ? "yes" : "no"}</span>
      <span data-testid="perm-portal">{hasPermission("portal") ? "yes" : "no"}</span>
      <span data-testid="perm-admin">{hasPermission("*") ? "yes" : "no"}</span>
      <button data-testid="login-admin" onClick={() => login("admin@demo.com", "123456")}>Login Admin</button>
      <button data-testid="login-provider" onClick={() => login("fornecedor@demo.com", "123456")}>Login Provider</button>
      <button data-testid="login-coordinator" onClick={() => login("coordenador@demo.com", "123456")}>Login Coord</button>
      <button data-testid="login-analyst" onClick={() => login("analista@demo.com", "123456")}>Login Analyst</button>
      <button data-testid="login-invalid" onClick={() => login("bad@email.com", "wrong")}>Login Bad</button>
      <button data-testid="logout" onClick={logout}>Logout</button>
    </div>
  );
}

function renderAuth() {
  return render(
    <LanguageProvider>
      <AuthProvider>
        <AuthTestConsumer />
      </AuthProvider>
    </LanguageProvider>
  );
}

describe("AuthContext", () => {
  describe("Initial state", () => {
    it("starts unauthenticated by default", () => {
      renderAuth();
      expect(screen.getByTestId("auth-status").textContent).toBe("unauthenticated");
      expect(screen.getByTestId("user-name").textContent).toBe("none");
    });

    it("restores user from localStorage", () => {
      const savedUser = {
        id: "test-id",
        name: "Saved User",
        email: "saved@test.com",
        role: "admin",
        active: true,
        lastAccess: "2024-01-01",
        createdAt: "2024-01-01",
      };
      localStorage.setItem("ica_user", JSON.stringify(savedUser));
      renderAuth();
      expect(screen.getByTestId("auth-status").textContent).toBe("authenticated");
      expect(screen.getByTestId("user-name").textContent).toBe("Saved User");
    });
  });

  describe("Login with demo users", () => {
    it("authenticates admin user", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-admin"));
      await waitFor(() =>
        expect(screen.getByTestId("auth-status").textContent).toBe("authenticated")
      );
      expect(screen.getByTestId("user-name").textContent).toBe("Admin User");
      expect(screen.getByTestId("user-role").textContent).toBe("admin");
    });

    it("authenticates provider user", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-provider"));
      await waitFor(() =>
        expect(screen.getByTestId("user-role").textContent).toBe("provider")
      );
    });

    it("authenticates coordinator user", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-coordinator"));
      await waitFor(() =>
        expect(screen.getByTestId("user-role").textContent).toBe("coordinator")
      );
    });

    it("authenticates analyst user", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-analyst"));
      await waitFor(() =>
        expect(screen.getByTestId("user-role").textContent).toBe("analyst")
      );
    });

    it("rejects invalid credentials", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-invalid"));
      // Should remain unauthenticated
      await waitFor(() =>
        expect(screen.getByTestId("auth-status").textContent).toBe("unauthenticated")
      );
    });
  });

  describe("Logout", () => {
    it("clears authentication on logout", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-admin"));
      await waitFor(() =>
        expect(screen.getByTestId("auth-status").textContent).toBe("authenticated")
      );
      await user.click(screen.getByTestId("logout"));
      expect(screen.getByTestId("auth-status").textContent).toBe("unauthenticated");
      expect(screen.getByTestId("user-name").textContent).toBe("none");
    });

    it("clears localStorage on logout", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-admin"));
      await waitFor(() => expect(localStorage.getItem("ica_user")).toBeTruthy());
      await user.click(screen.getByTestId("logout"));
      expect(localStorage.getItem("ica_user")).toBeNull();
    });
  });

  describe("Permissions", () => {
    it("admin has access to everything", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-admin"));
      await waitFor(() =>
        expect(screen.getByTestId("perm-dashboard").textContent).toBe("yes")
      );
      expect(screen.getByTestId("perm-portal").textContent).toBe("yes");
    });

    it("provider only has portal access", async () => {
      const user = userEvent.setup();
      renderAuth();
      await user.click(screen.getByTestId("login-provider"));
      await waitFor(() =>
        expect(screen.getByTestId("perm-portal").textContent).toBe("yes")
      );
      expect(screen.getByTestId("perm-dashboard").textContent).toBe("no");
    });

    it("unauthenticated user has no permissions", () => {
      renderAuth();
      expect(screen.getByTestId("perm-dashboard").textContent).toBe("no");
      expect(screen.getByTestId("perm-portal").textContent).toBe("no");
    });
  });

  describe("useAuth hook", () => {
    it("throws when used outside AuthProvider", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<AuthTestConsumer />)).toThrow(
        "useAuth must be used within AuthProvider"
      );
      spy.mockRestore();
    });
  });
});
