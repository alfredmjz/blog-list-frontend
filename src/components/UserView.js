import React from "react";
import { Container, Stack } from "react-bootstrap";
import { useMatch } from "react-router-dom";

const UserView = ({ blogsList, usersList }) => {
	if (!usersList) {
		return null;
	}

	const match = useMatch("/users/:id");
	const inViewUser = match ? usersList.users.find((user) => user.id === match.params.id) : null;

	return (
		<Container className="mt-5">
			<h1 className="mb-3">{inViewUser.name}</h1>
			<h3 className="mb-3">Added blogs</h3>
			<Stack gap={2}>
				{blogsList.map((blog) =>
					blog.user === inViewUser.id ? (
						<div className="bg-light border ps-2" key={blog.id}>
							{blog.title}
						</div>
					) : null
				)}
			</Stack>
		</Container>
	);
};

export default UserView;
