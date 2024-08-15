import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LanguageContext } from "../menus/LanguageMenu";
import { Language } from "../menus/LanguageMenu";

interface propTypes {
	open: boolean;
	onClose: () => void;
}

const PopUp: React.FC<propTypes> = ({ open, onClose }) => {
	const [goToEditPage, setGoToEditPage] = React.useState(false);
	const { language, setLanguage } = useContext(LanguageContext);
	if (!open) return null;

	if (goToEditPage) {
		return <Navigate to="/edit" />;
	}

	return (
		<div className="pop-up" id="pop-up">
			<button className="close-btn " id="close-btn" onClick={onClose}>
				&times;
			</button>
			<h2>Create New</h2>
			<p>Select the type of file you want:</p>
			<Link
				to="/edit"
				className="link-button-pop-up"
				onClick={() => {
					setLanguage(Language.None);
					setGoToEditPage(true);
				}}>
				Text File
			</Link>
			<Link
				to="/edit"
				className="link-button-pop-up"
				onClick={() => {
					console.log("PYTHONNNNN");
					setLanguage(Language.Python);
					setGoToEditPage(true);
				}}>
				Python File
			</Link>
			<Link
				to="/edit"
				className="link-button-pop-up"
				onClick={() => {
					setLanguage(Language.CPlusPlus);
					setGoToEditPage(true);
				}}>
				C++ File
			</Link>
			<Link
				to="/edit"
				className="link-button-pop-up"
				onClick={() => {
					setLanguage(Language.Java);
					setGoToEditPage(true);
				}}>
				Java File
			</Link>
		</div>
	);
};

export default PopUp;
