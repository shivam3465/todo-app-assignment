import TaskInput from "../../components/TaskInput/TaskInput";
import TaskList from "../../components/TaskList/TaskList";


const Home = () => {
	return (
		<div className="max-w-screen-2xl  px-8 m-auto">
			<h1 className="text-3xl font-bold p-4 mb-6 text-center">To-Do App</h1>			
			<TaskInput />
			<TaskList />
		</div>
	);
};

export default Home;