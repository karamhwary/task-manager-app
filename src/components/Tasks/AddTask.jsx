import React, { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { TextField, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";

export default function AddTask() {
  const { addTask } = useContext(TasksContext);
  const [taskInput, setTaskInput] = useState("");

  const add = () => {
    if (taskInput.trim() === "") return;
    addTask({
      title: taskInput,
      id: crypto.randomUUID(),
      completed: false,
      created_at: new Date().toISOString(),
    });
    setTaskInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="What needs to be done?"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          size="small"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={add}
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
              },
            }}>
            Add
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}
