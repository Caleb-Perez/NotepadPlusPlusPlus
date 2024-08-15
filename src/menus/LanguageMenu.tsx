// import { MenuProps } from "../components/Menu";
// import React, { createContext, useState, ReactNode, useRef } from "react";
// import { useTextBox } from "../components/Textbox";
// import * as monaco from "monaco-editor";

// // enum Language {
// // 	"None",
// // 	"Python",
// // 	"JavaScript",
// // 	"C++",
// // 	"Java",
// // }

// // const editorRef = useTextBox();
// // const monacoInstance = useRef<monaco.editor.ITextModel | null>(null);

// //

// import * as monacoEditor from "monaco-editor";

// enum Language {
// 	None = "plaintext",
// 	Python = "python",
// 	JavaScript = "javascript",
// 	CPlusPlus = "cpp",
// 	Java = "java",
// }

// const LanguageContext = createContext<{
// 	language: Language;
// 	setLanguage: (language: Language) => void;
// }>({
// 	language: Language.Python,
// 	setLanguage: () => {},
// });

// const editorRef = useTextBox();

// const changeLanguage = (language: Language) => {
// 	if (editorRef.current) {
// 		const model = editorRef.current.getModel();
// 		if (model) {
// 			monacoEditor.editor.setModelLanguage(model, language);
// 		}
// 	}
// };

// type LanguageProviderProps = {
// 	children: ReactNode;
// };

// export const LanguageProvider: React.FC<LanguageProviderProps> = ({
// 	children,
// }) => {
// 	const [language, setLanguage] = useState<Language>(Language.None);

// 	return (
// 		<LanguageContext.Provider value={{ language, setLanguage }}>
// 			{children}
// 		</LanguageContext.Provider>
// 	);
// };

// export const LanguageMenu: MenuProps = {
// 	title: "Language",
// 	options: [
// 		{ label: "None", class: "", action: () => changeLanguage(Language.None) },
// 		{
// 			label: "Python",
// 			class: "",
// 			action: () => changeLanguage(Language.Python),
// 		},
// 		{
// 			label: "JavaScript",
// 			class: "",
// 			action: () => changeLanguage(Language.JavaScript),
// 		},
// 		{
// 			label: "C++",
// 			class: "",
// 			action: () => changeLanguage(Language.CPlusPlus),
// 		},
// 		{
// 			label: "Java",
// 			class: "",
// 			action: () => changeLanguage(Language.Java),
// 		},
// 	],
// };
//

// import { MenuProps } from "../components/Menu";
// import React, {
// 	createContext,
// 	useEffect,
// 	useState,
// 	ReactNode,
// 	useRef,
// 	useContext,
// } from "react";
// import { useTextBox } from "../components/Textbox";
// import * as monacoEditor from "monaco-editor";

// enum Language {
// 	None = "plaintext",
// 	Python = "python",
// 	JavaScript = "javascript",
// 	CPlusPlus = "cpp",
// 	Java = "java",
// }

// const LanguageContext = createContext<{
// 	language: Language;
// 	setLanguage: (language: Language) => void;
// }>({
// 	language: Language.Python,
// 	setLanguage: () => {},
// });

// type LanguageProviderProps = {
// 	children: ReactNode;
// };

// export const LanguageProvider: React.FC<LanguageProviderProps> = ({
// 	children,
// }) => {
// 	const [language, setLanguage] = useState<Language>(Language.None);

// 	return (
// 		<LanguageContext.Provider value={{ language, setLanguage }}>
// 			{children}
// 		</LanguageContext.Provider>
// 	);
// };

// // const changeLanguage = (language: Language) => {
// // 	const editorRef = useTextBox();
// // 	if (editorRef.current) {
// // 		const model = editorRef.current.getModel();
// // 		if (model) {
// // 			monacoEditor.editor.setModelLanguage(model, language);
// // 		}
// // 	}
// // };

// export const LanguageMenuComponent: React.FC = () => {
// 	const { setLanguage } = useContext(LanguageContext);
// 	const [isActive, setIsActive] = useState(false);
// 	const dropdownRef = useRef<HTMLDivElement>(null);

// 	const LanguageMenu: MenuProps = {
// 		title: "Language",
// 		options: [
// 			{ label: "None", class: "", action: () => setLanguage(Language.None) },
// 			{
// 				label: "Python",
// 				class: "",
// 				action: () => setLanguage(Language.Python),
// 			},
// 			{
// 				label: "JavaScript",
// 				class: "",
// 				action: () => setLanguage(Language.JavaScript),
// 			},
// 			{
// 				label: "C++",
// 				class: "",
// 				action: () => setLanguage(Language.CPlusPlus),
// 			},
// 			{
// 				label: "Java",
// 				class: "",
// 				action: () => setLanguage(Language.Java),
// 			},
// 		],
// 	};

// 	useEffect(() => {
// 		const handleClickOutside = (event: MouseEvent) => {
// 			if (
// 				dropdownRef.current &&
// 				!dropdownRef.current.contains(event.target as Node)
// 			) {
// 				setIsActive(false);
// 			}
// 		};

// 		document.addEventListener("mousedown", handleClickOutside);

// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, []);

// 	const handleTitleClick = () => {
// 		setIsActive(!isActive);
// 	};

// 	return (
// 		<div
// 			className={`menu ${isActive ? "active" : ""}`}
// 			ref={dropdownRef}
// 			onClick={handleTitleClick}>
// 			<div className="title">Language</div>
// 			{isActive && (
// 				<ul className="dropdown">
// 					{LanguageMenu.options.map((option, index) => (
// 						<li key="index" className={option.class} onClick={option.action}>
// 							{option.label}
// 						</li>
// 					))}{" "}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

import { MenuProps } from "../components/Menu";
import React, {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useRef,
	useContext,
} from "react";
import { useTextBox } from "../components/Textbox";
import * as monacoEditor from "monaco-editor";

enum Language {
	None = "plaintext",
	Python = "python",
	JavaScript = "javascript",
	CPlusPlus = "cpp",
	Java = "java",
}

const LanguageContext = createContext<{
	language: Language;
	setLanguage: (language: Language) => void;
}>({
	language: Language.Python,
	setLanguage: () => {},
});

type LanguageProviderProps = {
	children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
	children,
}) => {
	const [language, setLanguage] = useState<Language>(Language.None);

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const LanguageMenuComponent: React.FC = () => {
	const { language, setLanguage } = useContext(LanguageContext);
	const editorRef = useTextBox();
	const [isActive, setIsActive] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const LanguageMenu: MenuProps = {
		title: "Language",
		options: [
			{ label: "None", class: "", action: () => setLanguage(Language.None) },
			{
				label: "Python",
				class: "",
				action: () => setLanguage(Language.Python),
			},
			{
				label: "JavaScript",
				class: "",
				action: () => setLanguage(Language.JavaScript),
			},
			{
				label: "C++",
				class: "",
				action: () => setLanguage(Language.CPlusPlus),
			},
			{
				label: "Java",
				class: "",
				action: () => setLanguage(Language.Java),
			},
		],
	};

	useEffect(() => {
		if (editorRef.current) {
			const model = editorRef.current.getModel();
			if (model) {
				console.log(`Editor language is now: ${language}`);
				monacoEditor.editor.setModelLanguage(model, language);
			}
		}
	}, [language, editorRef]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleTitleClick = () => {
		setIsActive(!isActive);
	};

	const handleOptionClick = (action: () => void) => {
		action();
		setIsActive(false);
	};

	return (
		<div
			className={`menu ${isActive ? "active" : ""}`}
			ref={dropdownRef}
			onClick={handleTitleClick}>
			<div className="title">Language</div>
			{isActive && (
				<ul className="dropdown">
					{LanguageMenu.options.map((option, index) => (
						<li
							key={index}
							className={option.class}
							onClick={() => handleOptionClick(option.action)}>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
