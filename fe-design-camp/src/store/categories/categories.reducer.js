import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categories.action';

const initialState = {
	total_category: 0,
	categories: [],
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.total_category = action.payload.ammountCategory;
			state.categories = action.payload.data;
		});
	},
});

export const categoriesReducer = categoriesSlice.reducer;
