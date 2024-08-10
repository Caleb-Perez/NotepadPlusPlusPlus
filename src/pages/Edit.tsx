import React from "react";
import { TextBoxProvider, TextBox } from "../components/Textbox";
import EditTitleBar from "../components/EditTitleBar";
import EditBar from "../components/EditBar";
import SecondTopBar from "../components/SecondTopBar";

const EditPage: React.FC = () => {
	return (
		<div className="edit-page">
			<EditTitleBar />
			<SecondTopBar />
			<TextBox />
			<EditBar />
		</div>
	);
};

export default EditPage;
