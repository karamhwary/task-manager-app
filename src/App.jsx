import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { Container, Paper, Typography, Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        transition: "background 0.3s ease-in-out",
      }}>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            position: "relative",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? "0 20px 25px -12px rgba(0,0,0,0.5)"
                : "0 20px 25px -12px rgba(0,0,0,0.2)",
            },
          }}>
          <IconButton
            onClick={toggleDarkMode}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(180deg)",
              },
            }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              mb: 4,
              fontWeight: "bold",
              background: darkMode
                ? "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              transition: "all 0.3s ease",
            }}>
            Todo List
          </Typography>
          <AddTask />
          <TaskList />
        </Paper>
      </Container>
    </Box>
  );
}
