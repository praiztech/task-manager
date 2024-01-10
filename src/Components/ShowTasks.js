import { useRef, useEffect } from "react";
import { useTasks } from "../context/TasksProvider";
import TaskList from "./TaskLists";

export default function ShowTasks() {
  const tasks = useTasks();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted) { // first render
      mounted = true;
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

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