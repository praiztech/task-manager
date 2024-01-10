import { createContext, useContext, useState } from "react";

const TasksContext = createContext(null);
const TasksSetterContext = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks === null ? [] : JSON.parse(savedTasks);
  });

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