import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import { addCommentBlog, removeBlog, updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const blogView = ({ blogsList, usersList }) => {
	if (!blogsList) {
		return null;
	}

	const [comments, setComments] = useState("");
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

	const handleLikes = (blog) => {
		dispatch(updateBlog(blog));
	};
	const getBlogOwner = (id) => {
		const owner = usersList.users.find((user) => user.id === id);
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

	const addComments = (event, blog) => {
		event.preventDefault();
		const newBlog = {
			...blog,
			comments,
		};
		dispatch(addCommentBlog(newBlog));
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
					<form onSubmit={(event) => addComments(event, blog)}>
						<label></label>
						<input
							type="text"
							placeholder="New Comment"
							value={comments}
							onChange={({ target }) => setComments(target.value)}
						></input>
						<button id="submit-blog" type="submit">
							Post comment
						</button>
					</form>
					<ul>
						{blog.comments.map((comments, index) => (
							<li key={index}>{comments}</li>
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
