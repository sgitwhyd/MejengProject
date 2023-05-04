import { createSlice } from "@reduxjs/toolkit";
import {
	fetchUsers,
	fetchReportedProjects,
	bannProject,
	bannUser,
	getProjects,
} from "./admin.action";

const initialState = {
	users: null,
	ammount_users: null,
	ammount_active_user: null,
	ammount_creator_user: null,
	ammount_project: null,
	loading: false,
	error: null,
	reportedProjects: [],
	projects: [],
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		adminLogout: (state) => {
			(state.users = null),
				(state.ammount_users = null),
				(state.ammount_active_user = null),
				(state.ammount_creator_user = null),
				(state.ammount_project = null),
				(state.loading = false),
				(state.error = null),
				(state.reportedProjects = null);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload.data;
			state.ammount_users = action.payload.amountUsers;
			state.ammount_active_user = action.payload.totalUserActive;
			state.ammount_creator_user = action.payload.totalUserCreator;
			state.ammount_project = action.payload.ammountProject;
			state.loading = false;
			state.error = null;
		}),
			builder.addCase(fetchReportedProjects.fulfilled, (state, action) => {
				state.loading = false;
				state.reportedProjects = action.payload.data;
			}),
			builder.addCase(bannProject.pending, (state) => {
				state.loading = true;
			}),
			builder.addCase(bannProject.fulfilled, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(bannProject.rejected, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(bannUser.pending, (state) => {
				state.loading = true;
			}),
			builder.addCase(bannUser.fulfilled, (state, action) => {
				state.loading = false;
			});
		builder.addCase(getProjects.fulfilled, (state, action) => {
			state.projects = action.payload.filter;
		});
	},
});

export const adminReducer = adminSlice.reducer;
export const { adminLogout } = adminSlice.actions;
