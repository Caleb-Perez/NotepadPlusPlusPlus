import React from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";
import SecondTopBar from "./components/SecondTopBar";
import HomePage from "./pages/Home";
import TextBox from "./pages/Edit";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App: React.FC = () => {
	return (
		<div className="App">
			<TitleBar />
			<SecondTopBar />
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/edit" element={<TextBox />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
