import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setTaskList } from "../../redux/feature/TaskSlice";

const TaskInput = () => {
	const [task, setTask] = useState({});
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const dispatch = useDispatch();
	const { taskList } = useSelector((state) => state.tasks);

	// Load task list from local storage on component mount
	useEffect(() => {
		const storedTaskList = localStorage.getItem("taskList");
		if (storedTaskList) {
			dispatch(setTaskList(JSON.parse(storedTaskList)));
		}
	}, []);

	const handleSubmit = () => {
		if (task?.title?.trim() && task.title.trim().length > 0) {
			const newTaskList = [...taskList];

			//storing the current task in previous task list with a unique id and marking it's default status as uncompleted
			newTaskList.unshift({
				...task,
				id: Number(new Date()),
				isCompleted: false,
			});

			dispatch(setTaskList(newTaskList));

            //storing the updated list in local storage
            localStorage.setItem("taskList", JSON.stringify(newTaskList));

			toast.success("Task has been added successfully");
			setTask({}); //clearing the last stored input field
		} else {
			toast.error("Please add task title");
		}
	};

	const handleInputChange = (key, value) => {
		const updatedTask = { ...task, [key]: value };
		setTask(updatedTask);

		// Check if the title exists and is not empty
		if (updatedTask.title && updatedTask.title.trim().length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	};

	// console.log("button ", buttonDisabled, task);

	return (
		<div className="flex items-center justify-center flex-col mt-8">
			<input
				type="text"
				placeholder="Enter a  task's title"
				value={task.title || ""}
				onChange={(e) => handleInputChange("title", e.target.value)}
				className="px-4 py-2 text-[18px] min-w-[20rem]  my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-blue-500"
			/>
			<input
				type="text"
				placeholder="Enter a task's description"
				value={task.desc || ""}
				onChange={(e) => handleInputChange("desc", e.target.value)}
				className="px-4 py-2 min-w-[20rem] text-[17px] my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-blue-500"
			/>
			<button
				onClick={handleSubmit}
				type="submit"
				className={`${
					buttonDisabled
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-500  hover:bg-blue-600 active:scale-95"
				} px-4 py-2 mt-2 font-semibold  text-white rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-blue-500`}>
				Add Task
			</button>
		</div>
	);
};

export default TaskInput;
