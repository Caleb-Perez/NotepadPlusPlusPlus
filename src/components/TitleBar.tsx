import React, { useRef, forwardRef } from "react";
import WindowControls from "./WindowControls";
import TabsBar from "./TabsBar";
import "./Styles.css";

const TitleBar: React.FC /*<TitleBarProps>*/ = () => {
	return (
		<div data-tauri-drag-region className="title-bar">
			<TabsBar />
			<WindowControls />
		</div>
	);
};

export default TitleBar;
