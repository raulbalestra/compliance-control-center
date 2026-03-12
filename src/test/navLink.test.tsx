import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

describe("NavLink", () => {
  it("renders as a link", () => {
    render(
      <MemoryRouter>
        <NavLink to="/test">Test Link</NavLink>
      </MemoryRouter>
    );
    const link = screen.getByText("Test Link");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/test");
  });

  it("applies className prop", () => {
    render(
      <MemoryRouter>
        <NavLink to="/test" className="base-class">
          Link
        </NavLink>
      </MemoryRouter>
    );
    const link = screen.getByText("Link").closest("a");
    expect(link?.className).toContain("base-class");
  });

  it("applies activeClassName when route is active", () => {
    render(
      <MemoryRouter initialEntries={["/active"]}>
        <NavLink to="/active" className="base" activeClassName="active-class">
          Active Link
        </NavLink>
      </MemoryRouter>
    );
    const link = screen.getByText("Active Link").closest("a");
    expect(link?.className).toContain("active-class");
  });

  it("does not apply activeClassName when route is inactive", () => {
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <NavLink to="/test" className="base" activeClassName="active-class">
          Inactive Link
        </NavLink>
      </MemoryRouter>
    );
    const link = screen.getByText("Inactive Link").closest("a");
    expect(link?.className).not.toContain("active-class");
  });

  it("renders children", () => {
    render(
      <MemoryRouter>
        <NavLink to="/test">
          <span>Child Content</span>
        </NavLink>
      </MemoryRouter>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
