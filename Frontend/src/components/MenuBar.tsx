// import React from "react";
// import { useState } from "react";
// import Menu, { MenuProps } from "./Menu";

// interface MenuBarProps {
// 	menus: MenuProps[];
// }

// const MenuBar: React.FC<MenuBarProps> = ({ menus }) => {
// 	const [activeMenu, setActiveMenu] = useState<number | null>(null);

// 	const handleMenuClick = (index: number) => {
// 		setActiveMenu(activeMenu === index ? null : index);
// 	};
// 	return (
// 		<nav className="menu-bar">
// 			{menus.map((menu, index) => (
// 				<Menu
// 					key={index}
// 					title={menu.title}
// 					options={menu.options}
// 					isActive={activeMenu === index}
// 					onClick={() => handleMenuClick(index)}
// 				/>
// 			))}
// 		</nav>
// 	);
// };

// export default MenuBar;
import React from "react";
import Menu, { MenuProps } from "./Menu";

interface MenuBarProps {
	menus: MenuProps[];
}

const MenuBar: React.FC<MenuBarProps> = ({ menus }) => {
	return (
		<nav className="menu-bar">
			{menus.map((menu, index) => (
				<Menu key={index} title={menu.title} options={menu.options} />
			))}
		</nav>
	);
};

export default MenuBar;
