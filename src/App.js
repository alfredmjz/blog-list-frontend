import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const verifyLogin = () => {
		if (user) {
			return <Blog blogs={blogs} user={user.name} setUser={setUser} />;
		}

		return (
			<Login
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				setUser={setUser}
			/>
		);
	};

	return <div>{verifyLogin()}</div>;
};

export default App;
