import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Fade,
  Grow,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        alert("Account created! You can now sign in");
        setIsSignUp(false);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: darkMode
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Animated background elements */}
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
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(100, 108, 255, 0.1)"
            : "rgba(255, 255, 255, 0.1)",
          top: "-100px",
          right: "-100px",
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
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
          bottom: "-150px",
          left: "-150px",
        }}
      />

      <Container maxWidth="sm">
        <Grow in={true} timeout={800}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}>
            <Paper
              elevation={24}
              sx={{
                p: 5,
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
              {/* Dark Mode Toggle */}
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", top: 20, right: 20 }}>
                <Button
                  onClick={toggleDarkMode}
                  sx={{
                    minWidth: "auto",
                    p: 1,
                    borderRadius: "50%",
                    color: darkMode ? "#ffd700" : "#667eea",
                  }}>
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </Button>
              </motion.div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                style={{ textAlign: "center", marginBottom: 24 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2,
                    borderRadius: "50%",
                    background: darkMode
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}>
                  <AssignmentIcon sx={{ fontSize: 48, color: "white" }} />
                </Box>
              </motion.div>

              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: darkMode
                    ? "linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 1,
                }}>
                {isSignUp ? "Create Account" : "Welcome Back"}
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{ color: "text.secondary", mb: 4 }}>
                {isSignUp
                  ? "Start managing your tasks efficiently"
                  : "Sign in to continue to your tasks"}
              </Typography>

              {error && (
                <Fade in={true}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{
                      mt: 4,
                      mb: 2,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.5)",
                      },
                      "&:disabled": {
                        background: "#ccc",
                      },
                    }}>
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : isSignUp ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}>
                <Button
                  fullWidth
                  onClick={() => setIsSignUp(!isSignUp)}
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    textTransform: "none",
                    "&:hover": {
                      background: "transparent",
                      color: "#667eea",
                    },
                  }}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Create one"}
                </Button>
              </motion.div>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, #667eea, transparent)",
                  marginTop: 24,
                }}
              />
            </Paper>
          </motion.div>
        </Grow>
      </Container>
    </Box>
  );
}
