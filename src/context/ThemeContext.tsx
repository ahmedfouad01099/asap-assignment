import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { THEMES } from "../theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  theme: typeof THEMES.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemColorScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    if (systemColorScheme && systemColorScheme !== "unspecified") {
      setMode(systemColorScheme as ThemeMode);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = THEMES[mode];

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, isDark: mode === "dark", theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
