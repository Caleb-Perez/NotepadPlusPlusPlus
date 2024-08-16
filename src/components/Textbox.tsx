/*
Resource used:

Description: Monaco editor setTheme
Author: Stack Overflow/
Date: May 9, 2018
URL: https://stackoverflow.com/questions/47393659/monaco-editor-settheme-is-not-a-function

Description: background color in monaco editer 
Author: Stack Overflow/
Date: May 18, 2023
URL: https://stackoverflow.com/questions/47393659/monaco-editor-settheme-is-not-a-function
*/

import React, {
	useRef,
	useEffect,
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";
import { Editor, loader, OnMount } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";

interface TextBoxContextType {
	editorRef: React.MutableRefObject<monacoEditor.editor.IStandaloneCodeEditor | null>;
}

const TextBoxContext = createContext<TextBoxContextType | null>(null);

export const TextBoxProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
		null
	);

	return (
		<TextBoxContext.Provider value={{ editorRef }}>
			{children}
		</TextBoxContext.Provider>
	);
};

export const useTextBox =
	(): React.MutableRefObject<monacoEditor.editor.IStandaloneCodeEditor | null> => {
		const context = useContext(TextBoxContext);
		if (!context) {
			throw new Error("useTextBox must be used within a TextBoxProvider");
		}
		return context.editorRef;
	};

export const TextBox: React.FC = () => {
	const editorRef = useTextBox();
	const [IsThemeLoaded, setIsThemeLoaded] = useState(false);

	useEffect(() => {
		loader.init().then((monacoInstance) => {
			monacoInstance.editor.defineTheme("myTheme", {
				base: "vs-dark",
				inherit: true,
				rules: [],
				colors: {
					"editor.background": "#1c1c1c",
				},
			});
			monacoInstance.editor.setTheme("myTheme");
			setIsThemeLoaded(true);
		});
	}, []);

	if (!IsThemeLoaded) {
		return null;
	}
	const editorOptions = {
		minimap: { enabled: false }, // Disable the minimap
	};

	const handleEditorMount: OnMount = (editor, monaco) => {
		if (editor) {
			if (editorRef) {
				editorRef.current = editor;
			}

			// Example: Add event listener for cursor position changes
			editor.onDidChangeCursorPosition(() => {
				const position = editor.getPosition();
			});
		}
	};
	return (
		<Editor
			theme="myTheme"
			height="90vh"
			defaultLanguage={"plaintext"}
			defaultValue=""
			onMount={handleEditorMount}
			options={editorOptions}
		/>
	);
};

export default TextBoxProvider;