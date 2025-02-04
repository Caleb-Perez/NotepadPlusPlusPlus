import React, { useState } from "react";
import StartUpSign from "../components/StartUpSign";
import PopUp from "../components/PopUp";
import BottomBar from "../components/BottomBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomeTitleBar from "../components/HomeTitleBar";

const HomePage: React.FC = () => {
	const [openPopUpVisible, setPopUpVisible] = useState(false);

	const openPopUp = () => {
		setPopUpVisible(true);
	};
	const closePopup = () => {
		setPopUpVisible(false);
	};

	return (
		<div>
			<HomeTitleBar />
			<StartUpSign />
			<PopUp open={openPopUpVisible} onClose={closePopup} />
			<BottomBar />
		</div>
	);
};

export default HomePage;
