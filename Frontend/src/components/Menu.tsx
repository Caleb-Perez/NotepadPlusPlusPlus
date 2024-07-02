import React from "react";

export interface MenuItemProps {
	label: string;
	class: string;
	action: () => void;
}

export interface MenuProps {
	title: string;
	options: MenuItemProps[];
}

const Menu: React.FC<MenuProps> = ({ title, options }) => {
	return (
		<div className="menu">
			<div className="title">{title}</div>
			<ul className="dropdown">
				{options.map((option, index) => (
					<li key={index} className={option.class} onClick={option.action}>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Menu;
