import { useTasks } from "../context/TasksProvider";
import TaskList from "./TaskLists";

export default function ShowTasks() {
  const tasks = useTasks();

  return (
    <div className="tasks">
      <h1>My Tasks</h1>
      {
        tasks.length === 0 ? (
          <p className="no-tasks">There are no available tasks.</p>
        ) : (
          <TaskList />
        )
      }
    </div>
  );
}