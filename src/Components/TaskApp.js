import TasksProvider from "../context/TasksProvider";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTasks";

export default function TaskApp() {
  return (
    <TasksProvider>
      <AddTask />
      <ShowTasks />
    </TasksProvider>
  );
}