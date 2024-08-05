import { MenuProps } from "../components/Menu";

export const FileMenu: MenuProps = {
	title: "File",
	options: [
		{ label: "New", class: "", action: () => alert("New clicked") },
		{
			label: "Open",
			class: "menu-file-open",
			action: () => alert("Open clicked"),
		},
		{
			label: "Save",
			class: "menu-file-save",
			action: () => alert("Save clicked"),
		},
		{ label: "Exit", class: "", action: () => alert("Exit clicked") },
	],
};
