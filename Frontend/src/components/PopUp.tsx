import React, {useState} from "react";


const PopUp: React.FC = () => {
	const [popupVisible, setPopupVisible] = useState<boolean>(false);

    const togglePopup = () => {
	setPopupVisible(!popupVisible);
}

	const closePopup: React.MouseEventHandler<HTMLButtonElement> = () => {};
	return (
		<div className="pop-up" id="pop-up">
			<button className="close-btn " id="close-btn" onClick={closePopup}>
				&times;
			</button>
			<h2>Create New</h2>
			<p>Select the type of file you want:</p>
		
			<a href="text.html" className="link-button-pop-up">
				Text File
			</a>
			<a href="text.html" className="link-button-pop-up">
				Python File
			</a>
			<a href="text.html" className="link-button-pop-up">
				C++ File
			</a>
			<a href="text.html" className="link-button-pop-up">
				Java File
			</a>
		</div>
	);
};

export default PopUp;
