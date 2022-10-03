import React from "react";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const blogView = ({ blogsList, usersList }) => {
	if (!blogsList) {
		return null;
	}

	const buttonStyle = {
		marginBottom: "1rem",
		marginLeft: "5px",
	};

	const container = {
		display: "flex",
		flexFlow: "column",
	};

	const noSpace = {
		margin: "0",
		padding: "0",
	};
	const dispatch = useDispatch();

	const match = useMatch("/blogs/:id");
	const blog = match ? blogsList.find((blog) => blog.id === match.params.id) : null;
	console.log(match.params.id);

	const handleLikes = (blog) => {
		dispatch(updateBlog(blog));
	};
	const getBlogOwner = (id) => {
		const owner = usersList.users.find((user) => user.id === id);
		console.log(blog, blog.user, usersList);
		return owner.name;
	};

	const handleDeletion = (blog) => {
		if (window.confirm(`Remove "${blog.title}" by ${blog.author}`)) {
			dispatch(removeBlog(blog, usersList));
			if (blog.status && blog.status === 401) {
				const msg = "Only blog owner may delete this post";
				dispatch(setNotification(msg, 5, false));
				<Notification />;
			}
		}
	};
	return (
		<>
			<div style={container}>
				<h2 style={noSpace}>{blog.title}</h2>
				<h3 style={noSpace}>Author: {blog.author}</h3>
				<a href={blog.url}>{blog.url}</a>
				<p>
					{blog.likes}
					<button onClick={() => handleLikes(blog)} style={buttonStyle}>
						Like
					</button>
				</p>
				<p>Posted by {getBlogOwner(blog.user)}</p>
				<div>
					<h3>Comments</h3>
					<ul>
						{blog.comments.map((comment, index) => (
							<li key={index}>{comment}</li>
						))}
					</ul>
				</div>
				<button style={{ width: "5%" }} onClick={() => handleDeletion(blog)}>
					Delete
				</button>
			</div>
		</>
	);
};

export default blogView;
