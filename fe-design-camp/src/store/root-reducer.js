import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.reducer';
import { adminReducer } from './admin/admin.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { toolsReducer } from './tools/tools.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
	auth: authReducer,
	admin: adminReducer,
	categories: categoriesReducer,
	tools: toolsReducer,
	user: userReducer,
});
