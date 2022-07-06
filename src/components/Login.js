import Notification from "./Notification";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = (props) => {
	const { username, setUsername, password, setPassword, setUser, message, setMessage } = props;

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
			const msg = [false, "Username/Password is wrong"];
			setMessage(msg);
			setTimeout(() => {
				setMessage([]);
			}, 5000);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<Notification message={message} />
			<form onSubmit={handleLogin}>
				<label>Username:</label>
				<input type='text' id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
				<br />

				<label>Password: </label>
				<input type='text' id='password' value={password} onChange={({ target }) => setPassword(target.value)} />
				<br />
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
