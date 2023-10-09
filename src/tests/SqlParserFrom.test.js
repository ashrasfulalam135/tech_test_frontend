import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SqlParserFrom from "../components/SqlParserForm";

// Mock the onSqlSubmit function
const mockOnSqlSubmit = jest.fn();

beforeEach(() => {
	render(<SqlParserFrom onSqlSubmit={mockOnSqlSubmit} />);
});

test("1. textarea is available", () => {
	const textareaElement = screen.getByRole("textbox");
	expect(textareaElement).toBeInTheDocument();
});

test("2. placeholder is available", () => {
	const textareaElement = screen.getByPlaceholderText("SELECT column1, column2 FROM table");
	expect(textareaElement).toBeInTheDocument();
});

test("3. button is available", () => {
	const buttonElement = screen.getByText("Parse");
	expect(buttonElement).toBeInTheDocument();
});

test("4. no input in the textarea shows error message", () => {
	const submitButton = screen.getByText("Parse");

	fireEvent.click(submitButton);

	const errorMessage = screen.getByText("SQL input cannot be empty.");
	expect(errorMessage).toBeInTheDocument();
});

test("5. when valid input is available, form submit button is disabled and button text will be 'parsing...'", () => {
	const textareaElement = screen.getByRole("textbox");
	const submitButton = screen.getByText("Parse");

	fireEvent.change(textareaElement, { target: { value: "SELECT name FROM user" } });
    fireEvent.click(submitButton);
	expect(textareaElement).toHaveValue("SELECT name FROM user");
	expect(submitButton).toHaveAttribute("disabled", "");

    // Wait for the asynchronous operation to complete
	screen.findByText("Parsing...");

	// Ensure that the loading text disappears
	expect(screen.queryByText("Parsing...")).toBeInTheDocument();
});