import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { translations, type Locale } from "@/i18n/translations";

describe("Translations", () => {
  const locales: Locale[] = ["en", "pt-BR"];

  describe("Structure consistency", () => {
    it("both locales have the same top-level keys", () => {
      const enKeys = Object.keys(translations.en).sort();
      const ptKeys = Object.keys(translations["pt-BR"]).sort();
      expect(enKeys).toEqual(ptKeys);
    });

    it("nav section has same keys in both locales", () => {
      const enKeys = Object.keys(translations.en.nav).sort();
      const ptKeys = Object.keys(translations["pt-BR"].nav).sort();
      expect(enKeys).toEqual(ptKeys);
    });

    it("dashboard section has same keys in both locales", () => {
      const enKeys = Object.keys(translations.en.dashboard).sort();
      const ptKeys = Object.keys(translations["pt-BR"].dashboard).sort();
      expect(enKeys).toEqual(ptKeys);
    });

    it("status section has same keys in both locales", () => {
      const enStatuses = Object.keys(translations.en.status).sort();
      const ptStatuses = Object.keys(translations["pt-BR"].status).sort();
      expect(enStatuses).toEqual(ptStatuses);
    });
  });

  describe("English translations", () => {
    it("nav.dashboard is 'Dashboard'", () => {
      expect(translations.en.nav.dashboard).toBe("Dashboard");
    });

    it("nav.exceptions is 'Exceptions'", () => {
      expect(translations.en.nav.exceptions).toBe("Exceptions");
    });

    it("status has all document statuses", () => {
      const status = translations.en.status;
      expect(status.waiting).toBeTruthy();
      expect(status.received).toBeTruthy();
      expect(status.validating).toBeTruthy();
      expect(status.rejected).toBeTruthy();
      expect(status.pass).toBeTruthy();
      expect(status.fail).toBeTruthy();
    });
  });

  describe("Portuguese translations", () => {
    it("nav.dashboard is 'Painel'", () => {
      expect(translations["pt-BR"].nav.dashboard).toBe("Painel");
    });

    it("nav.exceptions is 'Exceções'", () => {
      expect(translations["pt-BR"].nav.exceptions).toBe("Exceções");
    });
  });

  describe("No empty translations", () => {
    function checkNoEmptyValues(obj: Record<string, unknown>, path = "") {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim().length, `${fullPath} should not be empty`).toBeGreaterThan(0);
        } else if (typeof value === "object" && value !== null) {
          checkNoEmptyValues(value as Record<string, unknown>, fullPath);
        }
      }
    }

    it("English has no empty translation values", () => {
      checkNoEmptyValues(translations.en);
    });

    it("Portuguese has no empty translation values", () => {
      checkNoEmptyValues(translations["pt-BR"]);
    });
  });
});
