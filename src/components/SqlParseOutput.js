import { format } from "sql-formatter";

function SqlParseOutput({ parsedData }) {
	return (
		<div className="row align-items-stretch no-gutters contact-wrap">
			<div className="col-md-12">
				<div className="form h-100">
					<ul className="list-unstyled">
						{parsedData.input_query ? (
							<li>
								<b>Input Query</b>
								<ul className="list_style_none">
									<li>
										<samp>
											<pre>{format(parsedData.input_query, { language: "mysql" })}</pre>
										</samp>
									</li>
								</ul>
							</li>
						) : (
							""
						)}

						{parsedData.message ? (
							<li>
								<b>Message</b>
								<ul className="list_style_none">
									<li>
										<samp>Invalid Query</samp>
									</li>
								</ul>
							</li>
						) : (
							""
						)}

						{parsedData.modified_query ? (
							<li>
								<b>Modified Query</b>
								<ul className="list_style_none">
									<li>
										<samp>
											<pre>{format(parsedData.modified_query, { language: "mysql" })}</pre>
										</samp>
									</li>
								</ul>
							</li>
						) : (
							""
						)}

						{parsedData.hashed_column_map ? (
							<li>
								<b>Map</b>
								<ul className="list_style_none">
									<li>
										<div id="test_purpose">{JSON.stringify(parsedData.hashed_column_map)}</div>
										<samp>
											<pre>{JSON.stringify(parsedData.hashed_column_map, null, 2)}</pre>
										</samp>
									</li>
								</ul>
							</li>
						) : (
							""
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default SqlParseOutput;
