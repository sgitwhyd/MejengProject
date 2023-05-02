import { createSlice } from "@reduxjs/toolkit";
import { fetchReportCategory, reportProject } from "./report.action";

const initialState = {
	reportCategories: null,
	loading: false,
};

const reportCategoriesSlice = createSlice({
	name: "reportCategories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchReportCategory.fulfilled, (state, action) => {
			state.reportCategories = action.payload.data;
		});
		builder.addCase(reportProject.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(reportProject.rejected, (state, action) => {
			state.loading = false;
		});
		builder.addCase(reportProject.fulfilled, (state, action) => {
			state.loading = false;
		});
	},
});

export const reportCategoriesReducer = reportCategoriesSlice.reducer;
