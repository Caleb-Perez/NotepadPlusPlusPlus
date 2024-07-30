import React from "react";
import { useTextBox } from "./Textbox";

const EditBar: React.FC = () => {
	const {editBarType} = useTextBox();
	return (
		<div className="edit-bar">
			<span>Line: {editBarType.line} </span>
			<span>Col: {editBarType.col}</span>
			<span>UTF-8</span>
		</div>
	);
};

export default EditBar;
