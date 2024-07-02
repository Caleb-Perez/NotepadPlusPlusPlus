import React from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";
import SecondTopBar from "./components/SecondTopBar";
import StartUpSign from "./components/StartUpSign";

const App: React.FC = () => {
	return (
		<div className="App">
			<TitleBar />
			<SecondTopBar />
			<StartUpSign />
		</div>
	);
};

export default App;
