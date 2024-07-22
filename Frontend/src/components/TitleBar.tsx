import React, { useRef, forwardRef } from "react";
import WindowControls from "./WindowControls";
import TabsBar from "./TabsBar";
import "./Styles.css";

// interface TitleBarProps {
// 	textBoxRef: React.RefObject<HTMLTextAreaElement>;
// }

const TitleBar: React.FC /*<TitleBarProps>*/ = () => {
	return (
		<div className="title-bar">
			<TabsBar />
			<WindowControls />
		</div>
	);
};

export default TitleBar;
