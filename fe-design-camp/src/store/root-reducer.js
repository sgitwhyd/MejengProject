import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth.reducer';

export const rootReducer = combineReducers({
	auth: authReducer,
});
