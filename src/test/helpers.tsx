import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/stores/AuthContext";
import { AppProvider } from "@/stores/AppStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock fetch globally for tests
beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: { message: "Unauthorized" } }),
      })
    )
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>{children}</AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    route = "/",
    ...options
  }: RenderOptions & { route?: string } = {}
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AllProviders>{ui}</AllProviders>
    </MemoryRouter>,
    options
  );
}

export function renderWithRouter(
  ui: React.ReactElement,
  { route = "/" }: { route?: string } = {}
) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
