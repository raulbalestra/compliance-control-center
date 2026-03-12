import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MetricCard } from "@/components/MetricCard";
import { FileText, Users, AlertTriangle } from "lucide-react";

describe("MetricCard", () => {
  it("renders title and value", () => {
    render(
      <MetricCard title="Total Documents" value={150} icon={FileText} />
    );
    expect(screen.getByText("Total Documents")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("renders string value", () => {
    render(
      <MetricCard title="Compliance" value="98.5%" icon={Users} />
    );
    expect(screen.getByText("98.5%")).toBeInTheDocument();
  });

  it("renders change indicator when provided", () => {
    render(
      <MetricCard
        title="Documents"
        value={100}
        change="+12% vs last month"
        changeType="positive"
        icon={FileText}
      />
    );
    expect(screen.getByText("+12% vs last month")).toBeInTheDocument();
  });

  it("applies positive change styling", () => {
    render(
      <MetricCard
        title="Documents"
        value={100}
        change="+12%"
        changeType="positive"
        icon={FileText}
      />
    );
    const changeEl = screen.getByText("+12%");
    expect(changeEl.className).toContain("text-success");
  });

  it("applies negative change styling", () => {
    render(
      <MetricCard
        title="Errors"
        value={5}
        change="-3%"
        changeType="negative"
        icon={AlertTriangle}
      />
    );
    const changeEl = screen.getByText("-3%");
    expect(changeEl.className).toContain("text-destructive");
  });

  it("applies neutral change styling by default", () => {
    render(
      <MetricCard
        title="Documents"
        value={100}
        change="No change"
        icon={FileText}
      />
    );
    const changeEl = screen.getByText("No change");
    expect(changeEl.className).toContain("text-muted-foreground");
  });

  it("does not render change when not provided", () => {
    const { container } = render(
      <MetricCard title="Documents" value={100} icon={FileText} />
    );
    // Should only have the title and value paragraphs
    const allTexts = container.querySelectorAll("p");
    expect(allTexts).toHaveLength(2); // title + value
  });

  it("renders icon", () => {
    const { container } = render(
      <MetricCard title="Documents" value={100} icon={FileText} />
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
