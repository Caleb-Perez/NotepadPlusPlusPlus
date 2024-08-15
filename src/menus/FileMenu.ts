import { MenuProps } from "../components/Menu";
import { appWindow } from "@tauri-apps/api/window";


export const FileMenu: MenuProps = {
	title: "File",
	options: [
		{ label: "New", class: "", action: () => {const event = new KeyboardEvent('keydown', {
					  bubbles: true,
					  cancelable: true,
					  key: 't',
					  ctrlKey: true,
					});
					document.dispatchEvent(event);} },
		{
			label: "Open",
			class: "menu-file-open",
			action: () => {
					const event = new KeyboardEvent('keydown', {
					  bubbles: true,
					  cancelable: true,
					  key: 'o',
					  ctrlKey: true,
					});
					document.dispatchEvent(event);
			},
		},
		{
			label: "Save",
			class: "menu-file-save",
			action: () => {const event = new KeyboardEvent('keydown', {
				bubbles: true,
				cancelable: true,
				key: 's',
				ctrlKey: true,
			  });
			  document.dispatchEvent(event);},
		},
		{ label: "Exit", class: "", action: () => appWindow.close() },
	],
};
