import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const fetchReportCategory = createAsyncThunk(
	"fetch/reportCategory",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.get("/api/project/report-categories");
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const reportProject = createAsyncThunk(
	"report/project",
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { projectId, reportCategoryId } = payload;
		try {
			const response = await api.post(
				"/api/project/report-project",
				{
					projectId,
					reportCategoryId,
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

export const createReportCategory = createAsyncThunk(
	"create/reportCategory",
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { name } = payload;
		try {
			const response = await api.post(
				"/api/project/report-categories",
				{
					name,
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

export const editReportCategory = createAsyncThunk(
	"edit/reportCategory",
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { id, name } = payload;
		try {
			const response = await api.put(
				`/api/project/report-categories`,
				{
					id,
					newName: name,
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

export const deleteReportCategory = createAsyncThunk(
	"delete/reportCategory",
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { id } = payload;
		try {
			const response = await api.delete(`/api/project/report-categories`, {
				headers: {
					Authorization: token,
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
