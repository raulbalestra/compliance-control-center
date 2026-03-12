import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AppProvider, useApp } from "@/stores/AppStore";
import { AuthProvider } from "@/stores/AuthContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

beforeEach(() => {
  localStorage.clear();
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function AppTestConsumer() {
  const app = useApp();
  return (
    <div>
      <span data-testid="total-docs">{app.counts.totalDocs}</span>
      <span data-testid="approved-docs">{app.counts.approvedDocs}</span>
      <span data-testid="rejected-docs">{app.counts.rejectedDocs}</span>
      <span data-testid="pending-docs">{app.counts.pendingDocs}</span>
      <span data-testid="open-exceptions">{app.counts.openExceptions}</span>
      <span data-testid="critical-exceptions">{app.counts.criticalExceptions}</span>
      <span data-testid="open-pending">{app.counts.openPending}</span>
      <span data-testid="blocked-workers">{app.counts.blockedWorkers}</span>
      <span data-testid="doc-count">{app.documents.length}</span>
      <span data-testid="client-count">{app.clients.length}</span>
      <span data-testid="contract-count">{app.contracts.length}</span>
      <span data-testid="worker-count">{app.workers.length}</span>
      <span data-testid="provider-count">{app.providers.length}</span>
      <span data-testid="doctype-count">{app.docTypes.length}</span>
      <span data-testid="rule-count">{app.rules.length}</span>
      <span data-testid="user-count">{app.users.length}</span>
      <span data-testid="exception-count">{app.exceptions.length}</span>
      <span data-testid="pending-count">{app.pendingItems.length}</span>
      <span data-testid="integration-count">{app.integrations.length}</span>
      <span data-testid="automation-count">{app.automations.length}</span>
      <span data-testid="process-count">{app.processes.length}</span>
      <span data-testid="audit-count">{app.auditLogs.length}</span>
      <span data-testid="site-count">{app.sites.length}</span>
      {/* Document at index 0 */}
      <span data-testid="doc-0-status">{app.documents[0]?.status}</span>
      <span data-testid="doc-0-id">{app.documents[0]?.id}</span>
      <button data-testid="approve-1" onClick={() => app.approveDocument(1, "Looks good")}>Approve</button>
      <button data-testid="reject-2" onClick={() => app.rejectDocument(2, "Missing info")}>Reject</button>
      <button data-testid="request-correction-3" onClick={() => app.requestCorrection(3, "Please fix dates")}>Request Correction</button>
      <button data-testid="reprocess-4" onClick={() => app.reprocessDocument(4)}>Reprocess</button>
      <button data-testid="mark-exception-5" onClick={() => app.markException(5, "Data inconsistency")}>Mark Exception</button>
      <button data-testid="add-comment-1" onClick={() => app.addDocumentComment(1, "Test User", "Test comment")}>Add Comment</button>
      <button data-testid="assign-doc-1" onClick={() => app.assignDocument(1, "João")}>Assign Doc</button>
      <button data-testid="change-status-1" onClick={() => app.changeDocumentStatus(1, "processing")}>Change Status</button>
      <button data-testid="upload-doc" onClick={() => app.uploadDocument({ worker: "New Worker", docType: "ASO" })}>Upload</button>
      <button data-testid="resolve-exception" onClick={() => app.resolveException(1)}>Resolve Exception</button>
      <button data-testid="escalate-exception" onClick={() => app.escalateException(2)}>Escalate Exception</button>
      <button data-testid="assign-exception" onClick={() => app.assignException(1, "Maria")}>Assign Exception</button>
      <button data-testid="resolve-pending" onClick={() => app.resolvePending(1)}>Resolve Pending</button>
      <button data-testid="change-pending-priority" onClick={() => app.changePendingPriority(1, "critical")}>Change Priority</button>
      <button data-testid="change-pending-status" onClick={() => app.changePendingStatus(1, "in_progress")}>Change Pending Status</button>
      <button data-testid="assign-pending" onClick={() => app.assignPending(1, "Ana")}>Assign Pending</button>
      <button data-testid="add-pending-comment" onClick={() => app.addPendingComment(1, "User", "Pending comment")}>Add Pending Comment</button>
      <button data-testid="add-user" onClick={() => app.addUser({ id: "new-user", name: "New User", email: "new@test.com", role: "viewer", active: true, lastAccess: "2024-01-01", createdAt: "2024-01-01" })}>Add User</button>
      <button data-testid="toggle-user-active" onClick={() => app.toggleUserActive(app.users[0]?.id)}>Toggle User</button>
      <button data-testid="add-client" onClick={() => app.addClient({ id: 100, name: "Test Client", cnpj: "00.000.000/0001-00", contracts: 0, activeWorkers: 0, compliance: 100, docs: [], active: true, contactEmail: "test@test.com", contactPhone: "11999999999" })}>Add Client</button>
      <button data-testid="add-contract" onClick={() => app.addContract({ id: 100, name: "Test Contract", clientId: 1, clientName: "Test", siteId: 1, siteName: "Test Site", status: "active", startDate: "2024-01-01", endDate: "2025-12-31", workers: 0, compliance: 100 })}>Add Contract</button>
      <button data-testid="add-doctype" onClick={() => app.addDocType({ id: 100, name: "Test Doc", category: "test", criticality: "low", validity: "1 year", recurrence: "annual", acceptedFormats: ["pdf"], mandatory: true, active: true })}>Add DocType</button>
      <button data-testid="add-rule" onClick={() => app.addRule({ id: 100, name: "Test Rule", clientId: null, clientName: "", contractId: null, contractName: "", docTypeId: 1, docTypeName: "ASO", required: true, expiration: "1 year", frequency: "annual", validation: "auto", deadline: "30 days", priority: "medium", impact: "low", blocksAccess: false, blocksPayment: false, active: true })}>Add Rule</button>
      <button data-testid="toggle-rule" onClick={() => app.toggleRuleActive(1)}>Toggle Rule</button>
    </div>
  );
}

function renderApp() {
  return render(
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <AppTestConsumer />
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

describe("AppStore", () => {
  describe("Initial state", () => {
    it("loads mock data on initialization", () => {
      renderApp();
      expect(Number(screen.getByTestId("doc-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("client-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("contract-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("worker-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("provider-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("doctype-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("rule-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("user-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("exception-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("pending-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("integration-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("automation-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("process-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("audit-count").textContent)).toBeGreaterThan(0);
      expect(Number(screen.getByTestId("site-count").textContent)).toBeGreaterThan(0);
    });

    it("computes counts correctly", () => {
      renderApp();
      const totalDocs = Number(screen.getByTestId("total-docs").textContent);
      expect(totalDocs).toBeGreaterThan(0);
      expect(totalDocs).toBe(Number(screen.getByTestId("doc-count").textContent));
    });
  });

  describe("Document actions", () => {
    it("approves a document", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("approve-1"));
      await waitFor(() => {
        // Audit log count should increase
        expect(Number(screen.getByTestId("audit-count").textContent)).toBeGreaterThan(10);
      });
    });

    it("rejects a document and creates pending item", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialPendingCount = Number(screen.getByTestId("pending-count").textContent);
      await user.click(screen.getByTestId("reject-2"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("pending-count").textContent)).toBe(initialPendingCount + 1);
      });
    });

    it("requests correction and creates pending item", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialPendingCount = Number(screen.getByTestId("pending-count").textContent);
      await user.click(screen.getByTestId("request-correction-3"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("pending-count").textContent)).toBe(initialPendingCount + 1);
      });
    });

    it("marks a document as exception", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("mark-exception-5"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("audit-count").textContent)).toBeGreaterThan(10);
      });
    });

    it("adds a comment to a document", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("add-comment-1"));
      // Smoke test - no error thrown
    });

    it("assigns a document", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("assign-doc-1"));
    });

    it("changes document status", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("change-status-1"));
    });

    it("uploads a new document", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialDocCount = Number(screen.getByTestId("doc-count").textContent);
      await user.click(screen.getByTestId("upload-doc"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("doc-count").textContent)).toBe(initialDocCount + 1);
      });
    });
  });

  describe("Exception actions", () => {
    it("resolves an exception", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("resolve-exception"));
    });

    it("escalates an exception", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("escalate-exception"));
    });

    it("assigns an exception", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("assign-exception"));
    });
  });

  describe("Pending actions", () => {
    it("resolves a pending item", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("resolve-pending"));
    });

    it("changes pending priority", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("change-pending-priority"));
    });

    it("changes pending status", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("change-pending-status"));
    });

    it("assigns a pending item", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("assign-pending"));
    });

    it("adds a comment to a pending item", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("add-pending-comment"));
    });
  });

  describe("Admin actions", () => {
    it("adds a new user", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialCount = Number(screen.getByTestId("user-count").textContent);
      await user.click(screen.getByTestId("add-user"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("user-count").textContent)).toBe(initialCount + 1);
      });
    });

    it("toggles user active status", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("toggle-user-active"));
    });

    it("adds a new client", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialCount = Number(screen.getByTestId("client-count").textContent);
      await user.click(screen.getByTestId("add-client"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("client-count").textContent)).toBe(initialCount + 1);
      });
    });

    it("adds a new contract", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialCount = Number(screen.getByTestId("contract-count").textContent);
      await user.click(screen.getByTestId("add-contract"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("contract-count").textContent)).toBe(initialCount + 1);
      });
    });

    it("adds a new doc type", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialCount = Number(screen.getByTestId("doctype-count").textContent);
      await user.click(screen.getByTestId("add-doctype"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("doctype-count").textContent)).toBe(initialCount + 1);
      });
    });

    it("adds a new compliance rule", async () => {
      const user = userEvent.setup();
      renderApp();
      const initialCount = Number(screen.getByTestId("rule-count").textContent);
      await user.click(screen.getByTestId("add-rule"));
      await waitFor(() => {
        expect(Number(screen.getByTestId("rule-count").textContent)).toBe(initialCount + 1);
      });
    });

    it("toggles rule active status", async () => {
      const user = userEvent.setup();
      renderApp();
      await user.click(screen.getByTestId("toggle-rule"));
    });
  });

  describe("useApp hook", () => {
    it("throws when used outside AppProvider", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<AppTestConsumer />)).toThrow(
        "useApp must be used within AppProvider"
      );
      spy.mockRestore();
    });
  });
});
