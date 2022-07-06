import "./styles/Notification.css";

const Notification = (props) => {
	const { message } = props;
	if (message.length > 0) {
		return message[0] ? (
			<div id='green'>
				<h3 id='notification-text'>{message}</h3>
			</div>
		) : (
			<div id='red'>
				<h3 id='notification-text'>{message}</h3>
			</div>
		);
	}
};

export default Notification;
