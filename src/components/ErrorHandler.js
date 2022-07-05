const ErrorHandler = ({ error }) => {
	if (error) {
		return (
			<div>
				<p style={{ color: "red" }}>{error}</p>
			</div>
		);
	}
};

export default ErrorHandler;
