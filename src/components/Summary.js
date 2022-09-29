import React from "react";

const Summary = ({ users }) => {
	const container = {
		display: "flex",
		width: "300px",
	};

	const flexChild = { alignSelf: "flex-end", marginBottom: "10px" };
	const marginLeft = { marginLeft: "10px" };
	return (
		<div style={container}>
			<div style={flexChild}>
				<br />
				{users.map((user) => {
					return <p key={user.id}>{user.name}</p>;
				})}
			</div>
			<div style={flexChild}>
				<h3>Blogs created</h3>
				{users.map((user) => {
					return (
						<p style={marginLeft} key={user.id}>
							{user.blogs.length}
						</p>
					);
				})}
			</div>
		</div>
	);
};

export default Summary;
