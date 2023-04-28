import { createSlice } from "@reduxjs/toolkit";
import { fetchReportCategory } from "./report.action";

const initialState = {
	reportCategories: null,
};

const reportCategoriesSlice = createSlice({
	name: "reportCategories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchReportCategory.fulfilled, (state, action) => {
			state.reportCategories = action.payload.data;
		});
	},
});

export const reportCategoriesReducer = reportCategoriesSlice.reducer;
