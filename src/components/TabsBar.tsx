import React, { useState, useEffect } from "react";
import Tab from "./Tab";
// import { TabProps } from "./Tab";
import { useTextBox } from "./Textbox";
import { text } from "stream/consumers";
import { invoke } from "@tauri-apps/api";
import { open } from '@tauri-apps/api/dialog';
import { save } from '@tauri-apps/api/dialog';

interface TabProps {
	id: string;
	label: string;
	className: string;
}

async function setNextID() {
	try {
		const value: number = await invoke("add_tab", {
			title: "New Tab",
			content: "",
		});
		return value;
	} catch (error) {
		console.error("Error fetching next ID:", error);
	}
}

async function setNextIDFile(path: string) {
	try {
        const value: number = await invoke("add_tab_file", { 
			title: path, 
			filePath: path 
		});
		return value;
    } catch (error) {
        console.error("Error setting next ID file:", error);
    }
}

const TabsBar: React.FC = () => {
	const [tabs, setTabs] = useState<TabProps[]>([]);
	// const [nextID, setNextID] = useState(0);
	const [activeTab, setActiveTab] = useState("0");
	const { textAreaRef } = useTextBox();

	const handleKeyDown = async (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "o") {
			event.preventDefault();

			// get path to selected file
			const selected = await open({
				multiple: false,
				filters: [{
					name: "Text files",
                    extensions: ["txt"]
				}]
			});
			if (typeof selected === "string") {
                await addTabFile(selected);
            }
			console.log("ctrl+O pressed");
		}

		if ((event.ctrlKey || event.metaKey) && event.key === "s") {
			event.preventDefault();
			const filepath = await save({
				filters: [{
					name: "Text Files",
                    extensions: ["txt", "md"]
                }],
			});
			if (filepath != null) {
				invoke("save_to_file", {
					tabId: parseInt(activeTab),
					filePath: filepath,
				});
			}
		}
		if ((event.ctrlKey || event.metaKey) && event.key === "t") {
			event.preventDefault();
			await addTab();
			console.log("ctrl+T pressed")
		}
	};

	const addTab = async () => {
		//TODO FIX ACCORDING TO ALREADY EXISITING TAB PROPS
		const nextID = await setNextID();
		if (nextID != null) {
			const newTab: TabProps = {
				label: `Tab ${nextID}`,
				id: nextID.toString(),
				className: "tab",
			};

			setActiveTab(newTab.id);
			// setNextID(nextID + 1);
			setTabs((prevTabs) => [...prevTabs, newTab]);
			textAreaRef?.current?.focus();
		}
	};

	const addTabFile = async (path: string) => {
		// creates tab in backend
		const nextID = await setNextIDFile(path);

		// creates tab in frontend
		if (nextID != null) {
			const newTab: TabProps = {
				label: `Tab ${nextID}`,
				id: nextID.toString(),
				className: "tab",
			};

			setActiveTab(newTab.id);
			// setNextID(nextID + 1);
			setTabs((prevTabs) => [...prevTabs, newTab]);
			textAreaRef?.current?.focus();
		}
	};

	const deleteTab = (id: string) => {
		setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
	};

	useEffect(() => {
		if (tabs.length === 0) {
			setActiveTab("0");
		} else if (activeTab && !tabs.find((tab) => tab.id === activeTab)) {
			setActiveTab(tabs[tabs.length - 1].id);
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
	}, [tabs, activeTab]);

	const changeTab = (id: string) => {
		if (activeTab != id) {
			setActiveTab(id);
		}
		textAreaRef?.current?.focus();
	};

	return (
		<div className="editor-tabs">
			<span className="logo">👽 </span>
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
