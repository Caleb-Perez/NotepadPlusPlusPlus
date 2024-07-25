import React, { useState, useEffect } from "react";
import Tab from "./Tab";
// import { TabProps } from "./Tab";
import { useTextBox } from "./Textbox";
import { text } from "stream/consumers";

interface TabProps {
	id: string;
	label: string;
	className: string;
}

const TabsBar: React.FC = () => {
	const [tabs, setTabs] = useState<TabProps[]>([]);
	const [nextID, setNextID] = useState(0);
	const [activeTab, setActiveTab] = useState("0");
	const { textAreaRef } = useTextBox();

	const addTab = () => {
		//TODO FIX ACCORDING TO ALREADY EXISITING TAB PROPS
		const newTab: TabProps = {
			label: `Tab ${nextID}`,
			id: nextID.toString(),
			className: "tab",
		};
		setActiveTab(newTab.id);
		setNextID(nextID + 1);
		setTabs((prevTabs) => [...prevTabs, newTab]);
		textAreaRef?.current?.focus();
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
