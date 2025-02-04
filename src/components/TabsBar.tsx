import React, { useState, useEffect, useContext } from "react";
import Tab from "./Tab";
import { useTextBox } from "./Textbox";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { save } from "@tauri-apps/api/dialog";
import { message } from "@tauri-apps/api/dialog";
import * as monaco from "monaco-editor";
import { appWindow } from "@tauri-apps/api/window";
import { Language, LanguageContext } from "../menus/LanguageMenu";
import logo from "../assets/logo.png";

interface TabProps {
	id: string;
	label: string;
	className: string;
	content: string;
	lang: Language;
}

function getFileName(filePath: string) {
	return filePath.split(/[/\\]/).pop();
}

async function spawnTab() {
	try {
		const value: number = await invoke("add_tab", {
			title: "",
			content: "",
		});
		return value;
	} catch (error) {}
}

async function spawnTabFile(path: string) {
	try {
		const value: number = await invoke("add_tab_file", {
			title: path,
			filePath: path,
		});
		return value;
	} catch (error) {
		console.error("Error setting next ID file:", error);
	}
}

const TabsBar: React.FC = () => {
	const [tabs, setTabs] = useState<TabProps[]>([]);
	const [nextID, setNextID] = useState(0);
	const [activeTab, setActiveTab] = useState("0");
	const textAreaRef = useTextBox();
	const [contentChangeDisposable, setContentChangeDisposable] =
		useState<monaco.IDisposable | null>(null);
	const { language, setLanguage } = useContext(LanguageContext);

	const handleKeyDown = async (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "o") {
			event.preventDefault();
			// get path to selected file
			const selected = await open({
				multiple: false,
				filters: [
					{
						name: "Text files",
						extensions: ["txt", "hpp", "py", "cpp", "js", "java"],
					},
				],
			});
			if (typeof selected === "string") {
				addTab(selected);
			}
		}
		if ((event.ctrlKey || event.metaKey) && event.key === "s") {
			event.preventDefault();
			const saveOk = await invoke("check_valid_path", {
				tabId: parseInt(activeTab),
			});
			let filepath;
			if (saveOk === true) {
				filepath = await invoke("get_filepath", { tabId: parseInt(activeTab) });
			} else {
				filepath = await save({
					filters: [
						{
							name: "Text Files",
							extensions: ["txt", "hpp", "py", "cpp", "js", "java"],
						},
					],
				});
			}
			if (filepath != null) {
				await invoke("save_to_file", {
					tabId: parseInt(activeTab),
					filePath: filepath,
				});
				await message("file saved to: " + filepath);
			} else {
			}
		}
		if ((event.ctrlKey || event.metaKey) && event.key === "t") {
			event.preventDefault();
			await addTab();
		}
	};

	const addTab = async (path?: string) => {
		if (path) {
			let tabid = await spawnTabFile(path); // create tab in back end with path
			if (tabid) {
				const newTab: TabProps = {
					label: `${getFileName(path)}`,
					id: tabid.toString(),
					className: "tab",
					content: await invoke("get_content", { tabId: tabid }),
					lang: Language.None,
				};
				if (newTab.label.includes(".py")) {
					newTab.lang = Language.Python;
					setLanguage(Language.Python);
				} else if (newTab.label.includes(".cpp")) {
					newTab.lang = Language.CPlusPlus;
					setLanguage(Language.CPlusPlus);
				} else if (newTab.label.includes(".js")) {
					newTab.lang = Language.JavaScript;
					setLanguage(Language.JavaScript);
				} else if (newTab.label.includes(".java")) {
					newTab.lang = Language.Java;
					setLanguage(Language.Java);
				}
				setTabs((prevTabs) => [...prevTabs, newTab]);
				setActiveTab(newTab.id);
				setNextID(tabid);
			} else {
			}
		} else {
			let tabid = await spawnTab(); // create new tab in back end
			if (tabid) {
				const newTab: TabProps = {
					label: `New Tab`,
					id: tabid.toString(),
					className: "tab",
					content: "",
					lang: Language.None,
				};
				setTabs((prevTabs) => [...prevTabs, newTab]);
				setActiveTab(newTab.id);
				setNextID(tabid);
				setLanguage(Language.None);
			} else {
			}
		}
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
						invoke("update_tab_content", {
							tabId: parseInt(activeTab),
							content: textAreaRef.current.getValue(),
						});
						atab.content = textAreaRef.current.getValue();
					}
				})
			);
		}

		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
			textAreaRef?.current.focus();
		}
	}, [tabs, activeTab]);

	const deleteTab = async (id: string) => {
		await invoke("remove_tab", { tabId: parseInt(id) }); // remove tab from back end
		if (tabs.length == 1) {
			appWindow.close();
		}
		if (id == tabs[tabs.length - 1].id) {
			changeTab(tabs[tabs.length - 2].id);
		} else {
			changeTab(tabs[tabs.length - 1].id);
		}
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
							atab.content = textAreaRef.current.getValue();
						}
					}
				})
			);
			const atab = tabs.find((tab) => tab.id === id);
			if (atab) {
				setLanguage(atab.lang);
			}
		}

		setActiveTab(id);
		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
		}
		if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
			const newActiveTab = tabs.find((tab) => tab.id === id);
			if (newActiveTab) {
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

	useEffect(() => {
		if (tabs.length == 0) {
			addTab();
		}
	}, []);

	useEffect(() => {
		const atab = tabs.find((tab) => tab.id === activeTab);
		if (atab) {
			atab.lang = language;
		}
	}, [language]);
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
			<div className="tab add-tab" onClick={() => addTab()}>
				+
			</div>
		</div>
	);
};

export default TabsBar;
