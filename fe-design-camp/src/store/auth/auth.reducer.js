import { createSlice } from '@reduxjs/toolkit';
import { authLogin, getUserProfile } from './auth.action';

const initialState = {
	token: '',
	login: null,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authLogout: (state) => {
			state.token = '';
			state.login = null;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authLogin.fulfilled, (state, action) => {
			state.login = true;
			state.token = action.payload.token;
		}),
			builder.addCase(getUserProfile.fulfilled, (state, action) => {
				state.user = action.payload;
			});
	},
});

export const { authLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
