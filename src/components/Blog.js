import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blogs, users }) => {
	const dispatch = useDispatch();

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

	const handleView = (event) => {
		const target = event.target;

		if (target.nextElementSibling.style.display === "none") {
			target.nextElementSibling.style.display = "";
			target.innerHTML = "Hide";
		} else {
			target.nextElementSibling.style.display = "none";
			target.innerHTML = "View";
		}
	};

	const handleLikes = (blog) => {
		dispatch(updateBlog(blog));
	};

	const handleDeletion = (blog) => {
		if (window.confirm(`Remove "${blog.title}" by ${blog.author}`)) {
			dispatch(removeBlog(blog, users));
		}
	};

	const getBlogOwner = (id) => {
		const owner = users.find((user) => user.id === id);
		return owner.name;
	};

	return (
		<div id="list-of-blogs">
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<span className="blog-title">{blog.title}</span>
					<button className="clicked" onClick={handleView} style={buttonStyle}>
						View
					</button>
					<div style={{ display: "none" }}>
						<p className="blog-author">{blog.author}</p>
						<p>{blog.url}</p>
						<p id="likes">
							{blog.likes}
							<button onClick={() => handleLikes(blog)} style={buttonStyle}>
								Like
							</button>
						</p>
						<p>{getBlogOwner(blog.user)}</p>
						<button onClick={() => handleDeletion(blog)}>Delete</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Blog;
