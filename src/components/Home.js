import { useState } from "react";
import SqlParserFrom from "./SqlParserForm";
import SqlParseOutput from "./SqlParseOutput";

function Home() {
	const [parsedData, setParsedData] = useState(null);

	const handleSqlSubmit = (data) => {
		setParsedData(data);
	};

	return (
		<>
			<SqlParserFrom onSqlSubmit={handleSqlSubmit} />
			{parsedData ? <SqlParseOutput parsedData={parsedData} /> : ""}
		</>
	);
}

export default Home;
