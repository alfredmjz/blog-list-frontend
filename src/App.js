/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";

import loginService from "./services/login";
import blogService from "./services/blogs";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, updateBlog } from "./reducers/blogReducer";
import { initializeUsers, logoutUser } from "./reducers/userReducer";

const App = () => {
	const blogs = useSelector((state) => {
		return state.blogs;
	});

	const users = useSelector((state) => {
		return state.users;
	});

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	useEffect(() => {
		const hours = 1; // to clear the localStorage after 1 hour
		// (if someone want to clear after 8hrs simply change hours=8)
		const now = new Date().getTime();
		const setupTime = window.localStorage.getItem("setupTime");
		if (!setupTime) {
			window.localStorage.setItem("setupTime", now);
		} else {
			if (!users.loginUser || now - setupTime > hours * 60 * 60 * 1000) {
				window.localStorage.clear();
				window.localStorage.setItem("setupTime", now);
			}
		}

		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
		}
	}, []);

	const blogFormRef = useRef();
	const addNewBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			const msg = `"${blogObject.title}" by ${blogObject.author} has been added!`;
			dispatch(createBlog(blogObject));
			dispatch(setNotification(msg, 5, true));
		} catch (error) {
			const msg = `${blogObject.title} not added. Try again later`;
			dispatch(setNotification(msg, 5, false));
		}
	};

	const updateLikes = async (blogObject) => {
		try {
			dispatch(updateBlog(blogObject));
		} catch (error) {
			console.error(error);
		}
	};

	const removeBlog = async (blogObject) => {
		if (status === 401) {
			const msg = "Only blog owner may delete this post";
			dispatch(setNotification(msg, 5, false));
			<Notification />;
		}
	};

	const displayBlogs = () => {
		return (
			<div>
				<h2>blogs</h2>
				<br />
				<div>
					<p>
						<b>{users.loginUser.name}</b> logged in
					</p>
					<button
						onClick={() => {
							window.localStorage.clear();
							dispatch(logoutUser());
						}}
					>
						Logout
					</button>
				</div>
				<br />
				<Notification />
				<Togglable buttonLabel="Add new blog" ref={blogFormRef}>
					<BlogForm createBlog={addNewBlog} />
				</Togglable>
				<section style={{ width: "50%" }}>
					<Blog blogs={blogs} users={users} />
				</section>
			</div>
		);
	};

	const userLogin = async (userCredentials) => {
		try {
			const inputUser = await loginService.login(userCredentials);
			window.localStorage.setItem("loggedUser", JSON.stringify(inputUser));
			blogService.setToken(inputUser.token);
			dispatch(initializeUsers(inputUser));
		} catch (error) {
			const msg = "Username/Password is wrong";
			dispatch(setNotification(msg, 5, false));
		}
	};

	const verifyLogin = () => {
		return (
			<div>
				<h1>Login</h1>
				<Notification />
				<Togglable buttonLabel="Login">
					<LoginForm userLogin={userLogin} />
				</Togglable>
			</div>
		);
	};

	return (
		<div>
			{!users.loginUser && verifyLogin()}
			{users.loginUser && displayBlogs()}
		</div>
	);
};

export default App;
