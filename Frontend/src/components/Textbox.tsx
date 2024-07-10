import React, { useRef, useEffect } from "react";

const TextBox: React.FC = () => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const lineNumberRef = useRef<HTMLDivElement>(null);

	const updateLineNum = () => {
		if (lineNumberRef.current && textAreaRef.current) {
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
		if (lineNumberRef.current && textAreaRef.current) {
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

export default TextBox;
