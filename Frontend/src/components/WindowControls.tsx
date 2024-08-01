import React from "react";
import { appWindow } from "@tauri-apps/api/window";

const WindowControls: React.FC = () => {
	const minimizeWindow: React.MouseEventHandler<HTMLButtonElement> = () => appWindow.minimize();
	const maximizeWindow: React.MouseEventHandler<HTMLButtonElement> = () => appWindow.toggleMaximize();
	const closeWindow: React.MouseEventHandler<HTMLButtonElement> = () => appWindow.close();
	return (
		<div className="window-controls">
			<button className="minimize" onClick={minimizeWindow}>
				&#x2013;
			</button>
			<button className="maximize" onClick={maximizeWindow}>
				&#9744;
			</button>
			<button className="close" onClick={closeWindow}>
				&#10005;
			</button>
		</div>
	);
};

export default WindowControls;
