import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { EmptyState } from "@/components/EmptyState";
import { AlertCircle } from "lucide-react";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState title="No items" description="Try adding a new item" />
    );
    expect(screen.getByText("Try adding a new item")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<EmptyState title="No items" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("renders custom icon", () => {
    const { container } = render(
      <EmptyState title="No items" icon={AlertCircle} />
    );
    // Should have an SVG for the icon
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No items"
        action={{ label: "Add Item", onClick }}
      />
    );
    expect(screen.getByText("Add Item")).toBeInTheDocument();
  });

  it("calls action onClick when button is clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <EmptyState
        title="No items"
        action={{ label: "Add Item", onClick }}
      />
    );
    await user.click(screen.getByText("Add Item"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not render action button when not provided", () => {
    render(<EmptyState title="No items" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
