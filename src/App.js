import { useState } from "react";
import SqlParserFrom from "./components/SqlParserForm";
import SqlParseOutput from "./components/SqlParseOutput";

function App() {
	const [parsedData, setParsedData] = useState(null);

	const handleSqlSubmit = (data) => {
		setParsedData(data);
	};

	return (
		<div className="content">
			<div className="container">
				<SqlParserFrom onSqlSubmit={handleSqlSubmit} />
				{parsedData ? <SqlParseOutput parsedData={parsedData} /> : ""}
			</div>
		</div>
	);
}

export default App;
