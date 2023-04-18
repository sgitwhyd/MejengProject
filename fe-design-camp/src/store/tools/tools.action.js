import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchTools = createAsyncThunk(
	'tools/fetchTools',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.get('/api/tools');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createTool = createAsyncThunk(
	'tools/createTool',
	async (payload, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const { tool_icon, name } = payload;
		try {
			const response = await api.post(
				'/api/tools/create-tools',
				{
					tool_icon,
					name,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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

export const updateTool = createAsyncThunk(
	'tools/updateTool',
	async (payload, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const { id, newName, tool_icon } = payload;
		try {
			const response = await api.put(
				'/api/tools/update-tools',
				{
					id,
					newName,
					tool_icon,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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

export const deleteTool = createAsyncThunk(
	'tools/deleteTool',
	async (payload, { getState, rejectWithValue }) => {
		const { auth } = getState();
		const { id } = payload;
		try {
			const response = await api.delete(`/api/tools/delete-tools`, {
				headers: {
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
