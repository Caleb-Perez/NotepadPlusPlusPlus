import React from "react";
import WindowControls from "./WindowControls";
import "./Styles.css";

const TitleBar: React.FC = () => {
	return (
		<div className="title-bar">
			<div className="editor-tabs">
				<span className="logo">👽 </span>
				<div className="tab">
					<div className="tab-title">New Tab</div>
					<span className="close-tab">x</span>
				</div>
				<div className="tab add-tab">+</div>
			</div>
			<WindowControls />
		</div>
	);
};

export default TitleBar;
