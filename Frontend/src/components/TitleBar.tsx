import React from "react";
import WindowControls from "./WindowControls";
import TabsBar from "./TabsBar";
import "./Styles.css";

const TitleBar: React.FC = () => {
	return (
		<div className="title-bar">
			<TabsBar />
			<WindowControls />
		</div>
	);
};

export default TitleBar;
