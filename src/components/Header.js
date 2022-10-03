import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Header = ({ users }) => {
	const dispatch = useDispatch();
	const flexContainer = {
		display: "flex",
		width: "20%",
		justifyContent: "space-between",
	};

	const header = {
		width: "100%",
		backgroundColor: "rgb(202, 202, 202)",
	};
	return (
		<div style={header}>
			<div style={flexContainer}>
				<div>
					<Link
						to={{
							pathname: "/",
						}}
					>
						Blogs
					</Link>
				</div>

				<div>
					<Link
						to={{
							pathname: "/users",
							state: users,
						}}
					>
						User
					</Link>
				</div>
				<div>
					<b>{users.loginUser.name}</b> logged in
					<button
						onClick={() => {
							window.localStorage.clear();
							dispatch(logoutUser());
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
