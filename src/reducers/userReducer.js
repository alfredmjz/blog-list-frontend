import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
});

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await userService.getUsers();
		dispatch(setUser(users));
	};
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
