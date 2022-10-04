import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Summary = ({ users }) => {
	if (!users) {
		return null;
	}

	return (
		<Container className="mt-5 text-left">
			<Container>
				<Row className="justify-content-md-center">
					<Col xs lg="2">
						<h3>Users</h3>
					</Col>
					<Col xs lg="2">
						<h3>Blogs created</h3>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col xs lg="2">
						{users.users.map((user) => {
							return (
								<p key={user.id}>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</p>
							);
						})}
					</Col>
					<Col xs lg="2">
						{users.users.map((user) => {
							return <p key={user.id}>{user.blogs.length}</p>;
						})}
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default Summary;
