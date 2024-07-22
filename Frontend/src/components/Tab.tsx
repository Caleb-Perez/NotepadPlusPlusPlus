import { useState, useEffect, forwardRef } from "react";
import TextBox from "./Textbox";
import { getAllJSDocTagsOfKind } from "typescript";
import { useTextBox } from "./Textbox";

interface TabProps {
	id: string;
	label: string;
	className: string;
	onClick: () => void;
	isActive: boolean;
}

const Tab: React.FC<TabProps> = ({
	id,
	label,
	className,
	onClick,
	isActive,
}) => {
	const [tabText, setTabText] = useState("");
	const { textAreaRef } = useTextBox();

	useEffect(() => {
		const handleChange = () => {
			if (textAreaRef.current) {
				setTabText(textAreaRef.current.value);
				console.log(`Tab ${id} changed to ${textAreaRef.current.value}`);
			}
		};

		if (isActive && textAreaRef.current) {
			textAreaRef.current.addEventListener("input", handleChange);
			textAreaRef.current.value = tabText;
		}

		return () => {
			if (textAreaRef.current) {
				textAreaRef.current.removeEventListener("input", handleChange);
			}
		};
	}, [isActive, textAreaRef, id]);

	const closeTab = () => {};

	return (
		<div
			className={`${className} ${isActive ? "active" : ""}`}
			onClick={() => {
				if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
					textAreaRef.current.value = tabText;
				}
				onClick();
			}}
			id={id}
		>
			<div className="tab-title">{label}</div>
			<span className="close-tab">&#10005;</span>
		</div>
	);
};
export default Tab;
