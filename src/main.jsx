import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TasksProvider from "./context/TasksProvider";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </ThemeProvider>
  </StrictMode>
);