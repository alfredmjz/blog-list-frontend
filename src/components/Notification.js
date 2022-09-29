import { useSelector } from "react-redux";
import "./styles/Notification.css";

const Notification = () => {
	const notif = useSelector((state) => {
		return state.notification;
	});

	if (notif.message.length > 0) {
		return notif.error ? (
			<div id="green">
				<h3 id="notification-text">{notif.message}</h3>
			</div>
		) : (
			<div id="red">
				<h3 id="notification-text">{notif.message}</h3>
			</div>
		);
	}
};

export default Notification;
