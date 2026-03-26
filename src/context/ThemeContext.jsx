import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#667eea",
      },
      secondary: {
        main: "#764ba2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    shape: {
      borderRadius: 12,
    },
    transitions: {
      duration: {
        standard: 300,
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);