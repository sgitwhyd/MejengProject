import { createSlice } from '@reduxjs/toolkit';
import { fetchTools } from './tools.action';

const initialState = {
	total_tool: 0,
	tools: [],
};

const toolsSlice = createSlice({
	name: 'tools',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTools.fulfilled, (state, action) => {
			state.total_tool = action.payload.ammount;
			state.tools = action.payload.data;
		});
	},
});

export const toolsReducer = toolsSlice.reducer;
