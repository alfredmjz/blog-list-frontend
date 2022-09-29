import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		updateLikes(state, action) {
			const title = action.payload.title;
			state
				.map((blog) => {
					if (blog.title === title) {
						blog.likes += 1;
					}
					return blog;
				})
				.sort((a, b) => b.likes - a.likes);
		},
		appendBlog(state, action) {
			state.push(action.payload);
		},
		setBlog(state, action) {
			return action.payload;
		},
	},
});

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch(setBlog(sorted));
	};
};

export const createBlog = (content) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(content);
		dispatch(appendBlog(newBlog));
	};
};

export const updateBlog = (updatedObj) => {
	return async (dispatch) => {
		const response = await blogService.update({ ...updatedObj, votes: updatedObj.votes + 1 });
		dispatch(updateLikes(response));
	};
};

export const removeBlog = (blogObj, users, loginUser) => {
	return async (dispatch) => {
		const userObj = users.find((user) => user.username === loginUser.username);
		await blogService.remove(blogObj, userObj);
		const blogs = await blogService.getAll();
		const sorted = blogs.sort((a, b) => b.likes - a.likes);
		dispatch(setBlog(sorted));
	};
};

export const { updateLikes, setBlog, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
