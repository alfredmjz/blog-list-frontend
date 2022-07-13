import { useState } from "react";

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
		<>
			<h1>Create New</h1>
			<form style={{ width: "20em" }} onSubmit={addBlog}>
				<label>title</label>
				<br />
				<input
					type='text'
					placeholder='Title'
					id='title'
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				></input>
				<br />
				<label>author</label>
				<br />
				<input
					type='text'
					placeholder='Author'
					id='author'
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				></input>
				<br />
				<label>url</label>
				<br />
				<input
					type='text'
					placeholder='URL'
					id='url'
					value={url}
					onChange={({ target }) => setURL(target.value)}
				></input>
				<br />
				<button type='submit'>Add</button>
			</form>
		</>
	);
};

export default BlogForm;
