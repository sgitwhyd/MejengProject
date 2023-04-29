import { createSlice } from "@reduxjs/toolkit";
import {
	createProject,
	getProfile,
	requestCreator,
	getIpAddress,
} from "./user.action";

const initialState = {
	ip_address: null,
	loading: false,
	user: null,
	userProjectsLiked: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout: (state) => {
			(state.ip_address = null),
				(state.loading = false),
				(state.user = null),
				(state.userProjectsLiked = null);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createProject.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(createProject.fulfilled, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(createProject.rejected, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(getProfile.fulfilled, (state, action) => {
				state.user = action.payload.data.profile;
				state.userProjectsLiked = action.payload.data.userLike;
			}),
			builder.addCase(requestCreator.pending, (state, action) => {
				state.loading = true;
			}),
			builder.addCase(requestCreator.fulfilled, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(requestCreator.rejected, (state, action) => {
				state.loading = false;
			}),
			builder.addCase(getIpAddress.fulfilled, (state, action) => {
				state.ip_address = action.payload.ip;
			});
	},
});

export const userReducer = userSlice.reducer;
export const { userLogout } = userSlice.actions;
