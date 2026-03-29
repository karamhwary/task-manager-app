import React, { useContext, useState } from "react";
import TaskItem from "./TaskItem";
import FilteredButtons from "./FilteredButtons";
import { TasksContext } from "../../context/TasksContext";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList() {
  const { tasks, loading, clearCompleted } = useContext(TasksContext);
  const [searchBar, setSearchBar] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredByStatus = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const searchedTasks = filteredByStatus.filter((task) =>
    task.title.toLowerCase().includes(searchBar.toLowerCase())
  );

  const sortedTasks = [...searchedTasks].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  );

  return (
    <Box>
      {/* Search */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tasks..."
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Sort */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Button
          variant={sortOrder === "newest" ? "contained" : "outlined"}
          onClick={() => setSortOrder("newest")}
          size="small"
        >
          Newest First
        </Button>
        <Button
          variant={sortOrder === "oldest" ? "contained" : "outlined"}
          onClick={() => setSortOrder("oldest")}
          size="small"
        >
          Oldest First
        </Button>
      </Box>

      {/* Filters */}
      <FilteredButtons
        clearCompleted={clearCompleted}
        setFilter={setFilter}
        filter={filter}
        tasks={tasks}
      />

      {/* List */}
      <AnimatePresence mode="popLayout">
        {sortedTasks.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4, color: "gray" }}>
            {searchBar
              ? "No matching tasks found."
              : "✨ No tasks yet. Add your first task!"}
          </Box>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </AnimatePresence>
    </Box>
  );
}