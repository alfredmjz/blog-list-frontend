import { useState } from "react";
import PropTypes from "prop-types";

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
			<form onSubmit={handleLogin}>
				<label>Username:</label>
				<input type='text' id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
				<br />

				<label>Password: </label>
				<input type='text' id='password' value={password} onChange={({ target }) => setPassword(target.value)} />
				<br />
				<button type='submit' id='login-button'>
					Login
				</button>
			</form>
		</>
	);
};

LoginForm.propTypes = {
	userLogin: PropTypes.func.isRequired,
};

export default LoginForm;
