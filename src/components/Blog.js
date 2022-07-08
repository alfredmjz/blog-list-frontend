import { useState } from "react";
const Blog = ({ blogs, user, updateLikes }) => {
	const [click, setClick] = useState(true);

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

	const invertVisibility = { display: click ? "none" : "" };

	const toggleClick = () => {
		setClick(!click);
	};

	const handleView = (event) => {
		toggleClick();
		const target = event.target;
		target.innerHTML = click ? "Hide" : "View";
	};

	const handleLikes = (blog) => {
		updateLikes({ ...blog, likes: blog.likes + 1 });
	};
	return (
		<>
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<span>{blog.title}</span>
					<button onClick={handleView} style={buttonStyle}>
						View
					</button>
					<div style={invertVisibility}>
						<p>{blog.author}</p>
						<p>
							{blog.likes}
							<button onClick={() => handleLikes(blog)} style={buttonStyle}>
								Like
							</button>
						</p>
						<p>{user}</p>
					</div>
				</div>
			))}
		</>
	);
};

export default Blog;
