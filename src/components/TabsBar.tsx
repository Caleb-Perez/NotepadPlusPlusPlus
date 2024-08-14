import React, { useState, useEffect } from "react";
import Tab from "./Tab";
// import { TabProps } from "./Tab";
import { useTextBox } from "./Textbox";
import { text } from "stream/consumers";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { save } from "@tauri-apps/api/dialog";
import { Editor, loader, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { appWindow } from "@tauri-apps/api/window";
import logo from "../assets/logo.png";

interface TabProps {
	id: string;
	label: string;
	className: string;
	content: string;
}

// async function setNextID() {
// 	try {
// 		const value: number = await invoke("add_tab", {
// 			title: "New Tab",
// 			content: "",
// 		});
// 		return value;
// 	} catch (error) {
// 		console.error("Error fetching next ID:", error);
// 	}
// }

// async function setNextIDFile(path: string) {
// 	try {
// 		const value: number = await invoke("add_tab_file", {
// 			title: path,
// 			filePath: path,
// 		});
// 		return value;
// 	} catch (error) {
// 		console.error("Error setting next ID file:", error);
// 	}
// }

const TabsBar: React.FC = () => {
	const [tabs, setTabs] = useState<TabProps[]>([]);
	const [nextID, setNextID] = useState(0);
	const [activeTab, setActiveTab] = useState("0");
	const textAreaRef = useTextBox();
	const [contentChangeDisposable, setContentChangeDisposable] =
		useState<monaco.IDisposable | null>(null);

	const handleKeyDown = async (event: KeyboardEvent) => {
		// if ((event.ctrlKey || event.metaKey) && event.key === "o") {
		// 	event.preventDefault();
		// 	// get path to selected file
		// 	// const selected = await open({
		// 	// 	multiple: false,
		// 	// 	filters: [
		// 	// 		{
		// 	// 			name: "Text files",
		// 	// 			extensions: ["txt"],
		// 	// 		},
		// 	// 	],
		// 	// });
		// 	// if (typeof selected === "string") {
		// 	// 	await addTabFile(selected);
		// 	// }
		// 	console.log("ctrl+O pressed");
		// }
		// if ((event.ctrlKey || event.metaKey) && event.key === "s") {
		// 	event.preventDefault();
		// 	const filepath = await save({
		// 		filters: [
		// 			{
		// 				name: "Text Files",
		// 				extensions: ["txt", "md"],
		// 			},
		// 		],
		// 	});
		// 	if (filepath != null) {
		// 		invoke("save_to_file", {
		// 			tabId: parseInt(activeTab),
		// 			filePath: filepath,
		// 		});
		// 	}
		// }
		// if ((event.ctrlKey || event.metaKey) && event.key === "t") {
		// 	event.preventDefault();
		// 	await addTab();
		// 	console.log("ctrl+T pressed");
		// }
	};

	const addTab = () => {
		const newTab: TabProps = {
			label: `Tab ${nextID}`,
			id: nextID.toString(),
			className: "tab",
			content: "",
		};

		setTabs((prevTabs) => [...prevTabs, newTab]);
		setNextID(nextID + 1);
		setActiveTab(newTab.id);
	};

	useEffect(() => {
		if (!activeTab) return;

		const atab = tabs.find((tab) => tab.id === activeTab);
		if (
			textAreaRef &&
			"current" in textAreaRef &&
			textAreaRef.current &&
			atab
		) {
			contentChangeDisposable?.dispose();

			textAreaRef.current.setValue(atab.content || "");

			setContentChangeDisposable(
				textAreaRef.current.onDidChangeModelContent(() => {
					if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
						console.log(
							`Content for tab ${activeTab} changed to: "${textAreaRef.current.getValue()}"`
						);
						atab.content = textAreaRef.current.getValue();
					}
				})
			);
		}

		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
			textAreaRef?.current.focus();
		}
	}, [tabs, activeTab]);
	// const addTabFile = async (path: string) => {
	// 	// creates tab in backend
	// 	const nextID = await setNextIDFile(path);

	// 	// creates tab in frontend
	// 	if (nextID != null) {
	// 		const newTab: TabProps = {
	// 			label: `Tab ${nextID}`,
	// 			id: nextID.toString(),
	// 			className: "tab",
	// 			content: "",
	// 		};

	// 		setActiveTab(newTab.id);
	// 		// setNextID(nextID + 1);
	// 		setTabs((prevTabs) => [...prevTabs, newTab]);
	// 		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
	// 			textAreaRef?.current.focus();
	// 		}
	// 	}
	// };

	const deleteTab = (id: string) => {
		// if (tabs.length == 1) {
		// 	appWindow.close();
		// }
		// if (id == tabs[tabs.length - 1].id) {
		// 	changeTab(tabs[tabs.length - 2].id);
		// } else {
		// 	changeTab(tabs[tabs.length - 1].id);
		// }
		changeTab(tabs[tabs.length - 1].id);
		setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
	};

	const changeTab = (id: string) => {
		contentChangeDisposable?.dispose();
		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
			setContentChangeDisposable(
				textAreaRef.current.onDidChangeModelContent(() => {
					if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
						const atab = tabs.find((tab) => tab.id === id);
						if (atab) {
							console.log(
								`Bye content for tab ${activeTab} changed to: "${textAreaRef.current.getValue()}"`
							);
							atab.content = textAreaRef.current.getValue();
						}
					}
				})
			);
		}

		setActiveTab(id);
		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
			console.log(
				`Tab ${parseInt(activeTab)} is currently "${
					tabs.find((tab) => tab.id === activeTab)?.content
				}"`
			);
		}
		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
			const newActiveTab = tabs.find((tab) => tab.id === id);
			if (newActiveTab) {
				// console.log(	// 	`Active tab is currently ${activeTab}, but supposed to be ${id}`			// );
				textAreaRef.current.setValue(newActiveTab.content);
			}
		}

		if (textAreaRef && "current" in textAreaRef && textAreaRef.current)
			textAreaRef?.current.focus();
	};

	useEffect(() => {
		const atab = tabs.find((tab) => tab.id === activeTab);
		if (tabs.length === 0) {
			addTab();
		} else if (activeTab && !tabs.find((tab) => tab.id === activeTab)) {
			setActiveTab(tabs[tabs.length - 1].id);
		}

		window.addEventListener("keydown", handleKeyDown);
		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [tabs, activeTab]);

	return (
		<div className="editor-tabs">
			<img src={logo} alt="Logo" className="logo" />
			{tabs.map((tab) => (
				<Tab
					key={tab.id}
					id={tab.id}
					label={tab.label}
					className={tab.className}
					onClick={() => changeTab(tab.id)}
					onDelete={() => deleteTab(tab.id)}
					isActive={tab.id == activeTab}
				/>
			))}
			<div className="tab add-tab" onClick={addTab}>
				+
			</div>
		</div>
	);
};

export default TabsBar;
