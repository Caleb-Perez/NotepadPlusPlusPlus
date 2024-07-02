import { MenuProps } from "./components/Menu";

export const HelpMenu: MenuProps = {
	title: "Help",
	options: [
		{ label: "About", class: "", action: () => alert("About clicked") },
		{
			label: "Documentation",
			class: "",
			action: () => alert("Documentation clicked"),
		},
	],
};
