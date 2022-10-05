import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
	name: "blogs",
	initialState: { status: null, data: [] },
	reducers: {
		updateLikes(state, action) {
			const id = action.payload.data.id;
			state.data
				.map((blog) => {
					if (blog.id === id) {
						blog.likes += 1;
					}
					return blog;
				})
				.sort((a, b) => b.likes - a.likes);
		},
		updateComments(state, action) {
			const id = action.payload.data.id;
			state.data.map((blog) => {
				if (blog.id === id) {
					blog.comments = action.payload.data.comments;
				}
				return blog;
			});
		},
		appendBlog(state, action) {
			state.data.push(action.payload);
		},
		setBlog(state, action) {
			return action.payload;
		},
	},
});

export const initializeBlogs = () => {
	return async (dispatch) => {
		const response = await blogService.getAll();
		const sorted = response.data.sort((a, b) => b.likes - a.likes);
		const payload = { status: response.status, data: sorted };
		dispatch(setBlog(payload));
	};
};

export const createBlog = (content) => {
	return async (dispatch) => {
		const response = await blogService.create(content);
		const payload = { status: response.status, data: response.data };
		dispatch(appendBlog(payload));
	};
};

export const updateBlog = (updatedObj) => {
	return async (dispatch) => {
		const response = await blogService.update({ ...updatedObj, likes: updatedObj.likes + 1 });
		const payload = { status: response.status, data: response.data };
		dispatch(updateLikes(payload));
	};
};

export const addCommentBlog = (updatedObj) => {
	return async (dispatch) => {
		const response = await blogService.updateComments(updatedObj);
		const payload = { status: response.status, data: response.data };
		dispatch(updateComments(payload));
	};
};

export const removeBlog = (blogObj, users) => {
	return async (dispatch) => {
		const userObj = users.users.find((user) => user.username === users.loginUser.username);
		const deleteResponse = await blogService.remove(blogObj, userObj);
		const response = await blogService.getAll();
		const sorted = response.data.sort((a, b) => b.likes - a.likes);
		const payload = { status: deleteResponse.status, data: sorted };
		dispatch(setBlog(payload));
	};
};

export const { updateLikes, setBlog, appendBlog, updateComments } = blogSlice.actions;
export default blogSlice.reducer;
