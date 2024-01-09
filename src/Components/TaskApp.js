import { useState, useEffect, useRef } from "react";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTasks";

export default function TaskApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks === null ? [] : JSON.parse(savedTasks);
  });
  const appMounted = useRef(false);

  useEffect(() => {
    if (!appMounted) { // first render
      appMounted = true;
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  
  return (
    <>
      <AddTask setTasks={setTasks} />
      <ShowTasks tasks={tasks} />
    </>
  );
}