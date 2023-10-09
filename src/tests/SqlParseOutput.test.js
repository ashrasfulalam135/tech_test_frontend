import React from "react";
import { render, screen, fireEvent, waitFor, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import SqlParseOutput from "../components/SqlParseOutput";

test("renders the input query if provided", () => {
	const parsedData = {
		input_query: "SELECT column1, column2 FROM table",
	};
	const { getByText } = render(<SqlParseOutput parsedData={parsedData} />);
	const inputQueryElement = getByText("SELECT column1, column2 FROM table");
	expect(inputQueryElement).toBeInTheDocument();
});

test("renders a message if provided", () => {
	const parsedData = {
		message: "Invalid Query",
	};
	const { getByText } = render(<SqlParseOutput parsedData={parsedData} />);
	const messageElement = getByText("Invalid Query");
	expect(messageElement).toBeInTheDocument();
});

test("renders the modified query if provided", () => {
	const parsedData = {
		modified_query: "SELECT hased_column1, hased_column2 FROM table",
	};
	const { getByText } = render(<SqlParseOutput parsedData={parsedData} />);
	const modifiedQueryElement = getByText("SELECT hased_column1, hased_column2 FROM table");
	expect(modifiedQueryElement).toBeInTheDocument();
});

test("renders the hashed column map if provided", () => {
	const parsedData = {
		hashed_column_map: {
			column1: "hashed_value1",
			column2: "hashed_value2",
		},
	};
	const { getByText } = render(<SqlParseOutput parsedData={parsedData} />);
	const jsonString = JSON.stringify(parsedData.hashed_column_map);
	const mapElement = getByText(jsonString);
	expect(mapElement).toBeInTheDocument();
});
