import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const initialState = { loginUser: null, users: [] };
const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUser(state, action) {
			return { ...action.payload };
		},
		logoutUser(state) {
			state.loginUser = null;
		},
	},
});

export const initializeUsers = (loginUser) => {
	return async (dispatch) => {
		const users = await userService.getUsers();
		const payload = { loginUser, users };
		dispatch(setUser(payload));
	};
};

export const logout = () => {
	return (dispatch) => dispatch(logoutUser());
};

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
