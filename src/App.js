import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";

import loginService from "./services/login";
import blogService from "./services/blogs";
import userService from "./services/user";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, removeBlog } from "./reducers/blogReducer";
import { initializeUsers, newRegistration } from "./reducers/userReducer";
import Summary from "./components/Summary";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import RegisterForm from "./components/RegisterForm";

const App = () => {
	const blogs = useSelector((state) => {
		return state.blogs;
	});

	const users = useSelector((state) => {
		return state.users;
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginUserRef = useRef();
	const blogFormRef = useRef();

	useEffect(() => {
		const hours = 1; // to clear the localStorage after 1 hour
		// (if someone want to clear after 8hrs simply change hours=8)
		const now = new Date().getTime();
		const setupTime = window.localStorage.getItem("setupTime");
		const loggedUserJSON = window.localStorage.getItem("loggedUser");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			loginUserRef.current = user;
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

	const addNewBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			const msg = `"${blogObject.title}" by ${blogObject.author} has been added!`;
			dispatch(createBlog(blogObject));
			dispatch(initializeUsers({ ...loginUserRef.current }));
			dispatch(setNotification(msg, 5, true));
		} catch (error) {
			const msg = `${blogObject.title} not added. Try again later`;
			dispatch(setNotification(msg, 5, false));
		}
	};

	const removeExistingBlog = async (blogToRemove) => {
		if (window.confirm(`Remove "${blogToRemove.title}" by ${blogToRemove.author}`)) {
			dispatch(removeBlog(blogToRemove, users));
			if (blogs.status && blogs.status === 401) {
				const msg = "Only blog owner may delete this post";
				dispatch(setNotification(msg, 5, false));
				<Notification />;
			} else {
				dispatch(initializeUsers({ ...loginUserRef.current }));
				navigate("/");
			}
		}
	};

	const userLogin = async (userCredentials) => {
		try {
			const inputUser = await loginService.login(userCredentials);
			window.localStorage.setItem("loggedUser", JSON.stringify(inputUser));
			blogService.setToken(inputUser.token);
			loginUserRef.current = inputUser;
			dispatch(initializeUsers(inputUser));
		} catch (error) {
			const msg = "Username/Password is wrong";
			dispatch(setNotification(msg, 5, false));
		}
	};

	const userRegister = async (newUser) => {
		try {
			const response = await userService.register(newUser);
			const registeredUser = response.loginUser;
			window.localStorage.setItem("loggedUser", JSON.stringify(registeredUser));
			blogService.setToken(registeredUser.token);
			loginUserRef.current = registeredUser;
			dispatch(newRegistration(response));
		} catch (error) {
			const msg = "Username must be unique";
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
				<Blog users={users.users} blogs={blogs.data} />
			</Container>
		);
	};

	const verifyLogin = () => {
		return (
			<Container>
				<h1>Log in or Register a new account</h1>
				<Notification />
				<Togglable buttonLabel="Login">
					<LoginForm userLogin={userLogin} />
				</Togglable>
				<Togglable buttonLabel="Register">
					<RegisterForm userRegister={userRegister} />
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
						<Route
							path="/blogs/:id"
							element={<BlogView usersList={users} fullBlogsList={blogs} deleteBlog={removeExistingBlog} />}
						></Route>
					</Routes>
				</>
			)}
		</>
	);
};

export default App;
