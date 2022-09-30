import React from "react";
import { Link } from "react-router-dom";

const Summary = ({ users }) => {
	if (!users) {
		return null;
	}

	const container = {
		display: "flex",
		width: "300px",
	};
	const flexChild = { alignSelf: "flex-end", marginBottom: "10px" };
	const floatRight = { marginLeft: "10px" };

	return (
		<>
			<div style={container}>
				<div style={flexChild}>
					<h3>Users</h3>

					{users.users.map((user) => {
						return (
							<p key={user.id}>
								<Link to={`/users/${user.id}`}>{user.name}</Link>
							</p>
						);
					})}
				</div>

				<div style={flexChild}>
					<h3>Blogs created</h3>
					{users.users.map((user) => {
						return (
							<p style={floatRight} key={user.id}>
								{user.blogs.length}
							</p>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Summary;
