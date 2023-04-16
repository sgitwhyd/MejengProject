import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchUsers = createAsyncThunk(
	'admin/fetchUsers',
	async (payload, thunkAPI) => {
		const { token } = payload;
		try {
			const response = await api.get('/api/admin/get-all-user', {
				headers: {
					Authorization: token,
				},
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
