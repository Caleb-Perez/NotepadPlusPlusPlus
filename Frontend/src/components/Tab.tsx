import { useState, useEffect, forwardRef } from "react";
import TextBox from "./Textbox";
import { getAllJSDocTagsOfKind } from "typescript";
import { useTextBox } from "./Textbox";
import { invoke } from "@tauri-apps/api";

interface TabProps {
	id: string;
	label: string;
	className: string;
	onClick: () => void;
	onDelete: () => void;
	isActive: boolean;
}

const Tab: React.FC<TabProps> = ({
	id,
	label,
	className,
	onClick,
	onDelete,
	isActive,
}) => {
	const [tabText, setTabText] = useState("");
	const { textAreaRef } = useTextBox();

	useEffect(() => {
		const handleChange = () => {
			if (textAreaRef.current) {
				invoke("update_tab_content", {
					tabId: parseInt(id),
					content: textAreaRef.current.value,
				}).then(() => {
					console.log("update_tab_content called successfully on tab " + id);
				});
				setTabText(textAreaRef.current.value);
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
			key={id}>
			<div className="tab-title">{label}</div>
			<span
				className="close-tab"
				onClick={(e) => {
					onDelete();
					e.stopPropagation();
				}}>
				&#10005;
			</span>
		</div>
	);
};
export default Tab;
