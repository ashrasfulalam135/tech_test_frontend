import React, { useState, useEffect } from "react";

function List() {
	const [parsedSqlList, setParsedSqlList] = useState([]);
	const apiUrl = process.env.REACT_APP_API_URL;

	// Fetch parsed SQL entries from the API
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${apiUrl}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setParsedSqlList(data.parse_sqls);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Check if parsedSqlList is an array
	if (!Array.isArray(parsedSqlList)) {
		return (
			<div className="row align-items-stretch no-gutters contact-wrap">
				<div className="col-md-12">
					<div className="form h-100">
						<h3>Parsed SQL List</h3>
						<p>No data available</p>
					</div>
				</div>
			</div>
		);
	}

	// Render the current page's items in a table
	const renderItems = () => {
		if (parsedSqlList.length === 0) {
			return <p>No data available</p>;
		}

		return parsedSqlList.map((parsedSql, index) => (
			<div key={index}>
				<ul className="list-unstyled">
					<li>
						<b>ID</b> : <samp>{parsedSql.id}</samp>
					</li>
					<li>
						<b>Input Query</b> : <samp>{parsedSql.input_query}</samp>
					</li>
					<li>
						<b>Modified Query</b> : <samp>{parsedSql.modified_query}</samp>
					</li>
					<li>
						<b>Map</b>
						<ul className="list_style_none">
							<li>
								<samp>
									<pre>{JSON.stringify(parsedSql.hashed_column_map, null, 2)}</pre>
								</samp>
							</li>
						</ul>
					</li>
				</ul>
				<hr />
			</div>
		));
	};

	return (
		<div className="row align-items-stretch no-gutters contact-wrap">
			<div className="col-md-12">
				<div className="form h-100">
					<h3>Parsed SQL List</h3>
					{renderItems()}
				</div>
			</div>
		</div>
	);
}

export default List;
