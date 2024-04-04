import { configureStore } from "@reduxjs/toolkit";
import taskSlice from './feature/TaskSlice.js'

export const store = configureStore({
	reducer: {
		tasks: taskSlice,
	},
});
