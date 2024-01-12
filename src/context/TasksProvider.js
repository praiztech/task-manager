import { createContext, useContext, useState, useRef, useEffect } from "react";

const TasksSetterContext = createContext(null);
const TasksContext = createContext(null);
const AddBtnRefContext = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks === null ? [] : JSON.parse(savedTasks);
  });
  const addBtnRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { // first render
      mounted.current = true;
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <TasksSetterContext.Provider value={setTasks}>
      <TasksContext.Provider value={tasks}>
        <AddBtnRefContext.Provider value={addBtnRef}>
          {children}
        </AddBtnRefContext.Provider>
      </TasksContext.Provider>
    </TasksSetterContext.Provider>
  );
}

export function useTasksSetter() {
  return useContext(TasksSetterContext);
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useAddBtnRef() {
  return useContext(AddBtnRefContext);
}