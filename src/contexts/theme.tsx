import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "styled-components/native";
import { usePersistedState } from "../hooks/usePersistedState";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";
import { useColorScheme, StatusBar } from "react-native";
interface IThemeControllerContext {
  toggleTheme: (theme?: string) => unknown;
  currentThemeName: "light" | "dark" | string;
}

const ThemeControllerContext = createContext<IThemeControllerContext>(
  {} as IThemeControllerContext
);

const ThemeControllerProvider: React.FC = ({ children }) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme, themeFetched] = usePersistedState(
    "@Odin:theme",
    defaultTheme === "light" ? light : dark
  );
  const toggleTheme = useCallback(
    (themeName?: "light" | "dark") => {
      if (themeName) {
        if (themeName !== theme.title) {
          setTheme(themeName === "light" ? light : dark);
        }
        return;
      }

      setTheme(theme.title === "light" ? dark : light);
    },
    [theme, theme.title]
  );

  useEffect(() => {
    setTheme((old) => (old.title === "light" ? light : dark));
  }, [themeFetched]);

  useEffect(() => {
    if (defaultTheme !== theme.title) {
      setTheme(defaultTheme === "light" ? light : dark);
    }
  }, [defaultTheme]);

  useEffect(() => {
    StatusBar.setBarStyle(
      theme.title === "light" ? "dark-content" : "light-content"
    );
    StatusBar.setBackgroundColor(theme.colors.background);
  }, [theme]);

  return (
    // @ts-ignore
    <ThemeControllerContext.Provider
      value={{
        toggleTheme,
        currentThemeName: theme.title,
      }}
    >
      {/* @ts-ignore */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

const useThemeController = () => {
  return useContext(ThemeControllerContext);
};

export { ThemeControllerProvider, useThemeController };
