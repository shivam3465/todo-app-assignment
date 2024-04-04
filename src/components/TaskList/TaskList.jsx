import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTaskList } from "../../redux/feature/TaskSlice";

const TaskList = () => {
	const { taskList } = useSelector((state) => state.tasks);
	const dispatch = useDispatch();

	console.log("task list ", taskList);

	const handleDelete = (index) => {
		const newTaskList = taskList.filter((item) => item.id !== index);
		dispatch(setTaskList(newTaskList));

		// Update localStorage with the new task list
		localStorage.setItem("taskList", JSON.stringify(newTaskList));
	};

	const handleTaskUpdate = (index) => {
		const newTaskList = taskList.map((item) => {
			if (item.id === index) {
				// Create a new object with the updated property
				return { ...item, isCompleted: !item.isCompleted };
			}
			// If the item's id doesn't match, return the original item
			return item;
		});

		dispatch(setTaskList(newTaskList));

        // Update localStorage with the new task list
		localStorage.setItem("taskList", JSON.stringify(newTaskList));
	};

	return (
		<div className="mt-8 max-w-screen-xl m-auto">
			<h2 className="text-2xl font-bold mb-4 text-center">Task List</h2>
			{taskList.length === 0 ? (
				<p className="text-center">No tasks added yet.</p>
			) : (
				<div className="list-disc pl-6">
					{taskList.map((task, index) => (
						<div
							key={index}
							className="flex justify-between items-center my-3 rounded-sm p-2 border-[1px] bg-blue-50 border-gray-400">
							{/* task contents */}
							<div>
								<div className="font-semibold text-[18px] mb-2">
									{task?.title}
								</div>
								<div>{task?.desc}</div>
							</div>

							{/* action button  */}
							<div className="flex items-center justify-between ">
								<div
									className="w-[30px] h-[30px] bg-white border-[1px] border-gray-300 rounded-md mr-4 cursor-pointer"
									onClick={() => handleTaskUpdate(task.id)}>
									{task.isCompleted ? <>&#10004; </> : ""}
								</div>
								<button
									onClick={() => handleDelete(task.id)}
									className=" bg-red-400 py-2 px-3 rounded-lg text-white hover:bg-red-600 focus:outline-none">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TaskList;
