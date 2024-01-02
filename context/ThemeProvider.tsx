"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define the type for the context values
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
// Create a context with an initial value of undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the ThemeProvider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Define state for the theme mode
  const [mode, setMode] = useState("light");
  // Function to handle theme changes
  const handleThemeChange = () => {
    // Check if a theme preference is stored in localStorage
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("prefer-color-scheme: dark").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // Use useEffect to apply theme changes on mount and when mode changes
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  // Provide the theme context to the children
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  // Throw an error if useTheme is not used within a ThemeProvider
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
