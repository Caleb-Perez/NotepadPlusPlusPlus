import React from "react";
// default zoom level
let zoomLevel: number = 1;

// 
const ZoomStyle = () => {
    document.body.style.transform = `scale(${zoomLevel})`;
    document.body.style.transformOrigin = "0 0";
    document.body.style.width = `${100 / zoomLevel}%`; // adjust the width 
    document.body.style.height = `${100 / zoomLevel}%`; // Adjust the height 
};

// zoom in function
export const zoomIn = () => {
    zoomLevel = Math.min(zoomLevel * 1.2, 3); // Limit zoom-in to 3x
    ZoomStyle();
};

// zoom out function
export const zoomOut = () => {
    zoomLevel = Math.max(zoomLevel * 0.8, 0.5); // Limit zoom-out to 0.5x
    ZoomStyle();
};

//fullscreen
export const fullScreen = () => {
	document.body.requestFullscreen();
};
