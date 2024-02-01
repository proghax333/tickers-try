import React, { useContext } from "react";

export type ThemeContextValue = {
  theme: "light" | "dark";

  setTheme: (value: ThemeContextValue["theme"]) => void;
  toggle: () => void;
};

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",

  setTheme: () => {},
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);
