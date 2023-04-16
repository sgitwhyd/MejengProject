import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './admin.action';

const initialState = {
	users: null,
	ammount_users: null,
	loading: false,
	error: null,
};

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload.data;
			state.ammount_users = action.payload.amountUsers;
			state.loading = false;
			state.error = null;
		});
	},
});

export const adminReducer = adminSlice.reducer;
