import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
	name: "User",
	initialState: {
		taskList: [],		
	},
	reducers: {
		setTaskList: (state, action) => {
			state.taskList = action.payload;
		},
	},
});

export const { setTaskList} = taskSlice.actions;
export default taskSlice.reducer;
