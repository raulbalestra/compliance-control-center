import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { StatusBadge, type StatusType } from "@/components/StatusBadge";
import { LanguageProvider } from "@/i18n/LanguageContext";

beforeEach(() => {
  localStorage.clear();
});

function renderStatusBadge(status: StatusType, label?: string) {
  return render(
    <LanguageProvider>
      <StatusBadge status={status} label={label} />
    </LanguageProvider>
  );
}

describe("StatusBadge", () => {
  describe("Rendering", () => {
    const statuses: StatusType[] = [
      "waiting", "received", "uploaded", "processing", "processed",
      "validating", "validation_failed", "approved", "ready", "submitted",
      "rejected", "correction_requested", "needs_correction", "reprocessing",
      "exception", "pass", "fail", "warning", "critical", "high", "medium", "low",
    ];

    it("renders all status types without crashing", () => {
      statuses.forEach((status) => {
        const { unmount } = renderStatusBadge(status);
        unmount();
      });
    });

    it("renders with custom label", () => {
      renderStatusBadge("approved", "Custom Label");
      expect(screen.getByText("Custom Label")).toBeInTheDocument();
    });

    it("renders translated label from i18n when no custom label", () => {
      renderStatusBadge("waiting");
      // In English, "waiting" translates to "Waiting for Document"
      expect(screen.getByText("Waiting for Document")).toBeInTheDocument();
    });
  });

  describe("Status styling", () => {
    it("approved has pass styling", () => {
      const { container } = renderStatusBadge("approved");
      const badge = container.querySelector("span");
      expect(badge?.className).toContain("status-pass");
    });

    it("rejected has fail styling", () => {
      const { container } = renderStatusBadge("rejected");
      const badge = container.querySelector("span");
      expect(badge?.className).toContain("status-fail");
    });

    it("processing has warning styling", () => {
      const { container } = renderStatusBadge("processing");
      const badge = container.querySelector("span");
      expect(badge?.className).toContain("status-warning");
    });

    it("waiting has info styling", () => {
      const { container } = renderStatusBadge("waiting");
      const badge = container.querySelector("span");
      expect(badge?.className).toContain("status-info");
    });

    it("critical has fail styling", () => {
      const { container } = renderStatusBadge("critical");
      const badge = container.querySelector("span");
      expect(badge?.className).toContain("status-fail");
    });
  });

  describe("Icons", () => {
    it("renders icon for approved status", () => {
      const { container } = renderStatusBadge("approved");
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("renders icon for rejected status", () => {
      const { container } = renderStatusBadge("rejected");
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("does not render icon for critical status (no icon defined)", () => {
      const { container } = renderStatusBadge("critical");
      expect(container.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("Unknown status fallback", () => {
    it("renders with muted styling for unknown status", () => {
      const { container } = renderStatusBadge("unknown_status" as StatusType);
      const badge = container.querySelector("span");
      expect(badge?.className).toContain("bg-muted");
    });
  });
});
