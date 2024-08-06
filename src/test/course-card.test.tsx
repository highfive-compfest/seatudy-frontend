/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import CourseCard from "../components/common/course-card";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("CourseCard Component", () => {
  const course = {
    id: 1,
    title: "Sample Course",
    description: "This is a sample course description.",
    age: "10-15",
    duration: "4 weeks",
    price: "$50",
    image: "https://via.placeholder.com/150",
  };

  beforeEach(() => {
    render(<CourseCard course={course} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders course title", () => {
    expect(screen.getByTestId("course-title")).toHaveTextContent("Sample Course");
  });

  it("renders course description", () => {
    expect(screen.getByTestId("course-description")).toHaveTextContent("This is a sample course description.");
  });

  it("renders course details", () => {
    expect(screen.getByTestId("course-age")).toHaveTextContent("Ages 10-15");
    expect(screen.getByTestId("course-duration")).toHaveTextContent("Duration 4 weeks");
    expect(screen.getByTestId("course-price")).toHaveTextContent("Price $50");
  });

  it("renders image with correct src and alt attributes", () => {
    const image = screen.getByTestId("course-image");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(image).toHaveAttribute("alt", "Sample Course");
  });

  it("renders show more button", () => {
    const button = screen.getByTestId("show-more-button");
    expect(button).toBeInTheDocument();
  });
});
