import React, { useContext, useState } from "react";
import { TasksContext } from "../context/tasksContext";
import { TextField, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddTask() {
  const { addTask } = useContext(TasksContext);
  const [taskInput, setTaskInput] = useState("");

  function handleInput(event) {
    setTaskInput(event);
  }

  function add() {
    if (taskInput.trim() === "") return;

    addTask({
      title: taskInput,
      id: crypto.randomUUID(),
      completed: false,
    });
    setTaskInput("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") add();
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="What needs to be done?"
        value={taskInput}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={handleKeyDown}
        size="small"
      />
      <Button
        variant="contained"
        onClick={add}
        startIcon={<AddIcon />}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)",
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
}