import { appWindow } from '@tauri-apps/api/window';

// Default zoom level
let zoomLevel = 1;

const applyZoom = () => {
    const body = document.body;

    // Apply scale with top-left origin
    body.style.transform = `scale(${zoomLevel})`;
    body.style.transformOrigin = "top left";

    // Adjust body size to match zoom level
    body.style.width = `${100 / zoomLevel}vw`;
    body.style.height = `${100 / zoomLevel}vh`;

    // Hide scrollbars
    body.style.overflow = "hidden";
};

// Zoom in function
export const zoomIn = () => {
    zoomLevel = Math.min(zoomLevel * 1.2, 3); // Limit zoom-in to 3x
    applyZoom();
};

// Zoom out function
export const zoomOut = () => {
    zoomLevel = Math.max(zoomLevel * 0.8, 1); // Limit zoom-out to 1
    applyZoom();
};

export const fullScreen = async () => {
    const isFullscreen = await appWindow.isFullscreen();
    if (isFullscreen) {
        await appWindow.setFullscreen(false); 
    } else {
        await appWindow.setFullscreen(true); 
    }
};