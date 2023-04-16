import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.get('/api/categories');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createCategory = createAsyncThunk(
	'categories/createCategory',
	async (payload, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const { name } = payload;
		try {
			const response = await api.post(
				'/api/categories/create-category',
				{
					name,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: auth.token,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'categories/deleteCategory',
	async (payload, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const { id } = payload;
		try {
			const response = await api.delete(`/api/categories/delete-category`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: auth.token,
				},
				data: {
					id,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateCategory = createAsyncThunk(
	'categories/updateCategory',
	async (payload, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const { id, name } = payload;
		try {
			const response = await api.put(
				'/api/categories/update-category',
				{
					id,
					name,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: auth.token,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
