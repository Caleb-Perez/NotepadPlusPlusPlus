import React, { useState } from "react";
import { useTextBox } from "./Textbox";

const EditBar: React.FC = () => {
	const editorRef = useTextBox();
	const [line, setLine] = useState<number | undefined>(0);
	const [col, setCol] = useState<number | undefined>(0);

	if (editorRef && "current" in editorRef && editorRef.current) {
		editorRef.current.onDidChangeCursorPosition(() => {
			if (editorRef && "current" in editorRef && editorRef.current) {
				const position = editorRef.current.getPosition();
				setLine(position?.lineNumber);
				setCol(position?.column);
			}
		});
	}
	return (
		<div className="edit-bar">
			<span>Line: {line} </span>
			<span>Col: {col}</span>
			<span>UTF-8</span>
		</div>
	);
};

export default EditBar;
