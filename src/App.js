/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";

import loginService from "./services/login";
import blogService from "./services/blogs";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { initializeUsers, logoutUser } from "./reducers/userReducer";
import Summary from "./components/Summary";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Header from "./components/Header";

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

	const displayBlogs = () => {
		return (
			<div>
				<Notification />
				<div>
					<h2>Users</h2>
				</div>
				<Togglable buttonLabel="Add new blog" ref={blogFormRef}>
					<BlogForm createBlog={addNewBlog} />
				</Togglable>
				<section style={{ width: "50%" }}>
					<Blog blogs={blogs} />
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

	const HomeView = () => {
		return users.loginUser && displayBlogs();
	};

	return (
		<div>
			{!users.loginUser && verifyLogin()}
			{users.loginUser && (
				<div>
					<Header users={users} />
					<Routes>
						<Route path="/" element={<HomeView />}></Route>
						<Route path="/users" element={<Summary users={users} />}></Route>
						<Route path="/users/:id" element={<UserView usersList={users} blogsList={blogs} />}></Route>
						<Route path="/blogs/:id" element={<BlogView usersList={users} blogsList={blogs} />}></Route>
					</Routes>
				</div>
			)}
		</div>
	);
};

export default App;
