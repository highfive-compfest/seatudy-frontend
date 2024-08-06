/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "../components/common/main-navbar";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("Navbar Component", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the navbar", () => {
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders links in the desktop menu", () => {
    expect(screen.getByTestId("home-link")).toBeInTheDocument();
    expect(screen.getByTestId("courses-link")).toBeInTheDocument();
    expect(screen.getByTestId("category-link")).toBeInTheDocument();
    expect(screen.getByTestId("reviews-link")).toBeInTheDocument();
    expect(screen.getByTestId("register-link")).toBeInTheDocument();
    expect(screen.getByTestId("login-link")).toBeInTheDocument();
  });

  it("renders links in the mobile menu", () => {
    const menuButton = screen.getByTestId("menu-toggle");
    fireEvent.click(menuButton);
    expect(screen.getByTestId("mobile-home-link")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-courses-button")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-category-button")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-reviews-link")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-register-link")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-login-link")).toBeInTheDocument();
  });
});
