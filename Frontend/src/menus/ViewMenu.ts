import { MenuProps } from "../components/Menu";
import { fullScreen, zoomIn, zoomOut } from "../components/Zoom";

export const ViewMenu: MenuProps = {
    title: "View",
    
	
	options: [
		{ label: "Zoom In", class: " ", action: () => zoomIn() },
		{
			label: "Zoom Out",
			class: " ",
			action: () => zoomOut(),
		},
		{
			label: "Full Screen",
			class: " ",
			action: () => fullScreen(),
		},
	],
};



