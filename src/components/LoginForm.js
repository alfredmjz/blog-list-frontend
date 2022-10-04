import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ userLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (event) => {
		event.preventDefault();
		userLogin({ username, password });
		setUsername("");
		setPassword("");
	};

	return (
		<>
			<Form onSubmit={handleLogin}>
				<Form.Group className="mb-3">
					<Form.Label>Username:</Form.Label>
					<Form.Control
						type="text"
						id="username"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password: </Form.Label>
					<Form.Control
						type="text"
						id="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Login
				</Button>
			</Form>
		</>
	);
};

LoginForm.propTypes = {
	userLogin: PropTypes.func.isRequired,
};

export default LoginForm;
