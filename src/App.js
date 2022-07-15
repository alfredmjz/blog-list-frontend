import { useState, useEffect, useRef } from "react";

import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";

import loginService from "./services/login";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [users, setUsers] = useState([]);
	const [loginUser, setLoginUser] = useState(null);

	const [message, setMessage] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const allBlogs = await blogService.getAll();
				const allUser = await userService.getUsers();
				const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes);
				setBlogs(sortedBlogs);
				setUsers(allUser);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setLoginUser(user);
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

	const updateLikes = async (blogObject) => {
		try {
			const returnedBlog = await blogService.update(blogObject);
			const updatedBlogs = blogs
				.map((blog) => {
					if (blog.title === returnedBlog.title) {
						blog.likes = returnedBlog.likes;
					}
					return blog;
				})
				.sort((a, b) => b.likes - a.likes);
			setBlogs(updatedBlogs);
		} catch (error) {
			console.error(error);
		}
	};

	const removeBlog = async (blogObject) => {
		try {
			const userObject = await users.find((user) => user.username === loginUser.username);
			const status = await blogService.remove(blogObject, userObject);
			if (status === 401) {
				const msg = [false, "Only blog owner may delete this post"];
				setMessage(msg);
				<Notification message={message} />;
				setTimeout(() => {
					setMessage([]);
				}, 5000);
			}
			const updatedBlogs = await blogService.getAll();
			const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
			setBlogs(sortedBlogs);
		} catch (error) {
			console.error(error);
		}
	};

	const displayBlogs = () => {
		return (
			<div>
				<h2>blogs</h2>
				<br />
				<div>
					<p>
						<b>{loginUser.name}</b> logged in
					</p>
					<button
						onClick={() => {
							window.localStorage.clear();
							setLoginUser(null);
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
				<section style={{ width: "50%" }}>
					<Blog blogs={blogs} users={users} updateLikes={updateLikes} removeBlog={removeBlog} />
				</section>
			</div>
		);
	};

	const userLogin = async (userCredentials) => {
		try {
			const inputUser = await loginService.login(userCredentials);
			window.localStorage.setItem("loggedUser", JSON.stringify(inputUser));
			blogService.setToken(inputUser.token);
			setLoginUser(inputUser);
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
			{!loginUser && verifyLogin()}
			{loginUser && displayBlogs()}
		</div>
	);
};

export default App;
