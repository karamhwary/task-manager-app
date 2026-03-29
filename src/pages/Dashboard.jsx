import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion, AnimatePresence } from "framer-motion";
import AddTask from "../components/tasks/AddTask";
import TaskList from "../components/tasks/TaskList";

export default function Dashboard() {
  const { signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <Box
          sx={{
            minHeight: "100vh",
            background: darkMode
              ? "linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            py: 4,
            position: "relative",
            overflow: "hidden",
          }}>
          {/* Animated Background Circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: darkMode
                ? "rgba(100, 108, 255, 0.1)"
                : "rgba(255, 255, 255, 0.1)",
              top: "-200px",
              right: "-200px",
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
              bottom: "-250px",
              left: "-250px",
            }}
          />

          <Container maxWidth="md">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}>
              <Paper
                elevation={24}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  position: "relative",
                  backdropFilter: "blur(10px)",
                  background: darkMode
                    ? "rgba(30, 30, 46, 0.95)"
                    : "rgba(255, 255, 255, 0.95)",
                  boxShadow: darkMode
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}>
                {/* Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}>
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}>
                    <Button
                      onClick={signOut}
                      startIcon={<LogoutIcon />}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        color: darkMode ? "#fff" : "#667eea",
                        borderColor: darkMode
                          ? "rgba(255,255,255,0.3)"
                          : "#667eea",
                        "&:hover": {
                          transform: "translateX(-4px)",
                          transition: "transform 0.3s",
                        },
                      }}>
                      Sign Out
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}>
                    <IconButton
                      onClick={toggleDarkMode}
                      sx={{
                        transition: "all 0.3s",
                        "&:hover": { transform: "rotate(180deg)" },
                      }}>
                      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                  </motion.div>
                </Box>

                {/* Title */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{ textAlign: "center", marginBottom: 32 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background: darkMode
                        ? "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}>
                    Task Manager
                  </Typography>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                      height: 3,
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                      margin: "0 auto",
                      borderRadius: 2,
                      marginTop: 16,
                    }}
                  />
                </motion.div>

                {/* Add Task */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}>
                  <AddTask />
                </motion.div>

                {/* Task List */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}>
                  <TaskList />
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}>
                  <Box
                    sx={{
                      mt: 4,
                      pt: 2,
                      textAlign: "center",
                      borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}>
                      {new Date().getFullYear()} Task Manager  
                    </Typography>
                  </Box>
                </motion.div>
              </Paper>
            </motion.div>
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
