import { DeleteIcon } from "../icons/Icons";
import { useRef, useState } from "react";
import { useTasks, useTasksSetter, useAddBtnRef } from "../context/TasksProvider";
import TaskDeleteModal from "./TaskDeleteModal";

export default function TaskList() {
  const tasks = useTasks();
  const setTasks = useTasksSetter();
  const addBtnRef = useAddBtnRef();
  const task2DeleteIdRef = useRef(null);
  const task2FocusOnDeleteCancelIdRef = useRef(null);
  const task2FocusOnDeleteIdRef = useRef(null);
  const [showTaskDeleteModal, setShowTaskDeleteModal] = useState(false);

  function handleDeleteModalDisplay(task2DeleteId) {
    task2DeleteIdRef.current = task2DeleteId;
    setShowTaskDeleteModal(true);
  }

  function handleTaskDeleteCancel(task2DeleteId) {
    // set focus back to the triggering ctrl - delete btn, if delete is canceled
    task2FocusOnDeleteCancelIdRef.current = task2DeleteId;
    task2DeleteIdRef.current = null; // reset - delete handled
    setShowTaskDeleteModal(false);
  } 

  function handleTaskDelete(task2DeleteId, task2DeleteIndex) {
    setTasks(tasks.filter((task) => task.id !== task2DeleteId));
    if (tasks.length === 1) { // sole task on list to be deleted so no other task to focus
      addBtnRef.current?.focus();
    } else {
      const task2FocusOnDeleteIndex = (
        // if task 2 delete is last on list, set focus 2 preceding task otherwise next task
        task2DeleteIndex === tasks.length - 1 ? task2DeleteIndex - 1 : task2DeleteIndex + 1
      );
      task2FocusOnDeleteIdRef.current = tasks[task2FocusOnDeleteIndex].id;
    }
    task2DeleteIdRef.current = null; // reset - delete handled
    setShowTaskDeleteModal(false);
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
              {/* label-wrapper ensures inadvertent click on space after label doesn't activate checkbox */}
              <span className="label-wrapper">
                <label htmlFor={`${task.id}-checkbox`} id={`${task.id}-name`}>{task.name}</label>
              </span>
              <div className="delete-task">
                <button 
                  type="button" 
                  aria-labelledby={`${task.id}-delete ${task.id}-name`}
                  onClick={() => handleDeleteModalDisplay(task.id)}
                  ref={
                    task.id === task2FocusOnDeleteCancelIdRef.current ?
                      // inline ref callback ensures it's invoked on every render
                      (node) => {
                        if (node !== null) {
                          task2FocusOnDeleteCancelIdRef.current = null; // reset
                          node.focus();
                        }
                      } : undefined
                  }
                >
                  <span id={`${task.id}-delete`} hidden>Delete</span>
                  <DeleteIcon />
                </button>
                {
                  showTaskDeleteModal && task2DeleteIdRef.current === task.id &&
                  <TaskDeleteModal 
                    taskName={task.name}  
                    onCancel={() => handleTaskDeleteCancel(task.id)} 
                    onDelete={() => handleTaskDelete(task.id, index)}
                  />
                }
              </div>
            </li>
          )
        })
      }
    </ul>
  );
}