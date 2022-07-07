import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<section style={{ position: "relative", "margin-bottom": "10px" }}>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button style={{ position: "absolute", bottom: "0", left: "5%" }} onClick={toggleVisibility}>
					Cancel
				</button>
			</div>
		</section>
	);
});

export default Togglable;
