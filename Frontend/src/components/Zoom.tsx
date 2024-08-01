import React from "react";
// default zoom level
let zoomLevel: number = 1;

// zoom in function
export const zoomIn = () => {
	zoomLevel = Math.min(zoomLevel * 1.2, 3); // Limit zoom-in to 3x
	document.body.style.transform = `scale(${zoomLevel})`;
	document.body.style.transformOrigin = "0 0"; // Ensure zoom from the top-left corner
};

// zoom out function
export const zoomOut = () => {
	zoomLevel = Math.max(zoomLevel * 0.8, 0.5); // Limit zoom-out to 0.5x
	document.body.style.transform = `scale(${zoomLevel})`;
	document.body.style.transformOrigin = "0 0";
};

//fullscreen
export const fullScreen = () => {
	document.body.requestFullscreen();
};
