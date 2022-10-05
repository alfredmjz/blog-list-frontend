import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const RegisterForm = ({ userRegister }) => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = (event) => {
		event.preventDefault();
		userRegister({ username, password, name });
		setName("");
		setUsername("");
		setPassword("");
	};

	return (
		<Form onSubmit={handleRegister}>
			<Form.Group className="mb-3">
				<Form.Label>Name:</Form.Label>
				<Form.Control type="text" id="name" value={name} onChange={({ target }) => setName(target.value)} />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Username:</Form.Label>
				<Form.Control type="text" id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Password: </Form.Label>
				<Form.Control type="text" id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
			</Form.Group>
			<Button type="submit" variant="primary">
				Register
			</Button>
		</Form>
	);
};

RegisterForm.propTypes = {
	userRegister: PropTypes.func.isRequired,
};

export default RegisterForm;
