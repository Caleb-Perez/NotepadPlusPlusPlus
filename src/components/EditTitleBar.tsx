import React from "react";
import WindowControls from "./WindowControls";
import TabsBar from "./TabsBar";
import "./Styles.css";

const EditTitleBar: React.FC = () => {
	return (
		<div data-tauri-drag-region className="title-bar">
			<TabsBar />
			<WindowControls />
		</div>
	);
};

export default EditTitleBar;
