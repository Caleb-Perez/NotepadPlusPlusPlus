import React from "react";

const WindowControls: React.FC = () => {
	const minimizeWindow: React.MouseEventHandler<HTMLButtonElement> = () => {};
	const maximizeWindow: React.MouseEventHandler<HTMLButtonElement> = () => {};
	const closeWindow: React.MouseEventHandler<HTMLButtonElement> = () => {};
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
