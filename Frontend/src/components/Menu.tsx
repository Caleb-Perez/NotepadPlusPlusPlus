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
		<div
			className={`menu ${isActive ? "active" : ""}`}
			ref={dropdownRef}
			onClick={handleTitleClick}>
			<div className="title">{title}</div>
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
