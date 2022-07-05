const Blog = (props) => {
	const { blogs, user, setUser } = props;
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
			{blogs.map((blog) => (
				<div key={blog.id}>
					{blog.title} {blog.author}
				</div>
			))}
		</div>
	);
};

export default Blog;
