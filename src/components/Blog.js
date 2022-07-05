import { useState } from "react";
import blogService from "../services/blogs";
import ErrorHandler from "./ErrorHandler";

const Blog = (props) => {
	const { blogs, setBlogs, user, setUser, errorMessage, setErrorMessage } = props;
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setURL] = useState("");

	const handleNewBlog = async (event) => {
		event.preventDefault();

		try {
			const response = await blogService.create({
				title,
				author,
				url,
			});
			const blogCopy = [...blogs, response];
			setBlogs(blogCopy);
			setTitle("");
			setAuthor("");
			setURL("");
		} catch (error) {
			setErrorMessage("Username/Password is wrong");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const addNewBlogsForm = () => {
		return (
			<div>
				<h1>Create New</h1>
				<form onSubmit={handleNewBlog}>
					<label>title</label>
					<input type='text' id='title' value={title} onChange={({ target }) => setTitle(target.value)}></input>
					<br />
					<label>author</label>
					<input type='text' id='author' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
					<br />

					<label>url</label>
					<input type='text' id='url' value={url} onChange={({ target }) => setURL(target.value)}></input>
					<br />

					<button type='submit'>Add</button>
					<ErrorHandler error={errorMessage} />
				</form>
			</div>
		);
	};

	return (
		<div>
			<h2>blogs</h2>
			<br />
			<div>
				<p>
					<b>{user}</b> logged in
				</p>
				<button
					onClick={() => {
						window.localStorage.clear();
						setUser(null);
					}}
				>
					Logout
				</button>
			</div>
			<br />
			{addNewBlogsForm()}
			{blogs.map((blog) => (
				<div key={blog.id}>
					{blog.title} {blog.author}
				</div>
			))}
		</div>
	);
};

export default Blog;
