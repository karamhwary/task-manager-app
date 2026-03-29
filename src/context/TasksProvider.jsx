import React, { useEffect, useState } from "react";
import { TasksContext } from "./TasksContext";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "./AuthContext";

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const addTask = async (task) => {
    const newTask = { ...task, user_id: user.id };

    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();

    if (error) {
      console.error("Error adding task:", error);
    } else {
      setTasks((prev) => [data[0], ...prev]); // ✅ FIX
    }
  };

  const removeTask = async (taskId) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setTasks((prev) => prev.filter((task) => task.id !== taskId)); // ✅ FIX
    }
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", taskId);

    if (error) {
      console.error("Error toggling task:", error);
    } else {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      ); // ✅ FIX
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter((t) => t.completed);

    const { error } = await supabase
      .from("tasks")
      .delete()
      .in(
        "id",
        completedTasks.map((t) => t.id)
      );

    if (error) {
      console.error("Error clearing completed:", error);
    } else {
      setTasks((prev) => prev.filter((t) => !t.completed)); // ✅ FIX
    }
  };

  const editTask = async (taskId, newTitle) => {
    const { error } = await supabase
      .from("tasks")
      .update({ title: newTitle })
      .eq("id", taskId);

    if (error) {
      console.error("Error editing task:", error);
    } else {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, title: newTitle } : t
        )
      ); // ✅ FIX
    }
  };

  const value = {
    tasks,
    loading,
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