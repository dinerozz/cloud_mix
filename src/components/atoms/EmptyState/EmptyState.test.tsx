import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmptyState } from "./EmptyState";

test("EmptyState displays description and dog icon", () => {
  render(<EmptyState description="Test Description" />);

  const descriptionElement = screen.getByText(/Test Description/i);
  expect(descriptionElement).toBeInTheDocument();
});
