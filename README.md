# 📝 Task Manager App

A modern, full-stack task management application built with React. Manage your tasks with authentication, dark mode, search, filtering, sorting, and cloud storage.

![Task Manager Screenshot](https://via.placeholder.com/800x400?text=Task+Manager+App)

## 🚀 Live Demo

[https://subtle-truffle-362c88.netlify.app]

---

## ✨ Features

| Feature                | Description                              |
| ---------------------- | ---------------------------------------- |
| 🔐 **Authentication**  | Sign up / Sign in with Supabase          |
| ☁️ **Cloud Storage**   | Tasks saved in Supabase database         |
| 👤 **User-specific**   | Each user sees their own tasks           |
| ➕ **Add Tasks**       | Create new tasks with a title            |
| ✏️ **Edit Tasks**      | Modify existing task titles              |
| ✅ **Complete Tasks**  | Mark tasks as complete/incomplete        |
| 🗑️ **Delete Tasks**    | Remove individual tasks                  |
| 🧹 **Clear Completed** | Delete all completed tasks at once       |
| 🔍 **Search**          | Filter tasks by title text               |
| 🏷️ **Filter**          | View All / Active / Completed tasks      |
| 📅 **Sort**            | Sort tasks by date (Newest/Oldest first) |
| 🌙 **Dark Mode**       | Toggle between light and dark themes     |
| 📱 **Responsive**      | Works on desktop, tablet, and mobile     |
| 🎨 **Material UI**     | Modern component library                 |
| ✨ **Animations**      | Smooth transitions with Framer Motion    |

---

## 🛠️ Tech Stack

| Technology                   | Purpose                   |
| ---------------------------- | ------------------------- |
| **React 18**                 | UI library                |
| **Vite**                     | Build tool                |
| **Context API + useReducer** | State management          |
| **Supabase**                 | Authentication & Database |
| **Material UI (MUI)**        | Component library         |
| **Framer Motion**            | Animations                |
| **React Router**             | Navigation                |
| **Git & GitHub**             | Version control           |
| **Netlify**                  | Deployment                |

---

## 📁 Project Structure

src/
├── components/
│ ├── tasks/
│ │ ├── AddTask.jsx
│ │ ├── TaskList.jsx
│ │ ├── TaskItem.jsx
│ │ └── FilteredButtons.jsx
│ └── common/
│ └── ProtectedRoute.jsx
├── pages/
│ ├── auth/
│ │ ├── Login.jsx
│ │ └── Signup.jsx
│ └── Dashboard.jsx
├── context/
│ ├── AuthContext.jsx
│ ├── TasksContext.jsx
│ ├── TasksProvider.jsx
│ └── ThemeContext.jsx
├── services/
│ └── supabaseClient.js
├── App.jsx
└── main.jsx

