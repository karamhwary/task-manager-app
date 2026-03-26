import React, { useContext, useState } from "react";
import TaskItem from "./TaskItem";
import { TasksContext } from "../context/tasksContext";
import FilteredButtons from "./filteredButtons";
import { TextField, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";
export default function TaskList() {
  const { tasks, clearCompleted } = useContext(TasksContext);
  const [searchBar, setSearchBar] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredByStatus = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const searchedTasks = filteredByStatus.filter((task) =>
    task.title.toLowerCase().includes(searchBar.toLowerCase()),
  );

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tasks..."
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "gray" }} />,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          variant={sortOrder === "newest" ? "contained" : "outlined"}
          onClick={() => setSortOrder("newest")}
          size="small">
          Newest First
        </Button>
        <Button
          variant={sortOrder === "oldest" ? "contained" : "outlined"}
          onClick={() => setSortOrder("oldest")}
          size="small">
          Oldest First
        </Button>
      </Box>

      <FilteredButtons
        clearCompleted={clearCompleted}
        setFilter={setFilter}
        filter={filter}
        tasks={tasks}
      />

      <AnimatePresence mode="wait">
        {sortedTasks.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <Box sx={{ textAlign: "center", py: 4, color: "gray" }}>
              {searchBar
                ? "No matching tasks found."
                : "✨ No tasks yet. Add your first task!"}
            </Box>
          </motion.div>
        ) : (
          sortedTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </AnimatePresence>
    </Box>
  );
}
