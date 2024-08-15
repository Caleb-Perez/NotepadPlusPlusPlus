// import { MenuProps } from "../components/Menu";
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

export enum Language {
	None = "plaintext",
	Python = "python",
	JavaScript = "javascript",
	CPlusPlus = "cpp",
	Java = "java",
}

export const LanguageContext = createContext<{
	language: Language;
	setLanguage: (language: Language) => void;
}>({
	language: Language.Python,
	setLanguage: () => {},
});

type LanguageProviderProps = {
	children: ReactNode;
};

interface MenuProps {
	title: string;
	options: MenuItemProps[];
}

interface MenuItemProps {
	label: string;
	class: string;
	action: () => void;
	lang: Language;
}

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
			{
				label: "None",
				class: "",
				action: () => setLanguage(Language.None),
				lang: Language.None,
			},
			{
				label: "Python",
				class: "",
				action: () => setLanguage(Language.Python),
				lang: Language.Python,
			},
			{
				label: "JavaScript",
				class: "",
				action: () => setLanguage(Language.JavaScript),
				lang: Language.JavaScript,
			},
			{
				label: "C++",
				class: "",
				action: () => setLanguage(Language.CPlusPlus),
				lang: Language.CPlusPlus,
			},
			{
				label: "Java",
				class: "",
				action: () => setLanguage(Language.Java),
				lang: Language.Java,
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
							className={`option${language === option.lang ? " active" : ""}`}
							onClick={() => handleOptionClick(option.action)}>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
