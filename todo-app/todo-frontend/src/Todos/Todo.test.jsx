import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo Component", () => {
  const mockTodo = { id: 1, text: "Test Todo", done: false };
  const mockOnDelete = vi.fn();
  const mockOnComplete = vi.fn();

  it("renders the todo text", () => {
    render(<Todo todo={mockTodo} onDelete={mockOnDelete} onComplete={mockOnComplete} />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("shows 'This todo is not done' when the todo is not done", () => {
    render(<Todo todo={mockTodo} onDelete={mockOnDelete} onComplete={mockOnComplete} />);
    expect(screen.getByText("This todo is not done")).toBeInTheDocument();
  });

  it("calls onDelete when the delete button is clicked", () => {
    render(<Todo todo={mockTodo} onDelete={mockOnDelete} onComplete={mockOnComplete} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onComplete when the 'Set as done' button is clicked", () => {
    render(<Todo todo={mockTodo} onDelete={mockOnDelete} onComplete={mockOnComplete} />);
    fireEvent.click(screen.getByText("Set as done"));
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it("shows 'This todo is done' when the todo is done", () => {
    const doneTodo = { ...mockTodo, done: true };
    render(<Todo todo={doneTodo} onDelete={mockOnDelete} onComplete={mockOnComplete} />);
    expect(screen.getByText("This todo is done")).toBeInTheDocument();
  });
});
