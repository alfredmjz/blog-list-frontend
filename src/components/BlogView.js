import React, { useState } from "react";
import { Form, Button, Card, Container, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import { addCommentBlog, updateBlog } from "../reducers/blogReducer";

const blogView = ({ fullBlogsList, usersList, deleteBlog }) => {
	if (!fullBlogsList.data) {
		return null;
	}

	const [comments, setComments] = useState("");
	const dispatch = useDispatch();

	const match = useMatch("/blogs/:id");
	const blog = match ? fullBlogsList.data.find((blog) => blog.id === match.params.id) : null;
	const handleLikes = (blog) => {
		dispatch(updateBlog(blog));
	};

	const getBlogOwner = (id) => {
		const owner = usersList.users.find((user) => user.id === id);
		return owner.name;
	};

	const handleDeletion = (event, blogToRemove) => {
		event.preventDefault();
		deleteBlog(blogToRemove);
	};

	const addComments = (event, blog) => {
		event.preventDefault();
		const newBlog = {
			...blog,
			comments,
		};
		setComments("");
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
					<Card.Text>
						Posted by <b>{getBlogOwner(blog.user)}</b>
					</Card.Text>
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
				<Button variant="primary" type="submit" onClick={(event) => addComments(event, blog)}>
					Post comment
				</Button>
			</Stack>
			<ul>
				{blog.comments.map((comments, index) => (
					<li key={index}>{comments}</li>
				))}
			</ul>
			<Button variant="danger" onClick={(event) => handleDeletion(event, blog)}>
				Delete
			</Button>
		</Container>
	);
};

export default blogView;
