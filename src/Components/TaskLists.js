import deleteIcon from "../images/delete-icon.svg";
import { useTasks, useTasksSetter, useAddBtnRef } from "../context/TasksProvider";
import { useRef } from "react";

export default function TaskList() {
  const tasks = useTasks();
  const setTasks = useTasksSetter();
  const addBtnRef = useAddBtnRef();
  const task2FocusOnDeleteIdRef = useRef(null);

  function handleTaskDelete(task2DeleteId, task2DeleteIndex) {
    setTasks(tasks.filter((task) => task.id !== task2DeleteId));
    if (tasks.length === 1) { // sole task on list to be deleted so no other task to focus
      addBtnRef.current?.focus();
    } else {
      const task2FocusOnDeleteIndex = (
        // if task 2 delete is last on list, focus will be set 2 preceding task otherwise next task
        task2DeleteIndex === tasks.length - 1 ? task2DeleteIndex - 1 : task2DeleteIndex + 1
      );
      task2FocusOnDeleteIdRef.current = tasks[task2FocusOnDeleteIndex].id;
    }
  }

  function toggleTaskDone(taskId, newDoneValue) {
    const newTaskList = tasks.map((task) => {
      return task.id !== taskId ? task : {...task, done: newDoneValue};
    });
    setTasks(newTaskList);
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
                checked={task.done}
                onChange={(evt) => toggleTaskDone(task.id, evt.target.checked)}
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