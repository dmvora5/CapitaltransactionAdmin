import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { adminApi } from "./api/adminApi";

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[adminApi.reducerPath]: adminApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([
			authApi.middleware,
			adminApi.middleware,
		]),
});
