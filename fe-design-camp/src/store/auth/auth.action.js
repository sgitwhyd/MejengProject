import api from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const authLogin = createAsyncThunk(
	'auth/login',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/login', payload);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const authRegister = createAsyncThunk(
	'auth/register',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/register', payload);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUserProfile = createAsyncThunk(
	'auth/getUserProfile',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		try {
			const response = await api.get('/api/user/profile', {
				headers: {
					Authorization: token,
				},
			});
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'auth/requestForgotPassword',
	async (payload, { rejectWithValue }) => {
		const { email, token, new_password } = payload;
		try {
			const response = await api.post(
				`/api/user/forgot-password?${token ? `token=${token}` : null}`,
				{
					email: email ? email : null,
					new_password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateProfile = createAsyncThunk(
	'auth/updateProfile',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { name, region, country, desc, user_image } = payload;
		try {
			const response = await api.put(
				'/api/user/update-profile',
				{
					name,
					region,
					country,
					desc,
					user_image,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: token,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const requestCreator = createAsyncThunk(
	'auth/requestCreator',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		try {
			const response = await api.post(
				'/api/creators/request',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const activateCreator = createAsyncThunk(
	'auth/activateCreator',
	async (payload, {  rejectWithValue }) => {
		const { token } = payload
		try {
			const response = await api.get(
				`/api/creators/activate/${token}`,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
)
