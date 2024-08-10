import React, { useRef, useContext } from "react";
import "./App.css";
import HomePage from "./pages/Home";
import EditPage from "./pages/Edit";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TextBoxProvider from "./components/Textbox";

const App: React.FC = () => {
	return (
		<div className="App">
			<TextBoxProvider>
				<Router>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/edit" element={<EditPage />} />
					</Routes>
				</Router>
			</TextBoxProvider>
		</div>
	);
};

export default App;
