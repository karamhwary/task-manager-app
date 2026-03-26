import React from "react";
import { useReducer } from "react";
import { TasksContext } from "./tasksContext";
import { useEffect } from "react";
function getInitialTasks() {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}
function reducer(state, action) {
  if (action.type === "ADD-TASK") {
    return [...state, action.payload];
  }
  if (action.type === "REMOVE-TASK") {
    return state.filter((task) => task.id !== action.payload);
  }
  if (action.type === "TOGGLE-TASK") {
    return state.map((task) =>
      task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task,
    );
  }
  if (action.type === "CLEAR_COMPLETED") {
    return state.filter((task) => !task.completed);
  }
  if (action.type === "EDIT-TASK") {
    return state.map(
      (task) =>
        task.id === action.payload.taskId
          ? { ...task, title: action.payload.newTitle } 
          : task, 
    );
  }
  return state;
}
export default function TasksProvider({ children }) {
  const [tasks, taskdispatch] = useReducer(reducer, [], getInitialTasks);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    taskdispatch({ type: "ADD-TASK", payload: task });
  }

  function removeTask(taskId) {
    taskdispatch({ type: "REMOVE-TASK", payload: taskId });
  }
  function toggleTask(taskId) {
    taskdispatch({ type: "TOGGLE-TASK", payload: taskId });
  }

  function clearCompleted() {
    taskdispatch({ type: "CLEAR_COMPLETED" });
  }
  function editTask(taskId, newTitle) {
    taskdispatch({ type: "EDIT-TASK", payload: { taskId, newTitle } });
  }
  const value = {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    clearCompleted,
    editTask,
  };
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
