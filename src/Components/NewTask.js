import { useRef, useState } from "react";
import TaskForm from "./TaskForm";

export default function NewTask({setTasks}) {
  return (
    <>
      <button type="button" aria-expanded="true">
        Add New Task
      </button>
      <TaskForm setTasks={setTasks} />
    </>
  );
}