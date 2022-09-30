import React from "react";
import { useMatch } from "react-router-dom";

const UserView = ({ blogsList, usersList }) => {
	if (!usersList) {
		return null;
	}

	const match = useMatch("/users/:id");
	const inViewUser = match ? usersList.users.find((user) => user.id === match.params.id) : null;

	const container = {
		display: "flex",
		flexFlow: "column",
	};

	return (
		<>
			<div style={container}>
				<h2>{inViewUser.name}</h2>
				<h3>Added blogs</h3>
				<ul>{blogsList.map((blog) => (blog.user === inViewUser.id ? <li key={blog.id}>{blog.title}</li> : null))}</ul>
			</div>
		</>
	);
};

export default UserView;
