import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "summer" | "fall" | "spring";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("ccshub-theme");
  if (saved && ["light", "dark", "summer", "fall", "spring"].includes(saved)) {
    return saved as Theme;
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("ccshub-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
