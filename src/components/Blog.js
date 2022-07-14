import { useState } from "react";
const Blog = ({ blogs, user, updateLikes, removeBlog }) => {
	const [click, setClick] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const buttonStyle = {
		marginBottom: "1rem",
		marginLeft: "5px",
	};

	const toggleClick = () => {
		setClick(!click);
	};

	const handleView = (event) => {
		toggleClick();
		const target = event.target;
		target.nextElementSibling.style.display = click ? "none" : "";
		target.innerHTML = click ? "View" : "Hide";
	};

	const handleLikes = (blog) => {
		updateLikes({ ...blog, likes: blog.likes + 1 });
	};

	const handleDeletion = (blog) => {
		toggleClick();
		if (window.confirm(`Remove "${blog.title}" by ${blog.author}`)) {
			removeBlog({ ...blog });
		}
	};

	return (
		<div id='list-of-blogs'>
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<span className='blog-title'>{blog.title}</span>
					<button className='clicked' onClick={handleView} style={buttonStyle}>
						View
					</button>
					<div style={{ display: "none" }}>
						<p className='blog-author'>{blog.author}</p>
						<p>{blog.url}</p>
						<p id='likes'>
							{blog.likes}
							<button onClick={() => handleLikes(blog)} style={buttonStyle}>
								Like
							</button>
						</p>
						<p>{user}</p>
						<button onClick={() => handleDeletion(blog)}>Delete</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Blog;
