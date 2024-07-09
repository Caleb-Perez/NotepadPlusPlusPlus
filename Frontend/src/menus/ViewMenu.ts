import { MenuProps } from "../components/Menu";

export const ViewMenu: MenuProps = {
	title: "View",
	options: [
		{ label: "Zoom In", class: " ", action: () => alert("Zoom in") },
		{
			label: "Zoom Out",
			class: " ",
			action: () => alert("Zoom In clicked"),
		},
		{
			label: "Full Screen",
			class: " ",
			action: () => alert("Full Screen clicked"),
		},
	],
};
