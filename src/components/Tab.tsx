import { useState, useEffect, forwardRef, useRef } from "react";
import TextBox from "./Textbox";
import { getAllJSDocTagsOfKind } from "typescript";
import { useTextBox } from "./Textbox";
import { invoke } from "@tauri-apps/api";
import { save } from "@tauri-apps/api/dialog";

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
	const textAreaRef = useTextBox();

	const initialized = useRef(false);

	useEffect(() => {
		const handleChange = () => {
			if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
				// invoke("update_tab_content", {
				// 	tabId: parseInt(id),
				// 	content: textAreaRef.current.value,
				// }).then(() => {
				// 	console.log("update_tab_content called successfully on tab " + id);
				// });
				// console.log("HEEEEEEELP"); //textAreaRef.current.getValue());
				// setTabText(textAreaRef.current.getValue());
			}
		};
		handleChange();
		const fetchString = async () => {
			try {
				const content: string = await invoke("get_content", {
					tabId: parseInt(id),
				});
				// if (textAreaRef) {
				// 	textAreaRef.setValue(content);
				// }
				console.log(content);
				setTabText(content);
			} catch (error) {
				console.error("Error fetching content:", error);
			}
		};

		if (
			isActive &&
			textAreaRef &&
			"current" in textAreaRef &&
			textAreaRef.current
		) {
			console.log(
				`Tab ${id} is changing to ${textAreaRef.current.setValue(tabText)}`
			);
			textAreaRef.current.setValue(tabText);
		}

		if (!initialized.current) {
			console.log("calling...");
			fetchString();
			initialized.current = true;
		}

		return () => {
			// if (textAreaRef.current) {
			// 	textAreaRef.current.removeEventListener("input", handleChange);
			// }
		};
	}, [isActive, textAreaRef, id]);

	return (
		<div
			className={`${className} ${isActive ? "active" : ""}`}
			onClick={() => {
				if (textAreaRef && "current" in textAreaRef && textAreaRef.current) {
					textAreaRef.current.setValue(tabText);
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
