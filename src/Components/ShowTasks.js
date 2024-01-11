import { useTasks } from "../context/TasksProvider";
import TaskList from "./TaskLists";

export default function ShowTasks() {
  const tasks = useTasks();

  return (
    <>
      <h1>My Tasks</h1>
      {
        tasks.length === 0 ? (
          <p>There are no available tasks.</p>
        ) : (
          <TaskList />
        )
      }
    </>
  );
}