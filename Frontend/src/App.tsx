import React from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";
import SecondTopBar from "./components/SecondTopBar";
import StartUpSign from "./components/StartUpSign";
import PopUp from "./components/PopUp";
import BottomBar from "./components/BottomBar";

const App: React.FC = () => {
	return (
		<div className="App">
			<TitleBar />
			<SecondTopBar />
			<StartUpSign />
			<PopUp />
			<BottomBar />
		</div>
	);
};

export default App;
