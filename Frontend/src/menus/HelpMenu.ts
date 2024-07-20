import { MenuProps } from "../components/Menu";

export const HelpMenu: MenuProps = {
	title: "Help",
	options: [
		{ label: "About", class: "", action: () => {
			alert(`
			  Notepad+++
			  Version: 1.0.0
			`);
		  } 
		},
		{
			label: "Documentation",
			class: "",
			action: () => {
				alert(`
				  Getting Started:
				  1. Install Notepad+++ on your computer.
				  2. Open the Notepad+++ application.
		
				  Features:
				  - Syntax Highlighting
				  - File Management
				  
				  FAQ:
				  Q: How do I open a file?
				  A: Go to File > Open and select the file you want to open.
				`);
			  },
		},
	],
};
