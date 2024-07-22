import React, { useState, forwardRef } from "react";
import Tab from "./Tab";
// import { TabProps } from "./Tab";
import { useTextBox } from "./Textbox";

interface TabProps {
	id: string;
	label: string;
	className: string;
}

const TabsBar: React.FC = () => {
	const [tabs, setTabs] = useState<TabProps[]>([]);
	const [nextID, setNextID] = useState(0);
	const [activeTab, setActiveTab] = useState("0");

	const addTab = () => {
		//TODO FIX ACCORDING TO ALREADY EXISITING TAB PROPS
		const newTab: TabProps = {
			label: `New Tab`,
			id: nextID.toString(),
			className: "tab",
		};
		setActiveTab(newTab.id);
		setNextID(nextID + 1);
		setTabs((prevTabs) => [...prevTabs, newTab]);
	};

	const deleteTab = (id: string) => {
		//setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
		//Deactivate current tab
		//Deal with changing active tab
		//If no tabs, close program
	};

	const changeTab = (id: string) => {
		if (activeTab != id) {
			//Deal with styling
			//Activate current tab
			setActiveTab(id);
			console.log(`${id} is now active`);
		}
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
