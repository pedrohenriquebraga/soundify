import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { usePersistedState } from "../hooks/usePersistedState";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ThemeControllerContext {
  theme: typeof dark;
  toggleTheme: () => unknown;
  currentThemeName: string;
}

const ThemeControllerContext = createContext<ThemeControllerContext>(
  {} as ThemeControllerContext
);

const ThemeControllerProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(dark)
  const [themeTitle, setThemeTitle] = usePersistedState<string>(
    "@SoundfyPlayer:theme",
    dark.title
  );

  useEffect(() => {
    setTheme(themeTitle === "dark" ? dark : light);
  }, [themeTitle]);

  const toggleTheme = () => {
    setThemeTitle(themeTitle === light.title ? dark.title : light.title);
  }

  return (
    <ThemeControllerContext.Provider
      value={{
        theme,
        toggleTheme,
        currentThemeName: themeTitle,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

const useThemeController = () => {
  return useContext(ThemeControllerContext)
}


export { ThemeControllerProvider, useThemeController };
