import deleteIcon from "../images/delete-icon.svg";
import { useTasks, useTasksSetter } from "../context/TasksProvider";
import { useRef } from "react";

export default function TaskList() {
  const tasks = useTasks();
  const setTasks = useTasksSetter();
  const task2FocusOnDeleteIdRef = useRef(null);

  function handleTaskDelete(task2DeleteId, task2DeleteIndex) {
    const task2FocusOnDeleteIndex = (
      // if task 2 delete is last on list, focus preceding task otherwise focus next task
      task2DeleteIndex === tasks.length - 1 ? task2DeleteIndex - 1 : task2DeleteIndex + 1
    );
    task2FocusOnDeleteIdRef.current = tasks[task2FocusOnDeleteIndex].id;
    setTasks(tasks.filter((task) => task.id !== task2DeleteId));
  }

  return (
    <ul role="list">
      {
        tasks.map((task, index) => {
          return (
            <li key={task.id}>
              <input 
                type="checkbox" 
                id={`${task.id}-checkbox`} 
                ref={
                  task.id === task2FocusOnDeleteIdRef.current ?
                  // inline ref callback ensures it's invoked on every render
                  (node) => {
                    if (node !== null) {
                      task2FocusOnDeleteIdRef.current = null; // reset
                      node.focus();
                    }
                  } : undefined
                }
              />
              <label htmlFor={`${task.id}-checkbox`} id={`${task.id}-name`}>{task.name}</label>
              <button 
                type="button" 
                aria-labelledby={`${task.id}-delete ${task.id}-name`}
                onClick={() => handleTaskDelete(task.id, index)}
              >
                <span id={`${task.id}-delete`} hidden>Delete</span>
                <img src={deleteIcon} alt="" />
              </button>
            </li>
          )
        })
      }
    </ul>
  );
}