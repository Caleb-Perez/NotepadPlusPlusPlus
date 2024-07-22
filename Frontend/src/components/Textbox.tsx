import React, {
	useRef,
	useEffect,
	createContext,
	ReactNode,
	useContext,
} from "react";

interface TextBoxContextType {
	textAreaRef: React.RefObject<HTMLTextAreaElement>;
}
const TextBoxContext = createContext<TextBoxContextType | undefined>(undefined);

export const TextBoxProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	return (
		<TextBoxContext.Provider value={{ textAreaRef }}>
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
	const { textAreaRef } = useTextBox();
	const lineNumberRef = useRef<HTMLDivElement>(null);

	const updateLineNum = () => {
		if (
			lineNumberRef.current &&
			textAreaRef &&
			"current" in textAreaRef &&
			textAreaRef.current
		) {
			const textLines = textAreaRef.current.value.split("\n");
			const displayLines = Math.max(textLines.length, 28);
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

	useEffect(() => {
		const textArea = textAreaRef.current;

		if (textArea) {
			textArea.addEventListener("scroll", handleScroll);
			textArea.addEventListener("input", updateLineNum);
			updateLineNum();

			return () => {
				textArea.removeEventListener("scroll", handleScroll);
				textArea.removeEventListener("input", updateLineNum);
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
