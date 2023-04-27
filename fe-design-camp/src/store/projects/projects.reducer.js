import { createSlice } from "@reduxjs/toolkit";
import { getProjects, getInspirationProjects } from "./projects.action";

const initialState = {
	projects: [],
	loading: false,
};

const projectsSlice = createSlice({
	name: "project",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProjects.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getProjects.fulfilled, (state, action) => {
			state.projects = action.payload.filter;
			state.loading = false;
		});
		builder.addCase(getProjects.rejected, (state, action) => {
			state.loading = false;
			state.projects = [];
		});
		builder.addCase(getInspirationProjects.fulfilled, (state, action) => {
			state.projects = action.payload.data;
		});
	},
});

export const projectsReducer = projectsSlice.reducer;
