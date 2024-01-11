import { createContext, useContext, useState, useRef, useEffect } from "react";

const TasksContext = createContext(null);
const TasksSetterContext = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks === null ? [] : JSON.parse(savedTasks);
  });

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { // first render
      mounted.current = true;
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksSetterContext.Provider value={setTasks}>
        {children}
      </TasksSetterContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksSetter() {
  return useContext(TasksSetterContext);
}