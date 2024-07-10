import { useState } from "react";
import TextBox from "./Textbox";
export interface TabProps {
	label: string;
	class: string;
	action: () => void;
}

const Tab: React.FC<TabProps> = ({ label, class: string, action }) => {
	// const onChange = () => {
	//     setTabText(textAreaRef.)
	// }
	// const [tabText, setTabText] = useState("");
	return (
		<div className="tab" onClick={action}>
			<div className="tab-title">{label}</div>
			<span className="close-tab">&#10005;</span>
		</div>
	);
};

export default Tab;
