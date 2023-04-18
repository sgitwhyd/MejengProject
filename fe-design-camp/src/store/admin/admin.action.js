import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchUsers = createAsyncThunk(
	'admin/fetchUsers',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		try {
			const response = await api.get('/api/admin/get-all-user', {
				headers: {
					Authorization: token,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchReportedProjects = createAsyncThunk(
	'admin/fetchReportedProjects',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		try {
			const response = await api.get('/api/project/reported', {
				headers: {
					Authorization: token,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const bannProject = createAsyncThunk(
	'admin/bannProject',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { id } = payload;
		try {
			const response = await api.put(
				`/api/project/ban-project`,
				{
					id,
				},
				{
					headers: {
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

export const bannUser = createAsyncThunk(
	'admin/bannUser',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { id } = payload;
		try {
			const response = await api.post(
				`/api/admin/user/ban-user`,
				{
					id,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
)
