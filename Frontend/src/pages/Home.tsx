import React from "react";
import StartUpSign from "../components/StartUpSign";
import PopUp from "../components/PopUp";
import BottomBar from "../components/BottomBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const HomePage: React.FC = () => {
	return (
		<div>
			<StartUpSign />
			<PopUp />
			<BottomBar />
		</div>
	);
};

export default HomePage;
