"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getLabel = () => {
    return theme === "light" ? "light" : "dark";
  };

  return (
    <button
      onClick={cycleTheme}
      className="text-sm text-foreground hover:opacity-60 transition-opacity"
      aria-label="Toggle theme"
    >
      {getLabel()}
    </button>
  );
}
