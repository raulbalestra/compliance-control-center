import { describe, it, expect } from "vitest";
import {
  ROLE_LABELS,
  DEMO_USERS,
  type UserRole,
  type DocStatus,
  type Priority,
  type ValidationResult,
} from "@/types";

describe("Types & Constants", () => {
  describe("ROLE_LABELS", () => {
    const roles: UserRole[] = ["admin", "coordinator", "analyst", "provider", "auditor", "viewer"];

    it("defines labels for all roles", () => {
      roles.forEach((role) => {
        expect(ROLE_LABELS[role]).toBeDefined();
        expect(ROLE_LABELS[role].en).toBeTruthy();
        expect(ROLE_LABELS[role].pt).toBeTruthy();
      });
    });

    it("has correct English labels", () => {
      expect(ROLE_LABELS.admin.en).toBe("Administrator");
      expect(ROLE_LABELS.coordinator.en).toBe("Coordinator");
      expect(ROLE_LABELS.analyst.en).toBe("Analyst");
      expect(ROLE_LABELS.provider.en).toBe("Provider");
      expect(ROLE_LABELS.auditor.en).toBe("Auditor");
      expect(ROLE_LABELS.viewer.en).toBe("Viewer");
    });

    it("has correct Portuguese labels", () => {
      expect(ROLE_LABELS.admin.pt).toBe("Administrador");
      expect(ROLE_LABELS.provider.pt).toBe("Fornecedor");
    });
  });

  describe("DEMO_USERS", () => {
    it("has 4 demo users", () => {
      expect(DEMO_USERS).toHaveLength(4);
    });

    it("each user has required fields", () => {
      DEMO_USERS.forEach((user) => {
        expect(user.email).toBeTruthy();
        expect(user.password).toBeTruthy();
        expect(user.role).toBeTruthy();
        expect(user.name).toBeTruthy();
      });
    });

    it("includes admin and provider roles", () => {
      const roles = DEMO_USERS.map((u) => u.role);
      expect(roles).toContain("admin");
      expect(roles).toContain("provider");
      expect(roles).toContain("coordinator");
      expect(roles).toContain("analyst");
    });

    it("admin user has correct email", () => {
      const admin = DEMO_USERS.find((u) => u.role === "admin");
      expect(admin?.email).toBe("admin@demo.com");
    });
  });

  describe("Type coverage", () => {
    it("DocStatus covers all expected values", () => {
      const statuses: DocStatus[] = [
        "waiting", "received", "uploaded", "processing", "processed",
        "validating", "validation_failed", "approved", "ready", "submitted",
        "rejected", "correction_requested", "needs_correction", "reprocessing", "exception",
      ];
      expect(statuses).toHaveLength(15);
    });

    it("Priority has 4 levels", () => {
      const priorities: Priority[] = ["critical", "high", "medium", "low"];
      expect(priorities).toHaveLength(4);
    });

    it("ValidationResult has 4 values", () => {
      const results: ValidationResult[] = ["pass", "fail", "warning", "pending"];
      expect(results).toHaveLength(4);
    });
  });
});
