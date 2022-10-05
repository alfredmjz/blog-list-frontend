import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ users, blogs }) => {
	const userToBlogs = {};
	users.map((user) => (userToBlogs[user.id] = user.name));
	return (
		<Table striped>
			<tbody>
				{blogs.map((blog) => {
					const username = userToBlogs[blog.user];
					return (
						<tr key={blog.id}>
							<td>
								<Link className="blog-title" to={`/blogs/${blog.id}`}>
									{blog.title}
								</Link>
							</td>
							<td style={{ textAlign: "right", fontSize: "0.8rem", color: "rgba(0,0,0,0.5)" }}>Posted by {username}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default Blog;
