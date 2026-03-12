import { describe, it, expect } from "vitest";
import {
  initialDocuments,
  initialExceptions,
  initialPendingItems,
  initialClients,
  initialContracts,
  initialSites,
  initialWorkers,
  initialProviders,
  initialDocTypes,
  initialRules,
  initialAuditLogs,
  initialIntegrations,
  initialAutomations,
  initialProcesses,
  initialUsers,
} from "@/lib/mockData";

describe("Mock Data", () => {
  describe("initialDocuments", () => {
    it("is a non-empty array", () => {
      expect(initialDocuments.length).toBeGreaterThan(0);
    });

    it("each document has required fields", () => {
      initialDocuments.forEach((doc) => {
        expect(doc.id).toBeDefined();
        expect(doc.worker).toBeTruthy();
        expect(doc.docType).toBeTruthy();
        expect(doc.status).toBeTruthy();
        expect(doc.validation).toBeTruthy();
        expect(doc.comments).toBeInstanceOf(Array);
        expect(doc.timeline).toBeInstanceOf(Array);
      });
    });

    it("documents have unique IDs", () => {
      const ids = initialDocuments.map((d) => d.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("initialExceptions", () => {
    it("is a non-empty array", () => {
      expect(initialExceptions.length).toBeGreaterThan(0);
    });

    it("each exception has required fields", () => {
      initialExceptions.forEach((exc) => {
        expect(exc.id).toBeDefined();
        expect(exc.worker).toBeTruthy();
        expect(exc.error).toBeTruthy();
        expect(exc.risk).toBeTruthy();
        expect(exc.status).toBeTruthy();
      });
    });
  });

  describe("initialPendingItems", () => {
    it("is a non-empty array", () => {
      expect(initialPendingItems.length).toBeGreaterThan(0);
    });

    it("each pending item has required fields", () => {
      initialPendingItems.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.type).toBeTruthy();
        expect(item.priority).toBeTruthy();
        expect(item.status).toBeTruthy();
      });
    });
  });

  describe("initialClients", () => {
    it("is a non-empty array", () => {
      expect(initialClients.length).toBeGreaterThan(0);
    });

    it("each client has name and CNPJ", () => {
      initialClients.forEach((c) => {
        expect(c.name).toBeTruthy();
        expect(c.cnpj).toBeTruthy();
        expect(typeof c.compliance).toBe("number");
      });
    });

    it("clients have unique IDs", () => {
      const ids = initialClients.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("initialContracts", () => {
    it("is a non-empty array", () => {
      expect(initialContracts.length).toBeGreaterThan(0);
    });

    it("each contract references a valid client", () => {
      const clientIds = new Set(initialClients.map((c) => c.id));
      initialContracts.forEach((ct) => {
        expect(clientIds.has(ct.clientId)).toBe(true);
      });
    });

    it("each contract has valid status", () => {
      const validStatuses = ["active", "inactive", "suspended"];
      initialContracts.forEach((ct) => {
        expect(validStatuses).toContain(ct.status);
      });
    });
  });

  describe("initialSites", () => {
    it("is a non-empty array", () => {
      expect(initialSites.length).toBeGreaterThan(0);
    });

    it("each site references a valid client", () => {
      const clientIds = new Set(initialClients.map((c) => c.id));
      initialSites.forEach((s) => {
        expect(clientIds.has(s.clientId)).toBe(true);
      });
    });
  });

  describe("initialWorkers", () => {
    it("is a non-empty array", () => {
      expect(initialWorkers.length).toBeGreaterThan(0);
    });

    it("each worker has valid status", () => {
      const validStatuses = ["active", "blocked", "inactive"];
      initialWorkers.forEach((w) => {
        expect(validStatuses).toContain(w.workerStatus);
        expect(w.name).toBeTruthy();
        expect(w.cpf).toBeTruthy();
      });
    });
  });

  describe("initialProviders", () => {
    it("is a non-empty array", () => {
      expect(initialProviders.length).toBeGreaterThan(0);
    });

    it("each provider has valid type", () => {
      initialProviders.forEach((p) => {
        expect(["provider", "subcontractor"]).toContain(p.type);
      });
    });
  });

  describe("initialDocTypes", () => {
    it("is a non-empty array", () => {
      expect(initialDocTypes.length).toBeGreaterThan(0);
    });

    it("each doc type has category and criticality", () => {
      initialDocTypes.forEach((dt) => {
        expect(dt.name).toBeTruthy();
        expect(dt.category).toBeTruthy();
        expect(["critical", "high", "medium", "low"]).toContain(dt.criticality);
        expect(dt.acceptedFormats).toBeInstanceOf(Array);
        expect(dt.acceptedFormats.length).toBeGreaterThan(0);
      });
    });
  });

  describe("initialRules", () => {
    it("is a non-empty array", () => {
      expect(initialRules.length).toBeGreaterThan(0);
    });

    it("each rule has priority and validation", () => {
      initialRules.forEach((r) => {
        expect(r.name).toBeTruthy();
        expect(["critical", "high", "medium", "low"]).toContain(r.priority);
      });
    });
  });

  describe("initialAuditLogs", () => {
    it("is a non-empty array", () => {
      expect(initialAuditLogs.length).toBeGreaterThan(0);
    });

    it("each log has action, actor, and timestamp", () => {
      initialAuditLogs.forEach((log) => {
        expect(log.action).toBeTruthy();
        expect(log.actor).toBeTruthy();
        expect(log.timestamp).toBeTruthy();
        expect(["agent", "human", "system"]).toContain(log.actorType);
      });
    });
  });

  describe("initialIntegrations", () => {
    it("is a non-empty array", () => {
      expect(initialIntegrations.length).toBeGreaterThan(0);
    });

    it("integrations have valid statuses", () => {
      initialIntegrations.forEach((i) => {
        expect(["active", "error", "inactive"]).toContain(i.status);
      });
    });
  });

  describe("initialAutomations", () => {
    it("is a non-empty array", () => {
      expect(initialAutomations.length).toBeGreaterThan(0);
    });

    it("automations have success rates between 0 and 100", () => {
      initialAutomations.forEach((a) => {
        expect(a.successRate).toBeGreaterThanOrEqual(0);
        expect(a.successRate).toBeLessThanOrEqual(100);
      });
    });
  });

  describe("initialProcesses", () => {
    it("is a non-empty array", () => {
      expect(initialProcesses.length).toBeGreaterThan(0);
    });

    it("processes have valid statuses", () => {
      initialProcesses.forEach((p) => {
        expect(["active", "completed", "suspended"]).toContain(p.status);
        expect(p.progress).toBeGreaterThanOrEqual(0);
        expect(p.progress).toBeLessThanOrEqual(100);
      });
    });
  });

  describe("initialUsers", () => {
    it("is a non-empty array", () => {
      expect(initialUsers.length).toBeGreaterThan(0);
    });

    it("users have valid roles", () => {
      const validRoles = ["admin", "coordinator", "analyst", "provider", "auditor", "viewer"];
      initialUsers.forEach((u) => {
        expect(validRoles).toContain(u.role);
        expect(u.email).toBeTruthy();
        expect(u.name).toBeTruthy();
      });
    });
  });

  describe("Data referential integrity", () => {
    it("document workerIds reference existing workers", () => {
      const workerIds = new Set(initialWorkers.map((w) => w.id));
      initialDocuments.forEach((doc) => {
        expect(workerIds.has(doc.workerId)).toBe(true);
      });
    });

    it("document clientIds reference existing clients", () => {
      const clientIds = new Set(initialClients.map((c) => c.id));
      initialDocuments.forEach((doc) => {
        expect(clientIds.has(doc.clientId)).toBe(true);
      });
    });

    it("document contractIds reference existing contracts", () => {
      const contractIds = new Set(initialContracts.map((c) => c.id));
      initialDocuments.forEach((doc) => {
        expect(contractIds.has(doc.contractId)).toBe(true);
      });
    });

    it("worker clientIds reference existing clients", () => {
      const clientIds = new Set(initialClients.map((c) => c.id));
      initialWorkers.forEach((w) => {
        expect(clientIds.has(w.clientId)).toBe(true);
      });
    });
  });
});
