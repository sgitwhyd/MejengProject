import { createSlice } from "@reduxjs/toolkit";
import {
	getProjects,
	getInspirationProjects,
	getDetail,
} from "./projects.action";

const initialState = {
	projects: [],
	loading: false,
	projectDetail: null,
	projectByUser: [],
	projectByCategory: [],
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
		builder.addCase(getDetail.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getDetail.fulfilled, (state, action) => {
			state.projectDetail = action.payload.data.project;
			state.projectByUser = action.payload.data.projectByUser;
			state.projectByCategory = action.payload.data.projectByCategory;
			state.loading = false;
		});
	},
});

export const projectsReducer = projectsSlice.reducer;
