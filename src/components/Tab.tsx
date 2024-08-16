import { useRef } from "react";

interface TabProps {
	id: string;
	label: string;
	className: string;
	onClick: () => void;
	onDelete: () => void;
	isActive: boolean;
}

const Tab: React.FC<TabProps> = ({
	id,
	label,
	className,
	onClick,
	onDelete,
	isActive,
}) => {
	const initialized = useRef(false);

	return (
		<div
			className={`${className} ${isActive ? "active" : ""}`}
			onClick={() => {
				onClick();
			}}
			id={id}
			key={id}>
			<div className="tab-title">{label}</div>
			<span
				className="close-tab"
				onClick={(e) => {
					onDelete();
					e.stopPropagation();
				}}>
				&#10005;
			</span>
		</div>
	);
};
export default Tab;
