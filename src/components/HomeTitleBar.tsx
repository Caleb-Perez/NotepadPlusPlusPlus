import React, { useRef, forwardRef } from "react";
import WindowControls from "./WindowControls";
import TabsBar from "./TabsBar";
import "./Styles.css";

const HomeTitleBar: React.FC = () => {
	return (
		<div data-tauri-drag-region className="title-bar">
			<div />
			<WindowControls />
		</div>
	);
};

export default HomeTitleBar;
