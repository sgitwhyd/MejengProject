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
