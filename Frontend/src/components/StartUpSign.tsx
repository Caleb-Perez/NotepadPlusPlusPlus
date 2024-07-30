import { render } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { readBuilderProgram } from "typescript";
import PopUp from "./PopUp";
import { ReactComponent as FolderLogo } from "../assets/folder.svg";

type StartUpSignProps = {
	openPopup: () => void;
};
const StartUpSign: React.FC = () => {
	const [goToEditPage, setGoToEditPage] = React.useState(false);
	const inputFile = useRef<HTMLInputElement | null>(null);
	const [openPopUp, setPopUp] = useState(false);

	if (goToEditPage) {
		return <Navigate to="/edit" />;
	}

	const openFileBrowser = () => {
		if (inputFile.current) {
			inputFile.current.click();
		}
	};

	const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const files = event.target.files;
		if (files) {
			const file = files[0];
			const reader = new FileReader();
			//const fileRef = storageRef.child(file);
			reader.onload = (e) => {
				const fileContent = e.target?.result as string;
				console.log("File content:", fileContent);

				window.location.href = "/edit"; //will fix later
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className="container">
			<main>
				<div className="welcome-text">
					<h1>Start</h1>
					<h1>&emsp;Here</h1>
				</div>
				<div className="buttons">
					<button id="open-file" onClick={openFileBrowser}>
						<FolderLogo /> <span className="open">Open file</span>
					</button>
					{/*if "style = {{display: 'none'}}" is removed, the file browser wont open but you can drag a file and it will work. Still in progress*/}
					<input
						ref={inputFile}
						accept=".txt,.cpp,.py,.js"
						type="file"
						onChange={handleFile}
						style={{ display: "none" }}
					/>
					<button id="create-new" onClick={() => setPopUp(true)}>
						<span className="icon">
							<span className="plus">+</span>
							{/*➕*/}
						</span>{" "}
						Create New
					</button>
				</div>
				<div className={`pop-up ${openPopUp ? "open-popup" : ""}`} id="pop-up">
					<button
						className="close-btn"
						id="close-btn"
						onClick={() => setPopUp(false)}
					>
						&times;
					</button>
					<h2>Create New</h2>
					<p>Select the type of file you want:</p>
					<button
						className="link-button-pop-up"
						onClick={() => setGoToEditPage(true)}
					>
						Text File
					</button>
					<button
						className="link-button-pop-up"
						onClick={() => setGoToEditPage(true)}
					>
						Python File
					</button>
					<button
						className="link-button-pop-up"
						onClick={() => setGoToEditPage(true)}
					>
						C++ File
					</button>
					<button
						className="link-button-pop-up"
						onClick={() => setGoToEditPage(true)}
					>
						Java File
					</button>
				</div>
			</main>
		</div>
	);
};

export default StartUpSign;
