import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

beforeEach(() => {
  localStorage.clear();
});

function LanguageTestConsumer() {
  const { locale, t, toggleLocale } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="dashboard-title">{t.nav.dashboard}</span>
      <span data-testid="exceptions-title">{t.nav.exceptions}</span>
      <button data-testid="toggle" onClick={toggleLocale}>Toggle</button>
    </div>
  );
}

function renderLanguage() {
  return render(
    <LanguageProvider>
      <LanguageTestConsumer />
    </LanguageProvider>
  );
}

describe("LanguageContext", () => {
  describe("Default locale", () => {
    it("defaults to English", () => {
      renderLanguage();
      expect(screen.getByTestId("locale").textContent).toBe("en");
    });

    it("provides English translations by default", () => {
      renderLanguage();
      expect(screen.getByTestId("dashboard-title").textContent).toBe("Dashboard");
      expect(screen.getByTestId("exceptions-title").textContent).toBe("Exceptions");
    });
  });

  describe("Toggle locale", () => {
    it("toggles from English to Portuguese", async () => {
      const user = userEvent.setup();
      renderLanguage();
      await user.click(screen.getByTestId("toggle"));
      expect(screen.getByTestId("locale").textContent).toBe("pt-BR");
      expect(screen.getByTestId("dashboard-title").textContent).toBe("Painel");
      expect(screen.getByTestId("exceptions-title").textContent).toBe("Exceções");
    });

    it("toggles back from Portuguese to English", async () => {
      const user = userEvent.setup();
      renderLanguage();
      await user.click(screen.getByTestId("toggle"));
      expect(screen.getByTestId("locale").textContent).toBe("pt-BR");
      await user.click(screen.getByTestId("toggle"));
      expect(screen.getByTestId("locale").textContent).toBe("en");
      expect(screen.getByTestId("dashboard-title").textContent).toBe("Dashboard");
    });
  });

  describe("Persistence", () => {
    it("persists locale to localStorage", async () => {
      const user = userEvent.setup();
      renderLanguage();
      await user.click(screen.getByTestId("toggle"));
      expect(localStorage.getItem("ica-locale")).toBe("pt-BR");
    });

    it("restores locale from localStorage", () => {
      localStorage.setItem("ica-locale", "pt-BR");
      renderLanguage();
      expect(screen.getByTestId("locale").textContent).toBe("pt-BR");
      expect(screen.getByTestId("dashboard-title").textContent).toBe("Painel");
    });
  });

  describe("useLanguage hook", () => {
    it("throws when used outside LanguageProvider", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<LanguageTestConsumer />)).toThrow();
      spy.mockRestore();
    });
  });
});
