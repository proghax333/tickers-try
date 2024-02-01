import React, { useEffect } from "react";
import { ThemeContext, ThemeContextValue } from "./ThemeContext";

type ThemeState = {
  theme: ThemeContextValue["theme"];
};

const defaultThemeState: ThemeState = {
  theme: "dark",
};

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = React.useState<ThemeState>(defaultThemeState);

  useEffect(() => {
    try {
      const theme = localStorage.getItem("theme");

      if (theme && ["light", "dark"].includes(theme)) {
        setState({
          theme: theme as any,
        });
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  const setTheme = React.useCallback(
    (theme: ThemeContextValue["theme"]) => {
      setState({
        theme,
      });

      try {
        localStorage.setItem("theme", theme);
      } catch (e) {}
    },
    [state.theme]
  );

  const toggle = React.useCallback(() => {
    const oppositeTheme = state.theme === "dark" ? "light" : "dark";
    setTheme(oppositeTheme);
  }, [state.theme, setTheme]);

  const value: ThemeContextValue = {
    ...state,
    setTheme,
    toggle,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
