import React from "react";
import { useDispatch } from "react-redux";

import { logoutUser } from "../reducers/userReducer";
import Notification from "./Notification";

const Summary = ({ users }) => {
	const container = {
		display: "flex",
		width: "300px",
	};
	const flexChild = { alignSelf: "flex-end", marginBottom: "10px" };
	const marginLeft = { marginLeft: "10px" };
	const dispatch = useDispatch();

	return (
		<div>
			<h2>blogs</h2>
			<br />
			<div>
				<p>
					<b>{users.loginUser.name}</b> logged in
				</p>
				<button
					onClick={() => {
						window.localStorage.clear();
						dispatch(logoutUser());
					}}
				>
					Logout
				</button>
			</div>
			<br />
			<Notification />
			<div>
				<h2>Users</h2>

				<div style={container}>
					<div style={flexChild}>
						<br />
						{users.users.map((user) => {
							return <p key={user.id}>{user.name}</p>;
						})}
					</div>
					<div style={flexChild}>
						<h3>Blogs created</h3>
						{users.users.map((user) => {
							return (
								<p style={marginLeft} key={user.id}>
									{user.blogs.length}
								</p>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Summary;
