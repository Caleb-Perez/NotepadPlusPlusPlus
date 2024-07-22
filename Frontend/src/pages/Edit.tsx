import React from "react";
import { TextBoxProvider, TextBox } from "../components/Textbox";
import EditBar from "../components/EditBar";

const EditPage: React.FC = () => {
	return (
		<div className="edit-page">
			<TextBox />
			<EditBar />
		</div>
	);
};

export default EditPage;
