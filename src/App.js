import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";

import loginService from "./services/login";
import blogService from "./services/blogs";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import Summary from "./components/Summary";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
	const blogs = useSelector((state) => {
		return state.blogs;
	});

	const users = useSelector((state) => {
		return state.users;
	});

	const dispatch = useDispatch();

	useEffect(() => {
		const hours = 1; // to clear the localStorage after 1 hour
		// (if someone want to clear after 8hrs simply change hours=8)
		const now = new Date().getTime();
		const setupTime = window.localStorage.getItem("setupTime");
		const loggedUserJSON = window.localStorage.getItem("loggedUser");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			dispatch(initializeUsers(user));
		}

		if (!setupTime) {
			window.localStorage.setItem("setupTime", now);
		} else if (!loggedUserJSON || now - setupTime > hours * 60 * 60 * 1000) {
			window.localStorage.clear();
			window.localStorage.setItem("setupTime", now);
		}

		dispatch(initializeBlogs());
	}, [dispatch]);

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

	const displayBlogs = () => {
		return (
			<Container className="justify-content-center text-left mt-5">
				<Notification />
				<h1>Blog Application</h1>
				<Togglable buttonLabel="Post a blog" ref={blogFormRef}>
					<BlogForm createBlog={addNewBlog} />
				</Togglable>
				<Blog blogs={blogs.data} />
			</Container>
		);
	};

	const verifyLogin = () => {
		return (
			<Container>
				<h1>Log in to your account</h1>
				<Notification />
				<Togglable buttonLabel="Login">
					<LoginForm userLogin={userLogin} />
				</Togglable>
			</Container>
		);
	};

	const HomeView = () => {
		return users.loginUser && displayBlogs();
	};

	return (
		<>
			{!users.loginUser && verifyLogin()}
			{users.loginUser && (
				<>
					<Header users={users} />
					<Routes>
						<Route path="/" element={<HomeView />}></Route>
						<Route path="/users" element={<Summary users={users} />}></Route>
						<Route path="/users/:id" element={<UserView usersList={users} blogsList={blogs.data} />}></Route>
						<Route path="/blogs/:id" element={<BlogView usersList={users} fullBlogsList={blogs} />}></Route>
					</Routes>
				</>
			)}
		</>
	);
};

export default App;
