import React, { useState } from "react";
import { Form, Button, Card, Container, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { addCommentBlog, removeBlog, updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const blogView = ({ fullBlogsList, usersList }) => {
	if (!fullBlogsList.data) {
		return null;
	}

	const [comments, setComments] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const match = useMatch("/blogs/:id");
	const blog = match ? fullBlogsList.data.find((blog) => blog.id === match.params.id) : null;
	console.log(blog, fullBlogsList.data);
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
			console.log(fullBlogsList);
			if (fullBlogsList.status && fullBlogsList.status === 401) {
				const msg = "Only blog owner may delete this post";
				dispatch(setNotification(msg, 5, false));
				<Notification />;
			} else {
				navigate("/");
			}
		}
	};

	const addComments = (event, blog) => {
		event.preventDefault();
		const newBlog = {
			...blog,
			comments,
		};
		console.log("here");
		dispatch(addCommentBlog(newBlog));
	};
	return (
		<Container className="mt-5">
			<Card>
				<Card.Header>
					<h2>{blog.title}</h2>
				</Card.Header>
				<Card.Body>
					<Card.Subtitle>Author: {blog.author}</Card.Subtitle>
					<Card.Text className="mt-2">
						<b style={{ fontSize: "1rem" }}>{blog.likes}</b>
						<Button style={{ marginLeft: "10px" }} variant="secondary" onClick={() => handleLikes(blog)}>
							Like
						</Button>
					</Card.Text>
					<Card.Link href={blog.url}>{blog.url}</Card.Link>
					<Card.Text>Posted by {getBlogOwner(blog.user)}</Card.Text>
				</Card.Body>
			</Card>

			<h3>Comments</h3>
			<Stack direction="horizontal" gap={3}>
				<Form style={{ width: "80%", marginBottom: "16px" }}>
					<Form.Group className="mb-2">
						<label htmlFor="comment"></label>
						<Form.Control
							type="text"
							id="comment"
							className="me-auto"
							placeholder="New Comment"
							value={comments}
							onChange={({ target }) => setComments(target.value)}
						/>
					</Form.Group>
				</Form>
				<div className="vr" />
				<Button variant="primary" onClick={(event) => addComments(event, blog)}>
					Post comment
				</Button>
			</Stack>
			<ul>
				{blog.comments.map((comments, index) => (
					<li key={index}>{comments}</li>
				))}
			</ul>
			<Button variant="danger" onClick={() => handleDeletion(blog)}>
				Delete
			</Button>
		</Container>
	);
};

export default blogView;
