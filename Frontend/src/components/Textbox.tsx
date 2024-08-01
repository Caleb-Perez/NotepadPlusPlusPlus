import React, {
	useRef,
	useEffect,
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";
import { EndOfLineState } from "typescript";

interface EditBarType {
	//base on cursor pos
	line: number;
	col: number;
	setLine: React.Dispatch<React.SetStateAction<number>>;
	setCol: React.Dispatch<React.SetStateAction<number>>;
}
interface TextBoxContextType {
	textAreaRef: React.RefObject<HTMLTextAreaElement>;
	editBarType: EditBarType;
}

const TextBoxContext = createContext<TextBoxContextType | undefined>(undefined);

export const TextBoxProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	//TODO Move cursor when user clicks on a new location
	const [line, setLine] = useState(1);
	const [col, setCol] = useState(1);

	//for tracking current pos
	const editBarType: EditBarType = {
		line,
		col,
		setLine,
		setCol,
	};

	return (
		<TextBoxContext.Provider value={{ textAreaRef, editBarType }}>
			{children}
		</TextBoxContext.Provider>
	);
};

export const useTextBox = (): TextBoxContextType => {
	const context = useContext(TextBoxContext);
	if (!context) {
		throw new Error("useTextBox must be used within a TextBoxProvider");
	}
	return context;
};

export const TextBox: React.FC = () => {
	const { textAreaRef, editBarType } = useTextBox();
	const lineNumberRef = useRef<HTMLDivElement>(null);

	const updateLineNum = () => {
		if (
			lineNumberRef.current &&
			textAreaRef &&
			"current" in textAreaRef &&
			textAreaRef.current
		) {
			const textLines = textAreaRef.current.value.split("\n");
			const displayLines = Math.max(textLines.length, 50);
			const lineNUmbers = Array.from(
				{ length: displayLines },
				(_, index) => index + 1
			);
			lineNumberRef.current.innerHTML = lineNUmbers.join("<br>");
		}
	};

	const handleScroll = () => {
		if (
			lineNumberRef.current &&
			textAreaRef &&
			"current" in textAreaRef &&
			textAreaRef.current
		) {
			lineNumberRef.current.scrollTop = textAreaRef.current.scrollTop;
		}
	};

	const autoClosing = (event: KeyboardEvent) => {
		const textArea = textAreaRef.current;
		if (!textArea) return;

		let pos = textArea.selectionStart;
		const before = textArea.value.substr(0, pos);
		const after = textArea.value.substr(pos, textArea.value.length);

		let newText = textArea.value;

		if (event.key === "{") {
			newText = before + "{}" + after;
			pos += 1;
		} else if (event.key === "[") {
			newText = before + "[]" + after;
			pos += 1;
		} else if (event.key === "(") {
			newText = before + "()" + after;
			pos += 1;
		} else if (event.key === "'") {
			newText = before + "''" + after;
			pos += 1;
		} else if (event.key === '"') {
			newText = before + '""' + after;
			pos += 1;
		} else if (event.key === "Tab") {
			newText = before + "\t" + after;
			pos += 1;
		}
		//for the auto-indentation
		else if (event.key === "Enter") {
			const posCurrentLine = before.lastIndexOf("\n") + 1;
			const currentLine = before.substring(posCurrentLine);
			const currentIndent = currentLine.match(/^\s*/);
			const indent = currentIndent ? currentIndent[0] : "";

			if (before.endsWith("{")) {
				newText = before + "\n" + indent + "\t\n" + indent + after;
				pos = before.length + 1 + indent.length + 1;
			} else if (before.endsWith("[")) {
				newText = before + "\n" + indent + "\t\n" + indent + after;
				pos = before.length + 1 + indent.length + 1;
			} else if (before.endsWith("(")) {
				newText = before + "\n" + indent + "\t\n" + indent + after;
				pos = before.length + 1 + indent.length + 1;
			} else {
				//help keeps the pos after indenting
				newText = before + "\n" + indent + after;
				pos = before.length + 1 + indent.length;
			}
		}

		if (newText !== textArea.value) {
			event.preventDefault();
			textArea.value = newText; //update
			textArea.selectionStart = pos;
			textArea.selectionEnd = pos;
			textArea.value = newText; //update
			setTimeout(updateLineNum, 0);
		}
	};

	const updatePosition = () => {
		const textArea = textAreaRef.current;
		if (!textArea) return;

		if (textArea) {
			const { selectionStart } = textArea; //starting postion of text
			const textUpToCursor = textArea.value.slice(0, selectionStart);
			const line = textUpToCursor.split("\n");
			const currentLine = line.length;
			const currentCol = line[line.length - 1].length;
			editBarType.setLine(currentLine);
			editBarType.setCol(currentCol);
		}
	};

	useEffect(() => {
		const textArea = textAreaRef.current;

		if (textArea) {
			textArea.addEventListener("scroll", handleScroll);
			textArea.addEventListener("input", updateLineNum);
			textArea.addEventListener("keydown", autoClosing);
			textArea.addEventListener("keyup", updatePosition); //needed so it can update the line number that you are on by itself
			updateLineNum();

			return () => {
				textArea.removeEventListener("scroll", handleScroll);
				textArea.removeEventListener("input", updateLineNum);
				textArea.removeEventListener("keydown", autoClosing);
				textArea.removeEventListener("keyup", updatePosition);
			};
		}
	}, []);

	return (
		<div className="text-container">
			<div className="line-numbers" ref={lineNumberRef} />
			<textarea
				ref={textAreaRef}
				id="text-editor"
				className="text-area"
				placeholder="Type your text here..."
				onScroll={handleScroll}
			/>
		</div>
	);
};

export default TextBoxProvider;
