import api from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const authLogin = createAsyncThunk(
	'auth/login',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/login', payload);
			return response.data;
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
			return response.data;
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
