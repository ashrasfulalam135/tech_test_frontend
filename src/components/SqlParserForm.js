import { useState } from "react";

function SqlParserFrom({ onSqlSubmit }) {
	const [inputQuery, setInputQuery] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const apiUrl = process.env.REACT_APP_API_URL;

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Perform validation checks
		if (!inputQuery.trim()) {
			// Check if SQL input is empty
			setIsValid(false);
			return;
		}

		// If validation passes, proceed with form submission
		setIsValid(true);

		setIsLoading(true);

		try {
			// Perform the API request here
			const response = await fetch(`${apiUrl}`, {
				method: "POST", // or 'GET' depending on your API
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ input_query: inputQuery }),
			});

			setInputQuery("");

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			// Call the callback to pass data to the parent component (App.js)
			onSqlSubmit(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
			setInputQuery("");
		}
	};

	return (
		<div className="row align-items-stretch no-gutters contact-wrap">
			<div className="col-md-12">
				<div className="form h-100">
					<h3>Parse Your SQL</h3>
					<form method="post" id="contactForm" name="contactForm" onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-md-12 form-group mb-3">
								<textarea
									className="form-control"
									name="input_query"
									value={inputQuery}
									onChange={(e) => setInputQuery(e.target.value)}
									id="message"
									cols="30"
									rows="4"
									placeholder="SELECT column1, column2 FROM table"
								></textarea>
								{!isValid && <div id="form-message-warning">SQL input cannot be empty.</div>}
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 form-group">
								<button type="submit" disabled={isLoading} className="btn btn-primary rounded-0 py-2 px-4">
									{isLoading ? "Parsing..." : "Parse"}
								</button>
								<span className="submitting"></span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SqlParserFrom;
