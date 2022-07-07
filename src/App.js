import { useState, useEffect, useRef } from "react";

import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	const [message, setMessage] = useState([]);

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

	const blogFormRef = useRef();
	const addNewBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			const returnedBlog = await blogService.create(blogObject);
			const msg = [true, `"${blogObject.title}" by ${blogObject.author} has been added!`];
			setBlogs(blogs.concat(returnedBlog));
			setMessage(msg);
			setTimeout(() => {
				setMessage([]);
			}, 5000);
		} catch (error) {
			const msg = [false, `${blogObject.title} not added. Try again later`];
			setMessage(msg);
			setTimeout(() => {
				setMessage([]);
			}, 5000);
		}
	};

	const displayBlogs = () => {
		return (
			<div>
				<h2>blogs</h2>
				<br />
				<div>
					<p>
						<b>{user.name}</b> logged in
					</p>
					<button
						onClick={() => {
							window.localStorage.clear();
							setUser(null);
						}}
					>
						Logout
					</button>
				</div>
				<br />
				<Notification message={message} />
				<Togglable buttonLabel='Add new blog' ref={blogFormRef}>
					<BlogForm createBlog={addNewBlog} />
				</Togglable>
				<section>
					{blogs.map((blog) => (
						<div key={blog.id}>
							{blog.title} {blog.author}
						</div>
					))}
				</section>
			</div>
		);
	};

	const userLogin = async (userCredentials) => {
		try {
			const inputUser = await loginService.login(userCredentials);
			window.localStorage.setItem("loggedUser", JSON.stringify(inputUser));
			blogService.setToken(inputUser.token);
			setUser(inputUser);
		} catch (error) {
			const msg = [false, "Username/Password is wrong"];
			setMessage(msg);
			setTimeout(() => {
				setMessage([]);
			}, 5000);
		}
	};

	const verifyLogin = () => {
		return (
			<div>
				<h1>Login</h1>
				<Notification message={message} />
				<Togglable buttonLabel='Login'>
					<LoginForm userLogin={userLogin} />
				</Togglable>
			</div>
		);
	};

	return (
		<div>
			{!user && verifyLogin()}
			{user && displayBlogs()}
		</div>
	);
};

export default App;
