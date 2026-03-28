import { createContext } from "react";

export const TasksContext = createContext({
  tasks: [],
  loading: true,
  addTask: () => {},
  removeTask: () => {},
  toggleTask: () => {},
  clearCompleted: () => {},
  editTask: () => {},
});
