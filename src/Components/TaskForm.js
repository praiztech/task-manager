import { AddIcon } from "../icons/Icons";
import { useState, useRef, useEffect } from "react";
import { useTasksSetter } from "../context/TasksProvider";

export default function TaskForm() {
  const setTasks = useTasksSetter();
  const [newTaskName, setNewTaskName] = useState(''); // sync input data with state - controlled component
  
  // submittedName reqd coz after task is added, newTaskName === '' so can't be used in status rendering
  const [taskData, setTaskData] = useState({submitted: 'false', submittedName: null});

  const inputRef = useRef(null);
  const taskId = useRef(null); // self-incrementing counter 4 setting unique ids on tasks

  useEffect(() => {
    taskId.current = localStorage.getItem('taskId') ?? 0;
  }, []);

  function updateTaskName(value) {
    // typing a new task, not submiting task
    if (taskData.submitted !== 'false') setTaskData({submitted: 'false', submittedName: null});
    setNewTaskName(value);
  }

  function addNewTask(evt) {
    evt.preventDefault();
    if (newTaskName === '') {
      setTaskData({submitted: 'blank', submittedName: null});
      inputRef.current.focus();
    } else {
      const newTaskId = ++taskId.current;
      localStorage.setItem('taskId', newTaskId);
      setTaskData({submitted: 'new', submittedName: newTaskName});
      setTasks((prevTasks) => {
        return [
          {id: newTaskId, name: newTaskName, done: false},
          ...prevTasks
        ]
      });
      setNewTaskName(''); // clear input field after task is added
    }
  }

  return (
    <>
      { // live region must always be in DOM to ensure consistent relay of status msg 
        // prevent task notification taking focus and closing form coz related target will be null
        taskData.submitted === 'blank' ? (
          <form onSubmit={addNewTask}>
            <div className="task-form-box">
              <div className="task-form-entry-box">
                <input 
                  type="text" 
                  id="new-task-name"
                  autoComplete="off" 
                  aria-invalid="true"
                  aria-describedby="error-text"
                  value={newTaskName}
                  onChange={(evt) => updateTaskName(evt.target.value)} 
                  ref={inputRef}
                />
                <label htmlFor="new-task-name">Enter a task</label>
              </div>
              <button type="submit">
                <span className="visually-hidden">Add</span>
                <AddIcon />
              </button>
            </div>
            <div className="task-notification" onPointerDown={(evt) => evt.preventDefault()}>
              <div role="status"></div>
              <p className="error-text" id="error-text">
                <span className="prefix">Error: </span>Task name cannot be blank. Enter a task to add.
              </p>
            </div>
          </form>
        ) : taskData.submitted === 'new' ? (
            <form onSubmit={addNewTask}>
              <div className="task-form-box">
                <div className="task-form-entry-box">
                  <input 
                    type="text" 
                    id="new-task-name"
                    autoComplete="off" 
                    value={newTaskName}
                    onChange={(evt) => updateTaskName(evt.target.value)} 
                    ref={inputRef}
                  />
                  <label htmlFor="new-task-name">Enter a task</label>
                </div>
                <button type="submit">
                  <span className="visually-hidden">Add</span>
                  <AddIcon />
                </button>
              </div>
              <div className="task-notification" onPointerDown={(evt) => evt.preventDefault()}>
                <div role="status">
                  <span className="prefix">Success: </span>"{taskData.submittedName}" added. 
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={addNewTask}>
              <div className="task-form-box">
                <div className="task-form-entry-box">
                  <input 
                    type="text" 
                    id="new-task-name"
                    autoComplete="off" 
                    value={newTaskName}
                    onChange={(evt) => updateTaskName(evt.target.value)} 
                    ref={inputRef}
                  />
                  <label htmlFor="new-task-name">Enter a task</label>
                </div>
                <button type="submit">
                  <span className="visually-hidden">Add</span>
                  <AddIcon />
                </button>
              </div>
              <div className="task-notification" onPointerDown={(evt) => evt.preventDefault()}>
                <div role="status"></div>
              </div>
            </form>
          )
      }
    </>
  );
}