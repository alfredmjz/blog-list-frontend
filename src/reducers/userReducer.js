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

		appendUser(state, action) {
			state.loginUser = action.payload.loginUser;
			state.users.push(action.payload.newUser);
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

export const newRegistration = (registeredUser) => {
	return async (dispatch) => {
		const payload = { loginUser: registeredUser.loginUser, newUser: registeredUser.savedUser };
		dispatch(appendUser(payload));
	};
};

export const logout = () => {
	return (dispatch) => dispatch(logoutUser());
};

export const { setUser, logoutUser, appendUser } = userSlice.actions;
export default userSlice.reducer;
