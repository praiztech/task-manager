import { useState } from "react";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTasks";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <AddTask setTasks={setTasks} />
      <ShowTasks tasks={tasks} />
    </>
  );
}