import React from "react";
import { Button, Box, Chip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";

export default function FilteredButtons({
  clearCompleted,
  filter,
  setFilter,
  tasks,
}) {
  const hasCompletedTasks = tasks.some((task) => task.completed);
  const remainingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        flexWrap: "wrap",
        gap: 1,
      }}>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => setFilter("all")}
          size="small">
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === "active" ? "contained" : "outlined"}
          onClick={() => setFilter("active")}
          size="small">
          Active ({tasks.filter((t) => !t.completed).length})
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "outlined"}
          onClick={() => setFilter("completed")}
          size="small">
          Completed ({tasks.filter((t) => t.completed).length})
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
          <Chip
            label={`${remainingTasks} remaining`}
            color="primary"
            size="small"
          />
        </motion.div>
        {hasCompletedTasks && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={clearCompleted}
              startIcon={<ClearIcon />}
              size="small">
              Clear Completed
            </Button>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}
