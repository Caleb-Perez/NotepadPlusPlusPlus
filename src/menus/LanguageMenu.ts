import { MenuProps } from "../components/Menu";

export const LanguageMenu: MenuProps = {
	title: "Language",
	options: [
		{ label: "Python", class: "", action: () => alert("Python Selected") },
		{
			label: "JavaScript",
			class: "",
			action: () => alert("JS Selected"),
		},
		{
			label: "C++ Selected",
			class: "",
			action: () => alert("C++ Selected"),
		},
		{
			label: "Java++ Selected",
			class: "",
			action: () => alert("Java Selected"),
		},
	],
};
