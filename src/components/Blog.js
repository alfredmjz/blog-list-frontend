import { Link } from "react-router-dom";

const Blog = ({ blogs }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div id="list-of-blogs">
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<Link className="blog-title" to={`/blogs/${blog.id}`}>
						{blog.title}
					</Link>
				</div>
			))}
		</div>
	);
};

export default Blog;
