import { useState } from "react";
import NewTask from "./NewTask";
import AllTasks from "./AllTasks";

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <NewTask />
      <AllTasks tasks={tasks} />
    </>
  );
}