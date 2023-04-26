import { createSlice } from '@reduxjs/toolkit';
import { authLogin, forgotPassword } from './auth.action';

const initialState = {
	token: '',
	login: null,
	role: null,
	loading: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authLogout: (state) => {
			state.token = '';
			state.login = null;
			state.role = null;
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
			state.role = action.payload.data.role;
			state.token = action.payload.data.token;
		}),
			builder.addCase(authLogin.rejected, (state, action) => {
				state.loading = false;
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
