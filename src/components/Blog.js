import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ blogs }) => {
	console.log(blogs);
	return (
		<Table striped>
			<tbody>
				{blogs.map((blog) => {
					return (
						<tr key={blog.id}>
							<td>
								<Link className="blog-title" to={`/blogs/${blog.id}`}>
									{blog.title}
								</Link>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default Blog;
