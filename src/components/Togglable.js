import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

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
				<Button variant="primary" onClick={toggleVisibility}>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button
					variant="secondary"
					style={{ position: "absolute", bottom: "0", left: "8%" }}
					onClick={toggleVisibility}
				>
					Cancel
				</Button>
			</div>
		</section>
	);
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
