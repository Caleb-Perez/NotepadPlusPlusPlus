// import React from "react";
// import { useEffect, useRef } from "react";

// export interface MenuItemProps {
// 	label: string;
// 	class: string;
// 	action: () => void;
// }

// export interface MenuProps {
// 	title: string;
// 	options: MenuItemProps[];
// 	isActive?: boolean;
// 	onClick?: () => void;
// }

// const Menu: React.FC<MenuProps> = ({ title, options, isActive, onClick }) => {
// 	const dropdownRef = React.createRef<HTMLInputElement>();

// 	useEffect(() => {
// 		const handler = (event: Event) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// 				onClick();
// 			}

// 			document.addEventListener("click", handler);

// 			return () => {
// 				document.removeEventListener("click", handler);
// 			};
// 		};
// 	}, [dropdownRef]);
// 	return (
// 		<div className={`menu ${isActive ? "active" : ""}`} ref={dropdownRef}>
// 			<div className="title" onClick={onClick}>
// 				{title}
// 			</div>
// 			{isActive && (
// 				<ul className="dropdown">
// 					{options.map((option, index) => (
// 						<li key={index} className={option.class} onClick={option.action}>
// 							{option.label}
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default Menu;

import React, { useEffect, useRef, useState } from "react";

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
	const [isActive, setIsActive] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleTitleClick = () => {
		setIsActive(!isActive);
	};

	return (
		<div className={`menu ${isActive ? "active" : ""}`} ref={dropdownRef}>
			<div className="title" onClick={handleTitleClick}>
				{title}
			</div>
			{isActive && (
				<ul className="dropdown">
					{options.map((option, index) => (
						<li key={index} className={option.class} onClick={option.action}>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Menu;
