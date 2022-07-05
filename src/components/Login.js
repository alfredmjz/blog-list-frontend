import { useState } from "react";
import ErrorHandler from "./ErrorHandler";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = (props) => {
	const { username, setUsername, password, setPassword, setUser } = props;
	const [errorMessage, setErrorMessage] = useState(null);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const inputUser = await loginService.login({ username, password });
			window.localStorage.setItem("loggedUser", JSON.stringify(inputUser));
			blogService.setToken(inputUser.token);
			setUser(inputUser);
			setUsername("");
			setPassword("");
		} catch (error) {
			setErrorMessage("Username/Password is wrong");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<label>Username:</label>
				<input type='text' id='username' name='username' onChange={({ target }) => setUsername(target.value)} />
				<br />

				<label>Password: </label>
				<input type='text' id='password' name='password' onChange={({ target }) => setPassword(target.value)} />
				<br />
				<input type='submit' value='Login' />
			</form>
			<ErrorHandler error={errorMessage} />
		</div>
	);
};

export default Login;
