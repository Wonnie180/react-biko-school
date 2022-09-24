import "./_styles/index";
import { Home } from "./Home/Home";
import { createContext, useState } from "react";

export const ThemeContext = createContext({
  themes: [],
  themeId: 0,
  modifyTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const themesLabel = { 0: "claro", 1: "oscuro" };
  const themes = { 0: "container", 1: "container_black" };
  const [themeId, setThemeId] = useState(0);

  // probar localstorage sincrono 
  
  return (
    <ThemeContext.Provider
      value={{ themesLabel, themes, themeId, modifyTheme: setThemeId }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const App = () => (
  <ThemeProvider>
    <Home />
  </ThemeProvider>
);
