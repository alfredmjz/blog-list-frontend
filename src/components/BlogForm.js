import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setURL] = useState("");

	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title,
			author,
			url,
		});

		setTitle("");
		setAuthor("");
		setURL("");
	};

	return (
		<Form.Floating onSubmit={addBlog}>
			<h2>Create New</h2>
			<Form.Group className="mb-2">
				<label htmlFor="title"></label>
				<Form.Control
					type="text"
					id="title"
					placeholder="Title"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-2">
				<label htmlFor="author"></label>
				<Form.Control
					type="text"
					id="author"
					placeholder="Author"
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-2">
				<label htmlFor="url"></label>
				<Form.Control
					type="text"
					id="url"
					placeholder="URL"
					value={url}
					onChange={({ target }) => setURL(target.value)}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Add
			</Button>
		</Form.Floating>
	);
};

export default BlogForm;
