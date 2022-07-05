import ErrorHandler from "./ErrorHandler";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = (props) => {
	const { username, setUsername, password, setPassword, setUser, errorMessage, setErrorMessage } = props;

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
				<input type='text' id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
				<br />

				<label>Password: </label>
				<input type='text' id='password' value={password} onChange={({ target }) => setPassword(target.value)} />
				<br />
				<button type='submit'>Login</button>
			</form>
			<ErrorHandler error={errorMessage} />
		</div>
	);
};

export default Login;
