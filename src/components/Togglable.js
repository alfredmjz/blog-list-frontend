import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
		<section style={{ position: "relative", marginBottom: "10px" }}>
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

Togglable.displayName = "Togglable";

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
