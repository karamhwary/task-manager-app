import React, { useContext, useState } from "react";
import { TasksContext } from "../context/tasksContext";
import {
  ListItem,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskItem({ task }) {
  const { removeTask, toggleTask, editTask } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const theme = useTheme();

  const handleSave = () => {
    if (editText.trim() === "") return;
    editTask(task.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}>
        <ListItem
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#2d2d3a" : "#fef9c3",
            mb: 1,
            borderRadius: 2,
            display: "flex",
            gap: 1,
          }}>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            size="small"
          />
          <IconButton onClick={handleSave} color="primary" size="small">
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsEditing(false)}
            color="error"
            size="small">
            <CancelIcon />
          </IconButton>
        </ListItem>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      layout>
      <ListItem
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f8fafc",
          mb: 1,
          borderRadius: 2,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: theme.palette.mode === "dark" ? "#3a3a3a" : "#f1f5f9",
            transform: "translateX(4px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(0,0,0,0.3)"
                : "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}>
        <motion.div whileTap={{ scale: 1.1 }} transition={{ duration: 0.1 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            sx={{ mr: 1 }}
          />
        </motion.div>
        <Typography
          sx={{
            flex: 1,
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "text.secondary" : "text.primary",
            transition: "all 0.2s",
          }}>
          {task.title}
        </Typography>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <IconButton
            onClick={() => setIsEditing(true)}
            color="primary"
            size="small">
            <EditIcon />
          </IconButton>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <IconButton
            onClick={() => removeTask(task.id)}
            color="error"
            size="small">
            <DeleteIcon />
          </IconButton>
        </motion.div>
      </ListItem>
    </motion.div>
  );
}
