import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const getProjects = createAsyncThunk(
	"project/getProjects",
	async (payload, thunkAPI) => {
		const { category, tool } = payload;
		try {
			const response = await api.get(
				`/api/project?${category ? `category=${category}` : ""}${
					tool ? `&tool=${tool}` : ""
				}`
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
