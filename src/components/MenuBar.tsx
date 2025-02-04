import React from "react";
import Menu, { MenuProps } from "./Menu";
import { LanguageMenuComponent } from "../menus/LanguageMenu";
interface MenuBarProps {
	menus: MenuProps[];
}

const MenuBar: React.FC<MenuBarProps> = ({ menus }) => {
	return (
		<nav className="menu-bar">
			{menus.map((menu, index) => (
				<Menu key={index} title={menu.title} options={menu.options} />
			))}
			<LanguageMenuComponent />
		</nav>
	);
};

export default MenuBar;
