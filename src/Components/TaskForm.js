import { useState, useRef, useEffect } from "react";
import { useTasksSetter } from "../context/TasksProvider";

export default function TaskForm() {
  const setTasks = useTasksSetter();
  const [submittedTask, setSubmittedTask] = useState('false');
  const [newTaskName, setNewTaskName] = useState('');
  const statusRef = useRef(null);
  const inputRef = useRef(null);
  const taskId = useRef(null); // self-incrementing counter 4 setting unique ids on tasks

  useEffect(() => {
    taskId.current = localStorage.getItem('taskId') ?? 0;
  }, []);

  function updateTaskName(value) {
    if (submittedTask === 'new') {
      // clear status msg when user starts to type after submitting a task
      statusRef.current.textContent = '';
    }
    if (submittedTask !== 'false') setSubmittedTask('false'); // typing a new task, not submiting task
    setNewTaskName(value);
  }

  function addNewTask(evt) {
    evt.preventDefault();
    if (newTaskName === '') {
      setSubmittedTask('blank');
      inputRef.current.focus();
    } else {
      const newTaskId = ++taskId.current;
      localStorage.setItem('taskId', newTaskId);
      setSubmittedTask('new');
      setTasks((prevTasks) => {
        return [
          {id: newTaskId, name: newTaskName, done: false},
          ...prevTasks
        ]
      });
      statusRef.current.textContent = `${newTaskName} added`;
      setNewTaskName(''); // clear input field after task is added
    }
  }

  return (
    <>
      {
        submittedTask === 'blank' ? (
          <form onSubmit={addNewTask}>
            <label htmlFor="new-task-name">Enter a task</label>
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
            <button type="submit">Add</button>
            <p id="error-text">
              <span className="visually-hidden">Error: </span>
              Task name cannot be blank. Enter a task to add.
            </p>
            <div role="status" ref={statusRef}></div>
          </form>
        ) : (
          <form onSubmit={addNewTask}>
            <label htmlFor="new-task-name">Enter a task</label>
            <input 
              type="text" 
              id="new-task-name"
              autoComplete="off" 
              value={newTaskName}
              onChange={(evt) => updateTaskName(evt.target.value)} 
              ref={inputRef}
              />
            <button type="submit">Add</button>
            <div role="status" ref={statusRef}></div>
          </form>
        )
      }
    </>
  );
}