import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import TasksProvider from "./context/TasksProvider";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* ✅ BrowserRouter هنا */}
      <ThemeProvider>
        <AuthProvider>
          {" "}
          {/* ✅ AuthProvider داخل BrowserRouter */}
          <TasksProvider>
            <App />
          </TasksProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
