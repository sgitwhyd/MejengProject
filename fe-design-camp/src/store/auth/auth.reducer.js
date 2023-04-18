import { createSlice } from '@reduxjs/toolkit';
import { authLogin, getUserProfile, forgotPassword } from './auth.action';

const initialState = {
	token: '',
	login: null,
	user: null,
	loading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authLogout: (state) => {
			state.token = '';
			state.login = null;
			state.user = null;
			localStorage.removeItem('persist:root');
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authLogin.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(authLogin.fulfilled, (state, action) => {
			state.login = true;
			state.loading = false;
			state.token = action.payload.token;
		}),
			builder.addCase(authLogin.rejected, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(getUserProfile.fulfilled, (state, action) => {
				state.user = action.payload;
			}),
			builder.addCase(forgotPassword.pending, (state, action) => {
				state.loading = true;
			}),
			builder.addCase(forgotPassword.fulfilled, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(forgotPassword.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const { authLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
