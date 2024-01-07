import { useState, useRef, useEffect } from "react";

export default function TaskForm({setTasks}) {
  const [isSubmittingEmptyTask, setIsSubmittingEmptyTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const statusRef = useRef(null);
  const inputRef = useRef(null);

  // self-incrementing counter 4 setting unique ids on tasks
  const taskId = useRef(null); 
  // initializing during 1st render prevents unnecessary computation subsequently - useRef reference
  if (taskId.current === null) taskId.current = localStorage.getItem('taskId') ?? 0;

  // persists taskId for subsequent use
  useEffect(() => {
    localStorage.setItem('taskId', taskId.current);
  }, [taskId.current]);

  function updateTaskName(value) {
    setNewTaskName(value);
    isSubmittingEmptyTask && setIsSubmittingEmptyTask(false);
  }

  function addNewTask(evt) {
    evt.preventDefault();
    if (newTaskName === '') {
      setIsSubmittingEmptyTask(true);
      inputRef.current.focus();
    } else {
      setTasks((prevTasks) => {
        return [
          {id: taskId.current++, name: newTaskName},
          ...prevTasks
        ]
      });
      statusRef.current.textContent = '';
      statusRef.current.textContent = `${newTaskName} added`;
      updateTaskName(''); // clear input field after task is added
    }
  }

  return (
    <>
      {
        isSubmittingEmptyTask ? (
          <form onSubmit={addNewTask}>
            <label htmlFor="task-name">Enter a task</label>
            <input 
              type="text" 
              name="task" 
              id="task-name" 
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
            <div role="status" className="visually-hidden" ref={statusRef}></div>
          </form>
        ) : (
          <form onSubmit={addNewTask}>
            <label htmlFor="task-name">Enter a task</label>
            <input 
              type="text" 
              name="task" 
              id="task-name" 
              autoComplete="off" 
              value={newTaskName}
              onChange={(evt) => updateTaskName(evt.target.value)} 
              ref={inputRef}
              />
            <button type="submit">Add</button>
            <div role="status" className="visually-hidden" ref={statusRef}></div>
          </form>
        )
      }
    </>
  );
}