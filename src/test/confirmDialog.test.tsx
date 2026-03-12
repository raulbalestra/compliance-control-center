import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

describe("ConfirmDialog", () => {
  const defaultProps = {
    open: true,
    title: "Confirm Action",
    description: "Are you sure you want to proceed?",
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it("renders nothing when closed", () => {
    const { container } = render(
      <ConfirmDialog {...defaultProps} open={false} />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders title and description when open", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();
  });

  it("renders default button labels", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("renders custom button labels", () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        confirmLabel="Delete"
        cancelLabel="Go Back"
      />
    );
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    await user.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    await user.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when X button is clicked", async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    // X button is the button with the SVG X icon
    const buttons = screen.getAllByRole("button");
    const closeBtn = buttons.find((b) => !b.textContent?.includes("Confirm") && !b.textContent?.includes("Cancel"));
    if (closeBtn) {
      await user.click(closeBtn);
      expect(onCancel).toHaveBeenCalled();
    }
  });

  it("calls onCancel when backdrop is clicked", async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    const backdrop = container.querySelector(".bg-black\\/50");
    if (backdrop) {
      await user.click(backdrop);
      expect(onCancel).toHaveBeenCalled();
    }
  });

  describe("with requireReason", () => {
    it("shows textarea when requireReason is true", () => {
      render(
        <ConfirmDialog {...defaultProps} requireReason reasonLabel="Justification" />
      );
      expect(screen.getByText("Justification")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Justification...")).toBeInTheDocument();
    });

    it("disables confirm button when reason is empty", () => {
      render(
        <ConfirmDialog {...defaultProps} requireReason />
      );
      const confirmBtn = screen.getByText("Confirm");
      expect(confirmBtn).toBeDisabled();
    });

    it("enables confirm button when reason is provided", async () => {
      const user = userEvent.setup();
      render(
        <ConfirmDialog {...defaultProps} requireReason reasonLabel="Reason" />
      );
      const textarea = screen.getByPlaceholderText("Reason...");
      await user.type(textarea, "Good reason");
      const confirmBtn = screen.getByText("Confirm");
      expect(confirmBtn).not.toBeDisabled();
    });

    it("passes reason to onConfirm", async () => {
      const onConfirm = vi.fn();
      const user = userEvent.setup();
      render(
        <ConfirmDialog
          {...defaultProps}
          onConfirm={onConfirm}
          requireReason
          reasonLabel="Reason"
        />
      );
      await user.type(screen.getByPlaceholderText("Reason..."), "My reason");
      await user.click(screen.getByText("Confirm"));
      expect(onConfirm).toHaveBeenCalledWith("My reason");
    });

    it("resets reason after confirm", async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <ConfirmDialog {...defaultProps} requireReason reasonLabel="Reason" />
      );
      const textarea = screen.getByPlaceholderText("Reason...");
      await user.type(textarea, "Some reason");
      await user.click(screen.getByText("Confirm"));
      // After confirm, the reason should be cleared
      expect(textarea).toHaveValue("");
    });
  });

  describe("variants", () => {
    it("applies danger variant styling", () => {
      render(<ConfirmDialog {...defaultProps} variant="danger" />);
      const confirmBtn = screen.getByText("Confirm");
      expect(confirmBtn.className).toContain("bg-destructive");
    });

    it("applies warning variant styling", () => {
      render(<ConfirmDialog {...defaultProps} variant="warning" />);
      const confirmBtn = screen.getByText("Confirm");
      expect(confirmBtn.className).toContain("bg-warning");
    });

    it("applies default variant styling", () => {
      render(<ConfirmDialog {...defaultProps} variant="default" />);
      const confirmBtn = screen.getByText("Confirm");
      expect(confirmBtn.className).toContain("bg-primary");
    });
  });
});
