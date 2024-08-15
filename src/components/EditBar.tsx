import React, { useEffect, useState } from "react";
import { useTextBox } from "./Textbox";
import * as monaco from "monaco-editor";

const EditBar: React.FC = () => {
	const editorRef = useTextBox();
	const [line, setLine] = useState<number | undefined>(1);
	const [col, setCol] = useState<number | undefined>(1);
	const [contentChangeDisposable, setContentChangeDisposable] =
		useState<monaco.IDisposable | null>(null);

	useEffect(() => {
		if (editorRef && "current" in editorRef && editorRef.current) {
			setContentChangeDisposable(
				editorRef.current.onDidChangeCursorPosition(() => {
					if (editorRef && "current" in editorRef && editorRef.current) {
						const position = editorRef.current.getPosition();
						console.log("he there");
						setLine(position?.lineNumber);
						setCol(position?.column);
					}
				})
			);
		}
		console.log("You wish");

		return () => {
			if (contentChangeDisposable) contentChangeDisposable.dispose();
		};
	}, [editorRef.current?.getValue()]);

	return (
		<div className="edit-bar">
			<span>Line: {line} </span>
			<span>Col: {col}</span>
			<span>UTF-8</span>
		</div>
	);
};

export default EditBar;
