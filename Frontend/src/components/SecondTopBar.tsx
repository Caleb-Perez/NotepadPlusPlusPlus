import React from "react";
import MenuBar from "./MenuBar";
import { ViewMenu } from "./../ViewMenu";
import { LanguageMenu } from "./../LanguageMenu";
import { FileMenu } from "./../FileMenu";
import { HelpMenu } from "./../HelpMenu";
const SecondTopBar: React.FC = () => {
	return (
		<header className="second-top-bar">
			<MenuBar menus={[FileMenu, ViewMenu, LanguageMenu, HelpMenu]} />
		</header>
	);
};

export default SecondTopBar;
