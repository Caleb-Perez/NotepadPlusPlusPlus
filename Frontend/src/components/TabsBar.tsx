import React from "react";
import Tab from "./Tab";
const TabsBar: React.FC = () => {
	return (
		<div className="editor-tabs">
			<span className="logo">👽 </span>
			<Tab
				label="New Tab"
				class="New-Tab"
				action={() => {
					alert("idk man");
				}}
			/>
			<div className="tab add-tab">+</div>
		</div>
	);
};

export default TabsBar;
