import React from "react";
import MenuBar from "./MenuBar";
import { ViewMenu } from "./../menus/ViewMenu";
import { LanguageMenu } from "./../menus/LanguageMenu";
import { FileMenu } from "./../menus/FileMenu";
import { HelpMenu } from "./../menus/HelpMenu";

const SecondTopBar: React.FC = () => {
	return (
		<header className="second-top-bar">
			<MenuBar menus={[FileMenu, ViewMenu, LanguageMenu, HelpMenu]} />
		</header>
	);
};

export default SecondTopBar;
