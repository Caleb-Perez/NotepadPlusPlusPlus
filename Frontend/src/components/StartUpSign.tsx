import { type } from "@testing-library/user-event/dist/type";
import React, {useRef, useState} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {Navigate} from "react-router-dom"
import { readBuilderProgram } from "typescript";
import PopUp from "./PopUp";

type StartUpSignProps = {
	openPopup: () => void;
}
const StartUpSign: React.FC<StartUpSignProps> = ({openPopup}) => {
	const openFile: React.MouseEventHandler<HTMLButtonElement> = () => {};
	const createNewFile: React.MouseEventHandler<HTMLButtonElement> = () => {};
	const [goToEditPage, setGoToEditPage] = React.useState(false);// will delete 
	const inputFile = useRef<HTMLInputElement | null > (null);
	const [openPopUp, setPopUp] = useState(false);

	if (goToEditPage) {
		return <Navigate to ="/edit" />;
	}

	/*
	const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event.target.files;
		if(file){
			const selectedFile = file[0];
			console.log('Selected file:', selectedFile.name);

			const reader = new FileReader();
			reader.onload = (e)=> {
				const fileContent = e.target?.result as string;
                console.log('File content:', fileContent);

			};
			reader.readAsText(file);
		}
	}
	*/

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
						{/* <input
						accept = ".txt, .cpp, .py, .js"
						type= "file"
						style={{display: "none"}}
						onChange={handleFile}
	                    />*/}
					</button>
					{/* Will come back and fix the Create New */}
					{/*<button id="create-new" onClick={openPopup}> 
						<span className="icon">➕</span> Create New
	                </button> */}
					<button id="create-new" onClick= {() => {setGoToEditPage(true); }} > 
						<span className="icon">➕</span> Create New
					</button>

					
					<PopUp open ={openPopUp} onClose={() => setPopUp(false)}/>
				</div>
			</main>
		</div>
	);
};

export default StartUpSign;
