import React from "react";

const StartUpSign: React.FC = () => {
	const openFile: React.MouseEventHandler<HTMLButtonElement> = () => {};
	const createNewFile: React.MouseEventHandler<HTMLButtonElement> = () => {};
	return (
		<div className="container">
			<main>
				<div className="welcome-text">
					<h1>Start</h1>
					<h2>Here</h2>
				</div>
				<div className="buttons">
					<button id="open-file" onClick={openFile}>
						<span className="icon">📂</span> Open file
					</button>
					<button id="create-new" onClick={createNewFile}>
						<span className="icon">➕</span> Create New
					</button>
				</div>
			</main>
		</div>
	);
};

export default StartUpSign;
