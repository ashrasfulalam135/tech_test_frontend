import Navbar from "./components/Navbar";
import Home from "./components/Home";
import List from "./components/List";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<div className="content">
					<div className="container">
						<Routes>
							<Route path="/" Component={Home} />
							<Route path="/list" Component={List} />
						</Routes>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
